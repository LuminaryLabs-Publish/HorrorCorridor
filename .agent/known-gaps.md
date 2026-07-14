# HorrorCorridor Known Gaps

**Updated:** `2026-07-14T10-40-05-04-00`

## Summary

The highest current product gap is Settings ownership. The overlay can be visible while gameplay input, pointer lock, simulation or client prediction, interaction, networking, and rendering remain active; the surface contains no mutable preference model or accepted revision.

## Plan ledger

**Goal:** prioritize a safe Settings transaction while retaining every previous loading, session, transport, protocol, rendering, proof, lifecycle, and gameplay finding.

- [x] Preserve previous audits.
- [x] Add and route the settings/input gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. settings command and session identity
2. gameplay input suspension while settings owns focus
3. held-input clearing at settings entry
4. pointer-lock release and fresh reacquisition
5. visible settings entry during PLAYING
6. accessible focus trap, navigation, close, and restoration
7. typed supported preference schema
8. atomic consumer adoption and rollback
9. versioned persistence and reload admission
10. SettingsRevision-bound visible frame acknowledgement
11. passive network receive with player-originated send suspension
12. stale input and stale settings-event rejection
13. route-exit and runtime-cleanup settlement
14. source, production-build, and deployed-origin fixtures
15. live-agent proof provenance and retirement
16. truthful loading-progress and readiness settlement
17. sealed host-start roster and client convergence
18. WebGL context and GPU-resource recovery
19. cross-store session/runtime/UI atomic transition
20. protocol semantic and source admission
21. snapshot ordering, budgeting, and backpressure
22. interaction claim authority and terminal outcome convergence
```

## Current settings gap

```txt
static control map: yes
mutable preference model: no
visible PLAYING settings button: no
keyboard-only Q entry: yes
screen changes from PLAYING on open: no
held input cleared: no
pointer lock released: no
movement/look/interaction blocked: no
local prediction suspended: no
client send suspended: no
accepted SettingsRevision: no
persistence: no
rollback: no
matching visible frame receipt: no
```

## Failure paths

### Held movement survives entry

```txt
player holds W
  -> presses Q
  -> overlay opens
  -> input state still contains movement
  -> PLAYING simulation continues
```

### Pointer ownership remains active

```txt
pointer is locked
  -> Q opens Settings
  -> mouse movement can continue producing look deltas
  -> settings and camera compete for the same interaction session
```

### Client keeps publishing

```txt
client opens Settings
  -> screen remains PLAYING
  -> local prediction continues
  -> periodic player updates can still be sent
```

### Pause removes Settings projection

```txt
pointer lock is lost
  -> runtime forces PAUSED
  -> HUDOverlay returns null for PAUSED
  -> settings overlay disappears without a SettingsCloseResult
```

## Missing authority

```txt
SettingsSessionId
SettingsRevision
SettingsOpenCommand and Result
SettingsApplyCommand and Result
SettingsCloseCommand and Result
InputSuspensionResult
HeldInputRetirementResult
PointerLockTransferResult
PreferenceValidationResult
PreferencePersistenceResult
SettingsParticipantReceipts
FirstVisibleSettingsFrameAck
SettingsRollbackResult
SettingsCommandJournal
```

## Retained gaps

All previous proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, runtime lifecycle, clock, snapshot, input, movement, interaction, outcome, debug, and deployment findings remain open.

## Do not claim

Do not claim safe Settings behavior, suspended gameplay input, adopted preferences, persistence, accessibility, visible-frame convergence, or production parity until the authority and fixtures pass on `main`.