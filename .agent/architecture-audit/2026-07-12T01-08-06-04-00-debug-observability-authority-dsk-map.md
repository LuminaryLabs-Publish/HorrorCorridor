# HorrorCorridor Debug Observability Authority DSK Map

**Timestamp:** `2026-07-12T01-08-06-04-00`

## Goal

Define a composable domain that separates public-safe telemetry from privileged QA/developer diagnostics and binds every activation, capture, overlay, export and revocation to an explicit capability.

## Current composition

```txt
GameCanvas
  -> initializeRuntimeDebug
  -> query/localStorage admission
  -> attach public window API
  -> Backquote activation
  -> per-RAF frame capture
  -> event capture
  -> bounded Zustand retention
  -> FrameDebugPanel or window export
```

Current ownership is procedural and ambient. The logger controls enablement, persistence, capture, retention and export, but it has no product-level capability contract.

## Required parent domain

```txt
corridor-debug-observability-authority-domain
```

## Domain responsibilities

```txt
build-channel policy
actor and role admission
runtime/session capability leases
capability tier selection
field classification and redaction
frame/event capture projection
retention count, byte and age budgets
overlay admission
export admission and typed results
preference persistence policy
revocation and buffer clearing
bounded observations and journals
production/browser fixture gates
```

## Candidate DSK composition

### Policy and identity

```txt
debug-capability-policy-kit
  -> allowed channels and activation sources
  -> default and maximum tier
  -> forbidden public behavior

debug-build-channel-kit
  -> public-production
  -> qa-preview
  -> local-development

debug-capability-tier-kit
  -> player-safe
  -> qa
  -> developer

debug-session-lease-kit
  -> leaseId
  -> actorId and role
  -> runtimeGeneration and sessionEpoch
  -> issuedAt, expiresAt and revocation state
```

### Commands and admission

```txt
debug-activation-command-kit
  -> source: query, keyboard, preference, window-api, harness
  -> requested tier
  -> actor, role, runtime and session identities

debug-activation-admission-kit
  -> accepted
  -> rejected-policy
  -> rejected-role
  -> stale-runtime
  -> stale-session
  -> expired
  -> no-change

debug-role-capability-kit
  -> actor/role to maximum-tier mapping
```

### Data control

```txt
debug-data-classification-kit
  -> public operational
  -> internal operational
  -> session sensitive
  -> gameplay privileged

debug-redaction-profile-kit
  -> field allowlist
  -> field removal
  -> aggregation and quantization
  -> stable public-safe schema

debug-frame-projection-kit
  -> create tier-specific frame records

debug-event-projection-kit
  -> create tier-specific event records

debug-retention-budget-kit
  -> maximum records
  -> maximum serialized bytes
  -> maximum age
  -> truncation result
```

### Projection and export

```txt
debug-overlay-projection-kit
  -> render only fields allowed by active lease/profile

debug-export-command-kit
  -> leaseId
  -> requested frame/event range
  -> requested format

debug-export-result-kit
  -> accepted
  -> rejected
  -> redacted
  -> truncated
  -> empty
```

### Lifecycle

```txt
debug-preference-persistence-kit
  -> persist only policy-approved non-privileged preferences
  -> scope by build channel and capability tier

debug-revocation-kit
  -> stop
  -> restart
  -> session replacement
  -> role loss
  -> expiry
  -> policy replacement
  -> clear privileged buffers and flags

debug-observation-journal-kit
  -> bounded activation, export, revocation and failure records
```

### Fixture kits

```txt
production-debug-disable-fixture-kit
redaction-parity-fixture-kit
session-revocation-fixture-kit
browser-debug-capability-smoke-kit
```

## Command/result flow

```txt
DebugActivationCommand
  -> resolve build channel
  -> validate runtime generation and session epoch
  -> validate actor identity and role
  -> resolve maximum capability tier
  -> admit or reject requested tier
  -> issue revocable DebugSessionLease
  -> select classification/redaction profile
  -> publish DebugActivationResult

CaptureFrame / RecordEvent
  -> validate active lease
  -> project allowed fields
  -> enforce count/byte/age budgets
  -> publish observation result

DebugExportCommand
  -> validate lease and requested range
  -> apply the same redaction profile as capture/overlay
  -> return typed export result

RevokeDebugCapability
  -> invalidate lease
  -> clear privileged buffers and persisted elevation state
  -> hide privileged overlay
  -> publish revocation result
```

## Data classification baseline

```txt
player-safe:
  frame time, FPS/cadence aggregates, surface revision, coarse readiness

internal operational:
  resource counts, validation flags, non-identifying errors

session sensitive:
  room ID, player ID, raw event payloads, exact pose/input history

gameplay privileged:
  anomaly order, slot state, cube IDs, colors, owners and world positions
```

## Required invariants

```txt
public production cannot obtain a privileged lease through ambient browser actions
no capture/export survives runtime or session replacement
one classification profile governs capture, overlay and export
player-safe records contain no puzzle/session-sensitive fields
privileged preferences cannot silently elevate a later session
revocation clears privileged buffers before acknowledgement
every activation/export/revocation has a typed result and bounded journal record
```

## Dependency order

```txt
runtime session identity and generation
  -> render/frame correlation
  -> debug capability admission
  -> classified capture and projection
  -> export and revocation
  -> deployment/browser proof
```