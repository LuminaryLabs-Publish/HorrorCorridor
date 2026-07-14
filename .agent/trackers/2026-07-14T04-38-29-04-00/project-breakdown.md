# Project Breakdown: HorrorCorridor Live-Agent Browser Proof Provenance

**Timestamp:** `2026-07-14T04-38-29-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `live-agent-browser-proof-provenance-retirement-authority-audited`

## Summary

HorrorCorridor includes a recurring live-agent runner and a Playwright/CDP live-player harness that enter a playable run, collect debug state, capture two screenshots, run image probes and publish pass/fail reports.

The evidence is useful but is not bound to one immutable repository revision, dependency environment, server process, browser executable, CDP endpoint, browser context, page generation, renderer frame or artifact manifest. The runner can accept any HTTP response below 500 on the configured URL, reuse any reachable CDP endpoint, load Playwright from an external NexusSimulator checkout and complete cleanup without terminal ownership receipts.

## Plan ledger

**Goal:** establish one source-backed proof transaction that binds every live-agent episode to the exact code, server, browser, page, renderer frame, actions, artifacts and retirement results that produced it.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` by the oldest eligible central timestamp.
- [x] Inspect package scripts, the recurring live-agent runner, the browser harness, browser/CDP admission, screenshot probes, report writing and process cleanup.
- [x] Preserve all 29 implemented runtime/tooling kit surfaces and their services.
- [x] Identify the two live-agent proof adapters and their offered services.
- [x] Define the missing proof-provenance and retirement authority.
- [x] Add the timestamped tracker and focused audit family.
- [x] Refresh all required root `.agent` documents and the machine registry.
- [ ] Implement and execute hermetic source, browser, artifact and retirement fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0

HorrorCorridor    2026-07-13T23-38-39-04-00 selected
MyCozyIsland      2026-07-13T23-58-48-04-00
ZombieOrchard     2026-07-14T00-38-19-04-00
TheUnmappedHouse  2026-07-14T01-00-28-04-00
TheOpenAbove      2026-07-14T01-39-09-04-00
AetherVale        2026-07-14T01-59-05-04-00
TheLongHaul       2026-07-14T02-40-58-04-00
PhantomCommand    2026-07-14T02-58-28-04-00
PrehistoricRush   2026-07-14T03-39-56-04-00
IntoTheMeadow     2026-07-14T04-00-15-04-00
TheCavalryOfRome  excluded
```

## Complete interaction loop

```txt
npm run live-agent or live-agent:sample
  -> create a mutable timestamped run directory
  -> write a running manifest without repository or dependency fingerprints
  -> optionally spawn Next dev server on fixed port 3000
  -> choose an action profile from the previous episode report
  -> synchronously spawn the live-player harness

live-player harness
  -> clean the episode artifact directory
  -> accept any configured HTTP response below 500
  -> optionally reuse an already reachable CDP endpoint
  -> otherwise try multiple browser engines and executable sources
  -> possibly load Playwright from an external NexusSimulator checkout
  -> create or reuse a browser context and open one page
  -> enter solo or host play
  -> enable the runtime debug bridge
  -> wait for a PLAYING debug frame
  -> capture starting debug state and screenshot
  -> hold one movement action profile
  -> capture ending debug state and screenshot
  -> run Python/Pillow luminance and HUD probes
  -> derive canvas, visibility, lighting, prop, texture and movement gates
  -> write report.json and return process status

recurring runner
  -> trust child exit status and optional report.json
  -> append episode summary and replace latest-summary.json
  -> select the next action profile
  -> repeat until count completion or a signal is observed between episodes
  -> kill the optional server and resolve after close or 1.5 seconds
  -> mark the run completed or interrupted
