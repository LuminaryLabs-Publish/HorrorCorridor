# Client Join Input, Timeout, Acknowledgement and Cancellation Contract

**Timestamp:** `2026-07-13T03-31-44-04-00`

## Summary

The current client join surface has no shared code grammar, input bounds, attempt lifecycle, host acknowledgement or typed cancellation. This contract defines the missing authority without changing runtime behavior.

## Plan ledger

**Goal:** specify the complete join-attempt lifecycle and the invariants required before client lobby membership becomes canonical.

- [x] Audit raw join input and normalization.
- [x] Audit PeerJS and local bridge initiation.
- [x] Audit provisional store and UI mutation.
- [x] Define terminal results, rollback and late-event policy.
- [ ] Implement the contract and run adversarial fixtures.

## Input contract

```txt
join code
  -> trim
  -> canonical case
  -> exact shared grammar with generated host codes
  -> bounded length
  -> reject control characters and unsupported namespace syntax
  -> never substitute an unrelated random code for empty input

display name
  -> trim and normalize
  -> bounded code-point and byte length
  -> reject empty/control-only values
  -> define duplicate-name display policy separately from player identity
```

## Attempt lifecycle

```txt
Created
  -> Validating
  -> Connecting
  -> AwaitingHostPresence
  -> AwaitingAdmission
  -> Accepted | Rejected | TimedOut | Cancelled | Failed
```

Only one terminal transition is allowed for each `(JoinAttemptId, generation)`.

## Host acknowledgement contract

A valid `HostJoinAck` must bind:

```txt
join attempt ID and generation
client peer and player candidate identity
host peer and host player identity
canonical room ID and join code
room lifecycle generation
capacity and roster revision
accepted member identity or typed rejection
transport mode and connection generation
protocol version and authority revision
```

The client must not commit `room`, `lobbyPlayers`, accepted networking readiness or `LOBBY_CLIENT` membership projection before this acknowledgement is source-admitted.

## Timeout contract

```txt
transport-open deadline
host-presence deadline
room-admission deadline
```

Every deadline returns a typed terminal result and retires attempt-owned resources. A timeout must not leave a provisional room, roster, channel, DataConnection or visible joined-lobby claim.

## Cancellation contract

```txt
CancelClientJoinCommand
  -> validate active attempt generation
  -> stop accepting new attempt events
  -> close DataConnection or local bridge participant
  -> detach attempt callbacks
  -> publish cancellation receipt
  -> preserve predecessor canonical session or return to start state
  -> quarantine late events
```

Cancellation is idempotent. Repeated cancellation returns the existing terminal receipt.

## Retry contract

```txt
retry
  -> allocate successor generation
  -> preserve no writable alias to predecessor candidate state
  -> reject every predecessor callback, acknowledgement and protocol message
  -> allow successor commit only after its own accepted acknowledgement
```

## Result contract

```txt
Accepted
InvalidInput
RoomUnavailable
RoomFull
Rejected
TransportUnavailable
TimedOut
Cancelled
Stale
Duplicate
Failed
```

Each result carries the attempt ID, generation, bounded reason, transport provenance and commit-or-zero-mutation receipt.

## Proof matrix

```txt
valid generated code
lowercase code canonicalization
empty code rejection
oversized and control-character code rejection
oversized and control-character display-name rejection
no-host PeerJS timeout
no-host local-bridge timeout
host rejection
room-full rejection
cancel before transport open
cancel while awaiting acknowledgement
retry after timeout
late predecessor acknowledgement
PeerJS/local-bridge result parity
first accepted visible-lobby frame
```

## Withheld claim

No claim is made for validated join input, host acknowledgement, bounded timeout, exact cancellation, retry safety or transport parity.
