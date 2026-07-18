# HorrorCorridor Next Steps

**Updated:** `2026-07-18T04-41-15-04-00`

## Summary

The next documentation-governance step is to make the relationship between the root audit state and the nested canonical product architecture machine-verifiable.

## Immediate work

- [ ] Add a generated root `.agent/canonical-generation.json` settlement artifact.
- [ ] Record the canonical domain-tree path and SHA-256.
- [ ] Record the generated blueprint path and SHA-256.
- [ ] Record the pinned NexusEngine revision.
- [ ] Record the runtime install-order digest and exact kit strata.
- [ ] Record the registered-domain-path digest.
- [ ] Record the behavior-coverage generation and classification totals.
- [ ] Require `359` natural owners, `428` contracts, `132` closed and `296` open for the current admitted generation.
- [ ] Keep state-owner installation separate from behavior implementation.
- [ ] Give every accepted proof report a canonical-source, blueprint and runtime-generation identity.
- [ ] Classify proof artifacts as accepted, rejected, comparison-only, superseded, incomplete or stale-generation.
- [ ] Project the admitted generation into root `.agent` automatically.
- [ ] Settle the central ledger from the final repo-local documentation head.

## Runtime and product follow-up

- [ ] Continue implementing the 296 open behavior contracts one bounded player-facing slice at a time.
- [ ] Reconcile the 12 legacy-cutover contracts behind their canonical natural owners.
- [ ] Audit the nine public NexusEngine candidates before installation or rejection.
- [ ] Preserve the eight deliberately uninstalled cores until a real player flow consumes them.
- [ ] Retain and separately address the PeerJS DataConnection open-admission issue.

## Required command/result chain

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

## Completion checklist

- [ ] One canonical source hash identifies one natural-domain generation.
- [ ] The blueprint cites that source hash.
- [ ] Runtime install and path digests cite the same blueprint generation.
- [ ] The coverage ledger totals exactly 428 contracts.
- [ ] Proof evidence cites the runtime generation exercised.
- [ ] Root `.agent` cites the same admitted generation.
- [ ] The central ledger cites the final repo-local documentation head.
- [ ] Source, build, browser artifact and deployed-origin fixtures pass on `main`.

## Claim boundary

This file plans future work. It does not claim that generation settlement, proof admission, remaining behavior contracts or retained networking gaps are implemented.