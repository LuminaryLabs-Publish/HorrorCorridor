# Architecture Audit: Live-Agent Browser Proof Provenance

**Timestamp:** `2026-07-14T04-38-29-04-00`

## Summary

The current live-agent path is a tooling composition, not one authoritative DSK transaction. Server admission, browser selection, page observation, screenshot probes, gate settlement and cleanup are coordinated procedurally across two Node scripts without shared generation identity or immutable evidence.

## Plan ledger

**Goal:** define the minimal domain boundary that can turn live-agent reports into revision-bound, reproducible proof.

- [x] Map current process and browser participants.
- [x] Identify current services and ownership boundaries.
- [x] Identify missing command, result and artifact identities.
- [x] Define one parent authority and 23 child coordinating surfaces.
- [ ] Implement the authority without restructuring gameplay domains.

## Current architecture

```txt
package script
  -> recurring runner adapter
     -> optional Next dev-server child
     -> synchronous episode child
        -> HTTP readiness probe
        -> Playwright source resolution
        -> CDP/browser selection
        -> context/page creation
        -> game route and debug bridge
        -> screenshots and Python probes
        -> report.json
     -> JSONL and latest-summary projection
     -> best-effort server close
```

## Ownership gaps

```txt
repository revision owner: absent
proof policy revision owner: absent
external dependency manifest owner: absent
port lease and server owner: absent
CDP endpoint owner: absent
browser/context/page generation owner: absent
renderer frame evidence owner: absent
artifact hash and immutable manifest owner: absent
child cancellation owner: absent
browser/server terminal retirement owner: absent
```

## Required parent domain

```txt
corridor-live-agent-browser-proof-provenance-retirement-authority-domain
```

## Required API

```txt
engine.n.proof.liveAgent.submit(command)
engine.n.proof.liveAgent.cancel(runId, reason)
engine.n.proof.liveAgent.readRun(runId)
engine.n.proof.liveAgent.readEpisode(episodeId)
engine.n.proof.liveAgent.readArtifactManifest(episodeId)
engine.n.proof.liveAgent.readRetirement(runId)
```

## Command

```txt
LiveAgentProofCommand {
  runId
  repositoryRevision
  productManifestFingerprint
  dependencyEnvironmentFingerprint
  proofPolicyRevision
  route
  actionProfiles
  maxEpisodes
  serverPolicy
  browserPolicy
  timeoutPolicy
}
```

## Result

```txt
LiveAgentProofResult {
  status: Completed | Failed | Blocked | Cancelled | TimedOut | Stale
  runId
  acceptedRepositoryRevision
  serverGeneration
  browserGeneration
  episodeResults[]
  artifactManifestHash
  retirementReceipts[]
  diagnostics[]
}
```

## Composition

```txt
revision binding
  -> dependency environment admission
  -> port lease and server ownership proof
  -> browser/CDP admission
  -> isolated context and page generation
  -> debug bridge and renderer-frame admission
  -> bounded action command
  -> correlated state and image capture
  -> artifact hashes and typed gate results
  -> atomic episode publication
  -> child/browser/server retirement
  -> terminal run result
```

## Planned coordinating surfaces

```txt
live-agent-proof-command-kit
repository-revision-binding-kit
dependency-environment-manifest-kit
server-port-lease-kit
server-ownership-admission-kit
browser-binary-fingerprint-kit
cdp-endpoint-admission-kit
browser-context-generation-kit
page-generation-kit
debug-bridge-admission-kit
frame-evidence-kit
action-profile-command-kit
screenshot-capture-kit
artifact-hash-manifest-kit
artifact-atomic-promotion-kit
proof-gate-result-kit
episode-proof-result-kit
episode-cancellation-kit
browser-retirement-kit
server-retirement-kit
live-agent-terminal-result-kit
proof-observation-journal-kit
live-agent-fixture-matrix-kit
```

## Adoption rule

Keep the existing live-agent and live-player scripts as adapters. Move truth, identity, typed results and evidence policy into the parent domain. Do not restructure the 29 gameplay/render/network kits.
