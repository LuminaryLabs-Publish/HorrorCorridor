# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T05-59-28-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime startup acquisition, rollback and clean retry
6. runtime readiness leases and generation fencing
7. render-surface resolution, revision and frame correlation
8. active gameplay presentation, HUD/minimap reachability and consumer acknowledgement
9. debug-observability capability, redaction and revocation
10. focus, visibility and held-control retirement
11. runtime frame-failure containment, disposal and cold restart
12. snapshot acceptance ordering and monotonic revision
13. explicit interaction targets and cube/slot claims
14. active-run disconnect, player retirement and reconnect claims
15. monotonic terminal outcome authority
16. host network cadence and fixed simulation authority
17. host movement admission and client reconciliation
18. snapshot delivery, payload budgeting and backpressure authority
19. authoritative randomness, checkpoint and replay authority
20. replicated pause/resume convergence
```

## Current runtime frame-failure gap

```txt
successor RAF scheduled after onFrame: yes
frame-level exception boundary: absent
stage result contract: absent
loop lifecycle terminalization on throw: absent
last-known-good frame authority: absent
escaped mutation/publication receipts: absent
mutation quarantine: absent
readiness revocation: absent
input and transport capability fences: absent
fatal overlay outside damaged graph: absent
ordered disposal on frame failure: absent
cold restart generation transaction: absent
```

## Concrete host failure path

```txt
PLAYING host frame
  -> advance local pose
  -> mutate authoritative state
  -> optionally advance ooze
  -> publish snapshot to runtime store
  -> broadcast SYNC to clients
  -> update local runtime stores
  -> world or post-processing throws
  -> successor RAF is not scheduled
  -> loop remains marked running
  -> peers may display newer state than host canvas
  -> readiness, input listeners and transport subscription remain live
```

## Concrete client failure path

```txt
PLAYING client frame
  -> advance predicted pose
  -> send PLAYER_UPDATE when cadence allows
  -> update local runtime stores
  -> world or post-processing throws
  -> host may accept movement
  -> client canvas remains stale
  -> successor RAF is not scheduled
  -> local input and transport remain reachable
```

## Partial presentation combinations

```txt
camera/world current + minimap prior + main canvas prior
camera/world current + minimap current + main canvas prior
runtime snapshot current + peers current + host canvas prior
client movement accepted by host + client canvas prior
current debug frame + prior visible canvas
```

## Missing frame authority

```txt
runtime frame ID
frame stage ID
immutable frame plan
stage admission and typed result
frame mutation journal
failure ID and classification
first-failure admission
last-known-good snapshot and frame
quarantine revision
readiness revocation result
input and transport fence result
render freeze/failure surface result
disposal plan and per-resource receipts
terminal runtime result
cold restart command/result
first replacement frame acknowledgement
```

## Consequences

```txt
runtime can look active while no future frame executes
host and clients can disagree about the latest committed state
main canvas, minimap and debug observations can cite different implicit revisions
input can continue mutating a dead presentation
transport callbacks can continue mutating a quarantined-looking runtime
resources remain allocated until unrelated React teardown
loop.isRunning() can report true after the RAF chain is dead
restart cannot prove predecessor callbacks and resources are retired
current fixtures do not inject stage faults
```

## Retained focus-loss input gap

```txt
movement before pointer lock: supported
blur reset while not pointer locked: absent
visibility hidden retirement: absent
pagehide retirement: absent
control lease/input revision: absent
client zero-input publication: absent
```

## Retained active-presentation gap

```txt
implemented minimap renderer: present
active PLAYING minimap mount: absent
COMPLETED minimap mount: present
per-frame minimap lookup: present
surface lease and consumer acknowledgement: absent
```

## Retained debug-observability gap

```txt
public query, localStorage, Backquote and window-API activation: present
build-channel and role admission: absent
data classification and redaction: absent
automatic revocation: absent
```

## Retained gaps

The preceding presentation, render-surface, startup, readiness, input-retirement, randomness, snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit, pause and debug-observability findings remain open. This audit adds frame-failure containment, cleanup and cold-restart authority and does not supersede them.