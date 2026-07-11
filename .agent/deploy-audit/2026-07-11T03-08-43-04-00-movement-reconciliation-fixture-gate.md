# HorrorCorridor Movement Authority and Reconciliation Fixture Gate

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Current command surface

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

These commands do not prove sender/player binding, movement sequence admission, host collision authority, speed/displacement limits or active client correction.

## Required additions

```txt
scripts/horror-corridor-movement-authority-fixture.mjs
scripts/horror-corridor-client-reconciliation-fixture.mjs
npm run fixture:movement-authority
npm run fixture:client-reconciliation
```

## Movement authority fixture matrix

```txt
valid sender/player/run/epoch/sequence accepted
unknown connection rejected
sender/player mismatch rejected
unknown player rejected
inactive phase rejected
old epoch rejected
stale sequence rejected
exact duplicate no-change
zero-input teleport rejected
speed-budget violation rejected
velocity-budget violation rejected
wall crossing corrected or rejected
valid movement produces deterministic host pose
held cube follows only accepted authoritative pose
rejected command changes no state revision or snapshot tick
all rows JSON-safe
```

## Client reconciliation fixture matrix

```txt
host snapshot acknowledges accepted client sequence
acknowledged history pruned
later unacknowledged inputs replayed in order
no divergence produces no correction
small divergence produces deterministic smooth correction
large divergence produces snap
wall-side mismatch produces snap
stale snapshot produces no correction
new epoch clears history
pause or exit clears/fences history by policy
camera/minimap pose source equals reconciled projection
all rows JSON-safe
```

## Recommended validation order

```txt
fixture:session-lifecycle
  -> fixture:session-message-admission
  -> fixture:snapshot-acceptance
  -> fixture:movement-authority
  -> fixture:client-reconciliation
  -> fixture:pause-convergence
  -> lint
  -> smoke:protokits
  -> harness:horror-corridor
  -> build
  -> validate:live-player:dev
  -> browser host/client correction smoke
```

## Deployment rule

A successful build, visual match or Pages deployment does not prove movement authority. Do not close this ledge until the deterministic fixtures prove that claimed client poses cannot bypass host identity, sequence, budget and collision policies, and that accepted host corrections converge during active play.

## Current state

```txt
runtime source changed: no
fixture scripts present: no
package commands present: no
fixtures run: no
browser correction smoke run: no
deployment changed: no
```
