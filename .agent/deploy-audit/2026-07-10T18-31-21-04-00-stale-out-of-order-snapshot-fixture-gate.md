# HorrorCorridor Stale and Out-of-Order Snapshot Fixture Gate

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Required command

```txt
npm run fixture:snapshot-acceptance
```

The command does not exist yet.

## Fixture requirements

The fixture must run without DOM, Three.js, PeerJS, React, or a browser. It should feed deterministic `SYNC` envelopes into pure preflight and acceptance functions.

## Required rows

```txt
valid initial snapshot accepted
higher tick accepted
same tick and same fingerprint classified duplicate
same tick and different fingerprint rejected conflicting duplicate
lower tick rejected stale
out-of-order 10, 12, 11 leaves 12 committed
unsupported protocol version rejected
wrong host sender rejected
wrong envelope room rejected
payload room and snapshot room mismatch rejected
authoritativeTick and snapshot.tick mismatch rejected
gameId drift rejected
seed drift rejected
explicit recovery epoch reset accepted
victory followed by stale playing candidate remains victory
request-linked accepted snapshot records accepted tick
rejected snapshot does not resolve request as committed
legacy valid version-1 final-state parity
```

## Output contract

```txt
fixture name
candidate identity
previous accepted identity
candidate tick
previous accepted tick
candidate fingerprint
status
reason
committed record id optional
final accepted tick
final game state
pass/fail
```

## Validation order

```txt
1. npm run fixture:snapshot-acceptance
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. browser solo smoke
7. browser host/client delayed-message smoke
8. reconnect/recovery smoke
9. runtime-debug export inspection
```

## Deployment rule

Do not treat a successful build or Pages deployment as proof of snapshot authority. Deployment remains unchanged until the deterministic acceptance fixture proves delivery-order safety.