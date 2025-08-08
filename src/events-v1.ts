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
 * Convert hex string without 0x prefix to Uint8Array
 * @param hex - Input hex string
 * @returns - Uint8Array representation of hex string
 */
function hexToBytes (hex: string) {
  if (hex.length % 2 !== 0) throw new Error('Hex String is not even padded')
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

/**
 * Strip 0x from the hex string if present
 * @param hex - Input hex string
 * @returns Stripped hex string
 */
function strip0x (hex: string) {
  if (hex.startsWith('0x')) { return hex.substring(2) }
  return hex
}

/**
 * Pad hex string to even length
 * @param hex - Input hex string
 * @returns Padded hex string
 */
function padEven (hex: string) {
  if (hex.length % 2 === 0) return hex
  return `0${hex}`
}

/**
 * Convert bigint number to bytes
 * @param n - Input bigint/string number
 * @returns - Uint8Array representation of bigint
 */
function bigIntToBytes (n: bigint) {
  // Convert bigint to hex and pad it to even
  const hex = padEven(n.toString(16))
  return hexToBytes(hex)
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
 * @param args - CommitmentBatch Event arguments
 * @returns Formatted CommitmentBatch
 */
function formatCommitmentBatchEvent (args: Record<string, any>) : CommitmentBatchV1[] {
  const ciphertexts = args['ciphertext']
  const startPosition = parseInt(args['startPosition'])
  const treeNumber = parseInt(args['treeNumber'])
  const hashes = args['hash']
  return ciphertexts.map((ct: Record<string, any>, index: number) => ({
    treeNumber,
    treePosition: startPosition + index,
    hash: bigIntToBytes(BigInt(hashes[index])),
    ciphertext: formatCiphertext(ct)
  }))
}

/**
 * Format commitment preimages from the input
 * @param preimage - Input CommitmentPreimage
 * @returns - Formatted CommitmentPreimage
 */
function formatCommitmentPreImage (preimage: Record<string, any>) {
  return {
    npk: bigIntToBytes(BigInt(preimage['npk'])),
    token: {
      tokenType: parseInt(preimage['token']['tokenType']),
      tokenAddress: hexToBytes(padEven(strip0x(preimage['token']['tokenAddress']))),
      tokenSubID: parseInt(preimage['token']['tokenSubID'])
    },
    value: BigInt(preimage['value'])
  }
}

/**
 * Format V1 Shield Events
 * @param args - GeneratedCommitmentBatch Event arguments
 * @returns Formatted GeneratedCommitmentBatch
 */
function formatGeneratedCommitmentBatchEvent (args: Record<string, any>) : GeneratedCommitmentBatchV1[] {
  const treeNumber = parseInt(args['treeNumber'])
  const startPosition = parseInt(args['startPosition'])
  const commitments = args['commitments']
  const encryptedRandoms = args['encryptedRandom']

  return commitments.map((commitment: Record<string, any>, index: number) => ({
    treeNumber,
    treePosition: startPosition + index,
    commitment: formatCommitmentPreImage(commitment),
    encryptedRandom: encryptedRandoms[index].map((random: string) => bigIntToBytes(BigInt(random)))
  }))
}

/**
 * Format V1 Nullifiers
 * @param args - Nullifiers Event argument
 * @returns Formatted Nullifiers
 */
function formatNullifiedEvent (args: Record<string, any>) : Nullifier[] {
  const treeNumber = parseInt(args['treeNumber'])
  const nullifiers = args['nullifier']
  return nullifiers.map((nullifier: string) => ({
    treeNumber,
    nullifier: bigIntToBytes(BigInt(nullifier))
  }))
}

export type { CommitmentBatchV1, GeneratedCommitmentBatchV1, TokenInfo, CommitmentPreImageV1, Nullifier }
export { formatCommitmentBatchEvent, formatGeneratedCommitmentBatchEvent, formatNullifiedEvent, hexToBytes, bigIntToBytes, TokenType }
