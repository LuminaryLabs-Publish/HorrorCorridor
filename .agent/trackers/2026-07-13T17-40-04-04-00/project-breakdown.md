# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Run:** `2026-07-13T17-40-04-04-00`  
**Status:** `host-start-barrier-loading-generation-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS and a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, cube interactions, ooze pressure, authoritative snapshots, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates multiplayer start admission. The host can begin a run whenever a room exists. It does not require a sealed roster, connected membership, all-ready status, a stable room revision, a cancellable loading generation, client preparation acknowledgements, or one correlated `START_GAME`/`SYNC` transaction. The host commits its own playable state before sending two independent broadcasts, while clients accept either message without a shared start identity or terminal convergence result.

## Plan ledger

**Goal:** make lobby-to-run transition one generation-bound transaction that either converges the sealed host and client roster on one initial snapshot and first coherent frame or leaves every participant in the predecessor lobby.

- [x] Compare the full Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only HorrorCorridor under the oldest eligible rule.
- [x] Trace host start, loading, bootstrap, local commit, broadcasts and client handling.
- [x] Preserve the 29 implemented kits and offered services.
- [x] Define the parent DSK and candidate authority surfaces.
- [x] Add architecture, render, gameplay, interaction, lobby-start, deploy and central-sync audits.
- [ ] Implement and execute the authority and fixture matrix.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible repositories: 9
excluded: TheCavalryOfRome
new eligible repositories: 0
ledger-missing repositories: 0
root .agent missing: 0
unsynchronized repositories: 0
selected: HorrorCorridor
selection rule: oldest eligible central entry
prior central timestamp: 2026-07-13T11-58-45-04-00
```

## Complete interaction loop

```txt
host lobby
  -> room and roster already exist in session store
  -> host presses Start
  -> only sessionMode === host and room existence are checked
  -> screen changes to LOADING
  -> five requestAnimationFrame + 90 ms waits execute
  -> no loading attempt identity or cancellation check
  -> current room and lobbyPlayers are read after the waits
  -> deterministic initial game state is created
  -> host room, roster, snapshot, UI and readiness commit locally
  -> host enters PLAYING
  -> START_GAME broadcasts
  -> SYNC broadcasts separately

client reception
  -> START_GAME may update room, roster and host identity
  -> SYNC may independently update room, roster and snapshot
  -> SYNC sets PLAYING and all readiness flags true
  -> no shared StartAttemptId or roster revision is required
  -> no client prepared/loaded/visible acknowledgement returns to host

failure or race
  -> roster/readiness/connection may change during loading waits
  -> return-to-title or transport replacement does not cancel loading
  -> host can commit a run from a changed or unready lobby
  -> START_GAME and SYNC can be delayed, duplicated or observed independently
  -> no aggregate start result or rollback restores every participant
```

## Domains in use

```txt
application shell and route lifecycle
session mode identity room roster connection readiness and reset
host start admission sealed roster and lobby revision
loading attempt identity cancellation timeout and supersession
deterministic maze and initial snapshot bootstrap
PeerJS and BroadcastChannel transport
protocol envelope construction serialization and semantic admission
START_GAME SYNC correlation and source admission
client preparation acknowledgement and convergence
runtime snapshot pose input cadence and publication
UI lobby loading playing pause completion overlays and hints
first-person input movement collision and camera
cube interaction anomaly sequence and ooze pressure
Three.js world post-processing minimap HUD and diagnostics
first coherent multiplayer frame acknowledgement
cleanup validation build Pages deployment and central tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit: routing solo/host/client entry loading pause completion exit
corridor-session-domain-kit: identity room roster connection readiness reset
runtime-store-snapshot-kit: snapshot pose view input flags readiness
ui-pause-projection-kit: pause state reason overlay
ui-completion-projection-kit: terminal state message timestamp routing
complete-screen-presentation-kit: outcome presentation restart title exit
lobby-screen-presentation-kit: room roster ready state controls
peer-host-transport-kit: PeerJS host BroadcastChannel bridge connections broadcast targeted send disconnect destroy
peer-client-transport-kit: PeerJS client BroadcastChannel bridge connect send status disconnect destroy
peer-event-bus-kit: typed transport events subscription cleanup
protocol-message-construction-kit: START_GAME PLAYER_UPDATE TRY_INTERACT SYNC LOBBY_EVENT
protocol-serialization-kit: encode decode protocol version structural validation
maze-snapshot-bootstrap-kit: seed maze players cubes anomaly initial snapshot
seeded-maze-rng-kit: topology placement target sequence
first-person-input-kit: keyboard pointer lock look snapshots
movement-collision-camera-kit: movement collision eye pose shake camera
network-player-update-kit: sequence cadence pose envelope host consume
corridor-interaction-domain-kit: pickup drop place remove held-cube synchronization
ordered-anomaly-sequence-kit: ordered slots validation victory
ooze-trail-domain-kit: spawn decay variation spacing capacity pressure
snapshot-outcome-routing-kit: snapshot state to UI outcome
corridor-authoritative-publication-kit: tick clone SYNC broadcast
corridor-animation-loop-kit: RAF start stop delta elapsed successor scheduling
corridor-render-world-kit: terrain maze objects actors lights update dispose
corridor-post-processing-kit: composer bloom resize render dispose
corridor-minimap-kit: maze players cubes ooze heading
runtime-debug-frame-kit: activation bounded capture overlay export
runtime-resource-cleanup-kit: loop subscriptions listeners observers GPU cleanup
package-validation-kit: build lint harness visual live-player checks
```

