# HorrorCorridor Run Exit Commit DSK Map

**Timestamp:** `2026-07-11T01-01-32-04-00`

## Current ownership map

```txt
GameShell
  -> session entry
  -> shell transport creation/destruction
  -> shell-level transport message projection
  -> local pause/resume/return/restart callbacks

GameCanvas
  -> gameplay simulation and host authority
  -> client prediction and gameplay send
  -> authoritative publication
  -> browser input and pointer lock
  -> RAF, Three.js world, post-processing, minimap, debug
  -> component cleanup

stores
  -> session room/identity/roster/connection
  -> runtime snapshot/pose/input/readiness
  -> UI screen/pause/completion
```

## Current split defect

```txt
exit intent lives in GameShell
authoritative gameplay state lives in GameCanvas closure
room and snapshot stores remain active
transport ownership remains in GameShell
cleanup occurs only because GameCanvas unmounts
no object owns the complete exit transaction
```

## Proposed parent domain

```txt
run-session-authority-domain
```

Owns:

```txt
runSessionId
sessionEpoch
lifecycle phase and revision
sealed roster/source identity
run-exit commands and terminal results
gameplay/publication admission
transport preserve/destroy policy
callback quarantine generation
snapshot archive/reset policy
teardown result correlation
re-entry admission
bounded JSON-safe journal
```

Does not own:

```txt
maze generation
movement math
interaction rule internals
Three.js world construction
post-processing implementation
PeerJS implementation details
menu visual styling
```

## Proposed DSKs

```txt
run-session-identity-kit
run-exit-command-kit
run-exit-authority-kit
run-exit-commit-kit
session-message-admission-kit
transport-quarantine-kit
lifecycle-publication-kit
snapshot-archive-kit
runtime-teardown-result-kit
run-exit-debug-projection-kit
run-exit-fixture-kit
legacy-shell-exit-adapter-kit
legacy-gamecanvas-cleanup-adapter-kit
```

## Command contract

```txt
RunExitCommand
  commandId
  requestId
  actorId
  actorRole
  roomId
  gameId
  runSessionId
  sessionEpoch
  kind
  scope
  reason
  requestedAtMs
```

Kinds:

```txt
pause-return
victory-restart
client-leave
host-return
room-close
title-exit
```

## Result contract

```txt
RunExitResult
  status: accepted | rejected | no-change
  reason
  authoritySource
  previousPhase
  nextPhase
  previousEpoch
  terminalEpoch
  transportPolicy: preserve | disconnect-client | destroy-room
  snapshotPolicy: archive | clear | retain-terminal
  teardownRequired
  committedAtMs
```

## Commit order

```txt
validate command identity and phase
  -> resolve authority/policy
  -> freeze gameplay and publication admission
  -> create terminal result
  -> publish lifecycle result
  -> atomically project room/UI/runtime/snapshot policy
  -> apply transport preserve/destroy policy
  -> quarantine old generation
  -> run correlated cleanup
  -> expose first committed lobby/closed observation
  -> permit fresh bootstrap with epoch + 1
```

## Invariants

```txt
one command produces one terminal result
accepted exit prevents further active mutation in its epoch
no old callback mutates new epoch state
lobby return preserves transport only under the new quarantine generation
title/room close destroys transport exactly once
cleanup can replay as no-change
new bootstrap increments epoch exactly once
all peers converge on lifecycle phase before re-entry
```
