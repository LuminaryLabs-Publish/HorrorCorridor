# HorrorCorridor Command Result Authority Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T18-19-43-04-00`

## Current gameplay loop

```txt
start menu
  -> solo / host / join
  -> seeded maze snapshot
  -> first-person player movement
  -> interact key
  -> infer action from distance-to-end and carrying state
  -> apply pickup / drop / place / remove
  -> validate ordered sequence
  -> update ooze cadence
  -> publish replicated snapshot
  -> render + minimap + debug frame
```

## Current gameplay mechanics

```txt
- first-person keyboard movement
- pointer-lock mouse look
- maze collision
- local pose prediction
- cube pickup
- cube drop
- cube placement into anomaly slots
- cube removal from anomaly slots
- ordered color sequence validation
- host/local ooze cadence
- solo local authority
- host network authority
- client pose send and interaction request send
- replicated snapshot rendering
- minimap projection
- runtime debug overlay/export
```

## Current gameplay authority problem

Gameplay mechanics are implemented, but command outcomes are hidden inside direct `GameState` returns.

```txt
accepted command -> changed GameState
rejected command -> same GameState
unchanged command -> same GameState
skipped network command -> same GameState
request-sync -> same GameState but should be publish-only recovery
victory -> changed GameState but should be explicit victory decision
```

Because rejected, unchanged, skipped, and publish-only paths all collapse into state identity, host/local consumers cannot explain why they published or skipped.

## Required command-result gameplay loop

```txt
interact key or peer message
  -> CommandEnvelope
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> authority consumer action
  -> publish / skip / recovery / victory / no-op
  -> debug projection
  -> fixture row
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
accepted held cube sync
unchanged held-cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
```

## Next gameplay-safe ledge

Implement command results and consumer fixture proof first.

Do not add new maze content, enemy behavior, object-kit visuals, audio, or route features until the command-result loop is fixture-readable.
