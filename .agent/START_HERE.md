# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T16-39-35-04-00`  
**Status:** `authoritative-message-source-admission-central-reconciled`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, PeerJS and same-origin transport, deterministic maze bootstrap, authoritative snapshots, cube and anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The latest audit reconciles the repo-local authoritative-message-source finding with central tracking. Host-class messages are structurally decoded, but the client does not prove current host peer, sender binding, active room, session epoch, connection generation or authority revision before replacing visible state.

## Plan ledger

**Goal:** admit host-class messages only from the current host authority and prove every accepted transition through the first matching visible frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only HorrorCorridor from newer repo-local audit state.
- [x] Preserve the complete interaction loop, domain map, 29-kit census and service map.
- [x] Add a fresh timestamped reconciliation audit family.
- [x] Refresh root documentation and machine registry.
- [x] Synchronize the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and adversarial fixtures remain future work.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T16-39-35-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T16-39-35-04-00-authoritative-message-source-central-reconciliation-dsk-map.md`
7. `.agent/protocol-authority-audit/2026-07-12T16-39-35-04-00-sender-peer-room-generation-reconciliation-contract.md`

## Current authority boundary

```txt
corridor-authoritative-message-source-admission-authority-domain
```

```txt
peer/message
  -> structural decode
  -> authority classification
  -> session, transport and connection-generation admission
  -> remote-peer, sender and room consistency checks
  -> Accepted, Rejected, Stale or Duplicate result
  -> state commit only for Accepted
  -> first matching visible-frame acknowledgement
```

## Main source finding

```txt
peer/message source evidence exists: yes
protocol senderId and roomId exist: yes
structural validation exists: yes
sender-to-peer binding: no
current-host check: no
active-room check: no
session-epoch check: no
connection-generation check: no
authority-revision check: no
typed zero-mutation rejection: no
first accepted-message frame acknowledgement: no
```

## Latest audit family

```txt
.agent/trackers/2026-07-12T16-39-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-39-35-04-00.md
.agent/architecture-audit/2026-07-12T16-39-35-04-00-authoritative-message-source-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T16-39-35-04-00-authoritative-message-visible-frame-reconciliation-gap.md
.agent/gameplay-audit/2026-07-12T16-39-35-04-00-forged-host-message-state-replacement-reconciliation.md
.agent/interaction-audit/2026-07-12T16-39-35-04-00-host-message-source-admission-reconciliation-map.md
.agent/protocol-authority-audit/2026-07-12T16-39-35-04-00-sender-peer-room-generation-reconciliation-contract.md
.agent/deploy-audit/2026-07-12T16-39-35-04-00-authoritative-message-fixture-central-reconciliation-gate.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, dependency, package-script or deployment behavior changed.