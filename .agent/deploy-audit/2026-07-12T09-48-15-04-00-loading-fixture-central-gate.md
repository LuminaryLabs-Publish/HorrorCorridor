# Loading Transition Fixture and Central Gate

**Timestamp:** `2026-07-12T09-48-15-04-00`

## Current validation surface

The repository exposes build, lint, ProtoKit, harness, visual, object-review and live-player commands. None currently prove cancellation, single-flight start, stale-result rejection, atomic multi-store commit, duplicate-broadcast prevention or world/snapshot generation parity.

## Required fixture matrix

```txt
overlapping solo starts
overlapping host starts
route exit during loading
component unmount during loading
lobby join/leave during loading
readiness mutation during loading
transport replacement during loading
cancelled predecessor result
superseded predecessor result
duplicate START_GAME suppression
duplicate initial SYNC suppression
candidate bootstrap validation failure
atomic commit rollback
world/snapshot generation parity
first visible run-frame acknowledgement
built-site browser smoke
GitHub Pages smoke
```

## Release gate

A build is not loading-transition safe until every stale or cancelled generation performs zero state/network mutation and the first visible run frame cites the same committed loading and run generation as the authoritative snapshot and retained world.

## Documentation gate

Repo-local root docs, the machine registry, the central repo ledger and the central change log must cite the same latest tracker before the audit is treated as synchronized.
