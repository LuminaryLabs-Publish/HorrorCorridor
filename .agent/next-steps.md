# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T17-00-54-04-00`

## Goal

Create a stable request and acknowledgement path so every local or network command can be traced from intent through authority result, publish decision, acknowledgement, and optional snapshot tick without changing current gameplay behavior.

## Current next build slice

```txt
HorrorCorridor Request Identity Propagation + Authoritative Acknowledgement Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve current solo, host, client, rendering, minimap, HUD, completion, and cadence behavior.
[ ] Define RequestId, RequestSource, RequestStatus, AckStatus, and AckReason values.
[ ] Generate a stable request id for every local interaction.
[ ] Generate and pass requestId in every TRY_INTERACT message.
[ ] Decide whether PLAYER_UPDATE uses requestId, input.sequence, or a separate cadence correlation id.
[ ] Add a bounded pending-command ledger for client requests.
[ ] Carry inbound requestId into the authority command envelope.
[ ] Return an explicit command result for accepted, rejected, skipped, no-op, recovery, and duplicate requests.
[ ] Keep PublishDecision independent from acknowledgement.
[ ] Echo requestId on SYNC when a snapshot publication acknowledges the request.
[ ] Add a command-result acknowledgement path for deliberate no-publish decisions.
[ ] Define duplicate request behavior and prove idempotency.
[ ] Define acknowledgement timeout and expiry policy.
[ ] Record acknowledged tick only when a snapshot was published.
[ ] Record no-publish acknowledgement without manufacturing a snapshot tick.
[ ] Add request latency and pending-count diagnostics.
[ ] Add runtime-debug request/result/decision/ack projection.
[ ] Preserve version-1 message compatibility during additive rollout.
[ ] Add deterministic fixture seeds before changing GameCanvas consumers.
[ ] Prove accepted local and host interaction acknowledgement parity.
[ ] Prove rejected and no-op host commands acknowledge without forced snapshot publication.
[ ] Prove request-sync recovery acknowledgement.
[ ] Prove cadence publication has no command request id.
[ ] Prove duplicate request replay does not duplicate mutation.
[ ] Prove legacy final GameState and replicated snapshot parity.
[ ] Add package script fixture:request-ack.
[ ] Run existing validation only after the fixture passes.
```

## Suggested source order

```txt
1. requestIdentity.ts
2. commandAcknowledgement.ts
3. pendingCommandLedger.ts
4. commandTypes.ts and commandResults.ts
5. publishDecisions.ts
6. authorityCommandConsumer.ts
7. requestDeduplication.ts
8. requestAckFixtureSeeds.ts
9. requestAckFixtureRows.ts
10. horror-corridor-request-ack-fixture.mjs
11. package.json fixture:request-ack
12. runtimeDebugRequestProjection.ts
13. runtimeDebugStore.ts additive projection
14. GameCanvas.tsx request generation, pending registration, authority consumption, and ack handling
```

## Required fixture rows

```txt
local accepted pickup -> request/result/publish/ack/tick joined
host accepted pickup -> request/result/publish/ack/tick joined
client accepted pickup -> outbound request and inbound ack share requestId
rejected pickup -> explicit rejected ack with no forced snapshot
no nearby cube -> explicit rejected ack with no forced snapshot
accepted drop/place/remove parity
final place -> victory result and acknowledgement
request-sync -> recovery ack and optional recovery snapshot
cancel and toggle-ready -> explicit skipped ack
unknown action -> explicit unsupported ack
duplicate request -> one mutation and duplicate ack
expired request -> pending ledger timeout row
cadence SYNC -> no command requestId
runtime debug -> request, result, decision, ack, tick, and latency visible
legacy GameState parity
replicated snapshot parity
```

## Acceptance checks

```txt
[ ] npm run fixture:request-ack
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
[ ] browser solo smoke
[ ] browser host/client smoke
[ ] runtime debug export inspection
```

## Explicit non-goals

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
new routes
new maze content
scene-dressing expansion
visual object-kit expansion
network tick retuning
gameplay balance changes
```
