# Architecture Audit: Lobby Capacity Central Reconciliation DSK Map

**Timestamp:** `2026-07-12T22-44-30-04-00`

## Summary

The central ledger must treat lobby capacity as an authoritative multiplayer domain, not a presentation field. The existing `maxPlayers: 4` value is read by room state but is not owned by transport admission, store commits, protocol validation or run bootstrap.

## Plan ledger

**Goal:** define the dependency boundary that every member-admission path must cross before roster, protocol, bootstrap or rendering consumers can observe the member.

- [x] Reconcile the repo-local capacity audit.
- [x] Identify existing consumers and missing authority.
- [x] Preserve the 29 implemented kits as consumers rather than assigning capacity ownership to them.
- [ ] Implement the parent domain and executable fixtures.

## Parent domain

```txt
corridor-lobby-capacity-admission-authority-domain
```

## DSK boundary

```txt
inputs
  room identity and generation
  max-player policy and policy revision
  expected roster revision
  candidate member identity and source
  optional connection lease

commands
  reserve member slot
  commit reserved member
  cancel or expire reservation
  retire committed member
  validate sealed roster

results
  Accepted
  Full
  Duplicate
  Stale
  Cancelled
  Invalid
  Failed

state
  committed canonical members
  live reservations
  roster revision
  capacity revision
  capacity fingerprint

projections
  room.players
  lobbyPlayers
  count / max / remaining / full
  protocol roster evidence
  bootstrap roster artifact
  first visible frame receipt
```

## Dependency order

```txt
room identity authority
  -> transport generation and connection lease
  -> capacity policy
  -> member candidate classification
  -> slot reservation
  -> identity uniqueness
  -> atomic roster commit
  -> protocol capacity validation
  -> sealed bootstrap roster
  -> lobby/game presentation
  -> first matching frame acknowledgement
```

## Existing kit relationships

```txt
corridor-session-domain-kit
  consumes canonical roster commits

peer-host-transport-kit and peer-client-transport-kit
  expose candidates and leases, never mutate roster directly

peer-event-bus-kit
  transports typed candidate and admission results

lobby-screen-presentation-kit
  projects count, max, remaining, full and rejection results

protocol-serialization-kit
  rejects players.length > maxPlayers and stale capacity evidence

maze-snapshot-bootstrap-kit
  accepts only a sealed capacity-valid roster artifact

corridor-authoritative-publication-kit
  publishes capacity revision and fingerprint with snapshots

corridor-render-world-kit, corridor-minimap-kit and UI kits
  cite the committed roster/capacity revision in visible-frame evidence
```

## Candidate kit family

```txt
room-capacity-policy-kit
lobby-slot-id-kit
lobby-slot-reservation-kit
lobby-member-candidate-kit
lobby-member-source-classification-kit
lobby-capacity-revision-kit
lobby-capacity-fingerprint-kit
lobby-member-identity-uniqueness-kit
lobby-connection-lease-capacity-kit
placeholder-member-admission-kit
lobby-capacity-result-kit
lobby-roster-commit-kit
lobby-slot-release-kit
lobby-capacity-rejection-observation-kit
lobby-capacity-journal-kit
bootstrap-roster-capacity-gate-kit
protocol-room-capacity-validation-kit
first-capacity-consistent-frame-ack-kit
```

## Invariants

```txt
0 <= committed members <= maxPlayers
committed members + live reservations <= maxPlayers
one canonical member consumes at most one slot
one live connection lease admits at most one member
rejected results mutate no roster or actor state
room.players and lobbyPlayers share one revision
bootstrap and protocol cannot introduce an over-capacity roster
visible count and actor set cite the committed capacity revision
```

## Validation boundary

Architecture documentation only. No runtime DSK, command, result, reservation, revision or frame receipt has been implemented.