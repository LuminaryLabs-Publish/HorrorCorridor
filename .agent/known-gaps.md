# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-08-43-04-00`

## Selection state

```txt
complete accessible LuminaryLabs-Publish list compared with central ledger
all nine eligible non-Cavalry repositories tracked
root .agent state present for every eligible repository
TheOpenAbove had a newer repo-local audit than its prior central timestamp
HorrorCorridor selected as the oldest current eligible root audit
TheCavalryOfRome excluded
```

## Host movement admission gaps

```txt
PLAYER_UPDATE carries both input and a final client pose
host ignores input.sequence during movement mutation
host ignores moveForward, moveStrafe, lookYaw and interact for movement authority
host does not verify senderId owns payload.playerId
host does not validate room, run, phase or callback generation inside GameCanvas consumption
host does not reject stale, duplicate or regressing update sequences
host does not calculate elapsed-time movement budget
host does not validate maximum displacement, velocity or acceleration
host does not resolve the submitted path against maze collision
host does not re-simulate remote movement from admitted input
applyNetworkPlayerUpdate copies position, rotationY, pitch and velocity verbatim
malformed or impossible client pose can become the next authoritative snapshot
no PlayerUpdateAdmissionResult or AuthoritativePoseResult exists
```

## Client reconciliation gaps

```txt
active client simulation always advances poseRef locally
latest authoritative snapshot is used for world rendering and carry state
latest host player pose is not applied while the client remains PLAYING
host pose is copied only in the snapshot-replay branch when simulation is not advancing
no acknowledged client sequence is returned in snapshots
no prediction history or unacknowledged-input replay exists
no correction delta, threshold or correction reason exists
no snap-versus-smooth policy exists
no correction revision or reconciliation result exists
no proof that host corrections converge during active play
```

## Identity and ordering gaps

```txt
NetworkEnvelope lacks complete runSessionId/sessionEpoch identity
PLAYER_UPDATE requestId is optional and not used for movement idempotency
payload.playerId is trusted independently of senderId and connection identity
networkUpdateSequence starts locally at zero but has no host-side ledger
snapshot tick does not acknowledge the last accepted player-update sequence
transport reconnection has no movement-sequence reset contract
old callbacks can still cross the separately documented run-exit boundary
```

## Render and debug gaps

```txt
rendering can show a local predicted pose that differs from the host player row
runtime debug frame records local pose and snapshot local player separately
no computed correction delta or divergence classification is emitted
no frame identifies the accepted update sequence that produced the rendered host pose
no movement admission or reconciliation ledger is exposed through runtime debug
minimap uses localPosition for the local marker and snapshot rows for other players, hiding divergence
```

## Existing higher-order lifecycle gaps retained

```txt
lobby readiness/start admission is not host authoritative
run exit lacks atomic room/UI/runtime/snapshot/transport commit
no runSessionId or monotonic sessionEpoch exists
stale START_GAME, SYNC, LOBBY_EVENT, PLAYER_UPDATE and TRY_INTERACT admission is not fenced
pause remains local presentation state rather than a converged authority result
snapshot acceptance still needs source, tick, duplicate and projection preflight
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/player/domain/playerUpdateCommand.ts
HorrorCorridor-V1/src/features/player/domain/connectionPlayerIdentity.ts
HorrorCorridor-V1/src/features/player/domain/playerUpdateSequenceAdmission.ts
HorrorCorridor-V1/src/features/player/domain/hostMovementBudget.ts
HorrorCorridor-V1/src/features/player/domain/hostMovementSimulation.ts
HorrorCorridor-V1/src/features/player/domain/authoritativePoseResult.ts
HorrorCorridor-V1/src/features/player/domain/clientPredictionHistory.ts
HorrorCorridor-V1/src/features/player/domain/clientPoseReconciliation.ts
HorrorCorridor-V1/src/features/player/domain/correctionSmoothingPolicy.ts
HorrorCorridor-V1/src/features/debug/domain/movementAuthorityDebugProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-movement-authority-fixture.mjs
HorrorCorridor-V1/scripts/horror-corridor-client-reconciliation-fixture.mjs
```

## Missing validation commands

```txt
npm run fixture:movement-authority
npm run fixture:client-reconciliation
```

## Planned candidate kits

```txt
player-update-command-kit
connection-player-identity-kit
player-update-sequence-admission-kit
host-movement-budget-kit
host-maze-collision-authority-kit
host-movement-simulation-kit
authoritative-pose-result-kit
movement-admission-ledger-kit
client-prediction-history-kit
client-pose-reconciliation-kit
correction-smoothing-policy-kit
movement-debug-projection-kit
movement-authority-fixture-kit
client-reconciliation-fixture-kit
```

## Ordered boundaries

```txt
lobby start admission
  -> run identity and epoch
  -> snapshot/message acceptance
  -> host movement admission
  -> authoritative pose result and sequence acknowledgement
  -> active client reconciliation
  -> pause/input suspension convergence
```

## Deferred work

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
host migration
new maze content
scene-dressing expansion
visual object-kit expansion
network cadence retuning before correctness fixtures
movement feel retuning before authority fixtures
```
