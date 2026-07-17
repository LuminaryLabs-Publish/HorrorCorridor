# HorrorCorridor Debug Preference Storage DSK Map

**Timestamp:** `2026-07-17T03-58-09-04-00`

## Current composition

```txt
corridor application shell
  -> GameCanvas.initializeRuntime
     -> runtime-debug-frame-kit.initializeRuntimeDebug
        -> browser localStorage adapter
     -> renderer/world/input/network/runtime composition

runtime debug interaction
  -> Backquote or window debug API
  -> runtime-debug-frame-kit store action
  -> browser localStorage adapter
  -> overlay/capture/export state
```

## Existing domain ownership

| Domain/kit | Current services | Current boundary |
|---|---|---|
| `corridor-application-shell-kit` | Route and game runtime mounting | Assumes debug initialization returns normally |
| `runtime-debug-frame-kit` | Preference initialization, activation, capture, overlay and export | Directly performs host storage access |
| `runtime-store-snapshot-kit` | Gameplay readiness and state snapshots | Receives no debug-storage capability state |
| `package-validation-kit` | Lint, build and browser proof scripts | Has no storage-denial fixture |
| browser `localStorage` adapter | String read/write | No typed admission, failure or fallback contract |

## Source-backed ownership gap

```txt
preference policy
storage capability detection
storage exception classification
schema validation
in-memory fallback
bootstrap isolation
status projection
first playable frame proof
```

These concerns have no single DSK owner. The runtime debug store currently combines product preference policy, host persistence, in-memory state and runtime bootstrap side effects.

## Required parent domain

```txt
corridor-debug-preference-storage-fault-isolation-authority-domain
```

## Proposed child kits

```txt
debug-preference-storage-capability-kit
  -> probe and classify host storage

debug-preference-read-admission-kit
  -> read one schema/build-scoped preference snapshot

debug-preference-write-admission-kit
  -> persist one validated public-safe preference snapshot

debug-preference-schema-validation-kit
  -> normalize and reject malformed/elevated values

debug-preference-build-scope-policy-kit
  -> prevent persisted preference from granting capability

storage-exception-classification-kit
  -> denied, unavailable, quota, malformed, indeterminate

storage-denial-fallback-kit
  -> map failed host access to bounded fallback policy

in-memory-debug-preference-kit
  -> retain usable preferences without durable storage

stale-preference-result-rejection-kit
  -> reject results for retired runtime/schema/build generations

debug-bootstrap-fault-isolation-kit
  -> prevent preference failure from blocking renderer/world boot

debug-toggle-fault-isolation-kit
  -> settle keyboard and overlay toggles without uncaught host errors

debug-window-api-fault-isolation-kit
  -> settle public debug API calls through the same authority

debug-preference-result-kit
  -> immutable capability/read/write/settlement results

debug-readiness-projection-kit
  -> project available, memory-only, failed or disabled status

first-playable-frame-ack-kit
first-debug-preference-status-frame-ack-kit
storage-denial-browser-fixture-kit
source-build-pages-storage-parity-kit
```

## Command/result flow

```txt
DebugPreferenceCapabilityCommand
  -> DebugPreferenceCapabilityResult

DebugPreferenceReadCommand
  -> DebugPreferenceReadResult

DebugPreferenceWriteCommand
  -> DebugPreferenceWriteResult

DebugBootstrapSettlementCommand
  -> DebugBootstrapSettlementResult
  -> FirstPlayableFrameAck
  -> FirstDebugPreferenceStatusFrameAck
```

## Required invariants

```txt
host storage failure cannot block gameplay runtime boot
persisted values cannot elevate debug capability
one failed write does not discard the accepted in-memory preference
all host exceptions become bounded typed results
stale storage results cannot mutate a replacement runtime
source, production build and deployed route use the same fallback policy
```

## Scope boundary

This is a targeted authority addition. It does not restructure networking, gameplay, rendering, the debug data schema or the earlier debug capability/redaction authority.