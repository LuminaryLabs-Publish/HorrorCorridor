# Gameplay Audit: Client Intent to Host Target Substitution Loop

**Timestamp:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** preserve responsive multiplayer interaction while preventing host execution from changing the object or slot the player intended to affect.

- [x] Trace action selection from local pose and snapshot.
- [x] Trace target omission in the network request.
- [x] Trace host-side nearest/first/last target resolution.
- [x] Model contention, delay, duplicate and reorder outcomes.
- [x] Define gameplay guarantees and proof cases.

## Current gameplay loop

```txt
player observes cube or anomaly state
  -> presses interact
  -> client derives only an action name
  -> host receives action later
  -> host chooses a target from current state
  -> mutation commits or silently no-ops
  -> full snapshot eventually updates the client
```

## Substitution scenarios

### Pickup

```txt
client A and client B both observe cube-red as nearest
A arrives first and picks cube-red
B arrives without cubeId
host chooses cube-blue as B's new nearest eligible cube
B receives a different gameplay result than intended
```

### Place

```txt
A and B both observe slot-0 as first empty
A fills slot-0
B arrives without slotId
host fills slot-1
ordered anomaly state changes differently than B intended
```

### Remove

```txt
A and B both observe slot-2 as last occupied
A removes slot-2
B arrives without slotId
host removes slot-1
B unintentionally rewinds additional progress
```

## Gameplay consequences

```txt
player intent is not preserved
contention is hidden rather than reported
ordered puzzle progress can change unexpectedly
success and rejection are inferred from delayed snapshots
retry can cause another mutation
local and remote no-op behavior differ
terminal evaluation can consume an unintended interaction
```

## Required gameplay contract

```txt
input captures explicit target observation
command preserves that target through transport
host either commits that exact target or rejects
contention returns a typed conflict
retry is idempotent
accepted mutation publishes one correlated snapshot
player receives one result and one visible acknowledgement
```

## Required result reasons

```txt
accepted
not-playing
actor-not-admitted
stale-run-or-epoch
stale-snapshot
target-missing
target-revision-mismatch
out-of-range
already-held
ownership-conflict
slot-occupied
slot-order-conflict
duplicate
no-change
```

## Fixture cases

```txt
single-player pickup/drop/place/remove parity
host-local and remote-client result parity
two-client pickup contention
two-client place contention
two-client remove contention
duplicate retry after accepted mutation
reordered stale command after newer snapshot
terminal evaluation from only accepted interaction results
```

## Validation boundary

This audit changes documentation only. It does not claim multiplayer interaction correctness until deterministic fixtures and a browser multi-peer smoke prove the contract.
