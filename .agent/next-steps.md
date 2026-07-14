# HorrorCorridor Next Steps

**Updated:** `2026-07-14T04-38-29-04-00`

## Summary

Keep the existing live-agent scripts as adapters, but move proof identity and settlement into one authority. Bind source, dependencies, server, browser, page, frames, artifacts and retirement before treating an episode as reproducible evidence.

## Plan ledger

**Goal:** turn opportunistic local browser observations into hermetic, revision-bound proof without restructuring gameplay code.

### Documentation

- [x] Audit the recurring runner and browser harness.
- [x] Preserve the 29-kit runtime/tooling inventory.
- [x] Document the two proof adapters.
- [x] Define the parent DSK and candidate surfaces.
- [x] Add and route the timestamped audit family.

### Gate 1: source and environment admission

- [ ] Add `LiveAgentProofCommand`, `ProofRunId`, `EpisodeId` and `ObservationGeneration`.
- [ ] Bind repository commit, product manifest and proof-policy revisions.
- [ ] Fingerprint package lock, Node, Playwright, browser, Python and Pillow.
- [ ] Remove or explicitly admit the external NexusSimulator Playwright fallback.

### Gate 2: server ownership

- [ ] Reserve an ephemeral loopback port before server spawn.
- [ ] Prove the child PID owns the listening socket.
- [ ] Expose expected application and repository fingerprints from the route.
- [ ] Reject foreign HTTP responses and occupied-port ambiguity.

### Gate 3: browser and page identity

- [ ] Record executable path, digest, browser version, engine and launch policy.
- [ ] Define whether CDP reuse is allowed.
- [ ] Never silently reuse a foreign context.
- [ ] Allocate browser, context and page generations.
- [ ] Classify hardware, software and unavailable GPU presentation.

### Gate 4: frame and action evidence

- [ ] Bind the debug bridge to a renderer generation.
- [ ] Admit an exact starting frame and snapshot revision.
- [ ] Execute a typed, bounded action-profile command.
- [ ] Record input admission/release frames and simulation ticks.
- [ ] Capture before/after state and images from cited frames.

### Gate 5: artifact settlement

- [ ] Hash screenshots, debug state, logs and report files.
- [ ] Record dimensions, byte lengths, viewport, DPR and renderer fingerprint.
- [ ] Make each image probe cite its input artifact hash and tool version.
- [ ] Atomically promote one immutable episode manifest.
- [ ] Publish typed gate and episode results.

### Gate 6: cancellation and retirement

- [ ] Replace or wrap blocking child execution with cancellable process control.
- [ ] Reject late child output after cancellation or supersession.
- [ ] Distinguish owned browser close from attached-browser disconnect.
- [ ] Await page, context, browser, child, server and port-release receipts.
- [ ] Publish a terminal run result only after mandatory cleanup settles.

### Gate 7: fixtures

- [ ] Foreign server on expected port.
- [ ] Stale or foreign CDP endpoint.
- [ ] Shared browser context with existing pages.
- [ ] Browser/Playwright/Pillow version replacement.
- [ ] Missing debug bridge and stale renderer frame.
- [ ] Partial screenshot and artifact-hash mismatch.
- [ ] SIGINT during an active episode.
- [ ] Server refusing to exit.
- [ ] Source, production-build and deployed-origin parity.

## Dependency order

```txt
source and environment identity
  -> owned server
  -> admitted browser/context/page
  -> debug and renderer frame identity
  -> bounded action result
  -> artifact hashes and gate settlement
  -> cancellation and terminal retirement
  -> source/build/deployed fixtures
```

## Completion boundary

Do not treat a passing live-agent report as reproducible proof until the immutable evidence manifest and retirement fixtures pass on `main`.
