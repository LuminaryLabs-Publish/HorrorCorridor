# Proof-Artifact Generation Gate

**Run:** `2026-07-18T04-41-15-04-00`

## Current deployment evidence

The repository contains production build, static validation, browser harness and focused proof tooling. The nested coverage ledger cites passing current browser reports, but this audit did not rebuild or redeploy the application.

## Required deployment chain

```txt
canonical domain source generation
  -> generated blueprint
  -> production runtime install census
  -> production build artifact
  -> served-origin browser session
  -> admitted proof report
  -> matching captured frame
  -> root .agent projection
  -> central ledger settlement
```

## Gate fields

```txt
repository commit
NexusEngine pinned revision
canonical source hash
blueprint hash
production asset digest
served origin
browser/version
runtime install digest
registered-path digest
proof profile
report digest
frame digest
console/runtime error count
human-review disposition
```

## Missing executable guarantee

The existing reports and screenshots are valuable evidence, but root governance does not yet require every accepted proof to carry all generation fields. Historical and rejected captures also coexist with accepted evidence.

## Required fixture classes

- clean production build from `main`;
- current-domain and coverage checks;
- reset/replay proof;
- solo success/loss/restart proof;
- host/client reconnect proof;
- selected visual-slice proof;
- served artifact and deployed-origin parity;
- stale-generation proof rejection.

## Claim boundary

No build, artifact, Pages deployment or deployed-origin fixture was run by this audit. Existing reports were inspected as repository evidence only.