# Network-Jitter Browser Fixture Gate

**Timestamp:** `2026-07-16T16-00-12-04-00`

## Summary

Remote-actor smoothing cannot be accepted from source structure alone. It needs deterministic packet scheduling and visible cross-surface proof in source, production build and deployed Pages environments.

## Intent

Define the minimum executable evidence required before claiming smooth multiplayer presentation.

## Required fixtures

| Fixture | Required proof |
|---|---|
| Stable cadence | Constant-velocity actor remains visually bounded between 50 ms samples |
| Jitter | Variable delivery intervals do not produce unbounded frame displacement |
| Loss | Missing samples use only the accepted extrapolation budget, then freeze |
| Reorder | Older samples are rejected and never rewind presentation |
| Duplicate | Duplicate tick produces no history or frame revision change |
| Teleport | Large correction applies immediately and clears old interpolation history |
| Recovery | Valid samples resume after freeze without stale-generation adoption |
| Retirement | Departed actor loses buffer, mesh and minimap marker ownership |
| Cross-surface parity | Three.js and minimap show the same projection revision |
| Route teardown | Retired session callbacks cannot publish late pose results |

## Measurement requirements

```txt
accepted snapshot tick and host timestamp
client receive timestamp
projection revision
presentation timestamp
interpolation alpha
per-frame actor displacement
extrapolation age and distance
Three.js receipt revision
minimap receipt revision
```

## Environment matrix

```txt
source development server
production build server
GitHub Pages deployed origin
```

Each environment must use the same deterministic packet schedule and expected projection ledger.

## Failure gate

Do not pass when any of the following occurs:

- Actor rewinds after an older packet.
- Extrapolation exceeds its time or distance budget.
- Teleport is blended through blocked geometry.
- Three.js and minimap use different projection revisions.
- A retired actor reappears from a late callback.
- Production or deployed behavior differs from source behavior.

## Current state

No interpolation fixture, packet scheduler, build smoke, Pages smoke or projection receipt exists. This remains a proposed gate.