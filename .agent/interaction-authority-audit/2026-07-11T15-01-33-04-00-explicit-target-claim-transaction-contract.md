# Interaction Authority Audit: Explicit Target Claim Transaction Contract

**Timestamp:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** define the authoritative contract that accepts one observed cube or anomaly-slot intent, commits it exactly once or rejects it without target substitution.

- [x] Define command, target and revision identities.
- [x] Define actor, run, epoch, sequence and target admission.
- [x] Define atomic commit and rollback ownership.
- [x] Define typed results, publication and acknowledgement.
- [x] Define fixture acceptance criteria.

## Contract

### Command identity

Every mutating interaction must carry:

```txt
interactionCommandId
actorId
transportConnectionId
roomId
runSessionId
sessionEpoch
commandSequence
observedSnapshotRevision
action
explicit target claim
```

### Target claim

```txt
cube claim:
  cubeId
  cubeRevision
  ownershipRevision
  observed position or cell fingerprint

slot claim:
  slotId
  slotRevision
  observed occupiedCubeId
  anomalyRevision
```

### Admission

Reject before mutation when any of these fail:

```txt
connection-to-actor binding
room/run/epoch identity
active gameplay phase
command sequence or duplicate policy
observed snapshot policy
target existence and revision
distance and line-of-use policy
held ownership invariant
slot occupancy and ordering policy
terminal or retired-run fence
```

### Transaction

An accepted command commits one atomic state transition:

```txt
cube state
cube position
held owner
ownership revision
slot occupancy
slot revision
sequence progress
terminal candidate input
snapshot revision
```

A failed commit restores the complete prior transaction snapshot and emits a rejected result.

### Result

```txt
accepted
rejected
duplicate
stale
conflict
no-change
```

Every result includes a stable reason, command/target identity, observed revision and before/after revisions. A duplicate command returns the original result.

### Publication

Only accepted mutations publish a state-changing snapshot. Rejections may publish a targeted result message, but must not masquerade as a successful state revision.

### Client acknowledgement

The client must correlate:

```txt
InteractionResult
  -> authoritative snapshot revision
  -> world/minimap/HUD/debug consumer acknowledgements
  -> first visible frame receipt
```

## Contention policy

```txt
first admitted claim against the expected revision may commit
later claims against the prior revision reject as stale/conflict
no later claim receives a replacement cube or slot
result ordering is stable under duplicate and reordered delivery
```

## Local/remote parity

The solo and host-local path must execute the same command gateway and produce the same result envelope as a remote client. Direct calls to mutation helpers cannot remain a separate authority.

## Required evidence

```txt
command journal row
target observation fingerprint
admission result
transaction receipt or rejection
published snapshot revision
per-peer delivery result
client acknowledgement
first interaction-frame receipt
```

## Acceptance gate

The contract is not implemented until deterministic tests prove exact target preservation, contention, duplicate idempotency, reorder handling, rollback, result-snapshot correlation and first-frame acknowledgement.
