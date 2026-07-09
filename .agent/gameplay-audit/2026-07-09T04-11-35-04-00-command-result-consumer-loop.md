# Gameplay Audit: Command Result Consumer Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

## Current gameplay loop

```txt
start solo/host/join
  -> spawn or receive replicated maze snapshot
  -> enter first-person maze
  -> move through corridor with pointer-lock input
  -> find colored cubes
  -> pick up/drop cube
  -> carry cube to anomaly
  -> place or remove cube from ordered sequence slots
  -> validate ordered sequence
  -> avoid/track ooze pressure
  -> publish replicated snapshots
  -> complete when ordered sequence is solved
```

## Current input-to-action derivation

`GameCanvas` derives one of four action strings from local state.

```txt
if near anomaly and carrying cube:
  place-cube-at-anomaly

if near anomaly and not carrying cube:
  remove-cube-from-anomaly

if far from anomaly and carrying cube:
  drop-cube

if far from anomaly and not carrying cube:
  pickup-cube
```

## Current command behavior

```txt
pickup-cube:
  accepted when playing, player exists, player is not carrying, and a loose cube is in range
  rejected branches silently return unchanged GameState

drop-cube:
  accepted when playing, player exists, and player is carrying
  rejected branches silently return unchanged GameState

place-cube-at-anomaly:
  accepted when playing, player exists, carried cube exists, anomaly exists, player is near anomaly, and free slot exists
  victory can occur after ordered sequence validation
  rejected branches silently return unchanged GameState

remove-cube-from-anomaly:
  accepted when playing, player exists, player is not carrying, anomaly exists, player is near anomaly, and last occupied slot matches optional slot
  rejected branches silently return unchanged GameState

request-sync:
  currently returns unchanged GameState but host can publish recovery

toggle-ready / cancel / unknown:
  currently return unchanged GameState without reason metadata
```

## Gameplay problem

Gameplay can work, but the command loop is not explainable.

The player can press interact and nothing happens, but the system has no first-class reason to expose in debug, fixture output, or host/client replay.

## Required gameplay result states

```txt
accepted: changed state and maybe publish
rejected: valid command shape but command could not apply
unchanged: command accepted structurally but no state diff
publish-only: recovery/full-sync command that does not mutate game state
skipped: command is intentionally ignored by current policy
victory: accepted command completed the sequence
```

## Required gameplay fixture rows

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held-cube sync
unchanged held-cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
runtime debug command decision projection is serializable
GameCanvas consumer splice preserves legacy snapshot shape
```

## Next gameplay ledge

```txt
HorrorCorridor Command Authority Replay Fixture + GameCanvas Consumer Freeze
```

The build should make all silent command outcomes visible before gameplay content changes.
