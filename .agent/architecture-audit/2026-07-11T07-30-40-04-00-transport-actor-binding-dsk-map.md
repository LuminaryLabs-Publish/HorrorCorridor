# Transport Actor Binding DSK Map

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** define the smallest composed domain that binds a live transport connection to one admitted lobby member and gameplay player before host mutation.

- [x] Locate transport provenance fields.
- [x] Locate protocol identity fields.
- [x] Locate host dispatch and mutation boundaries.
- [x] Identify missing admission, result and observation services.
- [ ] Implement the composed domain.
- [ ] Add deterministic fixtures.

## Current path

```txt
PeerJS/BroadcastChannel connection
  -> PeerTransportEvent(remotePeerId, connectionId, message)
  -> structural protocol decoder
  -> GameCanvas message-type switch
  -> payload.playerId
  -> gameplay mutation
  -> authoritative SYNC
```

## Missing boundary

```txt
horror-corridor-transport-actor-authority-domain
  -> transport-connection-identity-kit
  -> peer-player-binding-kit
  -> inbound-envelope-preflight-kit
  -> room-session-admission-kit
  -> actor-claim-resolution-kit
  -> sender-payload-consistency-kit
  -> connection-sequence-ledger-kit
  -> request-deduplication-kit
  -> message-admission-result-kit
  -> host-command-dispatch-kit
  -> rejected-message-observation-kit
  -> transport-identity-fixture-kit
```

## Required command input

```txt
connectionId
remotePeerId
roomId
runSessionId
sessionEpoch
messageType
protocolVersion
envelopeSenderId
payloadPlayerId
requestId
inputSequence
receivedAtMs
```

## Required result

```txt
status: accepted | rejected | duplicate | stale | no-change
reason
connectionId
remotePeerId
boundMemberId
boundPlayerId
requestId
inputSequence
stateChanged
publishedTick
```

## Invariants

- One live connection resolves to at most one admitted member and one gameplay player.
- `remotePeerId`, envelope `senderId` and payload `playerId` must resolve to the same canonical actor.
- Wrong room, wrong session, wrong epoch, stale sequence and duplicate request reject before mutation.
- Rejected messages never advance gameplay tick or publish a gameplay snapshot.
- Accepted commands produce one terminal result and at most one authoritative publication.
- Results and rejections remain bounded, detached and JSON-safe.

## Dependency order

Roster identity and peer binding must establish the canonical member record first. Transport actor binding then becomes the shared admission layer for readiness, start, movement, interaction, pause and exit commands.