# HorrorCorridor Focus-Loss Input Fixture Gate

**Timestamp:** `2026-07-12T04-28-03-04-00`

## Summary

Current build, lint, harness and visual commands do not prove that browser focus or visibility loss retires held gameplay input. Deployment readiness must include deterministic input-domain fixtures and a real browser smoke.

## Existing commands

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

## Required new fixture commands

```txt
npm run fixture:input-retirement
npm run fixture:client-zero-input
npm run fixture:input-teardown
npm run smoke:focus-visibility-input
```

## DOM-free fixture: input retirement

Must prove:

```txt
keydown W creates forward = true
blur command commits neutral state
hidden command commits neutral state
pagehide command commits neutral state
duplicate lifecycle events do not double-increment revision
focus regain does not restore prior buttons
new keydown after regain creates a new lease
stale runtime/run commands reject without mutation
```

## DOM-free fixture: client zero-input

Must prove:

```txt
accepted retirement emits one sequenced neutral update
duplicate retirement emits no second update
stale transport emits no update
stale run emits no update
host rejects later updates from the retired lease
```

## Runtime teardown fixture

Must prove:

```txt
pause retires input before another movement step
return to lobby retires input before unmount
completion retires input
runtime stop and replacement neutralize state
cleanup leaves runtimeStore input flags neutral
no post-teardown client movement update is sent
```

## Browser smoke

Required scenario:

```txt
1. Start solo run.
2. Leave pointer unlocked.
3. Hold W until movement is visible.
4. Blur the page before releasing W.
5. Release W outside the page.
6. Restore focus.
7. Assert player position did not advance after retirement.
8. Assert runtime input axes are zero.
9. Assert one retirement result and one first-neutral-frame receipt exist.
```

Repeat with:

```txt
document hidden
tab background/foreground
pointer-lock loss
pause and resume
route exit
client session with transport
```

## Deployment gate

A production deployment must fail when:

```txt
any ownership-loss path leaves a held control true
a retirement command lacks a typed result
a duplicate event publishes multiple zero-input messages
the first post-loss frame consumes non-zero movement axes
runtime teardown leaves non-neutral input flags
```

## Validation status

```txt
runtime implementation: absent
input-retirement fixture: absent
client zero-input fixture: absent
runtime teardown fixture: absent
focus/visibility browser smoke: not run
Pages/deployment smoke: not run
```

No deployment input-lifecycle claim is made until these gates exist and pass.