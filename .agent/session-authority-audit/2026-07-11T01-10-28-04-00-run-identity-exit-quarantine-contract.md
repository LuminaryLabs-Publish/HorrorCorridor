# Run Identity, Exit, and Quarantine Contract

**Timestamp:** `2026-07-11T01-10-28-04-00`

## Authority boundary

A run must be identified independently from the room and transport connection. Reusing a room or peer connection must not imply that messages from the previous run remain valid.

## Required identity

```txt
RunSessionIdentity {
  roomId
  gameId
  runSessionId
  sessionEpoch
  rosterRevision
  hostId
  sourceFingerprint
}
```

`sessionEpoch` is monotonic within a room lifecycle. `runSessionId` is unique per admitted bootstrap. Both must be carried by active gameplay, snapshot, lobby-transition, and lifecycle messages.

## Exit contract

```txt
request exit
  -> validate actor, role, phase, and expected identity
  -> reserve request id
  -> freeze gameplay and active-message admission
  -> publish terminal lifecycle row
  -> commit room/UI/runtime/snapshot state
  -> apply transport preserve/destroy policy
  -> complete local cleanup
  -> close callback generation
  -> return terminal result
```

## Quarantine contract

Every callback captures a lease containing transport instance, callback generation, roomId, runSessionId, and sessionEpoch. Before any mutation, the callback must prove that the lease and message identity match the current authority state.

Stable rejection reasons should include:

```txt
wrong-room
wrong-game
wrong-run-session
stale-epoch
closed-callback-generation
wrong-phase
unknown-sender
duplicate-request
post-exit-message
```

## Re-entry contract

```txt
lobby return preserves transport
  -> old generation remains closed
  -> start admission seals roster
  -> sessionEpoch increments once
  -> new runSessionId is created
  -> new callback generation opens
  -> initial snapshot and START_GAME share identity
  -> only matching messages can mutate
```

## Readback contract

```txt
current identity
current lifecycle phase
current callback generation
last exit command/result
last lifecycle publication
last teardown result
last message admission result
rejection counts by reason
archived snapshot identity
first lobby frame correlation
first re-entry frame correlation
```

All rows must be bounded, immutable, deterministic for fixture inputs, and JSON-safe.
