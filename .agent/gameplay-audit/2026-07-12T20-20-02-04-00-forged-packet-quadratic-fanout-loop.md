# Forged Packet and Quadratic Fanout Gameplay Loop

**Timestamp:** `2026-07-12T20-20-02-04-00`

## Summary

A same-origin publisher can submit local bridge packets using claimed connection and actor fields. The host can admit the claim as a lobby player or forward its protocol message without requiring an owned connection lease. Separately, local host broadcast produces `N²` client events for `N` clients.

## Plan ledger

**Goal:** prevent unowned local packets and duplicated fanout from changing lobby, start, snapshot or gameplay state.

- [x] Trace connect claims into lobby membership.
- [x] Trace client-message claims into protocol consumers.
- [x] Trace disconnect claims into connection retirement.
- [x] Trace local broadcast amplification.
- [ ] Add capability, lease, sequence, deduplication and delivery authority.

## Forged connection path

```txt
same-origin publisher knows join code
  -> opens horrorridor:<joinCode>
  -> posts client-connect(remotePeerId = chosen actor, connectionId = chosen ID)
  -> host records open local connection
  -> GameShell creates connected lobby member with chosen actor ID
  -> roster and start bootstrap can consume the member
```

## Forged message path

```txt
publisher posts client-message
  -> host does not require localConnections.get(connectionId)
  -> remotePeerId and connectionId are copied into peer/message
  -> protocol consumers receive caller-selected message and identity claims
```

## Forged disconnect path

```txt
publisher posts client-disconnect(connectionId = existing ID)
  -> host checks only connectionId existence
  -> stored remotePeerId ownership is not compared with packet claim
  -> connection-close reaches roster removal
```

## Fanout amplification

```txt
N local clients
  -> N host posts for one logical broadcast
  -> N clients receive every post
  -> N² client peer/message events

2 clients -> 4 events
3 clients -> 9 events
4 clients -> 16 events
```

`START_GAME` followed by `SYNC` can therefore produce `2N²` local client message events for one start transaction, before counting lobby events or later sync cadence.

## Required gameplay admission

```txt
packet capability accepted
  -> connection lease resolved
  -> actor binding validated
  -> message kind and sequence admitted
  -> gameplay command derived once
  -> mutation committed once
  -> publication planned once
  -> each recipient applies once
  -> visible gameplay frame acknowledges the revision
```

## Invariants

- No packet without an accepted session capability can create a player.
- No message without a matching live connection lease reaches gameplay dispatch.
- No disconnect from a non-owner retires a connection or player.
- One start transaction causes one START_GAME and one initial SYNC application per client.
- Duplicate or stale local packets cause no gameplay tick, roster revision or snapshot replacement.

## Proof boundary

No adversarial same-origin or multi-client browser fixture exists. The current documentation records the failure paths but does not claim runtime protection.