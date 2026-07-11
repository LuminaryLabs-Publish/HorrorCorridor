# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T20-08-46-04-00`

## Current safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared against the central repo ledger and root `.agent` state. All nine eligible non-Cavalry repositories were tracked and documented. `HorrorCorridor` was the oldest eligible fallback. `TheCavalryOfRome` remained excluded.

```txt
HorrorCorridor       selected / prior 2026-07-10T18-31-21-04-00
PhantomCommand       tracked  / 2026-07-10T18-40-13-04-00
ZombieOrchard        tracked  / 2026-07-10T18-49-54-04-00
TheUnmappedHouse     tracked  / 2026-07-10T19-00-19-04-00
MyCozyIsland         tracked  / 2026-07-10T19-11-19-04-00
PrehistoricRush      tracked  / 2026-07-10T19-30-36-04-00
AetherVale           tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow        tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove         tracked  / 2026-07-10T19-58-34-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T20-08-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T20-08-46-04-00.md
.agent/architecture-audit/2026-07-10T20-08-46-04-00-lobby-readiness-start-admission-dsk-map.md
.agent/render-audit/2026-07-10T20-08-46-04-00-lobby-readiness-admission-projection-gap.md
.agent/gameplay-audit/2026-07-10T20-08-46-04-00-lobby-ready-start-bootstrap-loop.md
.agent/interaction-audit/2026-07-10T20-08-46-04-00-ready-command-start-result-map.md
.agent/lobby-authority-audit/2026-07-10T20-08-46-04-00-readiness-roster-start-contract.md
.agent/protocol-audit/2026-07-10T20-08-46-04-00-readiness-vocabulary-convergence-map.md
.agent/deploy-audit/2026-07-10T20-08-46-04-00-lobby-admission-fixture-gate.md
```

## Current interaction loop

```txt
host or client enters lobby
  -> roster and ready badges render
  -> client toggles readiness locally
  -> no ready command reaches host authority
  -> host presses Start run
  -> source checks only host mode and room presence
  -> current host-side lobby roster becomes active player entities
  -> host publishes START_GAME and initial SYNC
  -> clients enter the corridor
```

## Main finding

The lobby claims readiness-gated behavior but has no readiness authority or start-admission policy.

```txt
client readiness changes only local Zustand state
host never receives or accepts the readiness intent
multiple protocol vocabularies name readiness without one canonical route
active-game networkRules treats toggle-ready as a no-op
host Start run does not require connected clients to be ready
host-added placeholders can become active player entities
room phase does not enter an authoritative starting transaction
UI and runtime debug expose no admission result or blocked reason
```

The next source pass should isolate lobby commands from gameplay interactions, make the host the only roster authority, seal an admitted roster before bootstrap, and prove the contract with a DOM-free fixture.

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, networking behavior, and deployment configuration did not change. No branch or pull request was created. Repo-local and central documentation were pushed directly to `main`.