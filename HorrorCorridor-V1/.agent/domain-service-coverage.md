# Horror Corridor Domain-Service Coverage

Status: generated active ledger

## Evidence Boundary

- Canonical source: `.agent/horror-corridor-domain-tree.md` at `f33efb09c9d402ad236724d358043d64d58def7f3b0ec92df051c1bf772b526a`.
- Generated blueprint: `src/engine/generated/horrorCorridorDomainBlueprint.json`.
- Live proof: `docs/live-player-harness/latest/report.json`, created `2026-07-18T01:49:23.332Z`, status `passed`.
- Shared recovery proof: `docs/live-player-harness/reconnect-recovery-proof/report.json`, created `2026-07-18T02:01:03.346Z`, status `passed`, 64112 ms, with 13/13 gates passing.
- Wet concrete floor proof: `docs/live-player-harness/floor-material-proof/report.json`, created `2026-07-18T01:51:39.839Z`, status `passed`, with 29/29 gates passing and 0 console errors.
- Installed composition: 474 total installs, 36 current NexusEngine core kits, 73 local descriptor kits, 6 top-level composition kits, 359 mutable natural domain owners, and 405 registered paths.
- Reset/replay proof: 359/359 domains reset, 359 returned to revision zero, and reset/fresh replay digests match `fnv1a32:d9c162ba`.
- Classification is intentionally strict: an installed state owner does not make its attached behavior kit implemented.

## Summary

- Natural domains: 359.
- Unique target kit contracts across domains and hosts: 428.
- Open behavior contracts: 296.
- Classification counts: contract-only=275, host-wired=9, implemented-gameplay=34, installed-core=34, installed-local=55, legacy-cutover=12, public-candidate=9.

### Open contracts by top-level owner

| Owner | Open mounts |
|---|---:|
| host:browser-game-host | 1 |
| n:horror-corridor:corridor | 191 |
| n:horror-corridor:dread | 54 |
| n:horror-corridor:expedition | 11 |
| n:horror-corridor:party | 38 |
| n:horror-corridor:shared-expedition | 3 |

## Domain State Owners

Every row below is installed, snapshotted, and reset by the generated natural-domain DSK. Attached kit counts are contracts, not implied behavior coverage.

