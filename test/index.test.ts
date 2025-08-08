import { test } from 'brittle'

import { formatCommitmentBatchEvent, formatGeneratedCommitmentBatchEvent, formatNullifiedEvent } from '../src/events-v1'

import { TEST_VECTOR_EXPECTED_NULLIFIED_V1, TEST_VECTOR_EXPECTED_SHIELD_V1, TEST_VECTOR_EXPECTED_TRANSACT_V1, TEST_VECTOR_NULLIFIED_V1, TEST_VECTOR_SHIELD_V1, TEST_VECTOR_TRANSACT_V1 } from './test-vectors'

test('Should properly format V1 Shield Events', (assert) => {
  const formatted = formatGeneratedCommitmentBatchEvent(TEST_VECTOR_SHIELD_V1)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_SHIELD_V1)
})

test('Should properly format V1 Transact Events', (assert) => {
  const formatted = formatCommitmentBatchEvent(TEST_VECTOR_TRANSACT_V1)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_TRANSACT_V1)
})

test('Format V1 Nullifiers Events', (assert) => {
  const formatted = formatNullifiedEvent(TEST_VECTOR_NULLIFIED_V1)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_NULLIFIED_V1)
})
