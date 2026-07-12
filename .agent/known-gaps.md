# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T04-28-03-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime startup acquisition, rollback and clean retry
6. runtime readiness leases and generation fencing
7. render-surface resolution, revision and frame correlation
8. active gameplay presentation, HUD/minimap reachability and consumer acknowledgement
9. debug-observability capability, redaction and revocation
10. focus, visibility and held-control retirement
11. snapshot acceptance ordering and monotonic revision
12. explicit interaction targets and cube/slot claims
13. active-run disconnect, player retirement and reconnect claims
14. monotonic terminal outcome authority
15. host network cadence and fixed simulation authority
16. host movement admission and client reconciliation
17. snapshot delivery, payload budgeting and backpressure authority
18. authoritative randomness, checkpoint and replay authority
19. replicated pause/resume convergence
```

## Current focus-loss input gap

```txt
movement before pointer lock: supported
held-button state: persistent
normal release source: keyup
pointer-lock loss full reset: present
blur full reset when locked: indirect through pointerlockchange
blur full reset when unlocked: absent
visibility hidden retirement: absent
pagehide retirement: absent
route transition retirement result: absent
runtime cleanup neutral snapshot: absent
control lease/input revision: absent
client zero-input publication: absent
```

## Concrete reachability path

```txt
screen = PLAYING
pointerLocked = false
  -> player presses W
  -> forward becomes true
  -> browser loses focus
  -> onBlur sees pointerLocked = false
  -> no reset, pause or retirement occurs
  -> keyup occurs outside the page
  -> forward remains true
  -> host/solo movement continues to consume it
  -> client prediction and publication can consume it
  -> focus returns with stale control state
```

## Missing input authority

```txt
input focus state
control lease identity
input revision
retirement command identity
retirement reason policy
blur adapter for unlocked movement
visibilitychange adapter
pagehide adapter
atomic button and look neutralization
runtime-store neutral projection
client zero-input terminal update
retirement result
idempotent duplicate handling
stale runtime/run rejection
bounded input lifecycle journal
first post-loss neutral-frame acknowledgement
```

## Consequences

```txt
player movement can outlive physical key ownership
unfocused or hidden gameplay can retain a forward/strafe intent
local prediction can diverge before the host sees a corrective update
client movement can continue until another reset or key cycle occurs
runtime input diagnostics can retain stale flags after route teardown
pause and focus behavior depends on whether pointer lock happened to be active
browser input lifecycle regressions are not covered by current checks
```

## Retained active-presentation gap

```txt
implemented minimap renderer: present
active PLAYING minimap mount: absent
COMPLETED minimap mount: present
per-frame minimap lookup: present
lookup ownership: global DOM id
missing canvas handling: silent return
surface lease and consumer acknowledgement: absent
```

## Retained debug-observability gap

```txt
public query activation: present
persisted browser activation: present
Backquote activation: present
public window API activation/export: present
build-channel gate: absent
role/actor admission: absent
runtime/session lease: absent
data classification and redaction: absent
export authorization/result: absent
automatic revocation: absent
```

## Retained gaps

The preceding presentation, render-surface, startup, readiness, randomness, snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit, pause and debug-observability findings remain open. This audit adds the focus-loss input-retirement boundary and does not supersede them.