| Domain path | State fields | Attached kits | Runtime owner kit | State-owner status |
|---|---:|---:|---|---|
| n:horror-corridor | 0 | 1 | n-horror-corridor-domain-kit | installed-state-owner |
| n:horror-corridor:expedition | 4 | 7 | n-horror-corridor-expedition-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:departure | 4 | 1 | n-horror-corridor-expedition-departure-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve | 5 | 2 | n-horror-corridor-expedition-delve-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:wayfinding | 3 | 2 | n-horror-corridor-expedition-delve-wayfinding-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:wayfinding:known-places | 3 | 1 | n-horror-corridor-expedition-delve-wayfinding-known-places-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:wayfinding:known-ways | 3 | 1 | n-horror-corridor-expedition-delve-wayfinding-known-ways-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:wayfinding:return-way | 4 | 1 | n-horror-corridor-expedition-delve-wayfinding-return-way-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:discovery | 3 | 1 | n-horror-corridor-expedition-delve-discovery-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:discovery:sightings | 3 | 1 | n-horror-corridor-expedition-delve-discovery-sightings-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:discovery:understanding | 3 | 1 | n-horror-corridor-expedition-delve-discovery-understanding-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:journey-traces | 3 | 1 | n-horror-corridor-expedition-delve-journey-traces-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:journey-traces:personal-trail | 3 | 1 | n-horror-corridor-expedition-delve-journey-traces-personal-trail-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:delve:journey-traces:shared-trail | 3 | 1 | n-horror-corridor-expedition-delve-journey-traces-shared-trail-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:fate | 3 | 1 | n-horror-corridor-expedition-fate-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:chronicle | 5 | 2 | n-horror-corridor-expedition-chronicle-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:chronicle:monster-index | 3 | 1 | n-horror-corridor-expedition-chronicle-monster-index-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:chronicle:monster-index:monster-record | 4 | 1 | n-horror-corridor-expedition-chronicle-monster-index-monster-record-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:chronicle:monster-index:monster-record:sighting | 2 | 1 | n-horror-corridor-expedition-chronicle-monster-index-monster-record-sighting-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:chronicle:monster-index:monster-record:scare-lesson | 2 | 1 | n-horror-corridor-expedition-chronicle-monster-index-monster-record-scare-lesson-domain-kit | installed-state-owner |
| n:horror-corridor:expedition:chronicle:monster-index:monster-record:collection-mark | 2 | 1 | n-horror-corridor-expedition-chronicle-monster-index-monster-record-collection-mark-domain-kit | installed-state-owner |
| n:horror-corridor:corridor | 3 | 7 | n-horror-corridor-corridor-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze | 3 | 2 | n-horror-corridor-corridor-maze-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:ways | 3 | 1 | n-horror-corridor-corridor-maze-ways-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:ways:main-way | 3 | 1 | n-horror-corridor-corridor-maze-ways-main-way-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:ways:side-ways | 3 | 1 | n-horror-corridor-corridor-maze-ways-side-ways-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:ways:return-ways | 3 | 1 | n-horror-corridor-corridor-maze-ways-return-ways-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:ways:closed-ways | 3 | 1 | n-horror-corridor-corridor-maze-ways-closed-ways-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places | 2 | 1 | n-horror-corridor-corridor-maze-places-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:entrance | 3 | 1 | n-horror-corridor-corridor-maze-places-entrance-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:passages | 2 | 1 | n-horror-corridor-corridor-maze-places-passages-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:passages:passage | 4 | 1 | n-horror-corridor-corridor-maze-places-passages-passage-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:junctions | 2 | 1 | n-horror-corridor-corridor-maze-places-junctions-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:junctions:junction | 3 | 1 | n-horror-corridor-corridor-maze-places-junctions-junction-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:dead-ends | 2 | 1 | n-horror-corridor-corridor-maze-places-dead-ends-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:dead-ends:dead-end | 3 | 1 | n-horror-corridor-corridor-maze-places-dead-ends-dead-end-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:thresholds | 2 | 1 | n-horror-corridor-corridor-maze-places-thresholds-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:thresholds:threshold | 4 | 1 | n-horror-corridor-corridor-maze-places-thresholds-threshold-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:buildings | 2 | 1 | n-horror-corridor-corridor-maze-places-buildings-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:buildings:building | 4 | 1 | n-horror-corridor-corridor-maze-places-buildings-building-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:buildings:building:chambers | 2 | 1 | n-horror-corridor-corridor-maze-places-buildings-building-chambers-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:buildings:building:chambers:chamber | 4 | 1 | n-horror-corridor-corridor-maze-places-buildings-building-chambers-chamber-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:buildings:building:chambers:chamber:offering | 3 | 1 | n-horror-corridor-corridor-maze-places-buildings-building-chambers-chamber-offering-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:places:heart | 3 | 1 | n-horror-corridor-corridor-maze-places-heart-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:regions | 2 | 1 | n-horror-corridor-corridor-maze-regions-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:regions:verge | 3 | 1 | n-horror-corridor-corridor-maze-regions-verge-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:regions:depths | 3 | 1 | n-horror-corridor-corridor-maze-regions-depths-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:maze:regions:inner-reach | 3 | 1 | n-horror-corridor-corridor-maze-regions-inner-reach-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground | 4 | 3 | n-horror-corridor-corridor-ground-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface | 3 | 1 | n-horror-corridor-corridor-ground-surface-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving | 3 | 1 | n-horror-corridor-corridor-ground-surface-paving-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving:concrete | 3 | 1 | n-horror-corridor-corridor-ground-surface-paving-concrete-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving:concrete:slabs | 2 | 1 | n-horror-corridor-corridor-ground-surface-paving-concrete-slabs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving:concrete:slabs:slab | 4 | 1 | n-horror-corridor-corridor-ground-surface-paving-concrete-slabs-slab-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving:brickwork | 3 | 1 | n-horror-corridor-corridor-ground-surface-paving-brickwork-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving:brickwork:bricks | 2 | 1 | n-horror-corridor-corridor-ground-surface-paving-brickwork-bricks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:paving:brickwork:bricks:brick | 3 | 1 | n-horror-corridor-corridor-ground-surface-paving-brickwork-bricks-brick-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:earth | 3 | 1 | n-horror-corridor-corridor-ground-surface-earth-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:surface:mud | 4 | 1 | n-horror-corridor-corridor-ground-surface-mud-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble | 3 | 1 | n-horror-corridor-corridor-ground-rubble-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble:fallen-masonry | 3 | 1 | n-horror-corridor-corridor-ground-rubble-fallen-masonry-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble:fallen-masonry:fallen-bricks | 2 | 1 | n-horror-corridor-corridor-ground-rubble-fallen-masonry-fallen-bricks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble:fallen-masonry:fallen-stone | 2 | 1 | n-horror-corridor-corridor-ground-rubble-fallen-masonry-fallen-stone-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble:fallen-masonry:broken-concrete | 2 | 1 | n-horror-corridor-corridor-ground-rubble-fallen-masonry-broken-concrete-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble:scrap | 3 | 1 | n-horror-corridor-corridor-ground-rubble-scrap-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:rubble:loose-slabs | 3 | 1 | n-horror-corridor-corridor-ground-rubble-loose-slabs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:water | 3 | 1 | n-horror-corridor-corridor-ground-water-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:water:puddles | 2 | 1 | n-horror-corridor-corridor-ground-water-puddles-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:water:puddles:puddle | 4 | 1 | n-horror-corridor-corridor-ground-water-puddles-puddle-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:water:pools | 2 | 1 | n-horror-corridor-corridor-ground-water-pools-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:water:pools:pool | 3 | 1 | n-horror-corridor-corridor-ground-water-pools-pool-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ground:water:floodwater | 4 | 1 | n-horror-corridor-corridor-ground-water-floodwater-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin | 3 | 1 | n-horror-corridor-corridor-ruin-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure | 3 | 1 | n-horror-corridor-corridor-ruin-structure-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:foundations | 3 | 1 | n-horror-corridor-corridor-ruin-structure-foundations-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:floors | 3 | 1 | n-horror-corridor-corridor-ruin-structure-floors-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:walls | 2 | 1 | n-horror-corridor-corridor-ruin-structure-walls-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:walls:wall | 3 | 1 | n-horror-corridor-corridor-ruin-structure-walls-wall-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:walls:wall:wall-face | 3 | 1 | n-horror-corridor-corridor-ruin-structure-walls-wall-wall-face-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:walls:wall:wall-core | 3 | 1 | n-horror-corridor-corridor-ruin-structure-walls-wall-wall-core-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:walls:wall:wall-wounds | 3 | 1 | n-horror-corridor-corridor-ruin-structure-walls-wall-wall-wounds-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:ceilings | 2 | 1 | n-horror-corridor-corridor-ruin-structure-ceilings-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:ceilings:ceiling | 4 | 1 | n-horror-corridor-corridor-ruin-structure-ceilings-ceiling-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:ceilings:ceiling:openings | 3 | 1 | n-horror-corridor-corridor-ruin-structure-ceilings-ceiling-openings-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:ceilings:ceiling:supports | 3 | 1 | n-horror-corridor-corridor-ruin-structure-ceilings-ceiling-supports-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:structure:facades | 3 | 1 | n-horror-corridor-corridor-ruin-structure-facades-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:decay | 3 | 1 | n-horror-corridor-corridor-ruin-decay-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:decay:damp | 3 | 1 | n-horror-corridor-corridor-ruin-decay-damp-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:decay:cracking | 3 | 1 | n-horror-corridor-corridor-ruin-decay-cracking-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:decay:spalling | 3 | 1 | n-horror-corridor-corridor-ruin-decay-spalling-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:decay:corrosion | 3 | 1 | n-horror-corridor-corridor-ruin-decay-corrosion-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:supply | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-supply-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:supply:generator | 4 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-supply-generator-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:circuits | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-circuits-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:circuits:circuit | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-circuits-circuit-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:wiring | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-wiring-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:wiring:cable | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-wiring-cable-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:lamps | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-lamps-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:electricity:lamps:lamp | 4 | 1 | n-horror-corridor-corridor-ruin-utilities-electricity-lamps-lamp-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:channels | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-channels-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:channels:channel | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-channels-channel-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:drains | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-drains-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:drains:drain | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-drains-drain-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:culverts | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-culverts-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:culverts:culvert | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-culverts-culvert-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:drainage:blockages | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-drainage-blockages-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:ventilation | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-ventilation-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:ventilation:ducts | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-ventilation-ducts-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:ventilation:ducts:duct | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-ventilation-ducts-duct-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:ventilation:vents | 2 | 1 | n-horror-corridor-corridor-ruin-utilities-ventilation-vents-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:ventilation:vents:vent | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-ventilation-vents-vent-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:utilities:ventilation:drafts | 3 | 1 | n-horror-corridor-corridor-ruin-utilities-ventilation-drafts-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:access | 3 | 1 | n-horror-corridor-corridor-ruin-access-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:access:doors | 3 | 1 | n-horror-corridor-corridor-ruin-access-doors-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:access:doors:door | 4 | 1 | n-horror-corridor-corridor-ruin-access-doors-door-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:access:fences | 2 | 1 | n-horror-corridor-corridor-ruin-access-fences-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:access:fences:fence | 3 | 1 | n-horror-corridor-corridor-ruin-access-fences-fence-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:access:barricades | 3 | 1 | n-horror-corridor-corridor-ruin-access-barricades-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants | 3 | 1 | n-horror-corridor-corridor-ruin-remnants-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:storage | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-storage-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:storage:shelves | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-storage-shelves-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:storage:crates | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-storage-crates-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:storage:barrels | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-storage-barrels-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:workplaces | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-workplaces-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:workplaces:tables | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-workplaces-tables-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:workplaces:service-equipment | 2 | 1 | n-horror-corridor-corridor-ruin-remnants-workplaces-service-equipment-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:hanging-remains | 3 | 1 | n-horror-corridor-corridor-ruin-remnants-hanging-remains-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:hanging-remains:chains | 3 | 1 | n-horror-corridor-corridor-ruin-remnants-hanging-remains-chains-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:hanging-remains:hooks | 3 | 1 | n-horror-corridor-corridor-ruin-remnants-hanging-remains-hooks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:ruin:remnants:hanging-remains:cloth | 3 | 1 | n-horror-corridor-corridor-ruin-remnants-hanging-remains-cloth-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth | 6 | 3 | n-horror-corridor-corridor-overgrowth-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:habitat | 3 | 1 | n-horror-corridor-corridor-overgrowth-habitat-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:habitat:moisture | 3 | 1 | n-horror-corridor-corridor-overgrowth-habitat-moisture-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:habitat:shade | 3 | 1 | n-horror-corridor-corridor-overgrowth-habitat-shade-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:habitat:disturbance | 3 | 1 | n-horror-corridor-corridor-overgrowth-habitat-disturbance-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:grass | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-grass-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts | 2 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-grass-tufts-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts:tuft | 4 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-grass-tufts-tuft-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts:tuft:blades | 2 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-grass-tufts-tuft-blades-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts:tuft:blades:blade | 4 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-grass-tufts-tuft-blades-blade-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:grass:seed-heads | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-grass-seed-heads-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:moss | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-moss-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches | 2 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-moss-patches-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches:patch | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-moss-patches-patch-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches:patch:heart | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-moss-patches-patch-heart-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches:patch:edge | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-moss-patches-patch-edge-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:moss:spores | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-moss-spores-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:mold | 3 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-mold-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:ground-growth:mold:colony | 4 | 1 | n-horror-corridor-corridor-overgrowth-ground-growth-mold-colony-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:wild-roots | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-wild-roots-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:wild-roots:root-mats | 2 | 1 | n-horror-corridor-corridor-overgrowth-creepers-wild-roots-root-mats-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:wild-roots:root-mats:root-mat | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-wild-roots-root-mats-root-mat-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:vines | 2 | 1 | n-horror-corridor-corridor-overgrowth-creepers-vines-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:vines:vine | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-vines-vine-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:vines:vine:stem | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-vines-vine-stem-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:vines:vine:anchors | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-vines-vine-anchors-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:creepers:vines:vine:vine-leaves | 3 | 1 | n-horror-corridor-corridor-overgrowth-creepers-vines-vine-vine-leaves-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree | 5 | 2 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root | 5 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:root-cap | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-root-cap-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-growth-zone-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:meristem | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-growth-zone-meristem-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:elongation-zone | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-growth-zone-elongation-zone-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:maturation-zone | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-growth-zone-maturation-zone-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:maturation-zone:root-hairs | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-growth-zone-maturation-zone-root-hairs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:maturation-zone:root-hairs:root-hair | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-tip-growth-zone-maturation-zone-root-hairs-root-hair-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-interior-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior:vascular-core | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-interior-vascular-core-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior:vascular-core:xylem | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-interior-vascular-core-xylem-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior:vascular-core:phloem | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-interior-vascular-core-phloem-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-skin | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-roots-root-system-root-root-skin-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:heartwood | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-heartwood-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:sapwood | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-sapwood-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:sapwood:vessels | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-sapwood-vessels-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:sapwood:vessels:vessel | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-sapwood-vessels-vessel-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:growth-rings | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-growth-rings-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:growth-rings:ring | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wood-growth-rings-ring-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:bark | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-bark-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:bark:inner-bark | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-bark-inner-bark-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:bark:outer-bark | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-bark-outer-bark-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wounds | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wounds-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wounds:scar | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wounds-scar-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wounds:rot-pocket | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-trunk-wounds-rot-pocket-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf | 5 | 2 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:stalk | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-stalk-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:midrib | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-midrib-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-side-veins-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-side-veins-vein-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein:vessels | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-side-veins-vein-vessels-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein:vessels:xylem | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-side-veins-vein-vessels-xylem-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein:vessels:phloem | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-veins-side-veins-vein-vessels-phloem-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-surface-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:cuticle | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-surface-cuticle-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:pores | 2 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-surface-pores-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:pores:stoma | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-surface-pores-stoma-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:pores:stoma:guard-cells | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-blade-surface-pores-stoma-guard-cells-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:leaf-life | 5 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-leaf-life-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:leaf-life:growth-memory | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-leaf-life-growth-memory-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:leaf-life:nourishment | 3 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-boughs-bough-branches-branch-twigs-twig-buds-bud-leaf-cluster-leaves-leaf-leaf-life-nourishment-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:canopy | 4 | 1 | n-horror-corridor-corridor-overgrowth-grove-trees-tree-crown-canopy-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere | 3 | 2 | n-horror-corridor-corridor-atmosphere-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air | 3 | 1 | n-horror-corridor-corridor-atmosphere-air-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:dampness | 3 | 1 | n-horror-corridor-corridor-atmosphere-air-dampness-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:fog | 3 | 1 | n-horror-corridor-corridor-atmosphere-air-fog-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:fog:fog-banks | 2 | 1 | n-horror-corridor-corridor-atmosphere-air-fog-fog-banks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:fog:fog-banks:fog-bank | 4 | 1 | n-horror-corridor-corridor-atmosphere-air-fog-fog-banks-fog-bank-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:fog:fog-drift | 3 | 1 | n-horror-corridor-corridor-atmosphere-air-fog-fog-drift-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:fog:fog-wake | 3 | 1 | n-horror-corridor-corridor-atmosphere-air-fog-fog-wake-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:air:drafts | 3 | 1 | n-horror-corridor-corridor-atmosphere-air-drafts-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination | 4 | 1 | n-horror-corridor-corridor-atmosphere-illumination-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination:darkness | 3 | 1 | n-horror-corridor-corridor-atmosphere-illumination-darkness-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination:lamp-pools | 3 | 1 | n-horror-corridor-corridor-atmosphere-illumination-lamp-pools-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination:daylight-leaks | 3 | 1 | n-horror-corridor-corridor-atmosphere-illumination-daylight-leaks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination:anomaly-glow | 3 | 1 | n-horror-corridor-corridor-atmosphere-illumination-anomaly-glow-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination:flashlight-beam | 5 | 1 | n-horror-corridor-corridor-atmosphere-illumination-flashlight-beam-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:illumination:sightlines | 3 | 1 | n-horror-corridor-corridor-atmosphere-illumination-sightlines-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:acoustics | 3 | 1 | n-horror-corridor-corridor-atmosphere-acoustics-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:acoustics:room-tone | 3 | 1 | n-horror-corridor-corridor-atmosphere-acoustics-room-tone-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:acoustics:echoes | 3 | 1 | n-horror-corridor-corridor-atmosphere-acoustics-echoes-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:acoustics:footfalls | 3 | 1 | n-horror-corridor-corridor-atmosphere-acoustics-footfalls-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:acoustics:silence | 3 | 1 | n-horror-corridor-corridor-atmosphere-acoustics-silence-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:landmarks | 3 | 1 | n-horror-corridor-corridor-atmosphere-landmarks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:landmarks:structural-signs | 3 | 1 | n-horror-corridor-corridor-atmosphere-landmarks-structural-signs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:landmarks:living-signs | 3 | 1 | n-horror-corridor-corridor-atmosphere-landmarks-living-signs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:landmarks:anomaly-signs | 3 | 1 | n-horror-corridor-corridor-atmosphere-landmarks-anomaly-signs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:atmosphere:landmarks:trail-signs | 3 | 1 | n-horror-corridor-corridor-atmosphere-landmarks-trail-signs-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces | 3 | 1 | n-horror-corridor-corridor-traces-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:explorer-marks | 4 | 1 | n-horror-corridor-corridor-traces-explorer-marks-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:explorer-marks:mark | 4 | 1 | n-horror-corridor-corridor-traces-explorer-marks-mark-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:blood-trails | 2 | 1 | n-horror-corridor-corridor-traces-blood-trails-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:blood-trails:blood-trail | 3 | 1 | n-horror-corridor-corridor-traces-blood-trails-blood-trail-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:blood-trails:blood-trail:stains | 2 | 1 | n-horror-corridor-corridor-traces-blood-trails-blood-trail-stains-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:blood-trails:blood-trail:stains:stain | 5 | 1 | n-horror-corridor-corridor-traces-blood-trails-blood-trail-stains-stain-domain-kit | installed-state-owner |
| n:horror-corridor:corridor:traces:creature-signs | 4 | 1 | n-horror-corridor-corridor-traces-creature-signs-domain-kit | installed-state-owner |
| n:horror-corridor:party | 2 | 5 | n-horror-corridor-party-domain-kit | installed-state-owner |
| n:horror-corridor:party:gathering | 4 | 1 | n-horror-corridor-party-gathering-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers | 2 | 1 | n-horror-corridor-party-explorers-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer | 3 | 1 | n-horror-corridor-party-explorers-explorer-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:body | 4 | 2 | n-horror-corridor-party-explorers-explorer-body-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:body:stance | 3 | 1 | n-horror-corridor-party-explorers-explorer-body-stance-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:body:footing | 3 | 1 | n-horror-corridor-party-explorers-explorer-body-footing-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:gaze | 4 | 2 | n-horror-corridor-party-explorers-explorer-gaze-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:hands | 3 | 2 | n-horror-corridor-party-explorers-explorer-hands-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:condition | 3 | 1 | n-horror-corridor-party-explorers-explorer-condition-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:condition:stress | 3 | 1 | n-horror-corridor-party-explorers-explorer-condition-stress-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:condition:exposure | 3 | 1 | n-horror-corridor-party-explorers-explorer-condition-exposure-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:condition:injury | 3 | 1 | n-horror-corridor-party-explorers-explorer-condition-injury-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:condition:orientation | 3 | 1 | n-horror-corridor-party-explorers-explorer-condition-orientation-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:carry | 3 | 1 | n-horror-corridor-party-explorers-explorer-carry-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:carry:empty-hands | 2 | 1 | n-horror-corridor-party-explorers-explorer-carry-empty-hands-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:carry:held-relic | 3 | 1 | n-horror-corridor-party-explorers-explorer-carry-held-relic-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:memory | 3 | 1 | n-horror-corridor-party-explorers-explorer-memory-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:memory:known-places | 3 | 1 | n-horror-corridor-party-explorers-explorer-memory-known-places-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:memory:known-ways | 3 | 1 | n-horror-corridor-party-explorers-explorer-memory-known-ways-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:memory:known-landmarks | 3 | 1 | n-horror-corridor-party-explorers-explorer-memory-known-landmarks-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:memory:personal-trail | 3 | 1 | n-horror-corridor-party-explorers-explorer-memory-personal-trail-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:presence | 4 | 1 | n-horror-corridor-party-explorers-explorer-presence-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:presence:visible-presence | 3 | 1 | n-horror-corridor-party-explorers-explorer-presence-visible-presence-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:presence:audible-presence | 3 | 1 | n-horror-corridor-party-explorers-explorer-presence-audible-presence-domain-kit | installed-state-owner |
| n:horror-corridor:party:explorers:explorer:presence:remote-presence | 3 | 1 | n-horror-corridor-party-explorers-explorer-presence-remote-presence-domain-kit | installed-state-owner |
| n:horror-corridor:party:togetherness | 4 | 1 | n-horror-corridor-party-togetherness-domain-kit | installed-state-owner |
| n:horror-corridor:party:togetherness:nearness | 3 | 1 | n-horror-corridor-party-togetherness-nearness-domain-kit | installed-state-owner |
| n:horror-corridor:party:togetherness:separation | 3 | 1 | n-horror-corridor-party-togetherness-separation-domain-kit | installed-state-owner |
| n:horror-corridor:party:togetherness:coordination | 3 | 1 | n-horror-corridor-party-togetherness-coordination-domain-kit | installed-state-owner |
| n:horror-corridor:party:togetherness:shared-knowledge | 3 | 1 | n-horror-corridor-party-togetherness-shared-knowledge-domain-kit | installed-state-owner |
| n:horror-corridor:party:signals | 3 | 1 | n-horror-corridor-party-signals-domain-kit | installed-state-owner |
| n:horror-corridor:party:signals:world-marks | 3 | 1 | n-horror-corridor-party-signals-world-marks-domain-kit | installed-state-owner |
| n:horror-corridor:party:signals:carry-signals | 3 | 1 | n-horror-corridor-party-signals-carry-signals-domain-kit | installed-state-owner |
| n:horror-corridor:party:signals:objective-signals | 3 | 1 | n-horror-corridor-party-signals-objective-signals-domain-kit | installed-state-owner |
| n:horror-corridor:dread | 2 | 9 | n-horror-corridor-dread-domain-kit | installed-state-owner |
| n:horror-corridor:dread:tension | 3 | 1 | n-horror-corridor-dread-tension-domain-kit | installed-state-owner |
| n:horror-corridor:dread:tension:baseline | 3 | 1 | n-horror-corridor-dread-tension-baseline-domain-kit | installed-state-owner |
| n:horror-corridor:dread:tension:omens | 3 | 1 | n-horror-corridor-dread-tension-omens-domain-kit | installed-state-owner |
| n:horror-corridor:dread:tension:escalation | 3 | 1 | n-horror-corridor-dread-tension-escalation-domain-kit | installed-state-owner |
| n:horror-corridor:dread:tension:reprieve | 3 | 1 | n-horror-corridor-dread-tension-reprieve-domain-kit | installed-state-owner |
| n:horror-corridor:dread:tension:crescendo | 3 | 1 | n-horror-corridor-dread-tension-crescendo-domain-kit | installed-state-owner |
| n:horror-corridor:dread:lostness | 4 | 1 | n-horror-corridor-dread-lostness-domain-kit | installed-state-owner |
| n:horror-corridor:dread:lostness:orientation | 3 | 1 | n-horror-corridor-dread-lostness-orientation-domain-kit | installed-state-owner |
| n:horror-corridor:dread:lostness:way-doubt | 3 | 1 | n-horror-corridor-dread-lostness-way-doubt-domain-kit | installed-state-owner |
| n:horror-corridor:dread:lostness:return-doubt | 3 | 1 | n-horror-corridor-dread-lostness-return-doubt-domain-kit | installed-state-owner |
| n:horror-corridor:dread:lostness:landmark-doubt | 3 | 1 | n-horror-corridor-dread-lostness-landmark-doubt-domain-kit | installed-state-owner |
| n:horror-corridor:dread:isolation | 4 | 1 | n-horror-corridor-dread-isolation-domain-kit | installed-state-owner |
| n:horror-corridor:dread:isolation:distance | 3 | 1 | n-horror-corridor-dread-isolation-distance-domain-kit | installed-state-owner |
| n:horror-corridor:dread:isolation:occlusion | 3 | 1 | n-horror-corridor-dread-isolation-occlusion-domain-kit | installed-state-owner |
| n:horror-corridor:dread:isolation:silence | 3 | 1 | n-horror-corridor-dread-isolation-silence-domain-kit | installed-state-owner |
| n:horror-corridor:dread:isolation:knowledge-gap | 3 | 1 | n-horror-corridor-dread-isolation-knowledge-gap-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards | 3 | 1 | n-horror-corridor-dread-hazards-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:collapse | 3 | 1 | n-horror-corridor-dread-hazards-collapse-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:collapse:warning | 3 | 1 | n-horror-corridor-dread-hazards-collapse-warning-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:collapse:fall | 3 | 1 | n-horror-corridor-dread-hazards-collapse-fall-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:collapse:obstruction | 3 | 1 | n-horror-corridor-dread-hazards-collapse-obstruction-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:flood | 4 | 1 | n-horror-corridor-dread-hazards-flood-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:flood:rise | 3 | 1 | n-horror-corridor-dread-hazards-flood-rise-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:flood:current | 3 | 1 | n-horror-corridor-dread-hazards-flood-current-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:flood:passage | 3 | 1 | n-horror-corridor-dread-hazards-flood-passage-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:contamination | 3 | 1 | n-horror-corridor-dread-hazards-contamination-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:contamination:blight | 3 | 1 | n-horror-corridor-dread-hazards-contamination-blight-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:contamination:exposure | 3 | 1 | n-horror-corridor-dread-hazards-contamination-exposure-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hazards:contamination:consequence | 3 | 1 | n-horror-corridor-dread-hazards-contamination-consequence-domain-kit | installed-state-owner |
| n:horror-corridor:dread:haunting | 3 | 1 | n-horror-corridor-dread-haunting-domain-kit | installed-state-owner |
| n:horror-corridor:dread:haunting:apparitions | 3 | 1 | n-horror-corridor-dread-haunting-apparitions-domain-kit | installed-state-owner |
| n:horror-corridor:dread:haunting:whispers | 3 | 1 | n-horror-corridor-dread-haunting-whispers-domain-kit | installed-state-owner |
| n:horror-corridor:dread:haunting:shifting-ways | 3 | 1 | n-horror-corridor-dread-haunting-shifting-ways-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter | 3 | 2 | n-horror-corridor-dread-hunter-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:creature | 4 | 1 | n-horror-corridor-dread-hunter-creature-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:presence | 3 | 1 | n-horror-corridor-dread-hunter-presence-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:presence:signs | 3 | 1 | n-horror-corridor-dread-hunter-presence-signs-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:presence:nearness | 3 | 1 | n-horror-corridor-dread-hunter-presence-nearness-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:awareness | 3 | 1 | n-horror-corridor-dread-hunter-awareness-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:awareness:attention | 3 | 1 | n-horror-corridor-dread-hunter-awareness-attention-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:awareness:certainty | 3 | 1 | n-horror-corridor-dread-hunter-awareness-certainty-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:awareness:memory | 3 | 1 | n-horror-corridor-dread-hunter-awareness-memory-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:intent | 3 | 1 | n-horror-corridor-dread-hunter-intent-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:intent:stalking | 3 | 1 | n-horror-corridor-dread-hunter-intent-stalking-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:intent:searching | 3 | 1 | n-horror-corridor-dread-hunter-intent-searching-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:intent:chasing | 3 | 1 | n-horror-corridor-dread-hunter-intent-chasing-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:territory | 3 | 1 | n-horror-corridor-dread-hunter-territory-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:territory:lair | 3 | 1 | n-horror-corridor-dread-hunter-territory-lair-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:territory:patrol | 3 | 1 | n-horror-corridor-dread-hunter-territory-patrol-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:territory:intrusion | 3 | 1 | n-horror-corridor-dread-hunter-territory-intrusion-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:pursuit | 4 | 1 | n-horror-corridor-dread-hunter-pursuit-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:encounter | 5 | 1 | n-horror-corridor-dread-hunter-encounter-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:encounter:approach | 3 | 1 | n-horror-corridor-dread-hunter-encounter-approach-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:encounter:repulse | 3 | 1 | n-horror-corridor-dread-hunter-encounter-repulse-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:encounter:blackout | 3 | 1 | n-horror-corridor-dread-hunter-encounter-blackout-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:encounter:last-chance | 3 | 1 | n-horror-corridor-dread-hunter-encounter-last-chance-domain-kit | installed-state-owner |
| n:horror-corridor:dread:hunter:encounter:capture | 3 | 1 | n-horror-corridor-dread-hunter-encounter-capture-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition | 1 | 4 | n-horror-corridor-shared-expedition-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition:shared-departure | 3 | 1 | n-horror-corridor-shared-expedition-shared-departure-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition:shared-journey | 5 | 1 | n-horror-corridor-shared-expedition-shared-journey-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition:stewardship | 3 | 1 | n-horror-corridor-shared-expedition-stewardship-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition:shared-world | 5 | 2 | n-horror-corridor-shared-expedition-shared-world-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition:rejoining | 4 | 1 | n-horror-corridor-shared-expedition-rejoining-domain-kit | installed-state-owner |
| n:horror-corridor:shared-expedition:shared-chronicle | 3 | 1 | n-horror-corridor-shared-expedition-shared-chronicle-domain-kit | installed-state-owner |

