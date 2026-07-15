# Deploy audit: network movement browser fixture gate

**Timestamp:** `2026-07-14T20-58-46-04-00`

## Summary

Current package and browser proof surfaces do not demonstrate host rejection of malformed, stale, impersonated or unreachable client movement. Deployment readiness requires the same movement decisions and visible corrections in source, production build and deployed origin.

## Plan ledger

**Goal:** gate publication claims on real host/client movement admission and frame evidence.

- [x] Identify missing source and browser fixtures.
- [x] Define artifact parity requirements.
- [ ] Execute after runtime authority exists.

## Required matrix

```txt
valid ordered movement -> Accepted
sender/player mismatch -> Rejected
unknown player -> Rejected
duplicate sequence -> Duplicate
older sequence -> Stale
teleport -> Rejected or Corrected
excessive speed -> Rejected or Corrected
wall crossing -> Rejected or Corrected
out-of-maze pose -> Rejected or Corrected
held cube on rejected update -> unchanged
client correction -> matching camera/world/minimap/debug revision
```

## Required environments

```txt
source development server
production build server
deployed GitHub Pages origin
host and client in separate browser contexts
PeerJS path
BroadcastChannel local fallback path
```

## Required evidence

```txt
movement command/result journal
host predecessor and successor fingerprints
originating-client correction receipt
authoritative snapshot revision
first matching world frame screenshot
minimap and debug revision
artifact commit and route identity
```

No deployment or production-readiness claim is made.