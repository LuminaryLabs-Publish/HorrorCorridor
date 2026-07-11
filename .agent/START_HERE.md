# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-10-28-04-00`

## Current safe ledge

```txt
HorrorCorridor Run Exit Commit + Session Epoch Message Admission Fixture Gate
```

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared with the central ledger and root `.agent` state. All nine eligible non-Cavalry repositories are tracked and have root audit state. `HorrorCorridor` was prioritized because its repo-local `2026-07-11T01-01-32-04-00` run-exit audit was newer than the central ledger entry at `2026-07-10T23-30-13-04-00`; it was also the oldest eligible central-ledger entry. `TheCavalryOfRome` remained excluded.

```txt
AetherVale
HorrorCorridor        selected / central catch-up required
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
TheCavalryOfRome      excluded by rule
```

Only `LuminaryLabs-Publish/HorrorCorridor` was changed in the product organization.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-11T01-10-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T01-10-28-04-00.md
.agent/architecture-audit/2026-07-11T01-10-28-04-00-run-exit-session-epoch-admission-dsk-map.md
.agent/render-audit/2026-07-11T01-10-28-04-00-post-exit-frame-transport-admission-gap.md
.agent/gameplay-audit/2026-07-11T01-10-28-04-00-return-late-sync-reentry-loop.md
.agent/interaction-audit/2026-07-11T01-10-28-04-00-exit-command-message-admission-map.md
.agent/session-authority-audit/2026-07-11T01-10-28-04-00-run-identity-exit-quarantine-contract.md
.agent/deploy-audit/2026-07-11T01-10-28-04-00-session-epoch-message-fixture-gate.md
```

## Current interaction loop

```txt
solo, host, or client enters PLAYING
  -> GameCanvas owns local simulation, input, networking adapters, rendering, minimap, and debug
  -> pause-return or completion-restart calls GameShell.returnToLobby()
  -> local UI and readiness move to lobby state
  -> GameCanvas unmount cleanup stops local RAF, listeners, world, composer, renderer, and canvas ownership
  -> RoomState and authoritativeSnapshot remain active or ending
  -> PeerJS/BroadcastChannel transport remains connected
  -> GameShell transport callback remains subscribed
  -> START_GAME, SYNC, and LOBBY_EVENT have no run-session epoch admission
  -> late SYNC can project the local client back to PLAYING, PAUSED, or COMPLETED
  -> a later bootstrap has no monotonic epoch fence against old traffic
```

## Main finding

The route has component cleanup but no authoritative run-exit transaction. `returnToLobby()` changes presentation and readiness without committing room phase, snapshot policy, run identity, transport generation, or a typed terminal result. Protocol envelopes contain `roomId` and optional `requestId`, but no `runSessionId` or `sessionEpoch`, while shell-level handlers continue accepting old `START_GAME`, `SYNC`, and `LOBBY_EVENT` messages after local teardown.

The highest-risk interval is therefore after local cleanup and before a fresh run: stale callbacks remain admissible and can overwrite the first lobby or re-entry frame.

## Ordered safe ledges

```txt
1. Lobby Readiness Authority + Start Admission Fixture Gate
2. Run Exit Commit + Session Epoch Message Admission Fixture Gate
3. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, networking behavior, and deployment configuration were not changed. No branch or pull request was created. Repo-local and central documentation were pushed directly to `main`.