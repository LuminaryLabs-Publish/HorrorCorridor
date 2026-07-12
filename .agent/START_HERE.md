# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T16-29-56-04-00`  
**Status:** `authoritative-message-source-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates authoritative message-source admission. Client handling of `START_GAME`, `SYNC` and `LOBBY_EVENT` branches only on decoded message type. Although `peer/message` carries `remotePeerId` and `connectionId`, the consumer does not bind them to the current host, room, session epoch or connection generation before replacing room, roster, snapshot, route and readiness state.

## Plan ledger

**Goal:** admit host-class messages only from the current host authority and prove the accepted source through the first matching visible frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible documented repository.
- [x] Identify the complete interaction loop.
- [x] Preserve all 29 implemented kits and their services.
- [x] Identify all active domains.
- [x] Trace host-class messages from transport event through visible state.
- [x] Add architecture, render, gameplay, interaction, protocol-authority and deploy audits.
- [x] Refresh required root documentation and machine registry.
- [ ] Runtime implementation and adversarial fixtures remain future work.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/architecture-audit/2026-07-12T16-29-56-04-00-authoritative-message-source-admission-dsk-map.md`
6. `.agent/protocol-authority-audit/2026-07-12T16-29-56-04-00-sender-peer-room-authority-contract.md`

## Current authority boundary

```txt
corridor-authoritative-message-source-admission-authority-domain
```

```txt
peer/message
  -> structural decode
  -> message authority classification
  -> session, transport and connection-generation admission
  -> remote-peer, sender and room consistency checks
  -> typed Accepted, Rejected, Stale or Duplicate result
  -> state commit only for Accepted
  -> first matching visible-frame acknowledgement
```

## Main source finding

```txt
peer/message source evidence exists: yes
serializer validates structure: yes
current host peer checked before START_GAME: no
current host peer checked before SYNC: no
current host peer checked before LOBBY_EVENT: no
connection generation checked: no
active room checked: no
session epoch checked: no
message authority revision checked: no
zero-mutation rejection result exists: no
first authoritative-message frame acknowledgement exists: no
```

## Latest audit family

```txt
.agent/trackers/2026-07-12T16-29-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-29-56-04-00.md
.agent/architecture-audit/2026-07-12T16-29-56-04-00-authoritative-message-source-admission-dsk-map.md
.agent/render-audit/2026-07-12T16-29-56-04-00-untrusted-host-message-visible-state-gap.md
.agent/gameplay-audit/2026-07-12T16-29-56-04-00-forged-sync-client-state-replacement-loop.md
.agent/interaction-audit/2026-07-12T16-29-56-04-00-host-message-source-admission-map.md
.agent/protocol-authority-audit/2026-07-12T16-29-56-04-00-sender-peer-room-authority-contract.md
.agent/deploy-audit/2026-07-12T16-29-56-04-00-authoritative-message-source-fixture-gate.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, dependency, package-script or deployment behavior changed. No branch or pull request was created.