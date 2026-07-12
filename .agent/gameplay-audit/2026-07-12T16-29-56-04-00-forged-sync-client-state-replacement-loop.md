# Gameplay audit: forged SYNC client-state replacement loop

**Timestamp:** `2026-07-12T16-29-56-04-00`

## Summary

A client accepts any structurally valid `SYNC` message delivered through `peer/message`, then replaces its room, roster, authoritative snapshot, route and runtime readiness without proving that the source is the current host.

## Plan ledger

**Goal:** prevent non-host, wrong-room, stale-generation and duplicate host-class messages from changing gameplay state.

- [x] Trace transport source fields.
- [x] Trace protocol sender and room fields.
- [x] Trace client state mutations.
- [x] Define concrete failure paths.
- [x] Define zero-mutation rejection behavior.
- [ ] Implement authority admission and fixtures.

## Current loop

```txt
remote or local-bridge participant emits shape-valid SYNC
  -> serializer accepts envelope structure
  -> peer/message contains source evidence
  -> GameShell ignores source evidence
  -> room and lobbyPlayers are replaced
  -> authoritative snapshot is replaced
  -> gameState selects victory, paused or playing route
  -> readiness becomes simulation/rendering/networking/input true
```

## Concrete failure paths

```txt
non-host peer sends forged SYNC
  -> client adopts attacker-selected maze, actors, cubes, ooze and outcome

wrong-room host-class message arrives
  -> client leaves its current room without an admitted transition

predecessor connection emits late SYNC after reconnect
  -> no connection-generation fence
  -> successor session adopts stale predecessor state

same message is delivered twice
  -> no message ID or authority revision deduplication
  -> state transition can be applied repeatedly
```

## Required gameplay rule

Only the admitted current host source may author:

```txt
START_GAME
SYNC
LOBBY_EVENT
```

Clients may author request-class messages only for the actor bound to their admitted connection. Message payload identity never substitutes for transport-source proof.

## Required rejection result

```txt
RejectedHostMessage {
  status: Rejected | Stale | Duplicate
  reason: WrongPeer | WrongSender | WrongRoom | StaleSession | StaleConnection | StaleRevision | Duplicate
  mutationCount: 0
}
```

## Non-claims

No gameplay code changed. Forged-message rejection, state preservation, reconnect safety and duplicate suppression are not implemented or proven.