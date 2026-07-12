# HorrorCorridor Validation

**Updated:** `2026-07-12T02-49-19-04-00`

## Scope

Documentation-only audit of active gameplay HUD composition, minimap mount reachability, per-frame canvas lookup, presentation consumer admission, surface leases, projection results and visible-frame correlation.

The preceding render-surface, startup, readiness, randomness, snapshot-delivery, cadence, disconnect, movement, snapshot-acceptance, interaction, outcome, lobby, exit, pause and debug-observability audits remain retained.

## Plan ledger

**Goal:** distinguish an implemented minimap renderer from a reachable active gameplay consumer with explicit screen policy, surface ownership, projection results and browser proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `GameShell.tsx`, `GameCanvas.tsx`, `HUDOverlay.tsx` and `Minimap.tsx`.
- [x] Confirm `PLAYING` omits the minimap mount.
- [x] Confirm `COMPLETED` includes the minimap mount.
- [x] Confirm `GameCanvas` attempts the draw each RAF.
- [x] Confirm missing canvas returns without a result.
- [x] Reconcile all 29 implemented kits and services.
- [x] Define surface lease, consumer result and committed-frame fixture gates.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run active HUD/minimap fixtures.

## Source-backed checks

```txt
HUDOverlay PLAYING branch exists: yes
PLAYING branch mounts SettingsOverlay: yes
PLAYING branch mounts FrameDebugPanel: yes
PLAYING branch mounts Minimap: no
COMPLETED branch mounts Minimap: yes
GameCanvas performs minimap lookup every RAF: yes
lookup mechanism: document.getElementById
missing canvas returns silently: yes
minimap renderer draws maze/ooze/cubes/players/heading: yes
screen consumer policy: absent
HUD/minimap surface lease: absent
consumer admission/result schema: absent
mandatory consumer barrier: absent
active minimap frame receipt: absent
```

## Existing package commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These commands were not run because runtime source and package configuration were unchanged. The source inspection is sufficient to establish that `Minimap` is excluded from the `PLAYING` branch and that missing-canvas handling is a no-op. Executable proof remains required before claiming the defect repaired.

## Required fixture gate

```txt
PLAYING mounts the active HUD shell
PLAYING mounts Minimap when policy requires it
runtime-minimap exists before terminal completion
minimap surface lease cites runtime generation and screen revision
valid draw returns Accepted with one frameId
missing required lease returns Unavailable
stale lease returns Stale
optional hidden policy returns IntentionallySkipped
world, post-processing, HUD and minimap results cite one frameId
mandatory minimap failure blocks frame commit
movement/yaw changes minimap pixel fingerprint
pause/resume preserves or renews lease explicitly
COMPLETED transition does not create the first minimap lease
teardown revokes the lease and rejects stale draws
```

## Change validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
render behavior changed: no
HUD behavior changed: no
minimap behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
active-play HUD fixture available: no
minimap mount lifecycle fixture available: no
consumer parity fixture available: no
browser HUD/minimap smoke run: no
```

No active-HUD completeness, active minimap visibility, consumer admission or committed presentation-frame claim is made until the required fixtures pass.
