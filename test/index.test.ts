import { test } from 'brittle'

import { formatCommitmentBatchEvent, formatGeneratedCommitmentBatchEvent, formatNullifiedEvent } from '../src/events-v1'
import { formatNullifiedEventV2, formatShieldEventV2, formatTransactEventV2, formatUnshieldEventV2 } from '../src/events-v2'
import { formatShieldEventV2_1 } from '../src/events_v2_1'

import {
  TEST_VECTOR_EXPECTED_NULLIFIED_V1,
  TEST_VECTOR_EXPECTED_NULLIFIED_V2,
  TEST_VECTOR_EXPECTED_SHIELD_V1,
  TEST_VECTOR_EXPECTED_SHILED_V2,
  TEST_VECTOR_EXPECTED_SHILED_V2_1,
  TEST_VECTOR_EXPECTED_TRANSACT_V1,
  TEST_VECTOR_EXPECTED_TRANSACT_V2,
  TEST_VECTOR_EXPECTED_UNSHIELD_V2,
  TEST_VECTOR_NULLIFIED_V1,
  TEST_VECTOR_NULLIFIED_V2,
  TEST_VECTOR_SHIELD_V1,
  TEST_VECTOR_SHIELD_V2,
  TEST_VECTOR_SHIELD_V2_1,
  TEST_VECTOR_TRANSACT_V1,
  TEST_VECTOR_TRANSACT_V2,
  TEST_VECTOR_UNSHIELD_V2,

} from './test-vectors'

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

test('Should properly fromat V2 Shield Events', (assert) => {
  const formatted = formatShieldEventV2(TEST_VECTOR_SHIELD_V2)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_SHILED_V2)
})

test('Should properly format V2 Transact Events', (assert) => {
  const formatted = formatTransactEventV2(TEST_VECTOR_TRANSACT_V2)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_TRANSACT_V2)
})

test('Should properly format V2 Nullified Events', (assert) => {
  const formatted = formatNullifiedEventV2(TEST_VECTOR_NULLIFIED_V2)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_NULLIFIED_V2)
})

test('Should properly format V2 Unshield Events', (assert) => {
  const formatted = formatUnshieldEventV2(TEST_VECTOR_UNSHIELD_V2)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_UNSHIELD_V2)
})

test('Should properly format V2_1 Shield Events', (assert) => {
  const formatted = formatShieldEventV2_1(TEST_VECTOR_SHIELD_V2_1)
  assert.alike(formatted, TEST_VECTOR_EXPECTED_SHILED_V2_1)
})
