# HorrorCorridor Debug Capability / Redaction / Revocation Contract

**Timestamp:** `2026-07-12T01-08-06-04-00`

## Goal

Define the product contract that controls who may activate runtime diagnostics, which fields each tier may observe, how long access lasts and how privileged state is retired.

## Capability tiers

### Player-safe

```txt
available in public production
contains operational aggregates only
no exact gameplay solution or session identity
no raw event payloads
no retained exact pose/input history
```

### QA

```txt
available only in an admitted QA build/session
may include selected object and state diagnostics
requires actor/role admission and a session lease
uses a declared redaction profile
```

### Developer

```txt
available only in local development or explicitly private tooling
may include complete runtime state
requires the strongest actor/build/session admission
never persists elevation into a public build
```

## Data classification

```txt
PUBLIC_OPERATIONAL
  frame time and cadence aggregates
  coarse readiness
  render quality tier and surface revision
  non-identifying validation flags

INTERNAL_OPERATIONAL
  resource counts
  topology and pipeline diagnostics
  classified failures

SESSION_SENSITIVE
  room and player identifiers
  exact pose/input history
  raw event payloads

GAMEPLAY_PRIVILEGED
  anomaly order and slot state
  cube identities, owners and world coordinates
  hidden authoritative object state
```

## Admission contract

A capability lease may be issued only when all required identities converge:

```txt
build channel permits requested tier
actor identity is known
actor role permits requested tier
runtime generation is current
session epoch is current
activation source is permitted
requested tier does not exceed policy maximum
```

Ambient browser input must never imply privilege. Query, keyboard, stored preference and window API are command sources, not authorities.

## Lease contract

```txt
leaseId: unique and unguessable within the runtime
actorId: admitted actor
actorRole: admitted role
buildChannel: policy source
runtimeGeneration: exact runtime owner
sessionEpoch: exact gameplay session
capabilityTier: admitted maximum tier
redactionProfileId: immutable projection policy
issuedAtMs / expiresAtMs: bounded lifetime
status: active | expired | revoked
```

## Projection contract

Every capture surface uses the same lease and redaction profile:

```txt
frame ring buffer
event ring buffer
on-screen debug overlay
window extraction API
harness/export output
```

No surface may read the raw privileged store and apply its own ad hoc filtering.

## Retention contract

Count bounds alone are insufficient. The authority must enforce:

```txt
maximum frame count
maximum event count
maximum serialized byte count
maximum record age
maximum per-frame field count or schema size
explicit truncation/eviction result
```

Player-safe telemetry should retain aggregates, not cloned authoritative object arrays.

## Persistence contract

```txt
public-safe presentation preference may persist
privileged tier or lease may not persist
stored values must include schema and build-channel scope
invalid or elevated legacy values are rejected and cleared
session replacement cannot inherit a prior lease
```

## Export contract

```txt
all exports require DebugExportCommand
lease must be active and match runtime/session
requested range and format are validated
same redaction profile as capture/overlay is applied
count/byte budgets are enforced
result reports redaction and truncation
no raw store reference is returned
```

## Revocation contract

Revocation is mandatory on:

```txt
runtime stop
runtime replacement or restart
session replacement
actor role loss
disconnect when policy requires it
lease expiry
build/policy replacement
manual administrator/developer action
```

Revocation order:

```txt
mark lease revoked
  -> block new captures and exports
  -> hide privileged overlay
  -> clear privileged frame/event buffers
  -> clear persisted elevation values
  -> detach or downgrade public API
  -> publish DebugRevocationResult
```

## Result types

```txt
DebugActivationResult
DebugCaptureResult
DebugProjectionResult
DebugExportResult
DebugRevocationResult
```

All results must cite command/lease/runtime/session identities and a bounded reason code.

## Required invariants

```txt
PUBLIC_OPERATIONAL output contains no SESSION_SENSITIVE or GAMEPLAY_PRIVILEGED fields
one active lease cannot cross runtimeGeneration or sessionEpoch
no privileged state remains readable after revocation acknowledgement
query/localStorage/keyboard/window API cannot exceed build policy
capture, overlay and export apply one immutable profile per lease
all privileged exports are bounded and auditable
```

## Recovery behavior

```txt
malformed persisted preferences
  -> reject and clear

expired/stale lease
  -> reject capture/export
  -> revoke and clear privileged buffers

projection failure
  -> do not fall back to raw state
  -> return typed failure

policy downgrade
  -> revoke old lease
  -> clear privileged state
  -> optionally issue a new lower-tier lease
```

## Required proof

```txt
public production query/keyboard/storage/window paths cannot expose privileged state
player-safe schema excludes puzzle/session data
QA and developer leases are bounded and role-scoped
overlay/export parity uses the same redaction profile
stop/restart/session replacement revokes and clears
export byte/count budgets produce typed results
production bundle and deployed route preserve policy
```