## Hosts

| Host | Kit contracts | Wired or installed | Open | Boundary |
|---|---:|---:|---:|---|
| browser-game-host | 11 | 10 | 1 | host adapter is present; kit-level gaps remain explicit below |
| three-world-host | 11 | 11 | 0 | host adapter is present; kit-level gaps remain explicit below |
| peerjs-transport-host | 3 | 3 | 0 | host adapter is present; kit-level gaps remain explicit below |
| headless-proof-host | 6 | 6 | 0 | host adapter is present; kit-level gaps remain explicit below |

## Proofs

| Proof | Status | Evidence |
|---|---|---|
| domain-blueprint-proof | passing | npm run domain:check; src/engine/generated/horrorCorridorDomainBlueprint.json |
| protokit-smoke-proof | passing | npm run smoke:protokits; src/app/api/procedural-kit-smoke/route.ts |
| reset-snapshot-proof | passing | docs/live-player-harness/latest/report.json#nexusRuntime.resetReplay |
| live-player-proof | passing | docs/live-player-harness/latest/report.json |
| object-review-proof | partial | scripts/review-object-kit.mjs; testing/object-kits |
| visual-match-proof | partial-current-target | docs/visual-targets/horror-corridor-expedition-room-v2.png; docs/live-player-harness/latest/starting-scene.png |

