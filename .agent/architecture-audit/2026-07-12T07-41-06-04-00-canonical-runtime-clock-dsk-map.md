# Canonical Runtime Clock DSK Map

**Timestamp:** `2026-07-12T07-41-06-04-00`

## Parent domain

```txt
corridor-canonical-runtime-clock-authority-domain
```

## Intent

Own every temporal decision that can change gameplay, replication, rendering, diagnostics or lifecycle state. Separate monotonic simulation time from UTC observation time and make clock discontinuities explicit results instead of ambient behavior.

## Candidate kits

```txt
runtime-clock-id-kit                    stable clock identity per runtime generation
runtime-clock-revision-kit              monotonic clock-state revision
monotonic-time-source-kit               performance/RAF-backed monotonic sample
wall-clock-observation-kit              UTC metadata for logs and external display only
clock-sample-command-kit                sample identity, source, prior revision and raw value
clock-sample-admission-kit              accepted, duplicate, stale, regressed or discontinuous
clock-discontinuity-classifier-kit      backward jump, forward jump, stall and source reset
simulation-time-state-kit               elapsed simulation time and fixed-step accumulator
simulation-step-sequence-kit            monotonic authoritative step identity
simulation-step-budget-kit              bounded delta, step count and deferred time
pause-clock-policy-kit                  freeze or continue each named clock explicitly
resume-clock-generation-kit             resume identity and first accepted sample
reset-clock-generation-kit              reset identity, origin and stale-sample rejection
network-cadence-clock-kit               publication/update cadence from simulation clock
ui-cadence-clock-kit                    UI projection cadence from monotonic runtime time
ooze-decay-clock-kit                    decay scheduling from authoritative simulation time
snapshot-clock-projection-kit           clock ID, revision, step, simulation time and UTC observation
render-time-projection-kit              canonical frame time supplied to camera and world consumers
clock-frame-correlation-kit             frame ID to clock revision and simulation step
clock-observation-kit                   bounded read model for diagnostics
clock-journal-kit                       bounded sample, jump, pause, reset and step history
clock-regression-fixture-kit            backward wall-clock adjustment proof
clock-forward-jump-fixture-kit          large forward adjustment proof
pause-resume-clock-fixture-kit          frozen simulation and admitted resume generation
snapshot-clock-roundtrip-fixture-kit    serialization and restore continuity
render-simulation-time-parity-fixture-kit frame consumer time agreement
```

## Domain boundaries

```txt
browser adapter
  owns reading RAF/performance and UTC sources
  does not decide gameplay time

clock authority
  owns sample admission, discontinuity classification, pause/reset and simulation time

simulation domains
  consume admitted step IDs and simulation time
  never call Date.now() or RAF directly

networking
  consumes cadence results and projects clock evidence into snapshots

rendering
  consumes one admitted render-time projection for camera, world, minimap and debug

observability
  may include UTC metadata but cannot use it as simulation authority
```

## Required transaction

```txt
raw browser time samples
  -> normalize source and runtime generation
  -> compare with prior accepted sample
  -> classify regression, forward jump, stall or normal advance
  -> apply pause/reset and delta-budget policy
  -> commit clock revision and simulation-step batch
  -> execute simulation and publication from committed simulation time
  -> project clock evidence into snapshot and frame plan
  -> render all consumers from one canonical render time
  -> acknowledge frame with matching clock revision
```

## Invariants

```txt
simulation time never decreases
UTC adjustment cannot directly advance or freeze gameplay
pause policy is explicit and testable
reset creates a new clock generation
stale samples from prior generations are rejected
network cadence and ooze decay use the same admitted temporal authority
render frame cites the simulation step it represents
snapshot restore can continue temporal evolution without ambient clock guessing
```
