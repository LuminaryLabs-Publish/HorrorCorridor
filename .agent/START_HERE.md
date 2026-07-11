# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T23-30-13-04-00`

## Current safe ledge

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

## Newly documented dependent gate

```txt
HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

Pause authority remains behind the current run-exit/session-identity gate so it can reuse one command envelope, one monotonic session epoch, one terminal-result model, and one stale-message admission policy.

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared against the central repo ledger and root `.agent` state. All nine eligible non-Cavalry repositories were tracked and documented. `HorrorCorridor` had the oldest eligible central review timestamp and was the only product repository changed. `TheCavalryOfRome` remained excluded.

```txt
HorrorCorridor       selected / 2026-07-10T21-39-22-04-00
PhantomCommand       tracked  / 2026-07-10T21-49-26-04-00
ZombieOrchard        tracked  / 2026-07-10T22-11-24-04-00
TheUnmappedHouse     tracked  / 2026-07-10T22-21-17-04-00
MyCozyIsland         tracked  / 2026-07-10T22-29-21-04-00
PrehistoricRush      tracked  / 2026-07-10T22-42-00-04-00
AetherVale           tracked  / 2026-07-10T22-50-02-04-00
IntoTheMeadow        tracked  / 2026-07-10T22-58-36-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T23-30-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T23-30-13-04-00.md
.agent/architecture-audit/2026-07-10T23-30-13-04-00-pause-resume-authority-dsk-map.md
.agent/render-audit/2026-07-10T23-30-13-04-00-paused-frame-projection-convergence-gap.md
.agent/gameplay-audit/2026-07-10T23-30-13-04-00-local-pause-host-simulation-loop.md
.agent/interaction-audit/2026-07-10T23-30-13-04-00-pause-command-input-suspension-map.md
.agent/pause-authority-audit/2026-07-10T23-30-13-04-00-host-client-pause-resume-contract.md
.agent/deploy-audit/2026-07-10T23-30-13-04-00-pause-convergence-fixture-gate.md
```

## Current interaction loop

```txt
solo, host, or client enters PLAYING
  -> GameCanvas installs global input, pointer-lock, animation, render, and transport handlers
  -> Escape or pointer-lock loss changes local uiStore pause/screen state only
  -> local animation branch stops simulation when screen is not PLAYING
  -> replicated gameState remains playing and room phase remains active
  -> host still consumes remote PLAYER_UPDATE and TRY_INTERACT while its own UI is paused
  -> host publishes active SYNC rows
  -> client GameShell maps snapshot.gameState back to PLAYING
  -> client pause can be erased by the next SYNC without a resume command
  -> global key listeners and input state remain partially live
```

## Main finding

Pause is a presentation flag rather than an authoritative gameplay/network transaction.

```txt
host pause does not stop remote command consumption
client pause is overwritten by normal authoritative SYNC
replicated gameState never enters paused
room phase remains active
interaction checks replicated gameState and can still run while local UI is paused
movement/look/input flags are not atomically cleared
pointer-lock loss is not correlated with a terminal pause result
resume is a local screen change with no authority or convergence proof
```

## Ordered safe ledges

```txt
1. Lobby Readiness Authority + Start Admission Fixture Gate
2. Run Exit Authority + Session Epoch Re-entry Fixture Gate
3. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, networking behavior, and deployment configuration did not change. No branch or pull request was created. Repo-local and central documentation were pushed directly to `main`.