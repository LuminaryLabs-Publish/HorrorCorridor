# HorrorCorridor Validation

**Updated:** `2026-07-11T19-38-14-04-00`

## Scope

Documentation-only audit of deterministic maze generation, authoritative ooze random draws, random-stream ownership, snapshot/checkpoint projection, replay/restore, host migration and rendered-frame correlation.

The preceding host cadence, snapshot-delivery, disconnect, movement, snapshot-acceptance, interaction, outcome and pause audits remain retained.

## Plan ledger

**Goal:** distinguish source-backed deterministic behavior from unimplemented random-stream, checkpoint, replay and migration proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `generateMaze.ts`, `createInitialGameState.ts`, `oozeRules.ts`, `GameCanvas.tsx`, `syncSnapshot.ts` and `shared.ts`.
- [x] Confirm maze generation uses a deterministic seeded stream.
- [x] Confirm authoritative ooze advancement omits an RNG and falls back to `Math.random()`.
- [x] Confirm the snapshot includes ooze outputs but no RNG checkpoint.
- [x] Confirm protocol/debug/frame surfaces do not carry stream identity or draw index.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run deterministic randomness fixtures.

## Source-backed checks

```txt
createSeededMazeRng(seed): present
maze topology consumes seeded RNG: yes
cube selection consumes seeded RNG: yes
target sequence consumes seeded RNG: yes

ooze RNG parameter: optional
ooze fallback: Math.random
host-injected deterministic ooze RNG: no
random stream ID in GameState: no
random checkpoint in ReplicatedGameSnapshot: no
random algorithm version in protocol: no
draw index in debug frame: no
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

These commands were not run because runtime source and package configuration were unchanged.

## Required fixture gate

```txt
same-seed same-step ooze spawn parity
same-seed same-step ooze decay parity
pause consumes zero draws
duplicate step consumes zero additional draws
failed transaction preserves checkpoint
checkpoint serialize/deserialize roundtrip
snapshot restore next-draw parity
host migration next-draw parity
algorithm-version mismatch rejection
draw-journal completeness
simulation/RNG/frame revision parity
multi-peer visible ooze convergence
```

## Change validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
deterministic ooze fixtures available: no
checkpoint roundtrip fixture available: no
host migration continuation fixture available: no
browser replay smoke run: no
```

No deterministic replay, restore, host migration or frame-provenance claim is made until the required fixtures pass.