```

## Domains in use

```txt
repository and source revision identity
package, dependency and external-tool environment
Node child-process lifecycle
fixed-port development server startup and retirement
HTTP endpoint admission and server ownership
browser executable discovery and fingerprinting
CDP endpoint discovery, attachment and ownership
browser context and page generation
route and playable-run admission
runtime debug bridge and renderer-frame observation
action-profile selection and keyboard injection
screenshot, visible-text and canvas observation
Python/Pillow luminance and HUD probes
proof gate derivation and episode settlement
artifact paths, hashing, manifesting and promotion
recurring episode scheduling and cancellation
browser/server/process retirement
source, build and deployed-origin proof
repo-local and central audit tracking
```

## Implemented kits and offered services

```txt
implemented kit surfaces: 29
live-agent proof adapters: 2
total documented implemented surfaces: 31
planned coordinating surfaces including parent: 24
```

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | Routing, solo/host/client entry, loading, pause, completion and exit. |
| `corridor-session-domain-kit` | Identity, room, roster, connection, readiness and reset. |
| `runtime-store-snapshot-kit` | Authoritative snapshot, local pose, view, input flags and readiness. |
| `ui-pause-projection-kit` | Pause state, reason and overlay projection. |
| `ui-completion-projection-kit` | Terminal state, message, timestamp and route projection. |
| `complete-screen-presentation-kit` | Outcome presentation, restart and title exit. |
| `lobby-screen-presentation-kit` | Room, roster, ready state and controls. |
| `peer-host-transport-kit` | PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect and destroy. |
| `peer-client-transport-kit` | PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect and destroy. |
| `peer-event-bus-kit` | Typed transport events, subscription and cleanup. |
| `protocol-message-construction-kit` | START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes. |
| `protocol-serialization-kit` | Encode, decode, protocol version and structural validation. |
| `maze-snapshot-bootstrap-kit` | Seed, maze, players, cubes, anomaly and initial snapshot. |
| `seeded-maze-rng-kit` | Topology, placement and target sequence. |
| `first-person-input-kit` | Keyboard, pointer lock, look and input snapshots. |
| `movement-collision-camera-kit` | Movement, maze collision, eye pose, shake and camera. |
| `network-player-update-kit` | Sequence, cadence, pose envelope and host consumption. |
| `corridor-interaction-domain-kit` | Pickup, drop, place, remove and held-cube synchronization. |
| `ordered-anomaly-sequence-kit` | Ordered slots, validation and victory. |
| `ooze-trail-domain-kit` | Spawn, decay, variation, spacing, capacity and pressure. |
| `snapshot-outcome-routing-kit` | Snapshot state to UI outcome. |
| `corridor-authoritative-publication-kit` | Tick, clone, SYNC and broadcast. |
| `corridor-animation-loop-kit` | RAF start, stop, delta, elapsed time and successor scheduling. |
| `corridor-render-world-kit` | Terrain, maze, objects, actors, lights, update and disposal. |
| `corridor-post-processing-kit` | Composer, bloom, resize, render and disposal. |
| `corridor-minimap-kit` | Maze, players, cubes, ooze and heading. |
| `runtime-debug-frame-kit` | Activation, bounded capture, overlay and export. |
| `runtime-resource-cleanup-kit` | Loop, subscriptions, listeners, observers and GPU cleanup. |
| `package-validation-kit` | Build, lint, harness, visual and live-player commands. |
| `live-agent-runner-adapter` | Episode scheduling, adaptive action selection, child-process execution, JSONL logging and run summaries. |
| `live-player-browser-proof-adapter` | Server/browser admission, playable-route control, debug readback, screenshots, image probes and proof gates. |

## Main findings

```txt
repository commit SHA in run manifest: absent
package-lock or dependency fingerprint: absent
external NexusSimulator revision fingerprint: absent
Playwright source can be external: yes
Python/Pillow dependency manifest: absent
server port lease: absent
spawned-server ownership proof: absent
HTTP admission requires expected app identity: no
HTTP admission threshold: any status below 500
CDP endpoint ownership proof: absent
pre-existing CDP reuse: allowed
browser executable/version fingerprint: absent
isolated context required for CDP attach: no
GPU policy: launch candidates include --disable-gpu
page generation ID: absent
debug-frame-to-screenshot correlation ID: absent
artifact content hashes: absent
atomic immutable artifact manifest: absent
child cancellation during spawnSync: unavailable
browser cleanup errors: swallowed
server exit status and terminal retirement receipt: absent
source/build/deployed-origin parity: absent
```

### Evidence can come from an unrelated server

The child harness accepts any response below 500 at the configured URL. When the parent starts a server, neither layer proves that the spawned process owns port 3000 or that the response contains the expected HorrorCorridor revision.

### Browser identity is opportunistic

The harness scans requested and default CDP endpoints, may attach to an existing browser, may reuse its first context, and otherwise tries several browser sources. Reports record a launch mode but no executable digest, browser version, context generation or ownership policy.

### Tooling dependencies are non-hermetic

Playwright is not declared in the project package and may be loaded from a hard-coded NexusSimulator checkout. Screenshot probes depend on Python and Pillow without recording their versions or availability in an immutable environment manifest.

### Screenshots and debug state share a page but not a proven frame

The harness correctly captures debug state and screenshots from one page. It does not bind either screenshot to a renderer frame ID, snapshot revision, image hash or exact action interval, so the report cannot prove which accepted simulation frame produced each image.

### Cancellation and retirement are incomplete

The recurring runner uses `spawnSync`, so SIGINT or SIGTERM only changes a flag while the current child episode remains blocking. Server shutdown resolves on process close or a 1.5-second timeout, and no terminal browser, context, page or server retirement result is added to the evidence manifest.

## Required parent domain

```txt
corridor-live-agent-browser-proof-provenance-retirement-authority-domain
```

## Required transaction

```txt
LiveAgentProofCommand
  -> bind RepositoryRevision and ProductManifestFingerprint
  -> bind package lock, external tool and proof-policy revisions
  -> allocate ProofRunId, EpisodeId and ObservationGeneration
  -> reserve a loopback port and prove spawned-server ownership
  -> admit the expected application identity and source revision
  -> fingerprint browser executable, version, engine and launch policy
  -> admit or reject CDP reuse through an explicit ownership policy
  -> create an isolated browser context and page generation
  -> admit the debug bridge and one PLAYING renderer generation
  -> execute one bounded ActionProfileCommand
  -> capture before/after state and images with matching frame IDs
  -> hash every artifact and write one immutable ArtifactManifest
  -> derive typed ProofGateResults from cited artifacts
  -> atomically publish EpisodeProofResult
  -> cancel child work when the run is retired
  -> close page, context, browser and server under explicit ownership
  -> await and record every terminal retirement receipt
  -> publish LiveAgentProofResult
