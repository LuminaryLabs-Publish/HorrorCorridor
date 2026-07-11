# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T01-01-32-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Goal

Advance the internal architecture record from presentation-level lobby return to an explicit run-exit commit that owns lifecycle publication, epoch admission, transport quarantine, snapshot policy, teardown, and clean re-entry.

## Checklist

```txt
[x] Compare the complete accessible Publish inventory with the central ledger.
[x] Exclude TheCavalryOfRome.
[x] Select one repository only.
[x] Verify current source and root .agent state.
[x] Identify the interaction loop.
[x] Identify all current domains.
[x] Identify implemented and planned kits.
[x] Record every kit service boundary.
[x] Audit GameShell exit and transport ownership.
[x] Audit GameCanvas cleanup and publication ownership.
[x] Audit room/snapshot/envelope identity fields.
[x] Define the next DSK boundary.
[x] Add architecture, render, gameplay, interaction, session-authority, and deploy audits.
[x] Refresh required root .agent documents.
[x] Push only to main.
[x] Update the central ledger and internal change log.
```

## Selection comparison

```txt
HorrorCorridor       selected / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
ZombieOrchard        tracked  / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
IntoTheMeadow        tracked  / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
run entry
  -> deterministic snapshot bootstrap
  -> GameCanvas local runtime
  -> host authority or client prediction
  -> gameplay publication and projection
  -> victory restart or pause return
  -> local returnToLobby
  -> GameCanvas unmount cleanup
  -> transport retained
  -> shell message handler retained
  -> old lifecycle/gameplay messages still admissible
  -> possible lobby overwrite or cross-run mutation
  -> re-entry without epoch fence
```

## Main finding

The code already distinguishes transport preservation for lobby return from transport destruction for title exit. What is missing is the authority layer between those choices. A run must become terminal before UI projection and resource cleanup, and every retained callback must be fenced by the new session epoch.

## Recommended source slice

```txt
HorrorCorridor Run Exit Commit + Session Epoch Transport Quarantine Fixture Gate
```

## Validation result

```txt
documentation only
runtime unchanged
tests not run
missing fixture documented
main only
no branch
no pull request
```
