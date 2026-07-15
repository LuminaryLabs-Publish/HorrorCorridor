# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-14T20-58-46-04-00`  
**Status:** `client-movement-kinematic-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic bootstrap, PeerJS and BroadcastChannel transport, predictive movement, host snapshots, interaction gameplay, Three.js presentation, minimap and browser proof tooling.

The current audit isolates client movement authority. `PLAYER_UPDATE` carries both a sender identity and a caller-selected `playerId`, sequence, input and complete pose. The host directly installs the supplied position, rotation, pitch and velocity into authoritative state, then republishes it without actor binding, sequence admission, kinematic limits, swept maze collision or a typed result.

## Plan ledger

**Goal:** preserve responsive client prediction while allowing the host to admit only identity-bound, ordered and physically reachable movement into authoritative state.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor under the oldest eligible synchronized rule.
- [x] Preserve the complete 29-kit, two-adapter inventory and offered services.
- [x] Add the timestamped client-movement audit family.
- [x] Refresh root docs and machine registry.
- [ ] Implement and execute movement admission, correction and visible-frame fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-14T20-58-46-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-14T20-58-46-04-00-client-movement-kinematic-admission-dsk-map.md`
7. `.agent/render-audit/2026-07-14T20-58-46-04-00-authoritative-correction-visible-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-14T20-58-46-04-00-client-pose-teleport-wall-bypass-loop.md`
9. `.agent/interaction-audit/2026-07-14T20-58-46-04-00-player-update-command-result-map.md`
10. `.agent/network-movement-audit/2026-07-14T20-58-46-04-00-sender-sequence-kinematic-settlement-contract.md`
11. `.agent/deploy-audit/2026-07-14T20-58-46-04-00-network-movement-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-14T20-58-46-04-00-repo-ledger-client-movement-reconciliation.md`

## Current authority boundary

```txt
corridor-client-movement-kinematic-admission-authority-domain
```

## Required transaction

```txt
ClientMovementUpdateCandidate
  -> bind transport peer, sender, player, room and session generation
  -> reject stale, duplicate, reordered and impersonated updates
  -> validate finite bounded pose values and accepted time delta
  -> enforce speed, acceleration, rotation and swept maze collision policy
  -> prepare player, held-cube and snapshot candidates
  -> atomically commit or preserve the predecessor
  -> publish ClientMovementUpdateResult and correction receipt
  -> reconcile client prediction to the accepted revision
  -> publish FirstAuthoritativeMovementFrameAck
```

## Validation boundary

Documentation only. No client movement authority, anti-teleport enforcement, actor binding, sequence ordering, correction convergence or production-readiness claim is made.