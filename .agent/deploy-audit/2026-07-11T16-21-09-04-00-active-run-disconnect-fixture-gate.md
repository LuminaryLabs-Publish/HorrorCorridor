# Deploy Audit: Active-Run Disconnect Fixture Gate

**Timestamp:** `2026-07-11T16-21-09-04-00`

## Goal

Define the validation gate required before build or Pages evidence can claim multiplayer disconnect and reconnect correctness.

## Required pure fixtures

```txt
fixture:connection-actor-binding
fixture:disconnect-classification
fixture:membership-transaction
fixture:player-retirement
fixture:owned-cube-recovery
fixture:orphan-owner-rejection
fixture:reconnect-claim
fixture:disconnect-result-fingerprint
```

## Required host fixtures

```txt
fixture:disconnect-active-player
fixture:disconnect-held-cube
fixture:disconnect-after-place
fixture:disconnect-during-ooze-tick
fixture:disconnect-duplicate-close
fixture:disconnect-late-close
fixture:disconnect-cross-epoch-close
fixture:disconnect-snapshot-convergence
fixture:reconnect-within-grace
fixture:reconnect-after-expiry
fixture:reconnect-wrong-actor
```

## Required browser smoke

```txt
launch host and client
start one run
client picks up cube
close client transport
verify one disconnect result
verify session and gameplay rosters converge
verify cube follows selected recovery policy
verify ooze and interaction inputs exclude retired actor
verify world/minimap/HUD remove ghost on same revision
reconnect under policy and verify no duplicate player
```

## Required Pages proof

```txt
deployed commit fingerprint
multi-peer transport path
result-linked snapshot revision
first post-disconnect frame ID
no ghost player or orphan cube
no console error or resource leak
reconnect acceptance/rejection evidence
```

## Current state

```txt
runtime implementation: absent
pure fixtures: absent
host fixtures: absent
browser smoke: not run
Pages smoke: not run
workflow changed by this pass: no
```
