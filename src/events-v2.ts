import { hexToBytes } from './bytes'
import type { CommitmentPreImageV1, Nullifier, TokenInfo } from './events-v1'

type CommitmentPreImageV2 = CommitmentPreImageV1

type ShieldCiphertextV2 = {
  shieldKey: Uint8Array
  encryptedBundle: [Uint8Array, Uint8Array, Uint8Array]
}

type ShieldV2 = {
  treeNumber: number
  treePosition: number
  commitment: CommitmentPreImageV2
  shieldCiphertext: ShieldCiphertextV2
}

type CommitmentCiphertextV2 = {
  ciphertext: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]
  blindedSenderViewingKey: Uint8Array
  blindedReceiverViewingKey: Uint8Array
  memo: Uint8Array
  annotationData: Uint8Array
}

type TransactV2 = {
  treeNumber: number
  treePosition: number
  hash: Uint8Array
  ciphertext: CommitmentCiphertextV2
}

type NullifiedV2 = Nullifier

type UnshieldV2 = {
  to: Uint8Array
  amount: bigint
  token: TokenInfo
  fee: bigint
}

/**
 * Format V2 Shield CommitmentPreImage
 * @param commitment - Input commitment from event
 * @returns - Formatted CommitmentPreImageV2
 */
function formatShieldCommitment (commitment: Record<string, any>) : CommitmentPreImageV2 {
  return {
    npk: hexToBytes(commitment['npk']),
    token: {
      tokenType: parseInt(commitment['token']['tokenType']),
      tokenAddress: hexToBytes(commitment['token']['tokenAddress']),
      tokenSubID: parseInt(commitment['token']['tokenSubID'])
    },
    value: BigInt(commitment['value'])
  }
}

/**
 * Format V2 Shield Events
 * @param args - Decoded Shield Event args
 * @returns Formatted ShieldV2 Events
 */
function formatShieldEventV2 (args: Record<string, any>) : ShieldV2[] {
  const treeNumber = parseInt(args['treeNumber'])
  const startPosition = parseInt(args['startPosition'])
  const commitments = args['commitments']
  const shieldCiphertexts = args['shieldCiphertext']

  const results : ShieldV2[] = []
  for (let i = 0; i < commitments.length; ++i) {
    results.push({
      treeNumber,
      treePosition: startPosition + i,
      commitment: formatShieldCommitment(commitments[i]),
      shieldCiphertext: {
        shieldKey: hexToBytes(shieldCiphertexts[i]['shieldKey']),
        encryptedBundle: shieldCiphertexts[i]['encryptedBundle'].map((data: string) => hexToBytes(data))
      }
    })
  }
  return results
}

/**
 * Format V2 Transact Event
 * @param args - Decoded Transact Event args
 * @returns Formatted TransactV2 Events
 */
function formatTransactEventV2 (args: Record<string, any>) : TransactV2[] {
  const treeNumber = parseInt(args['treeNumber'])
  const startPosition = parseInt(args['startPosition'])
  const hashes = args['hash']
  const ciphertexts = args['ciphertext']

  const results: TransactV2[] = []
  for (let i = 0; i < ciphertexts.length; ++i) {
    const ciphertext = ciphertexts[i]
    results.push({
      treeNumber,
      treePosition: startPosition + i,
      hash: hexToBytes(hashes[i]),
      ciphertext: {
        ciphertext: ciphertext['ciphertext'].map((data: string) => hexToBytes(data)),
        blindedSenderViewingKey: hexToBytes(ciphertext['blindedSenderViewingKey']),
        blindedReceiverViewingKey: hexToBytes(ciphertext['blindedReceiverViewingKey']),
        annotationData: hexToBytes(ciphertext['annotationData']),
        memo: hexToBytes(ciphertext['memo'])
      }

    })
  }
  return results
}

/**
 * Format V2 Nullified Event
 * @param args - Decoded Nullfied Event args
 * @returns - Formatted NullifiedV2 Events
 */
function formatNullifiedEventV2 (args: Record<string, any>) : NullifiedV2[] {
  const treeNumber = parseInt(args['treeNumber'])
  const nullifiers = args['nullifier']

  const results : NullifiedV2[] = []
  for (let i = 0; i < nullifiers.length; ++i) {
    results.push({
      treeNumber,
      nullifier: hexToBytes(nullifiers[i])

    })
  }
  return results
}

/**
 * Format V2 Unshield Event
 * @param args - Decoded Unshield Event args
 * @returns Formatted UnshieldV2 Event
 */
function formatUnshieldEventV2 (args: Record<string, any>) : UnshieldV2 {
  return {
    to: hexToBytes(args['to']),
    amount: BigInt(args['amount']),
    token: {
      tokenType: parseInt(args['token']['tokenType']),
      tokenAddress: hexToBytes(args['token']['tokenAddress']),
      tokenSubID: parseInt(args['token']['tokenSubID'])
    },
    fee: BigInt(args['fee'])
  }
}

export type { ShieldV2, NullifiedV2, TransactV2, UnshieldV2 }
export { formatShieldEventV2, formatTransactEventV2, formatNullifiedEventV2, formatUnshieldEventV2, formatShieldCommitment }
