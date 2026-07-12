# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T01-08-06-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime startup acquisition, rollback and clean retry
6. runtime readiness leases and generation fencing
7. render-surface resolution, revision and frame correlation
8. debug-observability capability, redaction and revocation
9. snapshot acceptance ordering and monotonic revision
10. explicit interaction targets and cube/slot claims
11. active-run disconnect, player retirement and reconnect claims
12. monotonic terminal outcome authority
13. host network cadence and fixed simulation authority
14. host movement admission and client reconciliation
15. snapshot delivery, payload budgeting and backpressure authority
16. authoritative randomness, checkpoint and replay authority
17. replicated pause/resume convergence
```

## Current debug-observability gap

```txt
public query activation: present
persisted browser activation: present
Backquote activation: present
public window API activation/export: present
build-channel gate: absent
role/actor admission: absent
runtime/session lease: absent
data classification: absent
redaction profile: absent
export authorization/result: absent
automatic revocation: absent
production-safe telemetry tier: absent
```

The logger retains up to 180 full frame records and 80 event records. Frame records include room/player identity, local pose and input, every cube's ID/color/state/owner/position, the full anomaly sequence and slots, cadence and scene-dressing data.

## Concrete disclosure paths

```txt
?debug=frames
  -> runtime initializes debug
  -> overlay becomes visible
  -> anomaly order and cube positions are rendered

Backquote
  -> debug is enabled unconditionally
  -> overlay visibility toggles

window.__HORROR_CORRIDOR_DEBUG__.extractState()
  -> returns current privileged frame
  -> returns retained frame history
  -> returns retained event history

persisted localStorage flag
  -> later runtime initializes with debug already enabled
  -> no new session admission occurs
```

## Missing debug authority

```txt
named public, QA and developer capability tiers
build/deployment channel identity
actor identity and role requirements
runtime generation and session epoch binding
revocable capability lease
field-level data classification
public-safe redaction profile
privileged capture byte/count budget
export command and typed export result
overlay projection policy
preference persistence policy
revocation and privileged-buffer clearing
production-disable and redaction fixtures
browser proof across restart and session replacement
```

## Consequences

```txt
players can reveal the puzzle solution and world coordinates
privileged capture can persist across later sessions
public scripts can extract recent gameplay and event history
session-identifying values can outlive the session that produced them
QA diagnostics and production telemetry have no explicit separation
bounded retention limits memory growth but does not limit authority or disclosure
```

## Retained gaps

The preceding render-surface, startup, readiness, randomness, snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open. This audit does not supersede them.