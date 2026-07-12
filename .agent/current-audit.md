# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T01-08-06-04-00`

## Status

```txt
status: debug-observability-capability-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-12T01-08-06-04-00-horror-corridor-debug-observability-authority.md
```

## Summary

The runtime logger is technically functional and bounded, but its activation and export surfaces are not product-authorized. Query parameters, localStorage, the backquote key and an unguarded window API can enable full-state frame capture in the public runtime.

The captured model contains enough information to reveal the ordered anomaly solution and locate every cube. The same data is cloned for up to 180 frames, recent event payloads are retained, and the capability preference survives into later sessions. There is no public-safe tier, privileged QA tier, capability lease, redaction profile, export result or session revocation contract.

## Plan ledger

**Goal:** define a revocable debug capability that separates player-safe telemetry from privileged QA state and guarantees that public production cannot expose puzzle-solving or session-identifying data by ambient browser actions.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read the debug store, frame panel, HUD mount and GameCanvas activation/capture paths.
- [x] Confirm four activation families: query, persistent browser state, keyboard and window API.
- [x] Confirm privileged frame fields and visible puzzle disclosure.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Define capability, classification, redaction, retention, export, revocation and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and central tracking.
- [ ] Runtime implementation and executable browser/deployment fixtures remain future work.

## Product interaction loop

```txt
mode selection and lobby
  -> authoritative snapshot bootstrap
  -> GameCanvas initializes runtime debug
  -> query/localStorage preferences are admitted without product policy
  -> public window debug API is attached
  -> Backquote can enable capture and show the overlay
  -> every enabled RAF clones pose, input, snapshot, cubes, anomaly, cadence and scene data
  -> 180 frame and 80 event ring buffers retain recent history
  -> overlay or JavaScript callers read/export privileged state
  -> localStorage carries enabled state into future sessions
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
runtime startup acquisition rollback retry and first-frame commit
runtime readiness lifecycle exit disconnect and reconnect
PeerJS host/client transport and BroadcastChannel local bridge
protocol envelopes serialization request and sequence admission
seeded maze topology cube placement target sequence and random streams
replicated snapshot construction publication acceptance delivery and backpressure
pointer lock keyboard mouse blur and input lifecycle
movement collision camera prediction and host admission
interaction target cube/slot claims ordered anomaly and ooze pressure
Three.js world renderer post-processing bloom minimap and cleanup
render-surface observation policy sizing revision and frame correlation
debug activation capability lease and revocation
debug frame/event classification redaction retention and export
HUD debug overlay and public window projection
validation build and deployment
```

## Implemented kits and services

The repository retains 29 source-backed kit responsibilities:

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exits
corridor-session-domain-kit            session mode, peer identity, room, roster, readiness and reset
runtime-store-snapshot-kit             authoritative snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, pause reason and overlay projection
ui-completion-projection-kit           terminal state, message, timestamp, acknowledgement and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, readiness, controls and connection state
peer-host-transport-kit                host peer, connections, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status, disconnect and destroy
peer-event-bus-kit                     typed events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             JSON encode/decode, protocol version and shape checks
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly, room and initial snapshot
seeded-maze-rng-kit                    deterministic topology, cube placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look accumulation and input snapshots
movement-collision-camera-kit          movement, maze collision, eye pose, walk shake and camera
network-player-update-kit              client sequence/cadence, pose envelope and host consume
corridor-interaction-domain-kit        action inference, pickup, drop, place, remove and held-cube sync
ordered-anomaly-sequence-kit           ordered validation, slots and victory evaluation
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot-to-UI outcome projection
corridor-authoritative-publication-kit tick, snapshot clone, SYNC construction and broadcast
corridor-animation-loop-kit            RAF lifecycle, delta and running guard
corridor-render-world-kit              terrain, maze, objects, lights, update, attach and disposal
corridor-post-processing-kit           composer, bloom, output, resize, render and disposal
corridor-minimap-kit                   2D surface sizing and maze/entity projection
runtime-debug-frame-kit                activation, bounded frames/events, overlay state and JSON export
runtime-resource-cleanup-kit           loop stop, observer/listener cleanup and GPU disposal
package-validation-kit                 build, lint, ProtoKit, harness, visual and live-player checks
```

## Source findings

```txt
query activation values: 1, true, frames, verbose
query keys: debug, debugFrames
persistent enable key: horror-corridor:runtime-debug
persistent overlay key: horror-corridor:runtime-debug-overlay
keyboard activation: Backquote
window API attached during runtime: yes
build-mode/environment gate: absent
actor/role admission: absent
session capability lease: absent
data classification/redaction: absent
frame retention: 180 records
event retention: 80 records
export authorization/result: absent
automatic revocation on session replacement: absent
```

## Privileged fields currently exposed

```txt
roomId and localPlayerId
local pose, velocity, carrying cube and input state
snapshot tick, timestamps, game state and counts
every cube ID, color, state, owner ID and world position
ordered anomaly color sequence and occupied slots
network cadence counters
scene-dressing counts and validation
recent runtime/network/interaction event payloads
```

## Main finding

```txt
public player opens runtime
  -> uses ?debug=frames, persisted flag, Backquote or window API
  -> debug capability becomes enabled without an admission result
  -> each RAF captures privileged state
  -> overlay reveals anomaly order and all cube coordinates
  -> JavaScript caller can export up to 180 frames and 80 events
  -> localStorage silently enables the capability in later sessions
```

The existing logger audit proves that these paths work. The missing boundary is not logger functionality; it is product authority over who may activate which data tier, for which session, in which build channel and for how long.

## Required parent domain

```txt
corridor-debug-observability-authority-domain
```

## Candidate kits

```txt
debug-capability-policy-kit
debug-build-channel-kit
debug-activation-command-kit
debug-activation-admission-kit
debug-capability-tier-kit
debug-session-lease-kit
debug-role-capability-kit
debug-data-classification-kit
debug-redaction-profile-kit
debug-frame-projection-kit
debug-event-projection-kit
debug-retention-budget-kit
debug-export-command-kit
debug-export-result-kit
debug-overlay-projection-kit
debug-preference-persistence-kit
debug-revocation-kit
debug-observation-journal-kit
production-debug-disable-fixture-kit
redaction-parity-fixture-kit
session-revocation-fixture-kit
browser-debug-capability-smoke-kit
```

## Required authority flow

```txt
DebugActivationCommand
  -> validate build channel, runtime generation and session epoch
  -> validate actor identity, role and requested capability tier
  -> reject ambient public activation when policy forbids it
  -> issue a bounded revocable debug lease
  -> select a named classification/redaction profile
  -> capture only admitted fields within count and byte budgets
  -> render/export through typed results that cite lease and session
  -> revoke on stop, session replacement, role loss or expiry
  -> clear privileged buffers and persisted flags on revocation
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Startup Acquisition and Rollback Authority
4b. Runtime Readiness Lease and Generation Fencing
4c. Render Surface Resolution and Frame Correlation Authority
4d. Debug Observability Capability and Redaction Authority
5. Snapshot Acceptance Authority
5a. Interaction Target Intent and Cube/Slot Claim Authority
5b. Active-Run Disconnect and Reconnect Authority
5c. Terminal Outcome Authority
6. Host Network Cadence and Fixed Simulation Authority
6a. Host Movement Admission and Client Reconciliation
6b. Snapshot Delivery and Backpressure Authority
6c. Authoritative Randomness and Replay Authority
7. Pause/Resume Authority
```