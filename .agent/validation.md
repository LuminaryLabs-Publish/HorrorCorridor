# HorrorCorridor Validation

**Updated:** `2026-07-16T02-40-29-04-00`  
**Scope:** documentation-only ooze RNG stream, snapshot, replay and frame-proof audit

## Summary

Source inspection confirms that `OozeTrailUpdateInput` permits RNG injection, but `GameCanvas` omits it during host/solo execution. `oozeRules.ts` consequently falls back to `Math.random()` for decay survival, trail height and rotation, while replicated snapshots contain concrete trail values but no RNG algorithm, stream, cursor or draw count.

## Plan ledger

**Goal:** record exactly what was inspected and prevent unsupported determinism, replay, restore, visual or production claims.

- [x] Confirm the selected repository head matched its prior repo-local documentation head.
- [x] Inspect `GameCanvas.tsx` host cadence and snapshot publication.
- [x] Inspect `oozeRules.ts` RNG resolution, decay and spawn behavior.
- [x] Inspect `gameTypes.ts` optional RNG input and runtime state.
- [x] Inspect `shared.ts` replicated snapshot schema.
- [x] Inspect `package.json` scripts and dependencies.
- [x] Inspect `.agent/kit-registry.json` inventory.
- [x] Search for deterministic ooze replay and seed-bound frame fixtures.
- [x] Update only `.agent` documentation and central tracking.
- [ ] Run runtime and browser fixtures after implementation exists.

## Source evidence

```txt
run seed in ReplicatedGameSnapshot: present
oozeTrail and oozeLevel in snapshot: present
RNG field in OozeTrailUpdateInput: optional
host call supplies RNG: no
resolveRng ambient fallback: Math.random
random decay survival: present
random spawn height: present
random spawn rotation: present
RNG algorithm/derivation version in snapshot: absent
stream identity in snapshot: absent
cursor and draw count in snapshot: absent
canonical ooze hash: absent
FirstSeedBoundOozeFrameAck: absent
same-seed replay fixture: absent
```

## Change classification

```txt
documentation changed: yes
runtime TypeScript changed: no
React or CSS changed: no
network behavior changed: no
input behavior changed: no
gameplay changed: no
Three.js behavior changed: no
Canvas2D behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Commands and fixtures

```txt
npm install: not run
npm run lint: not run
npm run build: not run
validate:live-player: not run
same-seed source fixture: unavailable
different-seed fixture: unavailable
stream-isolation fixture: unavailable
save/restore cursor fixture: unavailable
duplicate/stale command fixture: unavailable
canonical replay hash fixture: unavailable
FirstSeedBoundOozeFrameAck fixture: unavailable
production-build smoke: not run
deployed-origin smoke: not run
```

## Claim boundary

No live multiplayer desynchronization was reproduced. No runtime repair, deterministic ooze evolution, same-seed equivalence, exact restore, replay correctness, stream isolation, visual correctness, browser parity, deployment parity or production readiness is claimed.