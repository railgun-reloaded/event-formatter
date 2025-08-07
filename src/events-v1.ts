type CommitmentCiphertextV1 = {
  ciphertext: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]
  ephemeralKeys: [Uint8Array, Uint8Array]
  memo: Uint8Array[]
}

// Transact V1
type CommitmentBatchV1 = {
  treeNumber: number
  startPosition: number
  hash: Uint8Array[]
  ciphertext: CommitmentCiphertextV1[]
}

enum TokenType {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2
}

type TokenInfo = {
  tokenType: TokenType
  tokenAddress: Uint8Array
  tokenSubID: Uint8Array
}

type CommitmentPreImageV1 = {
  npk: Uint8Array
  token: TokenInfo
  value: bigint
}

// Shield V1
type GeneratedCommitmentBatchV1 = {
  treeNumber: number
  startPosition: number
  commitments: CommitmentPreImageV1[]
  encryptedRandom: [Uint8Array, Uint8Array][]
}

// Nullifiers V1
type Nullifiers = {
  treeNumber: number;
  nullifiers: Uint8Array[]
}

export type { CommitmentBatchV1, GeneratedCommitmentBatchV1, TokenInfo, TokenType, CommitmentPreImageV1, Nullifiers }
