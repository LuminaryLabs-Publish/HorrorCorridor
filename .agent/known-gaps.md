# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T16-38-10-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime readiness leases and generation fencing
6. snapshot acceptance ordering and monotonic revision
7. explicit interaction targets and cube/slot claims
8. active-run disconnect, player retirement and reconnect claims
9. monotonic terminal outcome authority
10. host network cadence and fixed simulation authority
11. host movement admission and client reconciliation
12. replicated pause/resume convergence
```

## Host network cadence gaps

```txt
client generates payload.input.sequence but host does not admit or compare it
no per-peer or per-player last-accepted input sequence
no duplicate, stale, gap or future-sequence result
no bounded per-player movement input queue
no deterministic input coalescing policy
no fixed authoritative simulation-step identity
remote PLAYER_UPDATE applies absolute pose immediately
remote PLAYER_UPDATE triggers immediate full-snapshot publication
snapshot tick increments per publication rather than one documented simulation policy
lastNetworkTickAtMs aliases client send, host publication and ooze timing
continuous remote updates can postpone ooze advancement
peer count can increase publication/tick rate and reduce quiet intervals
no bounded snapshot publication policy independent of arrivals
broadcast returns only a sent count and caller discards it
no per-peer delivery, failure or backpressure result
no pending-byte, slow-peer or publication queue limits
cadence diagnostics are aggregate rather than per peer and stage
no simulation-revision to snapshot to first-frame receipt
```

## Concrete starvation and amplification risks

```txt
starvation:
  remote update -> immediate publish -> shared timestamp reset -> ooze branch postponed

fanout:
  P clients * U updates/s -> approximately P * U full snapshots/s
  each snapshot sent to P peers -> approximately P * P * U peer sends/s

tick ambiguity:
  publication tick advances for packet-triggered partial state changes
  no fixed-step sequence proves which authoritative systems advanced
```

## Active-run disconnect gaps

```txt
connectionId is not bound to canonical gameplay actor identity
connection-close mutates only session/lobby state
GameCanvas currentGameState is not subscribed to roster removal
no active membership revision
no suspended/disconnected/retired gameplay-player state
no disconnect command or result
no grace-period or timeout policy
no explicit leave/kick distinction
no reconnect claim or token
no stale or duplicate close rejection
retired/disconnected player input queues do not exist to retire
```

## Owned-state recovery gaps

```txt
held cube ownership survives disconnect
no drop/return/reserve/transfer policy
syncHeldCubesToPlayers leaves cubes unchanged when owner is missing
no orphaned-owner invariant check
no cube recovery result
no interaction-claim release result
no anomaly-slot policy for disconnected ownership
```

## Simulation and publication gaps

```txt
disconnected players remain in GameState.players
disconnected positions remain ooze inputs
GameState.room.players can diverge from sessionStore.room.players
buildReplicatedSnapshot republishes ghost players
world and minimap can continue projecting ghosts
no disconnect-result-linked snapshot revision
no first post-disconnect frame acknowledgement

periodic systems do not share one explicit fixed-step sequence
input arrival and publication can alter system admission
no committed state revision before snapshot construction
no event-versus-cadence publication classification
no per-peer intended/sent/skipped/failed delivery set
```

## Reconnect gaps

```txt
new connection open is treated as lobby join/upsert
no suspended actor identity to reclaim
no previous connection lineage
no run/epoch/revision claim
no ownership restoration policy
no duplicate live connection policy
no reconnect success or rejection result
no reconnect input-sequence baseline policy
```

## Required network cadence fixtures

```txt
fixture:host-cadence-baseline
fixture:host-cadence-one-client
fixture:host-cadence-multi-client
fixture:host-cadence-burst-coalescing
fixture:host-cadence-duplicate-reorder
fixture:host-cadence-flood-budget
fixture:host-cadence-ooze-starvation
fixture:snapshot-publication-budget
fixture:partial-delivery-result
fixture:cadence-frame-correlation
fixture:browser-multi-peer-cadence-flood
```

## Retained disconnect fixtures

```txt
fixture:disconnect-actor-binding
fixture:disconnect-active-player-retirement
fixture:disconnect-held-cube-recovery
fixture:disconnect-no-orphan-owner
fixture:disconnect-ooze-input-removal
fixture:disconnect-snapshot-convergence
fixture:disconnect-duplicate-close
fixture:disconnect-late-close
fixture:disconnect-cross-epoch-close
fixture:disconnect-grace-timeout
fixture:reconnect-suspended-actor
fixture:reconnect-wrong-actor
fixture:reconnect-duplicate-live-connection
fixture:disconnect-first-frame
fixture:browser-active-disconnect
fixture:pages-active-disconnect
```

## Required guarantees

```txt
session and gameplay membership cannot diverge silently
one connection close affects only its bound actor and run epoch
all actor-owned mutable state has an explicit recovery result
no cube references a missing owner
retired actor is absent from input queues, simulation, interaction, snapshot and render inputs
reconnect cannot create a duplicate player or steal another actor

packet frequency cannot control fixed simulation frequency
packet frequency cannot suppress ooze or future periodic systems
one admitted input per player is selected at each fixed step
stale, duplicate and cross-epoch updates reject before queue insertion
input queues, simulation catch-up and publication work are bounded
one noisy or slow peer cannot multiply or block global work without limit
snapshot and rendered-frame evidence cite one committed simulation revision
```
