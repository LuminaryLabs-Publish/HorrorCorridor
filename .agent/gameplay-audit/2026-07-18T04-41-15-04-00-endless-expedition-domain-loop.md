# Endless-Expedition Domain Loop

**Run:** `2026-07-18T04-41-15-04-00`

## Player loop

```txt
begin expedition
  -> load first building
  -> move and inspect the chamber
  -> detect directional monster signs
  -> use the flashlight to understand or repel the encounter
  -> survive the response window
  -> record Monster Index knowledge
  -> increase encounters-survived score
  -> optionally claim a room offering
  -> stream the next building
  -> repeat until caught
  -> restart solo or recover/rejoin shared play
```

## Domain ownership

| Loop segment | Primary domains |
|---|---|
| start and continuation | Expedition / Departure / Delve |
| route and buildings | Corridor / Maze / Ways / Places / Buildings / Chambers |
| explorer embodiment | Party / Explorers / Explorer / Body / Hands |
| signs and response | Dread / Hunter / Presence / Encounter |
| flashlight and atmosphere | Corridor / Atmosphere / Illumination |
| collection and score | Expedition / Chronicle / Monster Index |
| authority and recovery | Shared Expedition / Stewardship / Shared World / Rejoining |
| terminal outcome | Expedition / Fate and Dread / Capture |

## Current execution truth

The canonical coverage ledger classifies 428 target behavior contracts. It records 132 closed and 296 open. Installed state owners are not counted as implemented gameplay unless a live implementation and evidence exist.

Current implemented gameplay includes the endless delve, building progression, encounter timing, monster response, Monster Index collection, room offerings, caught loss, solo restart and shared reconnect/recovery slices. Many deeper natural contracts remain explicit future work.

## Main gap

Root governance previously summarized the older cube/anomaly/ooze loop, while current product direction explicitly supersedes the ordered Anomaly objective with endless monster encounters and Monster Index progression. Compatibility snapshot fields may remain, but they must not define the active gameplay ledger.

## Required invariant

```txt
active gameplay loop
  -> current natural owner
  -> implemented behavior contract
  -> runtime evidence
  -> accepted browser proof
```

Retired or compatibility-only behavior must remain labeled and must not inflate the closed-contract count.

This audit changes documentation only.