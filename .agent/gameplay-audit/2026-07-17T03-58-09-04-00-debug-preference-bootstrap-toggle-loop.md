# HorrorCorridor Debug Preference Bootstrap and Toggle Loop

**Timestamp:** `2026-07-17T03-58-09-04-00`

## Interaction loop

```txt
session snapshot admitted
  -> runtime initialization begins
  -> debug preference reads occur
  -> gameplay world and frame loop begin
  -> player moves, looks, interacts and receives snapshots

optional debug interaction
  -> Backquote toggles overlay
  -> window API toggles enabled/visible state
  -> preference writer persists both flags
  -> frame capture and overlay respond to in-memory state
```

## Source-backed failure loop

```txt
boot under unavailable/denied storage
  -> first debug preference read throws
  -> runtime initialization exits early
  -> player receives no playable world

active game debug toggle under failed storage write
  -> store action writes preferences before returning state patch
  -> write throws
  -> requested toggle may not settle
  -> no typed failure or memory-only result exists
```

## Gameplay impact boundary

The debug preference is optional presentation/tooling state. It must not own admission to:

```txt
maze generation
session readiness
movement and collision
interaction
network publication
world construction
render-loop start
```

## Required authority

```txt
corridor-debug-preference-storage-fault-isolation-authority-domain
```

## Required settlement

```txt
DebugPreferenceReadResult
  -> accepted persisted value
  -> accepted default
  -> accepted memory-only fallback
  -> rejected malformed/elevated value

DebugPreferenceWriteResult
  -> persisted
  -> memory-only
  -> unavailable
  -> failed

DebugBootstrapSettlementResult
  -> gameplay boot allowed independently of optional persistence
```

## Invariants

```txt
optional debug persistence never blocks a playable session
storage failure never changes maze/session/gameplay truth
an accepted toggle remains usable in memory when persistence fails
no storage exception escapes the debug authority boundary
```

## Claim boundary

The runtime remains unchanged. No storage-denial gameplay fixture was run.