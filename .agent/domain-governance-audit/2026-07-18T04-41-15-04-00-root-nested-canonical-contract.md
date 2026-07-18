# Root/Nested Canonical Contract

**Run:** `2026-07-18T04-41-15-04-00`

## Authority split

```txt
/.agent
  -> repository-wide scheduled audit index
  -> selection history
  -> focused findings
  -> central-ledger synchronization

/HorrorCorridor-V1/.agent
  -> product-specific canonical natural-domain tree
  -> behavior-contract coverage ledger
  -> product goals, feedback and proof workflow
```

Both folders are intentional. Neither should silently replace the other.

## Canonical source order

1. `HorrorCorridor-V1/.agent/horror-corridor-domain-tree.md` — canonical natural product composition.
2. `HorrorCorridor-V1/src/engine/generated/horrorCorridorDomainBlueprint.json` — generated executable domain blueprint.
3. `HorrorCorridor-V1/src/engine/horrorCorridorNexusRuntime.ts` — runtime installation and state-owner implementation.
4. `HorrorCorridor-V1/.agent/domain-service-coverage.md` — contract-by-contract execution classification.
5. `HorrorCorridor-V1/docs/live-player-harness/**` — executable proof evidence.
6. `/.agent/**` — repository-wide audit projection and retained findings.
7. `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/**` — central index and documented repo head.

## Current counts

```txt
natural domains: 359
natural services: 59
target behavior contracts: 428
closed/open: 132 / 296
runtime installs: 474
registered paths: 405
hosts: 4
proof surfaces: 6
```

## Contract

- Root audits must cite the nested canonical source and reviewed commit.
- Nested product documents own natural-domain names and behavior-contract classifications.
- Root audits may add focused findings but must not invent a parallel domain tree.
- Runtime kit totals must be labeled by stratum.
- The legacy 29-kit root application-shell inventory remains historical/partial, not exhaustive.
- Proof claims must cite a durable report path and generation identity.
- Central tracking must cite the final repo-local documentation head, not the pre-audit head.

## Main gap

This relationship was implicit. The current run makes it explicit in root governance, but no generated machine-verifiable settlement file yet enforces it.

## Proposed settlement artifact

```txt
.agent/canonical-generation.json
```

Proposed fields:

```txt
repositoryCommit
canonicalTreePath
canonicalTreeSha256
blueprintPath
blueprintSha256
nexusEngineRevision
runtimeInstallDigest
coverageLedgerPath
coverageGeneration
proofEvidenceIds
rootAgentGeneration
centralLedgerCommit
```

No settlement artifact was added in this documentation-only run; it remains proposed work.