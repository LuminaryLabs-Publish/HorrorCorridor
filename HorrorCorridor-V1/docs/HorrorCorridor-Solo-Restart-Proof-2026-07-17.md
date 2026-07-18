# HorrorCorridor Solo Restart Proof

Status: passing headed-player and human-view proof

## UX Intention

Authoritative capture should end the failed attempt without trapping a solo player in multiplayer lobby behavior. The terminal screen presents one hero action, **Begin another expedition**, then visibly returns through loading into a completely fresh solo attempt that can move immediately.

## Ownership Flow

```text
Expedition / Fate / caught
  -> CompleteScreen presents the restart request
  -> GameShell clears runtime adapters and requests a new departure
  -> begin-expedition-kit / beginSoloExpedition creates the authoritative attempt
  -> fresh room + player + seed + maze + expedition + Monster Index snapshot
  -> GameCanvas mounts a fresh NexusEngine composition
  -> player resumes at the entrance
```

`src/features/game-state/domain/beginExpedition.ts` owns solo attempt construction. React supplies only an opaque attempt identity and adapts the returned bootstrap into session, runtime, and UI stores. The restart does not mutate the caught snapshot in place or route solo play through client readiness.

## Live Proof

Command:

```bash
npm run validate:restart-after-caught
```

Report: `docs/live-player-harness/restart-after-caught-proof/report.json`

- Created: `2026-07-17T23:57:49.172Z`
- Browser: headed system Chrome through the explicit Playwright browser path
- Profile duration: `50,867 ms`
- First attempt: room `solo-corridor-attempt-iprmp2lqpn`, player `solo-player-attempt-iprmp2lqpn`
- Terminal truth: `screen=COMPLETED`, `gameState=failure`, `phase=caught`, Building 1, Still Guest seen once
- Fresh attempt: room `solo-corridor-attempt-24xgtempdl`, player `solo-player-attempt-24xgtempdl`
- Fresh truth: `screen=PLAYING`, `gameState=playing`, `phase=intro`, Building 0, score 0, no active encounter, all four Monster Index entries unknown with zero encounters and zero survived scares
- Post-restart movement: `3.7602` world units
- UI flow: caught terminal, restart loading, fresh expedition, and moved fresh expedition were all captured
- Runtime: 474 installs, 36 NexusEngine core kits, 6 top-level compositions, 359 natural state snapshots, 405 registered paths
- Reset/replay: 359/359 domains reset to revision zero; after-reset and fresh-runtime replay digests both matched `fnv1a32:22183afb`
- Standard gates: all passed with zero console errors, zero visible play text after restart, zero bottom-left HUD pixels, readable fresh player views, and an active non-zero canvas

## Human-View Result

- `caught-terminal.png`: the failure reason and **Begin another expedition** hero action are centered and unambiguous.
- `restart-loading.png`: the transition is visible rather than appearing frozen or silently teleporting.
- `fresh-expedition.png`: the new attempt opens at the readable ruined-room entrance with no play HUD.
- `fresh-expedition-moved.png`: the player has regained control and advanced from the new spawn.

The bounded solo restart subject is **Fixed**. This proof originally left 302 contracts open; the later wet-concrete slice reduces the current ledger to 300. Full objective completion remains open: cross-device transport recovery, streamed-room variation, and full V2 room fidelity still require work.
