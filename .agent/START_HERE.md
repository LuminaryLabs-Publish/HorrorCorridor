# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T18-31-21-04-00`

## Current safe ledge

```txt
HorrorCorridor Authoritative Snapshot Acceptance + Monotonic Replay Fixture Gate
```

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared against the central repo ledger and root `.agent` state. All nine eligible non-Cavalry repositories were tracked and documented. `HorrorCorridor` was the oldest eligible fallback. `TheCavalryOfRome` remained excluded.

```txt
HorrorCorridor       selected / prior 2026-07-10T17-00-54-04-00
PhantomCommand       tracked  / 2026-07-10T17-08-36-04-00
ZombieOrchard        tracked  / 2026-07-10T17-18-47-04-00
TheUnmappedHouse     tracked  / 2026-07-10T17-29-23-04-00
MyCozyIsland         tracked  / 2026-07-10T17-38-35-04-00
TheOpenAbove         tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush      tracked  / 2026-07-10T18-01-03-04-00
AetherVale           tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow        tracked  / 2026-07-10T18-22-01-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T18-31-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T18-31-21-04-00.md
.agent/architecture-audit/2026-07-10T18-31-21-04-00-snapshot-acceptance-authority-dsk-map.md
.agent/render-audit/2026-07-10T18-31-21-04-00-stale-snapshot-render-ui-rewind-gap.md
.agent/gameplay-audit/2026-07-10T18-31-21-04-00-snapshot-rewind-victory-regression-loop.md
.agent/interaction-audit/2026-07-10T18-31-21-04-00-request-ack-snapshot-acceptance-map.md
.agent/network-authority-audit/2026-07-10T18-31-21-04-00-authority-source-monotonic-tick-contract.md
.agent/protocol-audit/2026-07-10T18-31-21-04-00-full-sync-preflight-capability-map.md
.agent/deploy-audit/2026-07-10T18-31-21-04-00-stale-out-of-order-snapshot-fixture-gate.md
```

## Current interaction loop

```txt
menu and session selection
  -> solo, host, or join
  -> deterministic maze bootstrap
  -> GameCanvas movement, interaction, host authority, and publication
  -> host creates SYNC with authoritativeTick and snapshot.tick
  -> GameShell accepts every inbound SYNC
  -> runtimeStore unconditionally replaces authoritativeSnapshot
  -> room, HUD, world, minimap, completion, and diagnostics project the replacement
```

## Main finding

The producer exposes enough metadata to reject invalid or stale snapshots, but the consumer does not use it.

```txt
SYNC carries version, senderId, roomId, timestampMs, requestId, authoritativeTick, and snapshot.tick.
GameShell does not validate version, sender authority, room, gameId, seed, or tick consistency.
GameShell does not reject duplicate, stale, or out-of-order snapshots.
runtimeStore.setAuthoritativeSnapshot replaces state unconditionally.
UI state is mutated from every accepted snapshot, including transitions back from victory to playing.
GameCanvas uses the latest stored snapshot as interaction reference state.
```

A delayed or replayed `SYNC` can therefore rewind cubes, ooze, player positions, anomaly progress, and completion state. Request identity and acknowledgement work should be composed with a strict snapshot acceptance boundary rather than layered on top of unconditional replacement.

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, networking behavior, and deployment configuration did not change. No branch or pull request was created.