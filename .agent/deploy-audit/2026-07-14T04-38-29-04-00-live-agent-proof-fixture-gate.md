# Deploy Audit: Live-Agent Proof Fixture Gate

**Timestamp:** `2026-07-14T04-38-29-04-00`

## Summary

The package exposes strong browser-oriented commands, but no gate proves that the evidence came from the requested source revision, owned server, isolated browser/page or deployed build. The live-agent command is not part of `build` or `lint`, and its environment depends on local browser, NexusSimulator, Python and Pillow availability.

## Plan ledger

**Goal:** require reproducible proof across source, production build and deployed origin before accepting a live-agent report.

- [x] Inspect package command wiring.
- [x] Inspect server/browser/tool fallback behavior.
- [x] Define fixture matrix and promotion gate.
- [ ] Execute fixtures after provenance authority exists.

## Required fixture matrix

```txt
source server
  [ ] owned ephemeral port
  [ ] exact repository revision endpoint
  [ ] isolated browser context
  [ ] hardware/software renderer classification
  [ ] frame-bound artifact hashes

production build
  [ ] npm run build succeeds
  [ ] owned production server
  [ ] same proof-policy revision
  [ ] equivalent route/debug bridge
  [ ] equivalent gate semantics

deployed origin
  [ ] immutable deployment revision
  [ ] expected origin and application fingerprint
  [ ] no local filesystem dependency
  [ ] no NexusSimulator fallback
  [ ] no undeclared Python/Pillow dependency
```

## Fault injection

```txt
occupied port by foreign server
foreign HTTP 200 response
stale CDP endpoint
shared browser context with existing pages
browser executable replacement
Playwright version replacement
missing Pillow
page navigation failure
missing debug bridge
stale renderer frame
partial screenshot write
artifact hash mismatch
SIGINT during child episode
server refusing to exit
```

## Promotion rule

```txt
source proof passes
  + production-build proof passes
  + deployed-origin proof passes
  + artifact manifests verify
  + mandatory retirement receipts pass
  -> live-agent evidence may be promoted
```

## Current validation

```txt
npm run live-agent:sample: not run
npm run validate:live-player: not run
npm run build: not run
source browser proof: not run
production browser proof: not run
deployed-origin proof: not run
fault-injection matrix: unavailable
```
