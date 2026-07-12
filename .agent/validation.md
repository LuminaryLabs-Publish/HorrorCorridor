# HorrorCorridor Validation

**Updated:** `2026-07-12T01-08-06-04-00`

## Scope

Documentation-only audit of runtime-debug activation, persistence, frame/event capture, overlay rendering, JavaScript export, data classification, redaction, capability leases and production deployment policy.

The preceding render-surface, startup, readiness, randomness, snapshot-delivery, cadence, disconnect, movement, snapshot-acceptance, interaction, outcome, lobby, exit and pause audits remain retained.

## Plan ledger

**Goal:** distinguish a working bounded logger from an authorized production diagnostics capability with explicit tiers, redaction, revocation and deployment proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `runtimeDebugStore.ts`, `FrameDebugPanel.tsx`, `HUDOverlay.tsx` and `GameCanvas.tsx`.
- [x] Confirm query, localStorage, keyboard and window-API activation paths.
- [x] Confirm frame/event retention limits.
- [x] Confirm privileged frame fields and visible anomaly/cube disclosure.
- [x] Confirm no build-channel, actor, role, lease, redaction or revocation authority exists.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run debug capability fixtures.

## Source-backed checks

```txt
query activation: present
query values: 1, true, frames, verbose
localStorage activation/persistence: present
Backquote activation: present
window API activation and extraction: present
FrameDebugPanel mounted in runtime HUD: present
frame retention bound: 180
event retention bound: 80
room/player identity in frames: present
cube IDs/colors/states/owners/positions in frames: present
anomaly sequence and slot state in frames: present
anomaly and cube state rendered in overlay: present
build-channel admission: absent
actor/role admission: absent
session/runtime capability lease: absent
field classification/redaction: absent
typed export result: absent
automatic revocation and privileged-buffer clearing: absent
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

These commands were not run because runtime source and package configuration were unchanged. The March logging audit already proves that query activation, overlay toggles, window extraction and bounded buffers work; this run audits the missing product-authorization boundary rather than re-proving logger functionality.

## Required fixture gate

```txt
public production starts with privileged debug disabled
public query parameters cannot activate privileged capture
Backquote cannot elevate capability in public production
public window API is absent or exposes only a player-safe redacted tier
localStorage from a QA/development session cannot elevate a later public session
QA/developer activation returns a typed result and revocable lease
lease binds actor, role, runtime generation and session epoch
role loss, stop, restart and session replacement revoke the lease
revocation clears privileged frame/event buffers and persisted flags
player-safe frames exclude anomaly order, cube coordinates, owner IDs and room/player identifiers
privileged overlay and exported state use the same classification profile
frame/event count and byte budgets are enforced
export returns explicit accepted, rejected, redacted and truncated results
production bundle/deployment check proves the declared policy
browser smoke proves public, QA and development capability parity
```

## Change validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
render behavior changed: no
debug behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
production-disable fixture available: no
redaction-parity fixture available: no
session-revocation fixture available: no
export-budget fixture available: no
browser debug capability smoke run: no
```

No production-safe diagnostics, capability isolation, redaction, revocation or authorized-export claim is made until the required fixtures pass.