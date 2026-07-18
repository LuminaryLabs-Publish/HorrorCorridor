# Peer DataConnection Open Contract

**Timestamp:** `2026-07-17T20-41-29-04-00`

## Source finding

In the real host transport branch, `emitConnectionOpen()` is guarded against duplicate publication but is invoked in three places:

1. the DataConnection `open` callback,
2. the already-open check,
3. an unconditional call after both.

The third call admits a pending connection. Because the guard flips immediately, the later actual `open` callback becomes a no-op.

## Mode distinction

```txt
real PeerJS
  -> must require DataConnection.open evidence

same-origin BroadcastChannel bridge
  -> may publish synchronous readiness only under its explicit local mode contract
```

## Required contract

- Allocate `ConnectionGeneration` when a candidate is observed.
- Keep candidate state as `pending` until mode-correct open evidence arrives.
- Settle each generation exactly once.
- Reject `close`, `error`, `timeout`, replacement and stale evidence after settlement.
- Admit roster membership only from `opened` settlement.
- Bind `send` readiness to the same generation.
- Record first accepted inbound message and first guest lobby frame.

## Fixture matrix

```txt
real connection delayed open
real connection closes before open
real connection errors before open
real connection opens once
real duplicate open callback
transport replaced while pending
local bridge synchronous ready
source build deployed-origin parity
```

## Claim boundary

No transport code was changed and no fixture was run.