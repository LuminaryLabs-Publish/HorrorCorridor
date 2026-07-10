# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T17-00-54-04-00`

## Available commands

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

## Evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish inventory
[done] central ledger ordering and root .agent state
[done] ProtocolEnvelope requestId capability
[done] interaction, player-update, and full-sync builders
[done] GameCanvas request, host authority, publication, and cadence paths
[done] networkRules dispatch
[done] runtimeDebugStore records and browser export
[done] package scripts
[done] repo-local main push
[done] central ledger and internal change-log push
```

## Required implementation validation

```txt
local request-id generation
network request-id propagation
host result and acknowledgement correlation
request-linked SYNC tick when publication occurs
no-publish authoritative acknowledgement
pending request registration and resolution
duplicate request idempotency
timeout and expiry policy
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

## Pass status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
deployment changed: no
branch created: no
pull request created: no
existing tests run: no
request acknowledgement fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
central commit: b739d51a95ea2731a5ffe5f99fefbec6507f7dc7
```
