import type { CommitmentPreImageV1, Nullifier, TokenInfo } from './events-v1'

type CommitmentPreImageV2 = CommitmentPreImageV1

type ShieldCiphertextV2 = {
  shieldKey: Uint8Array
  encryptedBundle: [Uint8Array, Uint8Array, Uint8Array]
}

type ShieldV2 = {
  treeNumber: number
  startPosition: number
  commitments: CommitmentPreImageV2
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
  startPosition: number
  hash: Uint8Array
  ciphertext: CommitmentCiphertextV2
}

type NullifiedV2 = Nullifier

type UnshieldV2 = {
  to: Uint8Array
  token: TokenInfo
  fee: bigint
}

export type { ShieldV2, NullifiedV2, TransactV2, UnshieldV2 }