```txt
implemented source-backed kits: 29
```

## Source-backed findings

```txt
host-mode check before start: yes
room-exists check before start: yes
all-members-ready check: no
connected-member check: no
minimum/maximum sealed roster check at start: no
room or roster expected revision: no
start command identity: no
loading generation: no
loading cancellation or supersession check: no
loading timeout result: no
host local commit before broadcasts: yes
START_GAME and SYNC sent separately: yes
shared start transaction ID: no
protocol START_ACK or CLIENT_READY message: no
client preparation result: no
host waits for client acknowledgement: no
client accepts SYNC without prior correlated START_GAME: yes
rollback to predecessor lobby across participants: no
first coherent host/client frame acknowledgement: no
```

## Required authority

```txt
corridor-host-start-barrier-loading-generation-authority-domain
```

## Required transaction

```txt
HostStartCommand
  -> bind room, roster, transport and policy revisions
  -> allocate StartAttemptId and LoadingGeneration
  -> seal the eligible roster
  -> require connected and ready members under explicit policy
  -> reject duplicate stale unready disconnected or invalid commands
  -> prepare one deterministic initial snapshot without mutating live state
  -> request client preparation for the sealed roster
  -> collect typed Prepared Rejected TimedOut or Disconnected results
  -> commit host session runtime UI readiness and transport generation together
  -> send one correlated start envelope or correlated START_GAME and SYNC pair
  -> require client commit acknowledgements for the same attempt
  -> quarantine predecessor and late messages
  -> acknowledge the first coherent frame for every required participant
  -> publish HostStartResult
  -> otherwise cancel loading and restore the predecessor lobby everywhere
```

## Candidate authority kits

```txt
host-start-command-kit
start-attempt-id-kit
loading-generation-kit
lobby-revision-kit
sealed-roster-kit
member-connection-policy-kit
member-readiness-policy-kit
start-precondition-result-kit
loading-cancellation-kit
loading-timeout-kit
initial-snapshot-candidate-kit
client-prepare-request-kit
client-prepare-result-kit
start-participant-journal-kit
start-envelope-correlation-kit
start-message-source-admission-kit
client-start-commit-kit
host-start-commit-kit
start-rollback-kit
late-start-message-quarantine-kit
multiplayer-readiness-derivation-kit
host-start-result-kit
first-multiplayer-frame-ack-kit
unready-member-fixture-kit
disconnect-during-loading-fixture-kit
roster-change-during-loading-fixture-kit
start-sync-reorder-fixture-kit
duplicate-start-fixture-kit
source-build-pages-host-start-fixture-kit
```

## Required repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/turn-ledger/2026-07-13T17-40-04-04-00.md
.agent/architecture-audit/2026-07-13T17-40-04-04-00-host-start-barrier-loading-generation-dsk-map.md
.agent/render-audit/2026-07-13T17-40-04-04-00-host-start-visible-frame-convergence-gap.md
.agent/gameplay-audit/2026-07-13T17-40-04-04-00-unsealed-lobby-start-loading-race-loop.md
.agent/interaction-audit/2026-07-13T17-40-04-04-00-host-start-command-client-ack-map.md
.agent/lobby-start-audit/2026-07-13T17-40-04-04-00-sealed-roster-loading-generation-contract.md
.agent/deploy-audit/2026-07-13T17-40-04-04-00-host-start-barrier-fixture-gate.md
.agent/central-sync-audit/2026-07-13T17-40-04-04-00-repo-ledger-host-start-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, dependency, package-script or deployment behavior changed. No sealed lobby, cancellable loading, client acknowledgement, atomic start, rollback, multiplayer visible-frame or production-readiness claim is made.