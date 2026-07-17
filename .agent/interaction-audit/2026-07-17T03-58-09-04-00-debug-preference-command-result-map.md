# HorrorCorridor Debug Preference Command/Result Map

**Timestamp:** `2026-07-17T03-58-09-04-00`

## Current command sources

```txt
runtime bootstrap
Backquote keyboard command
window.__HORROR_CORRIDOR_DEBUG__.enable/disable
window.__HORROR_CORRIDOR_DEBUG__.showOverlay/hideOverlay
query parameters
persisted browser preference
```

These are command sources, not storage or capability authorities.

## Current direct path

```txt
source
  -> Zustand debug action
  -> direct localStorage read/write
  -> in-memory state patch
```

No immutable command identity, storage capability result, write receipt or stale-result rejection exists.

## Required commands

### `DebugPreferenceCapabilityCommand`

```txt
commandId
runtimeGeneration
buildChannel
storageOrigin
requestedOperations
```

### `DebugPreferenceReadCommand`

```txt
commandId
runtimeGeneration
buildChannel
schemaVersion
allowedKeys
defaultPreference
```

### `DebugPreferenceWriteCommand`

```txt
commandId
idempotencyKey
runtimeGeneration
buildChannel
schemaVersion
preferenceRevision
validatedPreference
payloadBudgetBytes
```

### `DebugBootstrapSettlementCommand`

```txt
commandId
runtimeGeneration
capabilityResultRevision
readResultRevision
rendererAdmissionRevision
```

## Required results

```txt
DebugPreferenceCapabilityResult
  status: available | denied | unavailable | quota | indeterminate
  readAllowed
  writeAllowed
  reasonCode

DebugPreferenceReadResult
  status: persisted | defaulted | memory-only | rejected | failed
  preference
  source
  schemaVersion
  reasonCode

DebugPreferenceWriteResult
  status: persisted | memory-only | unavailable | failed
  preferenceRevision
  durableRevision
  reasonCode

DebugBootstrapSettlementResult
  runtimeBootAllowed
  preferenceRevision
  storageStatus
  fallbackApplied

FirstPlayableFrameAck
FirstDebugPreferenceStatusFrameAck
```

## Admission rules

```txt
query, keyboard, stored preference and window API cannot elevate capability
malformed values are rejected without blocking boot
only current runtime/build/schema generations may settle
host exceptions are classified and contained
failed persistence retains accepted in-memory state
```

## Retirement rules

```txt
runtime replacement retires pending storage results
schema replacement retires legacy preference results
build-channel downgrade cannot inherit elevated persisted state
window API calls after retirement return bounded failure
```

## Claim boundary

No command/result runtime implementation exists yet.