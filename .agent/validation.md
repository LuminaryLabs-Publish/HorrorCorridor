# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T17-00-54-04-00`

## Available commands

From `HorrorCorridor-V1/package.json`:

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing required command

```txt
npm run fixture:request-ack
```

## Documentation evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish repository inventory
[done] central HorrorCorridor ledger and latest central commit ordering
[done] root .agent state
[done] ProtocolEnvelope optional requestId
[done] createInteractionRequestMessage requestId input
[done] createFullSyncMessage requestId input
[done] GameCanvas interaction request creation
[done] GameCanvas host TRY_INTERACT handling
[done] GameCanvas authoritative snapshot publication
[done] local identity-based skip behavior
[done] periodic cadence publication
[done] runtimeDebugStore frame, event, and browser export shapes
[done] package scripts
```

## Required implementation validation matrix

```txt
local request id generation
network request id propagation
host result carries request id
SYNC acknowledgement echoes request id when publication occurs
no-publish acknowledgement remains observable
pending request registration and removal
duplicate request idempotency
timeout and expiry rows
request-sync recovery acknowledgement
cadence publication without command request id
runtime-debug request/result/decision/ack/tick projection
legacy GameState parity
replicated snapshot parity
```

## Validation order for the next source pass

```txt
1. npm run fixture:request-ack
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
7. browser solo smoke
8. browser host/client smoke
9. runtime-debug export inspection
```

## Not run in this documentation pass

```txt
npm install
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run fixture:request-ack
browser route smoke
live host/client multiplayer smoke
```

## Pass status

```txt
runtime source changed: no
branch created: no
pull request created: no
dependencies changed: no
routes changed: no
deployment changed: no
request acknowledgement fixture: unavailable
repo-local documentation pushed to main: pending until commit
central ledger updated: pending
central internal change-log added: pending
```
