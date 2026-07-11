# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-08-43-04-00`

## Summary

`HorrorCorridor` is a cooperative first-person maze with solo, host and client modes, client-side prediction, host snapshot publication, cube interactions, an ordered anomaly objective, ooze pressure, Three.js rendering and PeerJS transport.

This documentation pass isolates a movement-authority defect: clients send both input and a completed pose, the host copies that pose directly into authoritative state, and an actively playing client never reconciles its local pose back to the host snapshot. The route therefore has neither host-owned movement validation nor active client correction.

## Plan ledger

**Goal:** preserve the current playable route while making remote movement identity, sequence admission, collision validation, authoritative pose results and active client reconciliation explicit and fixture-backed.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` as the oldest currently aligned eligible repository after the newer `TheOpenAbove` audit.
- [x] Re-read `GameCanvas`, network rules, protocol message construction, current audits and kit registry.
- [x] Identify the interaction loop, active domains, implemented kits and kit services.
- [x] Trace client pose prediction, `PLAYER_UPDATE`, host consumption, snapshot publication and client replay.
- [x] Record the missing sender/player binding, sequence admission, movement budget, collision authority and reconciliation path.
- [x] Add timestamped architecture, render, gameplay, interaction, movement-authority and deployment audits.
- [x] Change no runtime source and create no branch or pull request.
- [x] Push documentation directly to `main`.

## Selection result

The accessible Publish inventory contains ten repositories:

```txt
AetherVale
HorrorCorridor        selected / oldest current eligible root audit
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome      excluded by rule
TheOpenAbove          newer repo-local audit at 2026-07-11T03-01-38-04-00
TheUnmappedHouse
ZombieOrchard
```

All nine eligible repositories are centrally tracked and have root `.agent` state. `HorrorCorridor` was the oldest current eligible root audit at `2026-07-11T01-10-28-04-00` after accounting for the newer `TheOpenAbove` repo-local audit.

## Current interaction loop

```txt
client browser input
  -> local movement and maze collision prediction
  -> PLAYER_UPDATE contains input sequence plus completed pose
  -> host GameCanvas receives the message
  -> host copies payload.playerId pose directly into GameState
  -> host publishes a new authoritative snapshot
  -> client stores and renders the snapshot
  -> while PLAYING, client advances its own pose again
  -> client uses the snapshot for world rendering and carry state only
  -> authoritative local-player pose is applied only outside active client simulation
```

## Main finding

```txt
host authority: asserted by publication, not enforced during movement admission
client reconciliation: absent while PLAYING
```

The message includes an input sequence, but the host does not consume it. The host also does not bind `senderId` to `payload.playerId`, validate elapsed time, displacement, speed, velocity, collision, phase or run identity before mutation. `applyNetworkPlayerUpdate()` replaces the selected player's pose verbatim.

The active client branch never applies the host player pose to `poseRef`. Host correction is only copied during the non-simulating snapshot-replay branch. A malformed, stale or impossible client pose can therefore become authoritative, while a legitimate host correction cannot converge during normal play.

## Ordered safe ledges

```txt
1. HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
2. HorrorCorridor Run Exit Commit + Session Epoch Message Admission Fixture Gate
3. HorrorCorridor Snapshot Acceptance Authority + Projection Transaction Fixture Gate
4. HorrorCorridor Host Movement Admission + Client Reconciliation Fixture Gate
5. HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T03-08-43-04-00-host-movement-reconciliation-dsk-map.md
.agent/movement-authority-audit/2026-07-11T03-08-43-04-00-player-update-admission-correction-contract.md
```
