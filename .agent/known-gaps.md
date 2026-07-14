# HorrorCorridor Known Gaps

**Updated:** `2026-07-14T04-38-29-04-00`

## Summary

The highest current gap is live-agent proof provenance. The browser harness can produce a useful passing report without proving the exact repository revision, dependency environment, server owner, browser identity, renderer frames, artifact hashes or terminal cleanup that produced it.

## Plan ledger

**Goal:** prioritize reproducible proof while retaining every earlier loading, session, transport, protocol, rendering and gameplay finding.

- [x] Preserve previous audits.
- [x] Add and route the live-agent proof gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. repository and product-manifest revision binding
2. package, Playwright, browser, Python and Pillow environment fingerprint
3. port lease and spawned-server ownership proof
4. expected application identity at the admitted HTTP endpoint
5. browser executable, version and launch-policy fingerprint
6. explicit CDP reuse and ownership policy
7. isolated browser context and page generations
8. renderer generation and frame IDs
9. action command identity and input admission/release receipts
10. frame-bound debug state and screenshots
11. artifact hashes and immutable manifest promotion
12. typed proof-gate and episode results
13. cancellable active child process
14. page, context, browser, child, server and port retirement receipts
15. source, production-build and deployed-origin proof parity
16. truthful loading-progress and readiness settlement
17. sealed host-start roster and client convergence
18. WebGL context and GPU-resource recovery
19. cross-store session/runtime/UI atomic transition
20. protocol semantic and source admission
21. snapshot ordering, budgeting and backpressure
22. interaction claim authority and terminal outcome convergence
```

## Current proof gap

```txt
repository SHA in run evidence: no
product/package fingerprint: no
external NexusSimulator revision: no
Playwright source can be external: yes
Python/Pillow environment manifest: no
owned port/server proof: no
HTTP admission validates app identity: no
pre-existing CDP reuse: yes
browser executable/version fingerprint: no
foreign context reuse prevented: no
software/hardware renderer classified: no
screenshot-to-renderer-frame binding: no
artifact hashes: no
atomic immutable artifact manifest: no
mid-episode cancellation: no
terminal cleanup receipts: no
```

## Failure paths

### Foreign server acceptance

```txt
expected dev server fails or never owns port 3000
  -> another service returns HTTP status below 500
  -> waitForHttp succeeds
  -> browser proof continues against the wrong application
```

### Foreign browser/context reuse

```txt
an unrelated CDP endpoint is reachable
  -> harness attaches
  -> first existing context is reused
  -> new proof page inherits an unsealed browser environment
  -> report lacks ownership and executable identity
```

### Uncontrolled tool environment

```txt
repo Playwright import fails
  -> hard-coded NexusSimulator checkout supplies Playwright
  -> Python/Pillow probes run from host environment
  -> versions and source revisions are not included in evidence
```

### Signal during active episode

```txt
parent receives SIGINT or SIGTERM
  -> interrupted flag changes
  -> spawnSync child remains blocking
  -> cancellation cannot settle until child exits
  -> late artifacts are not classified by generation
```

### Partial retirement

```txt
browser close failure is swallowed
server child receives kill
  -> close promise may resolve after 1.5 seconds
  -> no exit status, port release or ownership receipt is recorded
  -> run manifest can still become terminal
```

## Missing authority

```txt
LiveAgentProofCommand
ProofRunId
EpisodeId
ObservationGeneration
RepositoryRevisionBinding
DependencyEnvironmentManifest
ServerPortLease
ServerOwnershipResult
BrowserAdmissionResult
ContextGeneration
PageGeneration
FrameEvidence
ActionProfileResult
ArtifactHashManifest
ProofGateResult
EpisodeProofResult
EpisodeCancellationResult
BrowserRetirementResult
ServerRetirementResult
LiveAgentProofResult
```

## Retained gaps

All previous loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, runtime lifecycle, clock, snapshot, input, movement, interaction, outcome, debug and deployment findings remain open.

## Do not claim

Do not claim hermetic live-agent proof, exact source identity, owned server/browser execution, frame-artifact provenance, cancellation, complete retirement or production parity until the authority and fixtures pass on `main`.
