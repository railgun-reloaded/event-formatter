import { bigIntToBytes, hexToBytes } from './bytes'

type CommitmentCiphertextV1 = {
  ciphertext: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]
  ephemeralKeys: [Uint8Array, Uint8Array]
  memo: Uint8Array[]
}

// Transact V1
type CommitmentBatchV1 = {
  treeNumber: number
  treePosition: number
  hash: Uint8Array
  ciphertext: CommitmentCiphertextV1
}

enum TokenType {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2
}

type TokenInfo = {
  tokenType: TokenType
  tokenAddress: Uint8Array
  tokenSubID: number
}

type CommitmentPreImageV1 = {
  npk: Uint8Array
  token: TokenInfo
  value: bigint
}

// Shield V1
type GeneratedCommitmentBatchV1 = {
  treeNumber: number
  treePosition: number
  commitment: CommitmentPreImageV1
  encryptedRandom: [Uint8Array, Uint8Array]
}

// Nullifiers V1
type Nullifier = {
  treeNumber: number;
  nullifier: Uint8Array
}

/**
 * Format Ciphertext from event to CommitmentCiphertextV1
 * @param input - CommitmentCiphertext from event
 * @returns - Formatted CommitmentCiphertext
 */
function formatCiphertext (input: Record<string, any>) : CommitmentCiphertextV1 {
  return {
    ciphertext: input['ciphertext'].map((ct: string) => bigIntToBytes(BigInt(ct))),
    ephemeralKeys: input['ephemeralKeys'].map((k: string) => bigIntToBytes(BigInt(k))),
    memo: input['memo'].map((m: string) => bigIntToBytes(BigInt(m)))
  }
}

/**
 * Format V1 Transact Events
 * @param args - Decoded CommitmentBatch Event arguments
 * @returns Formatted CommitmentBatch
 */
function formatCommitmentBatchEvent (args: Record<string, any>) : CommitmentBatchV1[] {
  const ciphertexts = args['ciphertext']
  const startPosition = parseInt(args['startPosition'])
  const treeNumber = parseInt(args['treeNumber'])
  const hashes = args['hash']

  const results :CommitmentBatchV1[] = []
  for (let i = 0; i < ciphertexts.length; ++i) {
    results.push({
      treeNumber,
      treePosition: startPosition + i,
      hash: bigIntToBytes(BigInt(hashes[i])),
      ciphertext: formatCiphertext(ciphertexts[i])
    })
  }
  return results
}

/**
 * Format commitment preimages from the input
 * @param preimage - Input CommitmentPreimage
 * @returns - Formatted CommitmentPreimage
 */
function formatCommitmentPreImage (preimage: Record<string, any>) : CommitmentPreImageV1 {
  return {
    npk: bigIntToBytes(BigInt(preimage['npk'])),
    token: {
      tokenType: parseInt(preimage['token']['tokenType']),
      tokenAddress: hexToBytes(preimage['token']['tokenAddress']),
      tokenSubID: parseInt(preimage['token']['tokenSubID'])
    },
    value: BigInt(preimage['value'])
  }
}

/**
 * Format V1 Shield Events
 * @param args - Decoded GeneratedCommitmentBatch Event arguments
 * @returns Formatted GeneratedCommitmentBatch
 */
function formatGeneratedCommitmentBatchEvent (args: Record<string, any>) : GeneratedCommitmentBatchV1[] {
  const treeNumber = parseInt(args['treeNumber'])
  const startPosition = parseInt(args['startPosition'])
  const commitments = args['commitments']
  const encryptedRandoms = args['encryptedRandom']

  const results : GeneratedCommitmentBatchV1[] = []
  for (let i = 0; i < commitments.length; ++i) {
    results.push({
      treeNumber,
      treePosition: startPosition + i,
      commitment: formatCommitmentPreImage(commitments[i]),
      encryptedRandom: encryptedRandoms[i].map((random: string) => bigIntToBytes(BigInt(random)))
    })
  }
  return results
}

/**
 * Format V1 Nullifiers Event
 * @param args - Decoded Nullifiers Event argument
 * @returns Formatted Nullifiers
 */
function formatNullifiedEvent (args: Record<string, any>) : Nullifier[] {
  const treeNumber = parseInt(args['treeNumber'])
  const nullifiers = args['nullifier']

  const results: Nullifier[] = []
  for (let i = 0; i < nullifiers.length; ++i) {
    results.push({
      treeNumber,
      nullifier: bigIntToBytes(BigInt(nullifiers[i]))
    })
  }
  return results
}

export type { CommitmentBatchV1, GeneratedCommitmentBatchV1, TokenInfo, CommitmentPreImageV1, Nullifier }
export { formatCommitmentBatchEvent, formatGeneratedCommitmentBatchEvent, formatNullifiedEvent, TokenType }
