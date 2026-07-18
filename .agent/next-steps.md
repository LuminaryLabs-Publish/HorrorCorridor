# HorrorCorridor Next Steps

**Updated:** `2026-07-17T20-41-29-04-00`

## Summary

The next implementation should separate PeerJS connection-candidate observation from actual open settlement and lobby membership.

## Plan ledger

**Goal:** add the smallest connection-open command/result layer without restructuring protocol, gameplay or rendering.

- [ ] Add `ConnectionGeneration` and `ConnectionCandidateId`.
- [ ] Classify real PeerJS and same-origin local-bridge transport modes.
- [ ] Keep real DataConnections pending until actual `open` evidence arrives.
- [ ] Remove the unconditional host `emitConnectionOpen()` call.
- [ ] Add open deadline, timeout and cancellation.
- [ ] Settle close/error-before-open explicitly.
- [ ] Reject stale events after transport or route replacement.
- [ ] Publish `ConnectionOpenAdmissionResult`.
- [ ] Publish `ConnectionOpenSettlementResult` as opened, closed-before-open, errored, timed-out, cancelled or stale.
- [ ] Commit lobby membership only from an opened settlement.
- [ ] Bind send readiness and roster membership to the same connection generation.
- [ ] Publish `LobbyMembershipCommitResult` and `PlayerJoinedPublicationResult`.
- [ ] Publish `FirstAcceptedPeerMessageAck`.
- [ ] Publish `FirstAcceptedGuestLobbyFrameAck`.
- [ ] Add delayed-open, close-before-open and error-before-open fixtures.
- [ ] Test duplicate open callbacks and transport replacement.
- [ ] Compare source, production build and deployed-origin behavior.

## Required implementation boundary

```txt
PeerJS/local bridge adapters
  -> raw candidate/open/close/error evidence

connection-open authority
  -> mode policy, generation, admission, timeout and settlement

session authority
  -> roster commit from accepted settlement only

lobby projection
  -> matching accepted membership revision and frame acknowledgement
```

## Completion checklist

- [ ] No real DataConnection enters the roster before actual open evidence.
- [ ] Local bridge readiness remains explicitly mode-owned.
- [ ] One generation settles exactly once.
- [ ] Close/error/timeout before open cannot create a player.
- [ ] Stale connection events cannot mutate a replacement session.
- [ ] First accepted message and guest frame cite the same generation.
- [ ] Source, build and deployed fixtures pass on `main`.

## Completion gate

Do not claim connection-open correctness or lobby membership correctness until the full fixture matrix passes on `main`.