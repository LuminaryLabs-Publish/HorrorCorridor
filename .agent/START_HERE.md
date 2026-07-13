# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-13T11-58-45-04-00`  
**Status:** `webgl-context-resource-recovery-authority-central-reconciled`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS and local transport, deterministic maze bootstrap, first-person movement, cube interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates application-level WebGL context and GPU-resource recovery. The runtime creates one renderer, composer, pass set and world resource graph, but it owns no context/resource generations, context-loss/restoration transaction, fallback, recovery probe, atomic adoption result or first recovered visible-frame acknowledgement.

## Plan ledger

**Goal:** retire failed presentation generations safely and adopt a complete recovered renderer/composer/world generation only after a successful probe and visible frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify root `.agent` state for all nine eligible repositories.
- [x] Select only HorrorCorridor as the oldest eligible central entry.
- [x] Preserve the complete interaction loop, domain map and 29-kit inventory.
- [x] Add the timestamped WebGL context/resource recovery audit family.
- [x] Refresh root docs and machine registry.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Implement and prove context loss, restoration, failed restoration and repeated loss.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-13T11-58-45-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-13T11-58-45-04-00-webgl-context-resource-recovery-dsk-map.md`
7. `.agent/webgl-lifecycle-audit/2026-07-13T11-58-45-04-00-context-generation-resource-adoption-contract.md`
8. `.agent/deploy-audit/2026-07-13T11-58-45-04-00-webgl-context-recovery-fixture-gate.md`
9. `.agent/central-sync-audit/2026-07-13T11-58-45-04-00-repo-ledger-webgl-recovery-reconciliation.md`

## Current authority boundary

```txt
corridor-webgl-context-resource-recovery-authority-domain
```

## Source finding

```txt
single renderer/composer/world generation: present
application context generation: absent
application resource generation: absent
webglcontextlost/restored listeners: absent
render-submission lease: absent
rendering readiness downgrade on context loss: absent
WebGL-independent fallback: absent
recovery preparation/probe/adoption result: absent
first recovered visible-frame acknowledgement: absent
```

Three.js may perform internal context handling. HorrorCorridor does not own or expose evidence proving which restored context/resource generation is active or visible.

## Required transaction

```txt
WebGLContextLifecycleEvent
  -> validate surface and active generation
  -> retire render submissions
  -> project not-ready and fallback state
  -> choose bounded simulation/network policy
  -> prepare renderer, composer and world resources
  -> validate manifests and submit a probe
  -> atomically adopt all participants or none
  -> publish ContextRecoveryResult
  -> publish FirstRecoveredFrameAck
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No application-owned recovery or production-readiness claim is made.