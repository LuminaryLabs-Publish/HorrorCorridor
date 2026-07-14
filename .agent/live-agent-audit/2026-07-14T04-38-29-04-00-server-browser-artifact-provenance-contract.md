# Live-Agent Audit: Server, Browser and Artifact Provenance Contract

**Timestamp:** `2026-07-14T04-38-29-04-00`

## Summary

A passing live-agent episode must prove which source revision was served, which process owned the endpoint, which browser and page executed it, which renderer frames were observed, which artifacts were evaluated and how every owned resource retired.

## Plan ledger

**Goal:** define the canonical evidence manifest and settlement rules for live-agent proof.

- [x] Identify all proof participants.
- [x] Define provenance fields.
- [x] Define admission and retirement rules.
- [ ] Implement immutable manifests and fault-injection fixtures.

## Canonical manifest

```txt
LiveAgentEvidenceManifest {
  schemaVersion
  runId
  episodeId
  repositoryRevision
  productManifestFingerprint
  packageLockFingerprint
  externalToolManifest
  proofPolicyRevision
  server {
    generation
    pid
    executable
    command
    portLeaseId
    origin
    applicationFingerprint
  }
  browser {
    generation
    ownership
    engine
    executablePath
    executableHash
    version
    launchPolicyHash
    cdpEndpointFingerprint
  }
  contextGeneration
  pageGeneration
  route
  debugBridgeRevision
  startFrame
  actionResult
  endFrame
  artifacts[]
  gateResults[]
  retirementReceipts[]
  manifestHash
}
```

## Admission rules

```txt
server
  -> port must be reserved before spawn
  -> child PID must own the listening socket
  -> route must expose expected app and repository fingerprints

browser
  -> executable and version must be recorded
  -> CDP reuse must be explicitly allowed or rejected
  -> foreign contexts must never be silently reused
  -> renderer policy must classify hardware, software or unavailable GPU

page
  -> route, debug bridge and PLAYING frame must match accepted generations
  -> console/page errors must be bounded and cited

artifacts
  -> every file must be hashed after final write
  -> every probe must cite its input artifact hash
  -> manifest promotion must be atomic
```

## Retirement rules

```txt
owned page closes and acknowledges
owned context closes and acknowledges
owned browser closes, or attached browser disconnects without destroying foreign ownership
child episode terminates and yields exit/signal result
owned server exits and yields exit/signal result
port lease is released
late callbacks are rejected by generation
terminal result is written only after mandatory receipts settle
```

## Current violations

```txt
fixed port without lease
HTTP status-only server admission
opportunistic CDP/browser selection
possible shared-context reuse
external Playwright source without revision fingerprint
undeclared Python/Pillow probe environment
screenshots without frame IDs or hashes
mutable report and latest-summary files
blocking child without mid-episode cancellation
cleanup timeout without terminal ownership receipt
```

## Completion gate

A report is proof only when its manifest hash, cited artifacts and mandatory retirement receipts can be independently verified from the accepted repository revision.
