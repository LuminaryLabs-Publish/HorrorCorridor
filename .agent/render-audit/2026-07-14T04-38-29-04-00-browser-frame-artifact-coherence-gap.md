# Render Audit: Browser Frame and Artifact Coherence Gap

**Timestamp:** `2026-07-14T04-38-29-04-00`

## Summary

The live-player harness captures debug state and screenshots from one page, but the image files are not bound to exact renderer-frame IDs, accepted snapshots, browser generations or content hashes. The report therefore demonstrates approximate visual behavior, not immutable frame provenance.

## Plan ledger

**Goal:** make each visual proof artifact cite the exact page, renderer frame, simulation revision and capture policy that produced it.

- [x] Trace page creation, debug-frame waiting and screenshot capture.
- [x] Trace canvas, luminance, HUD and scene-dressing gates.
- [x] Identify missing frame/artifact correlation.
- [ ] Add renderer-frame and artifact-manifest evidence.

## Current capture sequence

```txt
one page
  -> wait for debug bridge
  -> wait for a PLAYING latestFrame
  -> read debugBefore
  -> capture starting-scene.png
  -> inject movement keys
  -> wait 250 ms
  -> read debugAfter
  -> capture movement-scene.png
  -> probe only starting-scene.png for luminance and HUD chrome
  -> derive gates
```

## Missing evidence

```txt
BrowserGeneration
ContextGeneration
PageGeneration
RendererGeneration
FrameId for starting screenshot
FrameId for movement screenshot
SnapshotRevision for each image
capture start/end monotonic timestamps
viewport and DPR fingerprint in artifact entry
WebGL renderer/capability fingerprint
software-versus-hardware renderer classification
PNG content hash
image dimensions and byte length in immutable manifest
probe input hash
probe implementation/version hash
same-frame debug/image acknowledgement
```

## Required artifact entry

```txt
FrameArtifact {
  artifactId
  runId
  episodeId
  pageGeneration
  rendererGeneration
  frameId
  snapshotRevision
  capturedAtMonotonicMs
  viewport
  devicePixelRatio
  rendererFingerprint
  path
  sha256
  width
  height
  byteLength
}
```

## Required completion

```txt
accepted PLAYING frame
  -> freeze one observation revision
  -> capture state and canvas/screenshot from that revision
  -> hash artifacts
  -> execute probes against cited hashes
  -> publish typed gate results
  -> acknowledge FrameArtifactManifest
```

## Validation boundary

No screenshot was captured during this documentation run. No frame-coherence, renderer-capability or visual-quality claim is made.
