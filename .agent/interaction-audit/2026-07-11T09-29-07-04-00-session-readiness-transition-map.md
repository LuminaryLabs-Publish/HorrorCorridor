# Session Readiness Transition Map

**Timestamp:** `2026-07-11T09-29-07-04-00`

## Current transition producers

```txt
GameShell enterHostLobby
  -> networking true before transport connection result

GameShell enterClientLobby
  -> networking true before host connection result

GameShell enterSoloRun
  -> simulation/rendering/input true before GameCanvas provider commit

GameShell startPlay
  -> simulation/rendering/input true before GameCanvas provider commit

GameShell inbound SYNC
  -> all four true from message receipt

GameShell returnToLobby
  -> networking true without a transport proof row

GameShell returnToStart
  -> resetRuntime all false

GameCanvas initialize
  -> patches provider capabilities

GameCanvas cleanup
  -> networking true unconditionally
```

## Missing transition identity

Every producer writes the same record without:

```txt
commandId
sessionId
runtimeGeneration
providerId
expectedRevision
transition kind
proofId
terminal result
```

## Required command map

```txt
request-runtime-capability
commit-runtime-capability
fail-runtime-capability
revoke-runtime-capability
reset-runtime-generation
inspect-runtime-readiness
```

Each command must produce one typed terminal result and must not merge into a different generation.

## Admission rules

```txt
shell may request capabilities but cannot self-certify provider readiness
provider commit must match requested session and generation
transport adapter owns networking proof
render host owns rendering proof
input owner owns input proof
simulation host owns simulation proof
cleanup may revoke only its own provider lease
generation reset rejects all late prior-generation commits and revocations
```

## Observation requirements

```txt
last transition command
last terminal result
current revision
runtime generation
provider owner per capability
ready proof per capability
bounded failure and stale-write rows
```

No interaction code was changed.