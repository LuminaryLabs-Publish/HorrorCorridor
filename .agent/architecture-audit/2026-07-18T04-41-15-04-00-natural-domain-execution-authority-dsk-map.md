# Natural-Domain Execution Authority DSK Map

**Run:** `2026-07-18T04-41-15-04-00`

## Current composition

```txt
horror-corridor-game-kit
  -> horror-expedition-kit
  -> horror-corridor-world-kit
  -> horror-party-kit
  -> horror-dread-kit
  -> horror-shared-expedition-kit

runtime install order
  -> 36 NexusEngine core kits
  -> 359 generated natural-domain owner kits
  -> 73 adapted local descriptor kits
  -> 6 composition kits
  -> 474 total installs
```

## Domain boundary

The canonical source contains the root and five natural branches:

```txt
Expedition
Corridor
Party
Dread
Shared Expedition
```

Those branches recursively contain 358 child domains. Every natural domain is generated as a DSK with owned state, state-change event, revision, snapshot, patch, reset, declared behavior contracts and declared services.

## Existing services

The canonical blueprint declares 59 services. They are metadata on natural owners and controlled cross-domain verbs. The runtime DSK API currently exposes state `snapshot`, `patch` and `reset`; product service implementations remain classified separately in the coverage ledger.

## Existing kit strata

| Stratum | Count | Authority |
|---|---:|---|
| NexusEngine core kits | 36 | pinned public NexusEngine revision |
| Natural-domain owner kits | 359 | generated canonical blueprint |
| Local descriptor kits | 73 | `src/protokits` factories adapted into Nexus runtime kits |
| Composition kits | 6 | root plus five top-level natural branches |
| Target behavior contracts | 428 | canonical tree and domain-service coverage ledger |

## Main gap

The root `.agent` registry and nested canonical composition previously described different strata without an explicit generation relationship. A state-owner kit can be installed while its attached behavior contract remains open, so totals must never be merged or compared without classification labels.

## Proposed documentation authority

```txt
horror-corridor-domain-documentation-generation-authority-domain
  -> canonical-source-admission-kit
  -> blueprint-generation-result-kit
  -> runtime-composition-census-kit
  -> behavior-contract-classification-kit
  -> proof-evidence-admission-kit
  -> root-agent-projection-kit
  -> central-ledger-settlement-kit
```

## Required results

```txt
CanonicalDomainSourceAdmissionResult
DomainBlueprintGenerationResult
RuntimeCompositionCensusResult
BehaviorCoverageClassificationResult
ProofEvidenceAdmissionResult
RootAgentProjectionCommitResult
CentralLedgerCommitResult
```

## Invariants

- One canonical source hash identifies one domain generation.
- The generated blueprint cites that source hash.
- Runtime install IDs cite the blueprint generation.
- Coverage counts distinguish owner installation from behavior implementation.
- Proof evidence cites the runtime generation exercised.
- Root `.agent` and the central ledger cite the same resulting repository head.

This audit proposes documentation governance only; it does not add runtime DSKs.