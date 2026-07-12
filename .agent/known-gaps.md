# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T02-49-19-04-00`

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
10. snapshot acceptance ordering and monotonic revision
11. explicit interaction targets and cube/slot claims
12. active-run disconnect, player retirement and reconnect claims
13. monotonic terminal outcome authority
14. host network cadence and fixed simulation authority
15. host movement admission and client reconciliation
16. snapshot delivery, payload budgeting and backpressure authority
17. authoritative randomness, checkpoint and replay authority
18. replicated pause/resume convergence
```

## Current active-presentation gap

```txt
implemented minimap renderer: present
active PLAYING minimap mount: absent
COMPLETED minimap mount: present
per-frame minimap lookup: present
lookup ownership: global DOM id
missing canvas handling: silent return
screen consumer policy: absent
HUD surface lease: absent
minimap surface lease: absent
consumer admission result: absent
projection result: absent
required-consumer acknowledgement: absent
committed presentation frame receipt: absent
```

## Concrete reachability path

```txt
screen = PLAYING
  -> HUDOverlay returns SettingsOverlay + FrameDebugPanel
  -> Minimap is not mounted
  -> GameCanvas queries runtime-minimap
  -> document lookup returns null
  -> drawMinimapFrame returns
  -> no result or warning is published

screen = COMPLETED
  -> HUDOverlay mounts Minimap
  -> GameCanvas continues snapshot-replay rendering
  -> minimap can finally draw
```

## Missing presentation authority

```txt
named PLAYING/PAUSED/COMPLETED consumer policy
presentation frame identity
immutable frame plan
consumer registry
HUD mount revision
HUD surface lease
minimap mount revision
minimap surface lease
accepted/skipped/unavailable/stale projection results
mandatory consumer barrier
first active minimap frame acknowledgement
screen-transition lease revocation
bounded presentation failure journal
```

## Consequences

```txt
players cannot use the implemented minimap during active navigation
completed state may be the first point at which the minimap exists
runtime readiness can remain true while a declared gameplay consumer is missing
missing required surfaces are indistinguishable from intentionally disabled surfaces
visual regressions can ship without failing current checks
world, HUD, minimap and debug have no shared committed-frame proof
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

The preceding render-surface, startup, readiness, randomness, snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit, pause and debug-observability findings remain open. This audit adds the active presentation reachability boundary and does not supersede them.
