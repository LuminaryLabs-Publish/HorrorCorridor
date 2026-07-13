# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T20-20-02-04-00`  
**Status:** `local-bridge-packet-admission-fanout-authority-audited`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic bootstrap, authoritative snapshots, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates local-bridge packet authority. Packet identity, connection ownership and session capability are not validated at runtime, and host broadcast posts one untargeted packet per local connection. Every local client accepts every copy, so `N` clients produce `N²` message events for one logical broadcast.

## Plan ledger

**Goal:** place one generation-bound packet and fanout authority between raw browser-channel observations and lobby, gameplay, protocol or rendering consumers.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only HorrorCorridor as the oldest eligible entry.
- [x] Preserve the complete interaction loop, domains, 29 kits and services.
- [x] Add the local-bridge packet audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Implement capability admission, connection leases, exact-once fanout and fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T20-20-02-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T20-20-02-04-00-local-bridge-packet-authority-dsk-map.md`
7. `.agent/local-bridge-audit/2026-07-12T20-20-02-04-00-capability-lease-exact-once-contract.md`

## Current authority boundary

```txt
corridor-local-bridge-packet-admission-fanout-authority-domain
```

## Source finding

```txt
channel namespace: horrorcorridor:<joinCode>
runtime packet schema: absent
session generation/capability: absent
connection lease ownership: absent
unknown-connection message rejection: absent
disconnect actor/owner match: absent
broadcast posts per connection: yes
broadcast targetPeerId: null
client accepts null target: yes
N clients -> N² client message events: yes
first visible broadcast-frame acknowledgement: absent
```

## Latest audit family

```txt
.agent/trackers/2026-07-12T20-20-02-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T20-20-02-04-00.md
.agent/architecture-audit/2026-07-12T20-20-02-04-00-local-bridge-packet-authority-dsk-map.md
.agent/render-audit/2026-07-12T20-20-02-04-00-duplicate-local-broadcast-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T20-20-02-04-00-forged-packet-quadratic-fanout-loop.md
.agent/interaction-audit/2026-07-12T20-20-02-04-00-local-packet-lease-delivery-map.md
.agent/local-bridge-audit/2026-07-12T20-20-02-04-00-capability-lease-exact-once-contract.md
.agent/deploy-audit/2026-07-12T20-20-02-04-00-local-bridge-adversarial-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, network, gameplay, rendering, dependencies, package scripts and deployment were not changed.