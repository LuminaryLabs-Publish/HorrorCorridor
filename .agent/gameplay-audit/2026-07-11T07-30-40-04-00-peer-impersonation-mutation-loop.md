# Peer Impersonation Mutation Loop

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** document how an unbound inbound identity can mutate another gameplay player and become authoritative state.

- [x] Trace PLAYER_UPDATE from connection event to player mutation.
- [x] Trace TRY_INTERACT from connection event to cube/anomaly mutation.
- [x] Confirm the host publishes accepted mutations.
- [ ] Add actor-bound preflight and terminal results.

## PLAYER_UPDATE path

```txt
peer A sends PLAYER_UPDATE
  -> event.remotePeerId = A
  -> message.senderId may claim B
  -> payload.playerId may claim C
  -> host ignores A and B
  -> applyNetworkPlayerUpdate(state, playerId=C, supplied pose)
  -> player C position, rotation, pitch and velocity are replaced
  -> held cubes follow player C
  -> host publishes SYNC
```

## TRY_INTERACT path

```txt
peer A sends TRY_INTERACT
  -> payload.playerId may claim C
  -> host does not resolve A to C
  -> pickup/drop/place/remove executes as C
  -> held-cube and anomaly state can change
  -> host publishes SYNC
```

## Consequences

```txt
host or another client can be repositioned
held cubes can move with the wrong actor
cube ownership can be changed by an unbound peer
anomaly progress can be changed under another identity
authoritative snapshots certify the result
all render surfaces display the result
```

## Required gameplay policy

- Resolve the transport connection to one canonical player before rule invocation.
- Reject unknown, disconnected, reserved-slot or mismatched actors.
- Validate sequence and request identity before mutation.
- Return typed accepted, rejected, duplicate, stale and no-change outcomes.
- Publish only when an accepted command changes canonical state.