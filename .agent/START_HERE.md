# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-15T07-00-28-04-00`  
**Status:** `audio-event-projection-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic maze bootstrap, PeerJS and BroadcastChannel transport, predictive movement, host snapshots, cube/anomaly interactions, ooze, Three.js presentation, post-processing, minimap and browser-proof tooling.

The current audit isolates audio event projection. Accepted movement, interaction, ooze, session and terminal state is projected visually, but the repository has no owned browser audio context, semantic cue registry, volume/mute policy, spatial listener/source projection, lifecycle suspension or audible-result proof.

## Plan ledger

**Goal:** add one revisioned audio projection boundary that consumes accepted semantic results and remains safe across browser unlock, multiplayer duplication, pause, visibility and route retirement.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor under the oldest eligible synchronized rule.
- [x] Preserve the complete 29-kit, two-adapter inventory and offered services.
- [x] Add the timestamped audio audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute audio capability, cue, lifecycle and parity fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-15T07-00-28-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-15T07-00-28-04-00-audio-event-projection-dsk-map.md`
7. `.agent/render-audit/2026-07-15T07-00-28-04-00-silent-state-audiovisual-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-15T07-00-28-04-00-silent-hazard-interaction-outcome-loop.md`
9. `.agent/interaction-audit/2026-07-15T07-00-28-04-00-audio-cue-command-result-map.md`
10. `.agent/audio-audit/2026-07-15T07-00-28-04-00-browser-audio-unlock-spatial-cue-contract.md`
11. `.agent/deploy-audit/2026-07-15T07-00-28-04-00-browser-audio-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-15T07-00-28-04-00-oldest-selection-audio-reconciliation.md`

## Current authority boundary

```txt
corridor-audio-event-projection-authority-domain
```

## Required transaction

```txt
AudioProjectionAdmissionCommand
  -> bind document, runtime, session, snapshot and audio-policy revisions
  -> observe browser audio capability and accepted user-gesture unlock
  -> resolve accepted semantic events into stable cue descriptors
  -> distinguish UI, local-player, remote-player, world and ambience sources
  -> deduplicate prediction, authoritative replay and repeated snapshots
  -> project listener and spatial-source transforms
  -> enforce mute, volume, bus, pooling and voice-budget policy
  -> suspend or retire on pause, hide, route exit and runtime replacement
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Validation boundary

Documentation only. No audible gameplay, browser-unlock reliability, spatial-audio correctness, preference persistence, audiovisual convergence or production-readiness claim is made.