```

## Planned coordinating kits

```txt
corridor-live-agent-browser-proof-provenance-retirement-authority-domain
live-agent-proof-command-kit
repository-revision-binding-kit
dependency-environment-manifest-kit
server-port-lease-kit
server-ownership-admission-kit
browser-binary-fingerprint-kit
cdp-endpoint-admission-kit
browser-context-generation-kit
page-generation-kit
debug-bridge-admission-kit
frame-evidence-kit
action-profile-command-kit
screenshot-capture-kit
artifact-hash-manifest-kit
artifact-atomic-promotion-kit
proof-gate-result-kit
episode-proof-result-kit
episode-cancellation-kit
browser-retirement-kit
server-retirement-kit
live-agent-terminal-result-kit
proof-observation-journal-kit
live-agent-fixture-matrix-kit
```

## Validation boundary

```txt
documentation changed: yes
runtime, network, gameplay and rendering changed: no
scripts, package, dependencies and deployment changed: no
branch created: no
pull request created: no

npm run live-agent:sample: not run
npm run validate:live-player: not run
npm run build: not run
browser/CDP proof: not run
server-ownership fixture: unavailable
artifact-provenance fixture: unavailable
cancellation and retirement fixture: unavailable
source/build/deployed parity fixture: unavailable
```

No hermetic environment, server ownership, browser identity, frame-to-artifact provenance, cancellation, retirement or production-proof claim is made.