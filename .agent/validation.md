# HorrorCorridor Validation

**Updated:** `2026-07-11T16-21-09-04-00`

## Scope

Documentation-only audit of host connection-close handling, session roster mutation, live GameState membership, held-cube ownership, ooze player inputs, snapshot publication and visible projection.

## Plan ledger

**Goal:** distinguish checked-in behavior from unimplemented disconnect guarantees and define the executable fixture gate.

- [x] Compare full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` after avoiding an active concurrent repository update.
- [x] Read host transport, shell, session store, game canvas, network rules and snapshot construction.
- [x] Identify interaction loop, domains, kits and services.
- [x] Trace player and cube state after connection close.
- [x] Define disconnect/reconnect fixtures.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
createHost:
  emits peer/connection-close with remotePeerId and connectionId

GameShell:
  finds matching lobby player
  removeLobbyPlayer(playerId)
  broadcasts player-left LOBBY_EVENT

sessionStore:
  removes lobbyPlayers row
  replaces session room.players

GameCanvas:
  keeps currentGameState in closure
  has no session roster subscription
  continues authoritative simulation and publication

buildReplicatedSnapshot:
  clones current GameState.room
  maps every GameState player
  maps cube ownerId
```

## Proven mismatch

```txt
session roster after close: player absent
live gameplay roster after close: player present
next SYNC: player present
```

If a held cube exists, it remains owned. If a future implementation deletes the player without recovering the cube, `syncHeldCubesToPlayers()` leaves the orphaned held cube unchanged.

## Existing proof

Current package checks do not prove:

```txt
active-run actor retirement
gameplay/session roster convergence
held-cube recovery
orphaned-owner rejection
ooze input retirement
disconnect result publication
reconnect actor claim
first post-disconnect visible frame
```

## Required pure fixtures

```txt
fixture:disconnect-classification
fixture:membership-revision
fixture:player-retirement-plan
fixture:owned-cube-recovery
fixture:reconnect-claim
fixture:disconnect-result
```

## Required host/browser fixtures

```txt
fixture:disconnect-active-player
fixture:disconnect-held-cube
fixture:disconnect-anomaly-participant
fixture:disconnect-ooze-input
fixture:disconnect-duplicate-close
fixture:disconnect-late-close
fixture:disconnect-cross-epoch-close
fixture:reconnect-correct-actor
fixture:reconnect-wrong-actor
fixture:disconnect-snapshot-frame
browser multi-peer disconnect smoke
Pages multi-peer disconnect smoke
```

## Commands not run

```txt
npm install
npm run build
npm run lint
ProtoKit smoke
harness
visual match
object review
live-player validation
browser smoke
Pages smoke
```

The connector provided source and write access, not a checked-out multi-peer browser runtime. No command execution is claimed.

## Change-state validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim active-run disconnect correctness until an executable fixture proves actor binding, atomic roster/player retirement, owned-cube recovery, ooze removal, snapshot convergence, reconnect policy and first-frame correlation.
