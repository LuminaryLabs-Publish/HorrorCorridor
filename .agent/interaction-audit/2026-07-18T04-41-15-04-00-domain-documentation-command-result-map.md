# Domain-Documentation Command/Result Map

**Run:** `2026-07-18T04-41-15-04-00`

## Current evidence flow

```txt
edit canonical nested domain tree
  -> generate blueprint
  -> install natural owners and kit strata
  -> generate coverage ledger
  -> run proof profiles
  -> manually update root .agent
  -> manually update central ledger
```

The flow has strong local evidence but previously lacked explicit results between each stage.

## Proposed commands and results

```txt
CanonicalDomainSourceAdmissionCommand
  -> CanonicalDomainSourceAdmissionResult

DomainBlueprintGenerationCommand
  -> DomainBlueprintGenerationResult

RuntimeCompositionCensusCommand
  -> RuntimeCompositionCensusResult

BehaviorCoverageClassificationCommand
  -> BehaviorCoverageClassificationResult

ProofEvidenceAdmissionCommand
  -> ProofEvidenceAdmissionResult

RootAgentProjectionCommitCommand
  -> RootAgentProjectionCommitResult

CentralLedgerCommitCommand
  -> CentralLedgerCommitResult
```

## Minimum result fields

| Result | Required identity |
|---|---|
| source admission | source path, SHA-256, repository commit, NexusEngine revision |
| blueprint generation | source hash, counts, generated file hash |
| runtime census | install order digest, core/domain/descriptor/composition IDs, registered paths |
| coverage classification | 428-contract generation, classification totals, closed/open totals |
| proof admission | runtime generation, profile, origin, frame/artifact digest, result |
| root projection | root-agent generation, source links, repo head |
| central settlement | repo-local documentation head, central commit |

## Failure results

```txt
source-mismatch
blueprint-stale
runtime-census-mismatch
coverage-total-mismatch
proof-stale-generation
root-projection-stale
central-ledger-stale
```

## Interaction invariant

A future agent should be able to start at root `.agent/START_HERE.md`, follow one admitted generation into the nested canonical tree, blueprint, runtime census, coverage ledger and proof evidence, then verify that the central ledger cites the resulting repo-local head.

This map is documentation-only and does not add executable commands.