## Kit Contract Ledger

| Target kit | Owner(s) | Classification | Runtime evidence | Required action |
|---|---|---|---|---|
| abandon-equipment-kit | n:horror-corridor:corridor:ruin:remnants:workplaces:service-equipment | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| absorb-through-root-hair-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:maturation-zone:root-hairs:root-hair | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| accumulate-contamination-kit | n:horror-corridor:dread:hazards:contamination:exposure | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| accumulate-exposure-kit | n:horror-corridor:party:explorers:explorer:condition:exposure | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| advance-delve-kit | n:horror-corridor:expedition:delve | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts, src/features/player/domain/movement.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| advance-flood-kit | n:horror-corridor:dread:hazards:flood | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| advance-moss-edge-kit | n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches:patch:edge | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-blood-trail-kit | n:horror-corridor:corridor:traces:blood-trails:blood-trail | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-brick-kit | n:horror-corridor:corridor:ground:surface:paving:brickwork:bricks:brick | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-explorer-mark-kit | n:horror-corridor:corridor:traces:explorer-marks:mark | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-leaf-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-ruin-kit | n:horror-corridor:corridor:ruin | installed-local | live descriptorKitIds -> broken-city-wall-domain-kit, building-facade-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| age-stain-kit | n:horror-corridor:corridor:traces:blood-trails:blood-trail:stains:stain | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-tree-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| age-utilities-kit | n:horror-corridor:corridor:ruin:utilities | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| answer-territory-intrusion-kit | n:horror-corridor:dread:hunter:territory:intrusion | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| approach-from-unseen-kit | n:horror-corridor:dread:hunter:presence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-boughs-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-branches-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-buds-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-grass-blades-kit | n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts:tuft:blades | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-leaves-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-storage-kit | n:horror-corridor:corridor:ruin:remnants:storage | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-twigs-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| arrange-workplace-kit | n:horror-corridor:corridor:ruin:remnants:workplaces | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| assemble-ruin-structure-kit | n:horror-corridor:corridor:ruin:structure | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| balance-crown-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| balance-habitat-kit | n:horror-corridor:corridor:overgrowth:habitat | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| balance-leaf-pores-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:pores | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| balance-leaf-resources-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:leaf-life:nourishment | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| balance-root-system-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| balance-trees-kit | n:horror-corridor:corridor:overgrowth:grove:trees | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| begin-expedition-kit | n:horror-corridor:expedition:departure | implemented-gameplay | src/features/game-state/domain/beginExpedition.ts, src/features/game-state/domain/createInitialGameState.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| blend-corridor-atmosphere-kit | n:horror-corridor:corridor:atmosphere | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| blight-overgrowth-kit | n:horror-corridor:dread:hazards:contamination:blight | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| blur-landmark-memory-kit | n:horror-corridor:dread:lostness:landmark-doubt | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| branch-leaf-veins-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| branch-root-system-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| branch-side-ways-kit | n:horror-corridor:corridor:maze:ways:side-ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| break-audible-contact-kit | n:horror-corridor:dread:isolation:silence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| break-ceiling-kit | n:horror-corridor:corridor:ruin:structure:ceilings:ceiling | implemented-gameplay | src/features/corridor/domain/ceilingCollapse.ts, src/protokits/collapsed-ceiling-object-kit/index.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/ceiling-fracture-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| break-concrete-kit | n:horror-corridor:corridor:ground:rubble:fallen-masonry:broken-concrete | installed-local | live descriptorKitIds -> broken-concrete-stair-object-domain-kit, loose-floor-slab-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| break-floor-kit | n:horror-corridor:corridor:ruin:structure:floors | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| break-visual-contact-kit | n:horror-corridor:dread:isolation:occlusion | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| breathe-through-stoma-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:pores:stoma | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| breathe-vent-kit | n:horror-corridor:corridor:ruin:utilities:ventilation:vents:vent | installed-local | live descriptorKitIds -> vent-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| broken-generator-kit | n:horror-corridor:corridor:ruin:utilities:electricity:supply:generator | installed-local | live descriptorKitIds -> broken-generator-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| build-barricade-kit | n:horror-corridor:corridor:ruin:access:barricades | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| camera-occlusion-kit | n:horror-corridor:party:explorers:explorer:gaze | public-candidate | node_modules/nexusengine/src/camera-occlusion-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| carry-air-kit | n:horror-corridor:corridor:ruin:utilities:ventilation:ducts:duct | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carry-draft-kit | n:horror-corridor:corridor:atmosphere:air:drafts | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carry-electricity-kit | n:horror-corridor:corridor:ruin:utilities:electricity | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carry-root-resources-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carry-runoff-kit | n:horror-corridor:corridor:ruin:utilities:drainage:channels:channel | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carry-spatial-sound-kit | n:horror-corridor:corridor:atmosphere:acoustics | implemented-gameplay | src/features/audio/stalkerAudio.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| carry-trunk-water-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:sapwood | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carve-channel-kit | n:horror-corridor:corridor:ruin:utilities:drainage:channels | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| carve-corridor-maze-kit | n:horror-corridor:corridor:maze | installed-local | live descriptorKitIds -> grid-maze-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| cast-flashlight-beam-kit | n:horror-corridor:corridor:atmosphere:illumination:flashlight-beam | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts, src/features/render/three/worldBuilder.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| cast-habitat-shade-kit | n:horror-corridor:corridor:overgrowth:habitat:shade | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| cast-practical-light-kit | n:horror-corridor:corridor:atmosphere:illumination:lamp-pools | installed-local | live descriptorKitIds -> lighting-descriptor-domain-kit, lighting-placement-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| cast-whisper-kit | n:horror-corridor:dread:haunting:whispers | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| chain-link-fence-kit | n:horror-corridor:corridor:ruin:access:fences:fence | installed-local | live descriptorKitIds -> chain-link-fence-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| character-camera-kit | n:horror-corridor:party:explorers:explorer:gaze | legacy-cutover | src/features/player/domain/cameraLook.ts | Move the existing behavior behind the target DSK without changing player flow. |
| character-movement-kit | n:horror-corridor:party:explorers:explorer:body | legacy-cutover | src/features/player/domain/movement.ts | Move the existing behavior behind the target DSK without changing player flow. |
| chase-explorer-kit | n:horror-corridor:dread:hunter:intent:chasing | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| choose-hunter-intent-kit | n:horror-corridor:dread:hunter:intent | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| choose-way-kit | n:horror-corridor:expedition:delve:wayfinding | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| circulate-leaf-sap-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| circulate-root-sap-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior:vascular-core | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| clog-drainage-kit | n:horror-corridor:corridor:ruin:utilities:drainage:blockages | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| close-hunter-distance-kit | n:horror-corridor:dread:hunter:presence:nearness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| close-way-kit | n:horror-corridor:corridor:maze:ways:closed-ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| cluster-barrels-kit | n:horror-corridor:corridor:ruin:remnants:storage:barrels | installed-local | live descriptorKitIds -> barrel-cluster-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| cluster-stone-kit | n:horror-corridor:corridor:ground:rubble:fallen-masonry:fallen-stone | installed-local | live descriptorKitIds -> rock-cluster-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| collapse-masonry-kit | n:horror-corridor:corridor:ground:rubble:fallen-masonry | implemented-gameplay | src/features/corridor/domain/ceilingCollapse.ts, src/protokits/furnish-chamber-kit/index.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/ceiling-fracture-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| combine-decay-kit | n:horror-corridor:corridor:ruin:decay | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| combine-explorer-condition-kit | n:horror-corridor:party:explorers:explorer:condition | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| compose-ground-surface-kit | n:horror-corridor:corridor:ground:surface | installed-local | live descriptorKitIds -> terrain-field-domain-kit, terrain-shader-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| condense-damp-air-kit | n:horror-corridor:corridor:atmosphere:air:dampness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| conduct-trunk-water-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:sapwood:vessels:vessel | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| connect-circuit-kit | n:horror-corridor:corridor:ruin:utilities:electricity:circuits | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| connect-discoveries-kit | n:horror-corridor:expedition:delve:discovery:understanding | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| connect-leaf-veins-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| connect-leaf-vessels-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein:vessels | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| connect-sapwood-vessels-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:sapwood:vessels | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| continue-expedition-kit | n:horror-corridor:expedition | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| coordinate-party-kit | n:horror-corridor:party:togetherness:coordination | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| core-camera-framing-kit | host:three-world-host | installed-core | live coreKitIds -> core-camera-framing-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-capture-domain | host:headless-proof-host | installed-core | live coreKitIds -> core-capture-domain | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-object-fidelity-domain | host:three-world-host | installed-core | live coreKitIds -> core-object-fidelity-domain | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-object-shape-domain | host:three-world-host | installed-core | live coreKitIds -> core-object-shape-domain | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-presentation-domain | host:browser-game-host | installed-core | live coreKitIds -> core-presentation-domain | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-presentation-output-kit | host:browser-game-host | installed-core | live coreKitIds -> core-presentation-output-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-startup-domain | host:browser-game-host | installed-core | live coreKitIds -> core-startup-domain | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-ui-scale-kit | host:browser-game-host | installed-core | live coreKitIds -> core-ui-scale-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| core-world-domain | n:horror-corridor:corridor | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| corridor-lamp-kit | n:horror-corridor:corridor:ruin:utilities:electricity:lamps:lamp | installed-local | live descriptorKitIds -> corridor-lamp-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| corrode-metal-kit | n:horror-corridor:corridor:ruin:decay:corrosion | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| corroded-table-kit | n:horror-corridor:corridor:ruin:remnants:workplaces:tables | installed-local | live descriptorKitIds -> corroded-table-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| crack-slab-kit | n:horror-corridor:corridor:ground:surface:paving:concrete:slabs:slab | implemented-gameplay | src/features/corridor/domain/concretePaving.ts, src/features/render/three/proceduralShaders.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/floor-material-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| crest-tension-kit | n:horror-corridor:dread:tension:crescendo | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| deepen-corridor-kit | n:horror-corridor:corridor:maze:regions:depths | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| deepen-isolation-kit | n:horror-corridor:dread:isolation | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| deepen-lostness-kit | n:horror-corridor:dread:lostness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| defend-hunter-territory-kit | n:horror-corridor:dread:hunter:territory | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| develop-bud-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| displace-slab-kit | n:horror-corridor:corridor:ground:rubble:loose-slabs | installed-local | live descriptorKitIds -> loose-floor-slab-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| divide-corridor-regions-kit | n:horror-corridor:corridor:maze:regions | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| divide-root-cells-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:meristem | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| drain-water-kit | n:horror-corridor:corridor:ruin:utilities:drainage | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| dress-dead-end-kit | n:horror-corridor:corridor:maze:places:dead-ends:dead-end | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| drift-draft-kit | n:horror-corridor:corridor:ruin:utilities:ventilation:drafts | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| drift-fog-kit | n:horror-corridor:corridor:atmosphere:air:fog:fog-drift | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| drop-collapse-debris-kit | n:horror-corridor:dread:hazards:collapse:fall | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| elongate-root-cells-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:elongation-zone | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| embody-hunter-kit | n:horror-corridor:dread:hunter:creature | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| erode-facade-kit | n:horror-corridor:corridor:ruin:structure:facades | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| escalate-tension-kit | n:horror-corridor:dread:tension:escalation | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| establish-dread-baseline-kit | n:horror-corridor:dread:tension:baseline | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| establish-entrance-kit | n:horror-corridor:corridor:maze:places:entrance | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| establish-hunter-lair-kit | n:horror-corridor:dread:hunter:territory:lair | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| establish-living-sign-kit | n:horror-corridor:corridor:atmosphere:landmarks:living-signs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| establish-main-way-kit | n:horror-corridor:corridor:maze:ways:main-way | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| establish-structural-sign-kit | n:horror-corridor:corridor:atmosphere:landmarks:structural-signs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| exchange-party-signals-kit | n:horror-corridor:party:signals | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| export-leaf-sugar-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein:vessels:phloem | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| expose-earth-kit | n:horror-corridor:corridor:ground:surface:earth | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| expose-support-kit | n:horror-corridor:corridor:ruin:structure:ceilings:ceiling:supports | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| extend-root-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| extend-vine-stem-kit | n:horror-corridor:corridor:overgrowth:creepers:vines:vine:stem | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| feed-moisture-kit | n:horror-corridor:corridor:overgrowth:habitat:moisture | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| feed-root-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior:vascular-core:phloem | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| feed-trunk-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:bark:inner-bark | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| fill-culvert-kit | n:horror-corridor:corridor:ruin:utilities:drainage:culverts:culvert | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| finish-dead-end-kit | n:horror-corridor:corridor:maze:places:dead-ends | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| first-person-body-kit | n:horror-corridor:party:explorers:explorer:body | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| follow-personal-trail-kit | n:horror-corridor:expedition:delve:journey-traces:personal-trail | legacy-cutover | src/features/game-state/domain/oozeRules.ts | Move the existing behavior behind the target DSK without changing player flow. |
| force-monster-blackout-kit | n:horror-corridor:dread:hunter:encounter:blackout | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| foreshadow-danger-kit | n:horror-corridor:dread:tension:omens | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| forest-placement-kit | n:horror-corridor:corridor:overgrowth | public-candidate | node_modules/nexusengine/src/forest-placement-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| form-fog-kit | n:horror-corridor:corridor:atmosphere:air:fog | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| form-mud-kit | n:horror-corridor:corridor:ground:surface:mud | installed-local | live descriptorKitIds -> damp-mud-texture-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| fracture-wall-core-kit | n:horror-corridor:corridor:ruin:structure:walls:wall:wall-core | installed-local | live descriptorKitIds -> broken-city-wall-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| free-hands-kit | n:horror-corridor:party:explorers:explorer:carry:empty-hands | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| furnish-chamber-kit | n:horror-corridor:corridor:maze:places:buildings:building:chambers:chamber | installed-local | live descriptorKitIds -> furnish-chamber-kit | Keep the installed local kit and promote only after slice proof. |
| gather-fog-banks-kit | n:horror-corridor:corridor:atmosphere:air:fog:fog-banks | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| gather-grass-tufts-kit | n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts | installed-local | live descriptorKitIds -> grass-object-spawn-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| gather-moss-patches-kit | n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches | installed-local | live descriptorKitIds -> moss-grime-texture-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| gather-party-kit | n:horror-corridor:party:gathering | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| gather-pools-kit | n:horror-corridor:corridor:ground:water:pools | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| gather-puddles-kit | n:horror-corridor:corridor:ground:water:puddles | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| gather-shared-party-kit | n:horror-corridor:shared-expedition:shared-departure | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grip-vine-kit | n:horror-corridor:corridor:overgrowth:creepers:vines:vine:anchors | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| ground-contact-kit | n:horror-corridor:corridor:ground | installed-local | live descriptorKitIds -> socket-graph-domain-kit, footprint-layout-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| grow-bark-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:bark | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-bough-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-branch-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-grass-blade-kit | n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts:tuft:blades:blade | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-grass-tuft-kit | n:horror-corridor:corridor:overgrowth:ground-growth:grass:tufts:tuft | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-mold-colony-kit | n:horror-corridor:corridor:overgrowth:ground-growth:mold:colony | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-moss-patch-kit | n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches:patch | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-root-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-tree-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-twig-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-vine-kit | n:horror-corridor:corridor:overgrowth:creepers:vines:vine | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| grow-vine-leaves-kit | n:horror-corridor:corridor:overgrowth:creepers:vines:vine:vine-leaves | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| hang-cable-kit | n:horror-corridor:corridor:ruin:utilities:electricity:wiring:cable | installed-local | live descriptorKitIds -> cable-run-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| hang-doors-kit | n:horror-corridor:corridor:ruin:access:doors | installed-local | live descriptorKitIds -> rusted-service-door-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| hang-remains-kit | n:horror-corridor:corridor:ruin:remnants:hanging-remains | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| hanging-chain-kit | n:horror-corridor:corridor:ruin:remnants:hanging-remains:chains | installed-local | live descriptorKitIds -> hanging-chain-hook-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| hanging-hook-kit | n:horror-corridor:corridor:ruin:remnants:hanging-remains:hooks | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| harden-wood-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| hazard-field-kit | n:horror-corridor:dread:hazards | public-candidate | node_modules/nexusengine/src/hazard-field-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| heal-tree-wound-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wounds | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| hold-relic-kit | n:horror-corridor:party:explorers:explorer:carry:held-relic | legacy-cutover | src/features/game-state/domain/networkRules.ts, src/components/game/GameCanvas.tsx | Move the existing behavior behind the target DSK without changing player flow. |
| hold-silence-kit | n:horror-corridor:corridor:atmosphere:acoustics:silence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| horror-corridor-game-kit | n:horror-corridor | installed-local | live compositionKitIds -> horror-corridor-game-kit | Keep the installed local kit and promote only after slice proof. |
| horror-corridor-world-kit | n:horror-corridor:corridor | installed-local | live compositionKitIds -> horror-corridor-world-kit | Keep the installed local kit and promote only after slice proof. |
| horror-dread-kit | n:horror-corridor:dread | installed-local | live compositionKitIds -> horror-dread-kit | Keep the installed local kit and promote only after slice proof. |
| horror-expedition-kit | n:horror-corridor:expedition | installed-local | live compositionKitIds -> horror-expedition-kit | Keep the installed local kit and promote only after slice proof. |
| horror-party-kit | n:horror-corridor:party | installed-local | live compositionKitIds -> horror-party-kit | Keep the installed local kit and promote only after slice proof. |
| horror-shared-expedition-kit | n:horror-corridor:shared-expedition | installed-local | live compositionKitIds -> horror-shared-expedition-kit | Keep the installed local kit and promote only after slice proof. |
| hydrate-leaf-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:side-veins:vein:vessels:xylem | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| industrial-shelving-kit | n:horror-corridor:corridor:ruin:remnants:storage:shelves | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| input-intent-kit | host:browser-game-host | public-candidate | node_modules/nexusengine/src/input-intent-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| join-passages-kit | n:horror-corridor:corridor:maze:places:junctions | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| keep-explorers-kit | n:horror-corridor:party:explorers | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| keep-monster-record-kit | n:horror-corridor:expedition:chronicle:monster-index:monster-record | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| keep-party-kit | n:horror-corridor:party | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| keep-party-together-kit | n:horror-corridor:party:togetherness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| landmark-guidance-kit | n:horror-corridor:corridor:atmosphere:landmarks<br>n:horror-corridor:expedition:delve:wayfinding | public-candidate | node_modules/nexusengine/src/landmark-guidance-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| lay-blood-trail-kit | n:horror-corridor:corridor:traces:blood-trails | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| lay-bricks-kit | n:horror-corridor:corridor:ground:surface:paving:brickwork:bricks | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| lay-broken-paving-kit | n:horror-corridor:corridor:ground:surface:paving | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| lay-growth-ring-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:growth-rings | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| lay-passage-kit | n:horror-corridor:corridor:maze:places:passages | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| leak-daylight-kit | n:horror-corridor:corridor:atmosphere:illumination:daylight-leaks | installed-local | live descriptorKitIds -> open-sky-projection-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| learn-from-monster-scare-kit | n:horror-corridor:expedition:chronicle:monster-index:monster-record:scare-lesson | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| leave-creature-sign-kit | n:horror-corridor:corridor:traces:creature-signs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| leave-explorer-mark-kit | n:horror-corridor:corridor:traces:explorer-marks | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| lifecycle-progression-kit | n:horror-corridor:shared-expedition:shared-journey | public-candidate | node_modules/nexusengine/src/lifecycle-progression-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| lift-root-water-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-interior:vascular-core:xylem | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| mark-collected-monster-kit | n:horror-corridor:expedition:chronicle:monster-index:monster-record:collection-mark | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| mature-root-tissue-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:maturation-zone | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| measure-party-nearness-kit | n:horror-corridor:party:togetherness:nearness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| measure-party-separation-kit | n:horror-corridor:party:togetherness:separation | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| menu-flow-kit | host:browser-game-host | host-wired | src/components | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| minimal-play-hud-kit | host:browser-game-host | host-wired | src/components/hud | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| move-corridor-air-kit | n:horror-corridor:corridor:atmosphere:air<br>n:horror-corridor:corridor:ruin:utilities:ventilation | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| n-core-assets-kit | host:three-world-host | installed-core | live coreKitIds -> n-core-assets-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-audio-kit | n:horror-corridor:dread | installed-core | live coreKitIds -> n-core-audio-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-camera-kit | host:three-world-host | installed-core | live coreKitIds -> n-core-camera-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-character-kit | n:horror-corridor:party | installed-core | live coreKitIds -> n-core-character-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-composition-kit | n:horror-corridor:expedition | installed-core | live coreKitIds -> n-core-composition-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-creature-kit | n:horror-corridor:dread | installed-core | live coreKitIds -> n-core-creature-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-data-kit | n:horror-corridor:expedition | installed-core | live coreKitIds -> n-core-data-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-debug-kit | host:headless-proof-host | installed-core | live coreKitIds -> n-core-debug-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-diagnostics-kit | host:headless-proof-host | installed-core | live coreKitIds -> n-core-diagnostics-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-graphics-kit | host:three-world-host<br>n:horror-corridor:dread | installed-core | live coreKitIds -> n-core-graphics-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-input-kit | host:browser-game-host | installed-core | live coreKitIds -> n-core-input-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-interaction-kit | n:horror-corridor:dread | installed-core | live coreKitIds -> n-core-interaction-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-motion-kit | n:horror-corridor:party | installed-core | live coreKitIds -> n-core-motion-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-network-kit | n:horror-corridor:shared-expedition | installed-core | live coreKitIds -> n-core-network-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-object-kit | n:horror-corridor:corridor | installed-core | live coreKitIds -> n-core-object-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-persistence-kit | n:horror-corridor:expedition | installed-core | live coreKitIds -> n-core-persistence-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-physics-kit | n:horror-corridor:corridor | installed-core | live coreKitIds -> n-core-physics-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-platform-kit | host:browser-game-host | installed-core | live coreKitIds -> n-core-platform-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-player-kit | n:horror-corridor:party | installed-core | live coreKitIds -> n-core-player-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-scene-kit | n:horror-corridor:corridor | installed-core | live coreKitIds -> n-core-scene-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-simulation-kit | n:horror-corridor:dread<br>n:horror-corridor:expedition | installed-core | live coreKitIds -> n-core-simulation-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-skybox-kit | n:horror-corridor:corridor:atmosphere | installed-core | live coreKitIds -> n-core-skybox-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-spatial-kit | n:horror-corridor:corridor<br>n:horror-corridor:dread | installed-core | live coreKitIds -> n-core-spatial-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-transaction-ledger-kit | n:horror-corridor:expedition:chronicle | installed-core | live coreKitIds -> n-core-transaction-ledger-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-ui-kit | host:browser-game-host | installed-core | live coreKitIds -> n-core-ui-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| n-core-vegetation-kit | n:horror-corridor:corridor:overgrowth | installed-core | live coreKitIds -> n-core-vegetation-kit | Keep the current NexusEngine core owner and prove it in the owning slice. |
| object-review-kit | host:headless-proof-host | host-wired | scripts/review-object-kit.mjs | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| obscure-return-way-kit | n:horror-corridor:dread:lostness:return-doubt | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| offer-room-boon-kit | n:horror-corridor:corridor:maze:places:buildings:building:chambers:chamber:offering | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts, src/features/game-state/domain/networkRules.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| open-building-kit | n:horror-corridor:corridor:maze:places:buildings | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| open-ceiling-kit | n:horror-corridor:corridor:ruin:structure:ceilings:ceiling:openings | implemented-gameplay | src/features/corridor/domain/ceilingCollapse.ts, src/protokits/collapsed-ceiling-object-kit/index.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/ceiling-fracture-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| open-chamber-kit | n:horror-corridor:corridor:maze:places:buildings:building:chambers | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| open-endless-delve-kit | n:horror-corridor:expedition:delve | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| open-last-chance-kit | n:horror-corridor:dread:hunter:encounter:last-chance | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| open-leaf-cluster-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| orient-leaf-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:stalk | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| pace-tension-kit | n:horror-corridor:dread:tension | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| patrol-territory-kit | n:horror-corridor:dread:hunter:territory:patrol | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| peer-session-kit | n:horror-corridor:shared-expedition | implemented-gameplay | src/features/networking/peer/createHost.ts, src/features/networking/peer/createClient.ts, src/components/game/GameShell.tsx, docs/live-player-harness/reconnect-recovery-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| peer-transport-kit | host:peerjs-transport-host | host-wired | src/features/networking/peer | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| perceive-explorer-kit | n:horror-corridor:dread:hunter:awareness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| place-culvert-kit | n:horror-corridor:corridor:ruin:utilities:drainage:culverts | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| place-drain-kit | n:horror-corridor:corridor:ruin:utilities:drainage:drains | installed-local | live descriptorKitIds -> storm-drain-culvert-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| place-practical-lamps-kit | n:horror-corridor:corridor:ruin:utilities:electricity:lamps | installed-local | live descriptorKitIds -> corridor-lamp-object-domain-kit, lighting-descriptor-domain-kit, lighting-placement-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| place-ruin-remnants-kit | n:horror-corridor:corridor:ruin:remnants | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| place-threshold-kit | n:horror-corridor:corridor:maze:places:thresholds | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| place-vent-kit | n:horror-corridor:corridor:ruin:utilities:ventilation:vents | installed-local | live descriptorKitIds -> vent-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| place-world-mark-kit | n:horror-corridor:party:signals:world-marks | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| pointer-lock-input-kit | host:browser-game-host | host-wired | src/components/game/PointerLockGate.tsx | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| pose-carrying-hands-kit | n:horror-corridor:party:explorers:explorer:hands | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| post-process-kit | host:three-world-host | host-wired | src/features/render/three/createPostProcessing.ts | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| preserve-heartwood-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:heartwood | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| preserve-return-way-kit | n:horror-corridor:corridor:maze:ways:return-ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| preserve-sightline-kit | n:horror-corridor:corridor:atmosphere:illumination:sightlines | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| preserve-world-traces-kit | n:horror-corridor:corridor:traces | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| procedural-material-kit | host:three-world-host | installed-local | live descriptorKitIds -> procedural-pbr-material-domain-kit, prop-material-fidelity-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| progress-leaf-life-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:leaf-life | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| propagate-crack-kit | n:horror-corridor:corridor:ruin:decay:cracking | implemented-gameplay | src/features/corridor/domain/ceilingCollapse.ts, src/protokits/collapsed-ceiling-object-kit/index.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/ceiling-fracture-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| protect-root-tip-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:root-cap | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| protocol-serialization-kit | host:peerjs-transport-host | host-wired | src/features/networking/protocol | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| pulse-anomaly-glow-kit | n:horror-corridor:corridor:atmosphere:illumination:anomaly-glow | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| pursue-explorer-kit | n:horror-corridor:dread:hunter:pursuit | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| pursuit-pressure-kit | n:horror-corridor:dread:hunter | public-candidate | node_modules/nexusengine/src/pursuit-pressure-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| push-flood-current-kit | n:horror-corridor:dread:hazards:flood:current | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| push-wild-roots-kit | n:horror-corridor:corridor:overgrowth:creepers:wild-roots | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| raise-dread-kit | n:horror-corridor:dread | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| raise-explorer-stress-kit | n:horror-corridor:party:explorers:explorer:condition:stress | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| raise-floodwater-kit | n:horror-corridor:corridor:ground:water:floodwater | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| raise-wall-kit | n:horror-corridor:corridor:ruin:structure:walls | installed-local | live descriptorKitIds -> broken-city-wall-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| raise-waterline-kit | n:horror-corridor:dread:hazards:flood:rise | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| read-trail-sign-kit | n:horror-corridor:corridor:atmosphere:landmarks:trail-signs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| receive-remote-presence-kit | n:horror-corridor:party:explorers:explorer:presence:remote-presence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| reclaim-surface-kit | n:horror-corridor:corridor:overgrowth | installed-local | live descriptorKitIds -> overgrowth-object-domain-kit, grass-object-spawn-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| recognize-place-kit | n:horror-corridor:corridor:maze:places | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| reconcile-shared-trail-kit | n:horror-corridor:expedition:delve:journey-traces:shared-trail | legacy-cutover | src/features/networking/protocol/syncSnapshot.ts | Move the existing behavior behind the target DSK without changing player flow. |
| reconcile-world-snapshot-kit | n:horror-corridor:shared-expedition:shared-world | implemented-gameplay | src/features/networking/protocol/syncSnapshot.ts, src/components/game/GameShell.tsx, docs/live-player-harness/reconnect-recovery-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| record-expedition-kit | n:horror-corridor:expedition:chronicle | implemented-gameplay | src/features/debug/store/runtimeDebugStore.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| record-growth-year-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wood:growth-rings:ring | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| record-shared-session-kit | n:horror-corridor:shared-expedition:shared-chronicle | implemented-gameplay | src/features/networking/domain/sharedRecovery.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/reconnect-recovery-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| record-sighting-kit | n:horror-corridor:expedition:delve:discovery:sightings | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| recover-habitat-kit | n:horror-corridor:corridor:overgrowth:habitat:disturbance | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| regulate-stoma-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:pores:stoma:guard-cells | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| rejoin-party-kit | n:horror-corridor:shared-expedition:rejoining | implemented-gameplay | src/features/networking/domain/sharedRecovery.ts, src/components/menus/RecoveryScreen.tsx, docs/live-player-harness/reconnect-recovery-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| release-tension-kit | n:horror-corridor:dread:tension:reprieve | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-fog-wake-kit | n:horror-corridor:corridor:atmosphere:air:fog:fog-wake | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-hunter-evidence-kit | n:horror-corridor:dread:hunter:awareness:memory | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-landmark-kit | n:horror-corridor:party:explorers:explorer:memory:known-landmarks | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-leaf-growth-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:leaf-life:growth-memory | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-monster-scare-kit | n:horror-corridor:expedition:chronicle:monster-index | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| remember-monster-sighting-kit | n:horror-corridor:expedition:chronicle:monster-index:monster-record:sighting | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| remember-personal-trail-kit | n:horror-corridor:party:explorers:explorer:memory:personal-trail | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-place-kit | n:horror-corridor:expedition:delve:wayfinding:known-places | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-trail-kit | n:horror-corridor:expedition:delve:journey-traces | legacy-cutover | src/features/game-state/domain/oozeRules.ts, src/protokits/trail-decal-domain-kit/index.ts | Move the existing behavior behind the target DSK without changing player flow. |
| remember-traveled-way-kit | n:horror-corridor:party:explorers:explorer:memory:known-ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-visited-place-kit | n:horror-corridor:party:explorers:explorer:memory:known-places | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| remember-way-kit | n:horror-corridor:expedition:delve:wayfinding:known-ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| render-descriptor-kit | host:three-world-host | installed-local | live descriptorKitIds -> prop-descriptor-domain-kit, scene-dressing-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| render-validation-kit | host:headless-proof-host | installed-local | live descriptorKitIds -> render-validation-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| repel-monster-with-beam-kit | n:horror-corridor:dread:hunter:encounter:repulse | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| resolve-access-kit | n:horror-corridor:corridor:ruin:access | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| resolve-contamination-kit | n:horror-corridor:dread:hazards:contamination:consequence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| resolve-expedition-kit | n:horror-corridor:expedition:fate | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts, src/components/game/GameCanvas.tsx | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| resolve-flood-passage-kit | n:horror-corridor:dread:hazards:flood:passage | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| resolve-footing-kit | n:horror-corridor:party:explorers:explorer:body:footing | legacy-cutover | src/features/player/domain/collision.ts | Move the existing behavior behind the target DSK without changing player flow. |
| resolve-hunter-encounter-kit | n:horror-corridor:dread:hunter:encounter | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| resolve-injury-kit | n:horror-corridor:party:explorers:explorer:condition:injury | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| resolve-junction-kit | n:horror-corridor:corridor:maze:places:junctions:junction | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| resolve-monster-capture-kit | n:horror-corridor:dread:hunter:encounter:capture | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts, src/features/render/three/worldBuilder.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| resolve-threshold-kit | n:horror-corridor:corridor:maze:places:thresholds:threshold | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| resource-pressure-kit | n:horror-corridor:dread | public-candidate | node_modules/nexusengine/src/resource-pressure-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| return-echo-kit | n:horror-corridor:corridor:atmosphere:acoustics:echoes | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| reveal-anomaly-sign-kit | n:horror-corridor:corridor:atmosphere:landmarks:anomaly-signs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| reveal-corridor-heart-kit | n:horror-corridor:corridor:maze:places:heart | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| reveal-discovery-kit | n:horror-corridor:expedition:delve:discovery | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| reveal-with-light-kit | n:horror-corridor:corridor:atmosphere:illumination | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| ripen-grass-seed-kit | n:horror-corridor:corridor:overgrowth:ground-growth:grass:seed-heads | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| ripple-puddle-kit | n:horror-corridor:corridor:ground:water:puddles:puddle | installed-local | live descriptorKitIds -> water-surface-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| route-ducts-kit | n:horror-corridor:corridor:ruin:utilities:ventilation:ducts | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| route-field-kit | n:horror-corridor:corridor:maze | public-candidate | node_modules/nexusengine/src/route-field-kit.js | Audit the pinned public contract, then install it or record the mismatch. |
| route-wiring-kit | n:horror-corridor:corridor:ruin:utilities:electricity:wiring | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| run-expedition-kit | n:horror-corridor:expedition | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts, src/components/game/GameCanvas.tsx | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| rusted-door-kit | n:horror-corridor:corridor:ruin:access:doors:door | installed-local | live descriptorKitIds -> rusted-service-door-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| scatter-blood-stains-kit | n:horror-corridor:corridor:traces:blood-trails:blood-trail:stains | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| scatter-bricks-kit | n:horror-corridor:corridor:ground:rubble:fallen-masonry:fallen-bricks | installed-local | live descriptorKitIds -> brick-rubble-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| scatter-rubble-kit | n:horror-corridor:corridor:ground:rubble | installed-local | live descriptorKitIds -> debris-scatter-object-domain-kit, brick-rubble-object-domain-kit, rock-cluster-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| scatter-scrap-kit | n:horror-corridor:corridor:ground:rubble:scrap | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| scene-bundle-kit | host:three-world-host | installed-local | live descriptorKitIds -> scene-bundle-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| schedule-haunting-kit | n:horror-corridor:dread:haunting | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| seal-leaf-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface:cuticle | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| seal-root-skin-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-skin | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| search-for-explorer-kit | n:horror-corridor:dread:hunter:intent:searching | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| seed-grove-kit | n:horror-corridor:corridor:overgrowth:grove | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| seed-way-doubt-kit | n:horror-corridor:dread:lostness:way-doubt | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| seem-to-shift-way-kit | n:horror-corridor:dread:haunting:shifting-ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| select-power-source-kit | n:horror-corridor:corridor:ruin:utilities:electricity:supply | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| settle-collapse-obstruction-kit | n:horror-corridor:dread:hazards:collapse:obstruction | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| settle-darkness-kit | n:horror-corridor:corridor:atmosphere:illumination:darkness | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| settle-foundation-kit | n:horror-corridor:corridor:ruin:structure:foundations | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| settle-pool-kit | n:horror-corridor:corridor:ground:water:pools:pool | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| settle-slabs-kit | n:horror-corridor:corridor:ground:surface:paving:concrete:slabs | implemented-gameplay | src/features/corridor/domain/concretePaving.ts, src/features/render/three/proceduralShaders.ts, src/engine/horrorCorridorNexusRuntime.ts, docs/live-player-harness/floor-material-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| settle-stance-kit | n:horror-corridor:party:explorers:explorer:body:stance | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-building-kit | n:horror-corridor:corridor:maze:places:buildings:building | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-canopy-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:canopy | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-fog-bank-kit | n:horror-corridor:corridor:atmosphere:air:fog:fog-banks:fog-bank | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-inner-reach-kit | n:horror-corridor:corridor:maze:regions:inner-reach | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-leaf-blade-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-passage-kit | n:horror-corridor:corridor:maze:places:passages:passage | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shape-seeded-corridor-kit | n:horror-corridor:corridor | installed-local | live descriptorKitIds -> grid-maze-domain-kit, grid-field-domain-kit, corridor-tile-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| shape-verge-kit | n:horror-corridor:corridor:maze:regions:verge | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| share-explorer-presence-kit | n:horror-corridor:party:explorers:explorer:presence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| share-party-knowledge-kit | n:horror-corridor:party:togetherness:shared-knowledge | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| share-world-snapshot-kit | n:horror-corridor:shared-expedition:shared-world | implemented-gameplay | src/features/networking/protocol/syncSnapshot.ts, src/components/game/GameCanvas.tsx, docs/live-player-harness/reconnect-recovery-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| shed-moss-spores-kit | n:horror-corridor:corridor:overgrowth:ground-growth:moss:spores | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| shed-surface-kit | n:horror-corridor:corridor:ruin:decay:spalling | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| show-apparition-kit | n:horror-corridor:dread:haunting:apparitions | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| show-first-person-hands-kit | n:horror-corridor:party:explorers:explorer:hands | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| show-remote-explorer-kit | n:horror-corridor:party:explorers:explorer:presence:visible-presence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| signal-carry-state-kit | n:horror-corridor:party:signals:carry-signals | legacy-cutover | src/features/networking/protocol/syncSnapshot.ts | Move the existing behavior behind the target DSK without changing player flow. |
| signal-monster-nearness-kit | n:horror-corridor:dread:hunter:presence:signs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| signal-objective-state-kit | n:horror-corridor:party:signals:objective-signals | legacy-cutover | src/features/networking/protocol/syncSnapshot.ts | Move the existing behavior behind the target DSK without changing player flow. |
| single-carry-kit | n:horror-corridor:party:explorers:explorer:carry | legacy-cutover | src/features/game-state/domain/networkRules.ts | Move the existing behavior behind the target DSK without changing player flow. |
| snapshot-transport-kit | host:peerjs-transport-host | host-wired | src/features/networking/protocol/syncSnapshot.ts | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| sound-footfall-kit | n:horror-corridor:corridor:atmosphere:acoustics:footfalls | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| sound-remote-explorer-kit | n:horror-corridor:party:explorers:explorer:presence:audible-presence | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| span-ceiling-kit | n:horror-corridor:corridor:ruin:structure:ceilings | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-contamination-kit | n:horror-corridor:dread:hazards:contamination | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-creepers-kit | n:horror-corridor:corridor:overgrowth:creepers | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-damp-kit | n:horror-corridor:corridor:ruin:decay:damp | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-grass-kit | n:horror-corridor:corridor:overgrowth:ground-growth:grass | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-ground-growth-kit | n:horror-corridor:corridor:overgrowth:ground-growth | installed-local | live descriptorKitIds -> overgrowth-object-domain-kit, grass-object-spawn-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| spread-mold-kit | n:horror-corridor:corridor:overgrowth:ground-growth:mold | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-moss-kit | n:horror-corridor:corridor:overgrowth:ground-growth:moss | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-tree-rot-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wounds:rot-pocket | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| spread-vines-kit | n:horror-corridor:corridor:overgrowth:creepers:vines | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| sprout-root-hairs-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip:growth-zone:maturation-zone:root-hairs | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| stage-stalker-approach-kit | n:horror-corridor:dread:hunter:encounter:approach | implemented-gameplay | src/features/game-state/domain/endlessExpedition.ts | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| stain-wall-face-kit | n:horror-corridor:corridor:ruin:structure:walls:wall:wall-face | installed-local | live descriptorKitIds -> broken-city-wall-domain-kit, moss-grime-texture-domain-kit, rust-streak-texture-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| stalk-explorer-kit | n:horror-corridor:dread:hunter:intent:stalking | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| steer-root-tip-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:roots:root-system:root:root-tip | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| steward-session-truth-kit | n:horror-corridor:shared-expedition:stewardship | legacy-cutover | src/components/game/GameCanvas.tsx | Move the existing behavior behind the target DSK without changing player flow. |
| storage-crate-kit | n:horror-corridor:corridor:ruin:remnants:storage:crates | installed-local | live descriptorKitIds -> storage-crate-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| stretch-fence-kit | n:horror-corridor:corridor:ruin:access:fences | installed-local | live descriptorKitIds -> chain-link-fence-object-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| stretch-party-distance-kit | n:horror-corridor:dread:isolation:distance | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| support-leaf-blade-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:veins:midrib | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| surface-placement-kit | n:horror-corridor:corridor:ground | installed-local | live descriptorKitIds -> triangle-surface-sampler-domain-kit, object-placement-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| sustain-explorer-kit | n:horror-corridor:party:explorers:explorer | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| sustain-explorer-memory-kit | n:horror-corridor:party:explorers:explorer:memory | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| sustain-hunter-kit | n:horror-corridor:dread:hunter | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| sustain-room-tone-kit | n:horror-corridor:corridor:atmosphere:acoustics:room-tone | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| sustain-shared-expedition-kit | n:horror-corridor:shared-expedition | implemented-gameplay | src/features/networking/domain/sharedRecovery.ts, src/components/game/GameShell.tsx, docs/live-player-harness/reconnect-recovery-proof/report.json | Keep the behavior inside this natural gameplay boundary and preserve its live proof. |
| swallow-runoff-kit | n:horror-corridor:corridor:ruin:utilities:drainage:drains:drain | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| terrain | n:horror-corridor:corridor:ground | installed-local | live descriptorKitIds -> terrain-field-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| terrain-shader-kit | host:three-world-host | installed-local | live descriptorKitIds -> terrain-shader-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| thicken-moss-heart-kit | n:horror-corridor:corridor:overgrowth:ground-growth:moss:patches:patch:heart | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| thicken-root-mat-kit | n:horror-corridor:corridor:overgrowth:creepers:wild-roots:root-mats:root-mat | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| thicken-scar-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:wounds:scar | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| thicken-trunk-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| torn-cloth-kit | n:horror-corridor:corridor:ruin:remnants:hanging-remains:cloth | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| trace-return-way-kit | n:horror-corridor:expedition:delve:wayfinding:return-way | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| trigger-collapse-kit | n:horror-corridor:dread:hazards:collapse | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| trip-circuit-kit | n:horror-corridor:corridor:ruin:utilities:electricity:circuits:circuit | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| turn-hunter-attention-kit | n:horror-corridor:dread:hunter:awareness:attention | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| unfurl-leaf-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| unsettle-orientation-kit | n:horror-corridor:dread:lostness:orientation | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| update-hunter-certainty-kit | n:horror-corridor:dread:hunter:awareness:certainty | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| update-orientation-kit | n:horror-corridor:party:explorers:explorer:condition:orientation | legacy-cutover | src/features/player/domain/cameraLook.ts | Move the existing behavior behind the target DSK without changing player flow. |
| visual-match-kit | host:headless-proof-host | host-wired | scripts/horror-corridor-visual-match.mjs | Keep this as a thin platform adapter and keep gameplay ownership out of the host. |
| warn-collapse-kit | n:horror-corridor:dread:hazards:collapse:warning | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| water-surface-kit | n:horror-corridor:corridor:ground:water | installed-local | live descriptorKitIds -> water-surface-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| weather-bark-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:trunk:bark:outer-bark | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| weather-brickwork-kit | n:horror-corridor:corridor:ground:surface:paving:brickwork | installed-local | live descriptorKitIds -> brick-course-texture-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| weather-concrete-kit | n:horror-corridor:corridor:ground:surface:paving:concrete | installed-local | live descriptorKitIds -> wet-concrete-texture-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| weather-leaf-surface-kit | n:horror-corridor:corridor:overgrowth:grove:trees:tree:crown:boughs:bough:branches:branch:twigs:twig:buds:bud:leaf-cluster:leaves:leaf:blade:surface | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| weather-wall-kit | n:horror-corridor:corridor:ruin:structure:walls:wall | installed-local | live descriptorKitIds -> broken-city-wall-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
| weave-root-mats-kit | n:horror-corridor:corridor:overgrowth:creepers:wild-roots:root-mats | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| weave-ways-kit | n:horror-corridor:corridor:maze:ways | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| widen-knowledge-gap-kit | n:horror-corridor:dread:isolation:knowledge-gap | contract-only | generated natural state owner only | Implement when this kit becomes the selected UX slice; do not infer behavior from the tree. |
| widen-wall-wound-kit | n:horror-corridor:corridor:ruin:structure:walls:wall:wall-wounds | installed-local | live descriptorKitIds -> broken-city-wall-domain-kit | Keep the mapped local behavior behind its target domain boundary. |
