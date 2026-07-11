# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-08-43-04-00`

## Available commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing required commands

```txt
npm run fixture:session-lifecycle
npm run fixture:session-message-admission
npm run fixture:snapshot-acceptance
npm run fixture:movement-authority
npm run fixture:client-reconciliation
npm run fixture:pause-convergence
```

## Evidence sampled

```txt
[done] complete accessible LuminaryLabs-Publish inventory
[done] central ledger and root .agent timestamp comparison
[done] GameCanvas client movement, PLAYER_UPDATE send, host receive, publication and active client frame branches
[done] networkRules applyNetworkPlayerUpdate mutation behavior
[done] protocol PLAYER_UPDATE sequence, input and pose fields
[done] current session, snapshot, pause and run-exit audits
[done] implemented kit and service inventory
[done] package command inventory from current audit state
[done] repo-local documentation update on main
```

## Required host movement validation

```txt
sender identity maps to one admitted player
sender/player mismatch rejects without mutation
room/game/runSessionId/sessionEpoch and phase preflight before movement
client sequence is monotonic per player and epoch
stale and duplicate updates return typed no-mutation results
elapsed-time movement budget constrains displacement and velocity
maze collision is host-resolved
host derives or verifies movement from admitted input
claimed pose is never copied blindly into authoritative state
accepted result records previous pose, next pose, sequence and stable reason
snapshot acknowledges the accepted client sequence
```

## Required client reconciliation validation

```txt
active client consumes authoritative local-player pose
acknowledged prediction rows are removed
only later unacknowledged inputs replay
small divergence uses deterministic smoothing
large divergence or invalid state uses hard snap
carry state remains coherent through correction
camera and minimap use the reconciled pose source
pause, exit, reconnect and epoch change clear prediction history
no correction from stale or rejected snapshot
all admission and reconciliation rows remain JSON-safe
```

## Validation order for the next source pass

```txt
1. npm run fixture:session-lifecycle
2. npm run fixture:session-message-admission
3. npm run fixture:snapshot-acceptance
4. npm run fixture:movement-authority
5. npm run fixture:client-reconciliation
6. npm run fixture:pause-convergence
7. npm run lint
8. npm run smoke:protokits
9. npm run harness:horror-corridor
10. npm run build
11. npm run validate:live-player:dev
12. browser host/client correction smoke
13. runtime-debug movement export inspection
```

## Documentation-pass validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
rendering changed: no
network behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing tests run: no
movement authority fixture: unavailable
client reconciliation fixture: unavailable
repo-local documentation pushed to main: yes
central ledger synchronization: pending until this run completes
```

## Completion rule

Do not claim host-authoritative movement or client convergence until deterministic fixtures prove sender binding, sequence admission, movement budget, collision authority, correction acknowledgement and active PLAYING-state reconciliation. A successful build or visual smoke does not prove these properties.
