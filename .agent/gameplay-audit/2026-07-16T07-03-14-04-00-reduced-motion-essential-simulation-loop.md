# Reduced Motion Essential Simulation Loop

**Timestamp:** `2026-07-16T07-03-14-04-00`

## Summary

Reduced motion must alter presentation only. The cooperative maze still requires movement, collision, pointer input, interactions, host publication, client updates, ooze state, anomaly progression and terminal outcomes.

## Plan ledger

**Goal:** preserve gameplay semantics while removing or reducing nonessential motion.

- [x] Classify authoritative and interaction work as essential.
- [x] Classify camera bob/roll and ambient pulses as ornamental.
- [x] Define parity expectations.
- [ ] Execute normal-versus-reduced simulation fixtures.

## Essential loop

```txt
input
  -> movement intent
  -> movement integration
  -> maze collision
  -> local pose
  -> host/client network publication
  -> interaction admission
  -> cube/anomaly/ooze state
  -> authoritative snapshot
  -> minimap and HUD
```

## Ornamental loop

```txt
elapsed time
  -> camera bob and roll
  -> emissive and opacity pulse
  -> exit light and halo pulse
```

## Required parity

The same accepted commands, seed, network messages and simulation cadence must produce the same authoritative snapshots, interactions and outcomes under normal and reduced-motion profiles. Only presentation descriptors may differ.

## Failure to avoid

```txt
reduced preference
  -> render callback bypasses shared update work
  -> essential world synchronization is accidentally skipped
  -> visual profile changes gameplay truth
```

The policy must therefore adapt motion producers, not disable the authoritative frame loop.