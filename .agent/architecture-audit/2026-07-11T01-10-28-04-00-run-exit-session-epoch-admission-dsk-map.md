# Run Exit and Session Epoch DSK Map

**Timestamp:** `2026-07-11T01-10-28-04-00`

## Current composition

```txt
corridor-application-shell-kit
  -> calls returnToLobby / returnToStart / run entry
corridor-session-domain-kit
  -> stores room, roster, identity, connection state
runtime-store-snapshot-kit
  -> stores authoritative snapshot and readiness
protocol-message-construction-kit
  -> constructs START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
peer-host/client-transport-kits
  -> keep callbacks and transport alive across lobby return
corridor-authoritative-publication-kit
  -> publishes active snapshots
runtime-resource-cleanup-kit
  -> stops local GameCanvas frame/render/input resources
```

## Ownership defect

The existing services do not compose into one terminal run transaction. Local cleanup owns resources, the shell owns screen projection and transport callbacks, stores own room/snapshot/readiness, and protocol messages own no complete run identity. No service can prove that all old-run mutation sources are closed before the first lobby or next-run frame.

## Required domain cut

```txt
run-session-identity-kit
  runSessionId, sessionEpoch, roomId, gameId, rosterRevision, fingerprint

run-exit-command-kit
  requestId, actor, role, reason, scope, expected identity

run-exit-authority-kit
  phase/role validation, idempotency, accepted/rejected/no-change result

run-exit-commit-kit
  simulation freeze, lifecycle publication, UI/room/snapshot/readiness transaction

session-message-admission-kit
  version, room, game, runSessionId, epoch, sender, phase, duplicate/stale checks

transport-callback-lease-kit
  callback generation, old-generation quarantine, preserve/destroy policy handoff

runtime-teardown-result-kit
  exactly-once resource result and fingerprint

snapshot-archive-kit
  terminal snapshot retention or active snapshot clearing

session-lifecycle-ledger-kit
  bounded JSON-safe command/result/publication/admission/teardown rows
```

## Adapter boundary

```txt
GameShell
  converts UI exit intent into RunExitCommand
  projects accepted RunExitResult
  applies transport preserve/destroy policy
  preflights every shell-level message

GameCanvas
  consumes lifecycle admission state
  stops mutation/publication after accepted exit
  returns cleanup result correlated to exit request

session/runtime/UI stores
  apply one immutable lifecycle commit

protocol/transport
  carry and enforce run identity and epoch
```

## Ordering

```txt
start admission
  -> create run identity
  -> run gameplay
  -> accept exit command
  -> freeze active mutation/admission
  -> publish terminal lifecycle
  -> commit stores/projection
  -> dispose or preserve transport
  -> quarantine old callback generation
  -> archive/clear snapshot
  -> permit next epoch bootstrap
```

## Non-goals

Renderer extraction, PeerJS replacement, new content, visual redesign, network cadence tuning, and host migration are outside this slice.
