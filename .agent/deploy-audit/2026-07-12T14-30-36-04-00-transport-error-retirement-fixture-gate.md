# Deploy Audit: Transport Error Retirement Fixture Gate

**Timestamp:** `2026-07-12T14-30-36-04-00`

## Summary

Build and static deployment proof cannot establish multiplayer error retirement. Release readiness requires browser and adapter fixtures that control PeerJS event ordering, omit close events and verify transport, roster and visible-state convergence.

## Plan ledger

**Goal:** block reliable-multiplayer and recovery claims until terminal error paths, replacements and late callbacks pass an executable matrix.

- [x] Identify source-only proof limits.
- [x] Define adapter-level deterministic fixtures.
- [x] Define browser multiplayer fixtures.
- [x] Define visible-state and deployment assertions.
- [ ] Implement and run the matrix.

## Required deterministic fixtures

```txt
host-error-without-close
  connection emits error
  no close follows
  map entry retires exactly once
  roster policy applies exactly once

client-error-without-close
  active connection retires
  status and room policy converge
  retry begins only after retirement

error-then-close
  close becomes duplicate retirement
  no second roster mutation

error-then-late-open
  open is stale
  no re-admission occurs

replacement-then-old-close
  predecessor close is stale
  replacement remains active

peer-vs-connection-error
  signalling failure preserves admitted channels under policy
  connection failure retires only its channel
```

## Required browser fixtures

```txt
same-origin host/client error injection
cross-tab local-bridge retirement
PeerJS delayed close
PeerJS missing close
host error before Start run
client error during loading
error during active gameplay
reconnect and replacement generation
visible lobby roster after retirement
first shared gameplay frame excludes retired participant
```

## Required assertions

```txt
no failed connection remains in adapter ownership
no terminal predecessor callback mutates current state
one retirement result per connection generation
room.players equals lobbyPlayers after reconciliation
start eligibility rejects retiring or errored participants
initial publication excludes retired participants
visible status and roster cite retirement/roster revisions
no unhandled promise rejection or leaked listener
```

## Existing commands

The repository retains build, lint, harness, visual and live-player checks through `package-validation-kit`, but no current command proves connection-error scope, terminality, retirement, stale-callback quarantine or roster convergence.

## Release boundary

Do not describe multiplayer as reliable, reconnectable or error-safe until this matrix exists and passes against both local-bridge and PeerJS paths in a deployed browser environment.