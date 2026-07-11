# HorrorCorridor Session Epoch and Transport Quarantine Contract

**Timestamp:** `2026-07-11T01-01-32-04-00`

## Purpose

Permit transport reuse across lobby return while guaranteeing that callbacks from the previous run cannot mutate lobby state or the next run.

## Identity model

```txt
roomId
  contains zero or more run sessions

runSessionId
  immutable identity for one bootstrap and terminal lifecycle

sessionEpoch
  monotonic room-local generation

transportLeaseId
  identity for one shell transport instance

callbackGeneration
  incremented when run admission closes or transport is replaced
```

## Quarantine states

```txt
open
closing
quarantined
lobby-admitted
destroyed
```

## On accepted lobby return

```txt
close gameplay admission
increment callbackGeneration
retain transportLeaseId
publish terminal lifecycle result
reject old generation gameplay/lifecycle callbacks
admit only lobby-safe messages
clear/archive active snapshot by policy
wait for explicit next run entry
```

## On accepted title exit or room close

```txt
close all message admission
publish terminal acknowledgement when possible
increment callbackGeneration
destroy/disconnect transport exactly once
clear event bus/listeners
clear session/runtime/UI by result policy
mark lease destroyed
```

## On re-entry

```txt
require lobby phase
require sealed roster/start admission
create runSessionId
increment sessionEpoch exactly once
bind callbacks to current transport lease and callback generation
broadcast START_GAME with epoch
accept only matching epoch
```

## Required ledger rows

```txt
exit-command
exit-result
lifecycle-publication
projection-commit
transport-policy
quarantine-open
callback-accepted
callback-rejected
teardown-result
snapshot-policy-result
reentry-result
```

## Invariants

```txt
transport reuse never implies gameplay callback reuse
one old callback cannot reopen PLAYING
one epoch cannot be used by two bootstraps
one bootstrap cannot increment epoch twice
destroyed transport cannot publish or accept messages
all quarantine decisions are JSON-safe and replayable
```
