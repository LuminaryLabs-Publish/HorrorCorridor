# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T14-30-36-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates transport-error retirement. PeerJS peer-level and DataConnection-level failures share the same `peer/error` event shape. Connection errors carry no remote-peer, connection or generation identity. The host retains failed connections in its map, the client retains a failed `activeConnection`, and `GameShell` cannot reconcile authoritative roster or route state from the ambiguous error.

## Plan ledger

**Goal:** bind every transport error to an explicit scope and current generation, retire terminal connections exactly once, reconcile membership atomically, quarantine predecessor callbacks and prove the first visible error or recovered state.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify central-ledger and root `.agent` coverage for all nine eligible repositories.
- [x] Select only `HorrorCorridor` because repo-local audit state was newer than central tracking.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Add the transport-error retirement audit family.
- [x] Refresh root routing and machine registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable fixtures.

## Current authority boundary

```txt
corridor-transport-error-retirement-authority-domain
```

It coordinates:

```txt
error identity and scope
peer-versus-connection classification
connection and attempt generations
terminal and retryable policy
exactly-once connection retirement
callback detachment
late-event quarantine
client reconnect and connection supersession
actor, room and roster reconciliation
truthful status and start eligibility
bounded observations and journals
first visible error-state frame acknowledgement
```

## Main source finding

```txt
DataConnection error
  -> peer/error without connection identity
  -> host map or client activeConnection remains owned
  -> GameShell performs no retirement or roster reconciliation
  -> errored participant can remain visible and eligible for bootstrap
  -> late predecessor callbacks are not generation-fenced
```

## Read order

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T14-30-36-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T14-30-36-04-00-transport-error-retirement-dsk-map.md`
7. `.agent/transport-error-audit/2026-07-12T14-30-36-04-00-scope-generation-retirement-contract.md`
8. `.agent/interaction-audit/2026-07-12T14-30-36-04-00-peer-error-retirement-map.md`
9. `.agent/gameplay-audit/2026-07-12T14-30-36-04-00-error-without-close-ghost-participant-loop.md`
10. `.agent/render-audit/2026-07-12T14-30-36-04-00-errored-connection-visible-roster-gap.md`
11. `.agent/deploy-audit/2026-07-12T14-30-36-04-00-transport-error-retirement-fixture-gate.md`

## Validation boundary

This pass changes documentation only. Runtime source, networking, gameplay, rendering, package scripts, dependencies and deployment are unchanged. No transport-error retirement or browser multiplayer fixture was run.