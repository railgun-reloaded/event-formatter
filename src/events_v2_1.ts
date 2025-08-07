import type { NullifiedV2, ShieldV2, TransactV2, UnshieldV2 } from './events-v2'

type ShieldV2_1 = ShieldV2 & {
  fees: bigint[]
}

type TransactV2_1 = TransactV2

type UnshieldV2_1 = UnshieldV2

type Nullified2_1 = NullifiedV2

export type { ShieldV2_1, TransactV2_1, UnshieldV2_1, Nullified2_1 }
