# HorrorCorridor Storage-Denial Browser Fixture Gate

**Timestamp:** `2026-07-17T03-58-09-04-00`

## Required fixtures

```txt
1. localStorage.getItem throws SecurityError during boot
2. localStorage.setItem throws SecurityError during Backquote toggle
3. localStorage.setItem throws quota error
4. localStorage is unavailable
5. persisted enabled value is malformed
6. persisted overlay value is malformed
7. runtime replacement occurs before an async storage result settles
8. production build runs with memory-only fallback
9. deployed route runs with memory-only fallback
```

## Assertions

```txt
runtime initialization completes
renderer and maze world mount
first playable frame commits
input and networking become ready
safe default or accepted in-memory preference is used
no debug capability is elevated by stored values
no host exception escapes into the application shell
debug toggle returns a typed memory-only or failed result
source/build/deployed status projections agree
```

## Existing scripts

```txt
npm run lint
npm run build
npm run harness:horror-corridor
npm run validate:live-player
npm run validate:live-player:dev
npm run visual:match
```

No existing script explicitly denies browser storage or verifies a first playable frame under storage failure.

## Gate

Do not claim storage-fault isolation, fallback correctness or deployment parity until all fixtures pass against source, production build and the deployed origin on `main`.

## Current result

```txt
implementation: absent
fixtures: absent
commands run: none
artifact smoke: not run
deployed-origin smoke: not run
```
