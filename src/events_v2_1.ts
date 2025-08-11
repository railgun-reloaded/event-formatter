import { hexToBytes, padEven, strip0x } from './events-v1'
import type { NullifiedV2, ShieldV2, TransactV2, UnshieldV2 } from './events-v2'
import { formatShieldCommitment } from './events-v2'

type ShieldV2_1 = ShieldV2 & {
  fees: bigint
}

type TransactV2_1 = TransactV2

type UnshieldV2_1 = UnshieldV2

type Nullified2_1 = NullifiedV2

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
        shieldKey: hexToBytes(padEven(strip0x(shieldCiphertexts[i]['shieldKey']))),
        encryptedBundle: shieldCiphertexts[i]['encryptedBundle'].map((data: string) => hexToBytes(padEven(strip0x(data))))
      },
      fees: BigInt(fees[i])
    })
  }
  return results
}

export { formatShieldEventV2_1 }
export type { ShieldV2_1, TransactV2_1, UnshieldV2_1, Nullified2_1 }
