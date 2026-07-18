# HorrorCorridor Shared Expedition Recovery Proof

Status: passing bounded UX slice

## Outcome

A real headed two-page Shared Expedition now survives client transport loss. The client preserves its last known place, exposes one clear rejoin action, requests a correlated authoritative recovery snapshot, returns to the same room/game/seed, and can move again while the host never stops owning the expedition.

## Player Flow

```text
shared expedition
  -> client moves and host observes it
    -> client connection closes
      -> Connection lost / Rejoin expedition
        -> Recovering your place
          -> host receives request-sync
            -> correlated authoritative recovery snapshot
              -> same identity and restored place
                -> clean PLAYING view and movement resumes
```

The recovery feedback stays visible for a short `240 ms` minimum so a fast local reconnection does not erase the state before a person can perceive it.

## Natural Ownership

- `Shared Expedition / Rejoining` owns connection, disconnection, recovery attempt, restored place, and the recovery history transaction through `src/features/networking/domain/sharedRecovery.ts`.
- `Shared Expedition / Shared Chronicle` receives the bounded recovery journal through the mounted Nexus runtime.
- `GameShell` is the thin lifecycle adapter: it reacts to transport events, presents recovery UI, sends `request-sync`, and applies the returned snapshot.
- `GameCanvas` remains the host authority and echoes the recovery request ID on the authoritative full-sync message.
- PeerJS/BroadcastChannel adapters only connect, disconnect, and transport protocol messages; they do not decide restored gameplay truth.

The promoted behavior contracts are `peer-session-kit`, `sustain-shared-expedition-kit`, `share-world-snapshot-kit`, `reconcile-world-snapshot-kit`, `rejoin-party-kit`, and `record-shared-session-kit`. This recovery slice moved coverage to 126 closed / 302 open; the later wet-concrete floor slice moves the current ledger to 128 closed / 300 open.

## Headed Proof

Command:

```bash
npm run validate:reconnect-recovery
```

Passing report: `docs/live-player-harness/reconnect-recovery-proof/report.json`, created `2026-07-17T23:59:10.543Z` in `22,583 ms`.

- Client movement before loss: `3.7503` world units, observed by the host at tick `41`.
- Host progress while the client was absent: tick `41 -> 54`.
- Recovery snapshot: authoritative tick `57`, with the same room ID, game ID, seed, player identity, and position; the restored browser snapshots were sampled at tick `65`.
- Restored-position disagreement: `0` world units against host authority and `0` against the preserved last-known place.
- Movement after recovery: `2.25` world units, observed by the host at tick `90`.
- Recovery history: `disconnected -> reconnecting -> restored`, with the reconnect/restored entries sharing one request ID.
- Nexus proof: 474 installs, 405 registered paths, Rejoining state `restored`, and matching Shared Chronicle recovery history.
- Browser result: 13/13 gates pass with zero console or page errors.

## Human View

- `client-disconnected.png` clearly preserves the dark corridor behind a centered **Connection lost** card with last building, score, tick, status, and one hero **Rejoin expedition** action.
- `client-recovering.png` clearly changes the card to **Recovering your place**, disables the primary action, and reports `RECONNECTING`.
- `client-restored.png` removes recovery chrome and returns to an unobstructed player view.
- `host-during-disconnect.png` remains a normal playable scene, proving client recovery does not interrupt host presentation.

Human-view status: **Fixed** for this bounded same-origin two-page recovery flow.

## Boundary

This proves the local two-page transport path and authoritative recovery transaction. Cross-device and cross-network PeerJS recovery remain unverified; they must reuse this domain transaction and protocol correlation rather than introducing a second recovery truth.
