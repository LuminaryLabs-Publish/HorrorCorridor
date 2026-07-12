# HorrorCorridor Active HUD and Minimap Fixture Gate

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Goal

Define executable evidence that the active gameplay HUD and minimap are mounted, admitted, projected and correlated before deployment is considered visually complete.

## Required component fixtures

```txt
HUDOverlay with screen PLAYING mounts active HUD shell
HUDOverlay with screen PLAYING mounts Minimap when policy requires it
HUDOverlay with screen PAUSED follows explicit minimap visibility policy
HUDOverlay with screen COMPLETED follows explicit terminal policy
Minimap surface ref publishes a lease and revision
unmount revokes the lease
```

## Required renderer fixtures

```txt
DrawMinimapCommand with current lease returns Accepted
missing required lease returns Unavailable
stale lease returns Stale
optional hidden policy returns IntentionallySkipped
projection result reports drawn maze/entity counts
surface resize advances revision
```

## Required browser fixture

```txt
open solo game
start a run
wait for PLAYING
assert #runtime-minimap exists before victory
advance frames while moving
assert minimap pixel fingerprint changes
assert local heading responds to yaw
assert nearby cubes/players/ooze follow snapshot changes
pause and resume
assert lease policy remains explicit and stale leases are rejected
complete the run
assert terminal transition does not create the first minimap surface
```

## Required frame-correlation fixture

```txt
one PresentationFramePlan cites:
  runtime generation
  screen revision
  snapshot tick
  local pose revision
  render surface revision

required results cite the same frameId:
  world
  post-processing
  HUD
  minimap

committed frame is rejected when mandatory minimap result is unavailable
committed frame records an explicit skip when minimap is optional
```

## Required regression fixture

```txt
render PLAYING branch from current source shape
assert failure when Minimap is omitted
render COMPLETED branch
assert completed-only mount does not satisfy active-play requirement
```

## Existing command coverage

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

The existing commands do not currently prove active-play minimap mount, surface leasing, typed projection results or consumer/frame correlation.

## Deployment blockers

```txt
PLAYING route has no active minimap consumer
missing required canvas remains a silent no-op
no presentation consumer policy exists
no surface lease or revision exists
no active minimap frame receipt exists
no browser regression fixture exists
```

## Validation state

```txt
runtime source changed: no
package/deployment source changed: no
fixtures implemented: no
existing commands run: no
browser smoke run: no
active HUD/minimap deployment claim: not made
```
