import { hexToBytes } from './bytes'
import type { NullifiedV2, ShieldV2, TransactV2, UnshieldV2 } from './events-v2'
import { formatNullifiedEventV2, formatShieldCommitment, formatTransactEventV2, formatUnshieldEventV2 } from './events-v2'

type ShieldV2_1 = ShieldV2 & {
  fees: bigint
}

type TransactV2_1 = TransactV2

type UnshieldV2_1 = UnshieldV2

type NullifiedV2_1 = NullifiedV2

/**
 * Format V2_1 Shield Events
 * @param args - Decoded Shield Event args
 * @returns Formatted ShieldV2_1 Events
 */
function formatShieldEventV2_1 (args: Record<string, any>) : ShieldV2_1[] {
  const treeNumber = parseInt(args['treeNumber'])
  const startPosition = parseInt(args['startPosition'])
  const commitments = args['commitments']
  const shieldCiphertexts = args['shieldCiphertext']
  const fees = args['fees']

  const results : ShieldV2_1[] = []
  for (let i = 0; i < commitments.length; ++i) {
    results.push({
      treeNumber,
      treePosition: startPosition + i,
      commitment: formatShieldCommitment(commitments[i]),
      shieldCiphertext: {
        shieldKey: hexToBytes(shieldCiphertexts[i]['shieldKey']),
        encryptedBundle: shieldCiphertexts[i]['encryptedBundle'].map((data: string) => hexToBytes(data))
      },
      fees: BigInt(fees[i])
    })
  }
  return results
}

/**
 * Format V2_1 Nullified Events
 * @param args - Decoded Nullified Event args
 * @returns Formatted NullifiedV2_1 Events
 */
function formatNullifiedEventV2_1 (args: Record<string, any>) : NullifiedV2_1[] {
  return formatNullifiedEventV2(args)
}

/**
 * Format V2_1 Transact Events
 * @param args - Decoded Transact Event args
 * @returns Formatted TransactV2_1 Events
 */
function formatTransactEventV2_1 (args: Record<string, any>) : TransactV2_1[] {
  return formatTransactEventV2(args)
}

/**
 * Format V2_1 Unshield Events
 * @param args - Decoded Unshield Event args
 * @returns Formatted UnshieldV2_1 Event
 */
function formatUnshieldEventV2_1 (args: Record<string, any>) : UnshieldV2_1 {
  return formatUnshieldEventV2(args)
}

export { formatShieldEventV2_1, formatNullifiedEventV2_1, formatTransactEventV2_1, formatUnshieldEventV2_1 }
export type { ShieldV2_1, TransactV2_1, UnshieldV2_1, NullifiedV2_1 }
