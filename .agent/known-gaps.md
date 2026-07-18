# HorrorCorridor Known Gaps

**Updated:** `2026-07-18T04-41-15-04-00`

## Summary

The canonical product architecture and executable coverage have advanced beyond the previous root audit census. The current root documentation now links the correct sources, but machine-verifiable generation settlement remains absent.

## Documentation-governance gaps

- [ ] No root `.agent/canonical-generation.json` settlement artifact.
- [ ] No mandatory canonical-tree hash in every generated projection.
- [ ] No mandatory blueprint hash in runtime and proof evidence.
- [ ] No runtime install-order digest projected into root governance.
- [ ] No registered-path digest projected into root governance.
- [ ] No proof-evidence admission result tied to one runtime generation.
- [ ] Historical, rejected, comparison-only and accepted proof artifacts are not uniformly classified.
- [ ] `latest/` proof paths are convenient aliases rather than durable authority.
- [ ] Root-to-central settlement is still manually maintained.
- [ ] The previous 29-kit root application-shell inventory remains a partial abstraction and must not be treated as exhaustive.

## Current execution gaps

```txt
natural domains: 359 installed owners
behavior contracts: 428
closed: 132
open: 296
legacy-cutover: 12
public NexusEngine candidates: 9
```

Installed state ownership does not close attached behavior contracts. The 296 open contracts remain the authoritative implementation backlog.

## Runtime strata requiring continued classification

```txt
36 NexusEngine core kits
359 generated natural-domain owner kits
73 local descriptor kits
6 composition kits
474 total runtime installs
```

The exact 73 descriptor IDs are available from runtime `descriptorKitIds` and the ProtoKit factories; root governance currently delegates the exhaustive list to those canonical sources instead of duplicating it.

## Proof gaps

- [ ] Accepted reports do not all carry canonical source, blueprint and install digests.
- [ ] Stale-generation evidence is not automatically rejected.
- [ ] Source/build/deployed-origin proof parity is not uniformly enforced.
- [ ] Human-review disposition is not represented by one common result schema.
- [ ] Full-room visual parity remains partial even where bounded visual subjects are accepted.

## Retained product and platform gaps

The earlier PeerJS DataConnection open-admission issue remains open. All preceding signalling, lifecycle, input, movement, rendering, minimap, audio, storage, session, protocol, loading, WebGL recovery, browser-proof and deployment findings also remain retained unless a later executable fixture explicitly closes them.

Eight NexusEngine cores remain deliberately uninstalled because no current player flow consumes them: agent, compute, headless editor, MLNN, policy, graphics reflection, speech and utility.

## Required invariants

```txt
one canonical source generation
one matching blueprint generation
one matching runtime census
one exact behavior classification
accepted proof cites that generation
root .agent cites that generation
central ledger cites the resulting repo head
```

## Do not claim

Do not claim full behavior coverage, proof-generation convergence, full visual parity, corrected PeerJS admission, artifact parity, deployed parity or production readiness until the relevant implementation and fixtures pass on `main`.