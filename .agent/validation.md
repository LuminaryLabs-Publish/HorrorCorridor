# HorrorCorridor Validation

**Updated:** `2026-07-15T21-39-15-04-00`  
**Scope:** documentation-only pointer-lock acquisition, failure, fallback, and frame-proof audit

## Summary

Source inspection confirms that `GameCanvas` directly requests pointer lock, listens for `pointerlockchange`, and ignores mouse movement while ownership is not active. It does not handle a request result, register `pointerlockerror`, distinguish input readiness from mouse-look readiness, project a visible failed-capture state, provide a fallback look profile, or acknowledge the first frame produced by accepted look evidence.

## Plan ledger

**Goal:** record exactly what was inspected and prevent unsupported pointer-lock, fallback, mouse-look, visual, or production claims.

- [x] Confirm the selected repository head matched its prior repo-local documentation head.
- [x] Inspect `GameCanvas.tsx` capture, change, input-readiness, mousemove, frame, and cleanup ownership.
- [x] Inspect `PointerLockGate.tsx` capture UI and hidden-chrome behavior.
- [x] Inspect player input state and unlock reset behavior.
- [x] Inspect `package.json` scripts and dependencies.
- [x] Inspect `.agent/kit-registry.json` inventory.
- [x] Search for `pointerlockerror` handling and capture-failure fixtures.
- [x] Update only `.agent` documentation and central tracking.
- [ ] Run runtime and browser fixtures after implementation exists.

## Source evidence

```txt
requestPointerLock invocation: present
request result handling: absent
pointerlockchange listener: present
pointerlockerror listener: absent
input readiness during initialization: present
mouse-look readiness result: absent
showChrome for GameCanvas: false
mousemove ignored while unlocked: present
visible failed-capture projection: absent
retry/fallback result: absent
PointerLockGeneration: absent
PointerLockAdmissionResult: absent
FirstPointerLockFrameAck: absent
capture-denial fixture: absent
unsupported-capability fixture: absent
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
accepted pointer-lock fixture: unavailable
denied pointer-lock fixture: unavailable
unsupported API fixture: unavailable
permissions-policy fixture: unavailable
interruption/retry fixture: unavailable
fallback-control fixture: unavailable
retirement/stale-callback fixture: unavailable
FirstPointerLockFrameAck fixture: unavailable
production-build smoke: not run
deployed-origin smoke: not run
```

## Claim boundary

No runtime repair, pointer-lock failure reproduction, acquisition correctness, fallback operability, mouse-look completeness, visual correctness, browser parity, deployment parity, or production readiness is claimed.