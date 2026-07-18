#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLUEPRINT_PATH = join(
  REPO_ROOT,
  "src/engine/generated/horrorCorridorDomainBlueprint.json",
);
const LIVE_REPORT_PATH = join(
  REPO_ROOT,
  "docs/live-player-harness/latest/report.json",
);
const RECONNECT_REPORT_PATH = join(
  REPO_ROOT,
  "docs/live-player-harness/reconnect-recovery-proof/report.json",
);
const FLOOR_MATERIAL_REPORT_PATH = join(
  REPO_ROOT,
  "docs/live-player-harness/floor-material-proof/report.json",
);
const OUTPUT_PATH = join(REPO_ROOT, ".agent/domain-service-coverage.md");
const CHECK_ONLY = process.argv.includes("--check");

const LOCAL_TARGET_MAPPINGS = Object.freeze({
  "shape-seeded-corridor-kit": [
    "grid-maze-domain-kit",
    "grid-field-domain-kit",
    "corridor-tile-domain-kit",
  ],
  "carve-corridor-maze-kit": ["grid-maze-domain-kit"],
  terrain: ["terrain-field-domain-kit"],
  "terrain-shader-kit": ["terrain-shader-domain-kit"],
  "surface-placement-kit": [
    "triangle-surface-sampler-domain-kit",
    "object-placement-domain-kit",
  ],
  "ground-contact-kit": [
    "socket-graph-domain-kit",
    "footprint-layout-domain-kit",
  ],
  "compose-ground-surface-kit": [
    "terrain-field-domain-kit",
    "terrain-shader-domain-kit",
  ],
  "water-surface-kit": ["water-surface-domain-kit"],
  "ripple-puddle-kit": ["water-surface-domain-kit"],
  "weather-brickwork-kit": ["brick-course-texture-domain-kit"],
  "weather-concrete-kit": ["wet-concrete-texture-domain-kit"],
  "form-mud-kit": ["damp-mud-texture-domain-kit"],
  "scatter-rubble-kit": [
    "debris-scatter-object-domain-kit",
    "brick-rubble-object-domain-kit",
    "rock-cluster-object-domain-kit",
  ],
  "scatter-bricks-kit": ["brick-rubble-object-domain-kit"],
  "cluster-stone-kit": ["rock-cluster-object-domain-kit"],
  "break-concrete-kit": [
    "broken-concrete-stair-object-domain-kit",
    "loose-floor-slab-object-domain-kit",
  ],
  "displace-slab-kit": ["loose-floor-slab-object-domain-kit"],
  "age-ruin-kit": [
    "broken-city-wall-domain-kit",
    "building-facade-object-domain-kit",
  ],
  "raise-wall-kit": ["broken-city-wall-domain-kit"],
  "weather-wall-kit": ["broken-city-wall-domain-kit"],
  "fracture-wall-core-kit": ["broken-city-wall-domain-kit"],
  "widen-wall-wound-kit": ["broken-city-wall-domain-kit"],
  "stain-wall-face-kit": [
    "broken-city-wall-domain-kit",
    "moss-grime-texture-domain-kit",
    "rust-streak-texture-domain-kit",
  ],
  "leak-daylight-kit": ["open-sky-projection-domain-kit"],
  "reclaim-surface-kit": [
    "overgrowth-object-domain-kit",
    "grass-object-spawn-domain-kit",
  ],
  "spread-ground-growth-kit": [
    "overgrowth-object-domain-kit",
    "grass-object-spawn-domain-kit",
  ],
  "gather-grass-tufts-kit": ["grass-object-spawn-domain-kit"],
  "gather-moss-patches-kit": ["moss-grime-texture-domain-kit"],
  "place-practical-lamps-kit": [
    "corridor-lamp-object-domain-kit",
    "lighting-descriptor-domain-kit",
    "lighting-placement-domain-kit",
  ],
  "corridor-lamp-kit": ["corridor-lamp-object-domain-kit"],
  "cast-practical-light-kit": [
    "lighting-descriptor-domain-kit",
    "lighting-placement-domain-kit",
  ],
  "place-vent-kit": ["vent-object-domain-kit"],
  "breathe-vent-kit": ["vent-object-domain-kit"],
  "hang-cable-kit": ["cable-run-object-domain-kit"],
  "storage-crate-kit": ["storage-crate-object-domain-kit"],
  "corroded-table-kit": ["corroded-table-object-domain-kit"],
  "broken-generator-kit": ["broken-generator-object-domain-kit"],
  "chain-link-fence-kit": ["chain-link-fence-object-domain-kit"],
  "stretch-fence-kit": ["chain-link-fence-object-domain-kit"],
  "cluster-barrels-kit": ["barrel-cluster-object-domain-kit"],
  "hanging-chain-kit": ["hanging-chain-hook-object-domain-kit"],
  "rusted-door-kit": ["rusted-service-door-object-domain-kit"],
  "hang-doors-kit": ["rusted-service-door-object-domain-kit"],
  "place-drain-kit": ["storm-drain-culvert-object-domain-kit"],
  "pedestal-kit": ["pedestal-dressing-object-domain-kit"],
  "procedural-material-kit": [
    "procedural-pbr-material-domain-kit",
    "prop-material-fidelity-domain-kit",
  ],
  "scene-bundle-kit": ["scene-bundle-domain-kit"],
  "render-descriptor-kit": [
    "prop-descriptor-domain-kit",
    "scene-dressing-domain-kit",
  ],
  "render-validation-kit": ["render-validation-domain-kit"],
});

const IMPLEMENTED_TARGET_MAPPINGS = Object.freeze({
  "begin-expedition-kit": [
    "src/features/game-state/domain/beginExpedition.ts",
    "src/features/game-state/domain/createInitialGameState.ts",
  ],
  "run-expedition-kit": [
    "src/features/game-state/domain/endlessExpedition.ts",
    "src/components/game/GameCanvas.tsx",
  ],
  "continue-expedition-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "resolve-expedition-kit": [
    "src/features/game-state/domain/endlessExpedition.ts",
    "src/components/game/GameCanvas.tsx",
  ],
  "advance-delve-kit": [
    "src/features/game-state/domain/endlessExpedition.ts",
    "src/features/player/domain/movement.ts",
  ],
  "open-endless-delve-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "open-building-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "offer-room-boon-kit": [
    "src/features/game-state/domain/endlessExpedition.ts",
    "src/features/game-state/domain/networkRules.ts",
  ],
  "record-expedition-kit": ["src/features/debug/store/runtimeDebugStore.ts"],
  "remember-monster-scare-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "keep-monster-record-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "remember-monster-sighting-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "learn-from-monster-scare-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "mark-collected-monster-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "cast-flashlight-beam-kit": [
    "src/features/game-state/domain/endlessExpedition.ts",
    "src/features/render/three/worldBuilder.ts",
  ],
  "settle-slabs-kit": [
    "src/features/corridor/domain/concretePaving.ts",
    "src/features/render/three/proceduralShaders.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/floor-material-proof/report.json",
  ],
  "crack-slab-kit": [
    "src/features/corridor/domain/concretePaving.ts",
    "src/features/render/three/proceduralShaders.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/floor-material-proof/report.json",
  ],
  "break-ceiling-kit": [
    "src/features/corridor/domain/ceilingCollapse.ts",
    "src/protokits/collapsed-ceiling-object-kit/index.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/ceiling-fracture-proof/report.json",
  ],
  "open-ceiling-kit": [
    "src/features/corridor/domain/ceilingCollapse.ts",
    "src/protokits/collapsed-ceiling-object-kit/index.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/ceiling-fracture-proof/report.json",
  ],
  "propagate-crack-kit": [
    "src/features/corridor/domain/ceilingCollapse.ts",
    "src/protokits/collapsed-ceiling-object-kit/index.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/ceiling-fracture-proof/report.json",
  ],
  "collapse-masonry-kit": [
    "src/features/corridor/domain/ceilingCollapse.ts",
    "src/protokits/furnish-chamber-kit/index.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/ceiling-fracture-proof/report.json",
  ],
  "carry-spatial-sound-kit": ["src/features/audio/stalkerAudio.ts"],
  "resolve-hunter-encounter-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "stage-stalker-approach-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "repel-monster-with-beam-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "force-monster-blackout-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "open-last-chance-kit": ["src/features/game-state/domain/endlessExpedition.ts"],
  "resolve-monster-capture-kit": [
    "src/features/game-state/domain/endlessExpedition.ts",
    "src/features/render/three/worldBuilder.ts",
  ],
  "peer-session-kit": [
    "src/features/networking/peer/createHost.ts",
    "src/features/networking/peer/createClient.ts",
    "src/components/game/GameShell.tsx",
    "docs/live-player-harness/reconnect-recovery-proof/report.json",
  ],
  "sustain-shared-expedition-kit": [
    "src/features/networking/domain/sharedRecovery.ts",
    "src/components/game/GameShell.tsx",
    "docs/live-player-harness/reconnect-recovery-proof/report.json",
  ],
  "share-world-snapshot-kit": [
    "src/features/networking/protocol/syncSnapshot.ts",
    "src/components/game/GameCanvas.tsx",
    "docs/live-player-harness/reconnect-recovery-proof/report.json",
  ],
  "reconcile-world-snapshot-kit": [
    "src/features/networking/protocol/syncSnapshot.ts",
    "src/components/game/GameShell.tsx",
    "docs/live-player-harness/reconnect-recovery-proof/report.json",
  ],
  "rejoin-party-kit": [
    "src/features/networking/domain/sharedRecovery.ts",
    "src/components/menus/RecoveryScreen.tsx",
    "docs/live-player-harness/reconnect-recovery-proof/report.json",
  ],
  "record-shared-session-kit": [
    "src/features/networking/domain/sharedRecovery.ts",
    "src/engine/horrorCorridorNexusRuntime.ts",
    "docs/live-player-harness/reconnect-recovery-proof/report.json",
  ],
});

const LEGACY_TARGET_MAPPINGS = Object.freeze({
  "begin-expedition-kit": [
    "src/features/game-state/store/sessionStore.ts",
    "src/components/game/GameCanvas.tsx",
  ],
  "run-expedition-kit": ["src/components/game/GameCanvas.tsx"],
  "advance-delve-kit": [
    "src/features/player/domain/movement.ts",
    "src/features/player/domain/collision.ts",
  ],
  "record-expedition-kit": ["src/features/debug/store/runtimeDebugStore.ts"],
  "remember-trail-kit": [
    "src/features/game-state/domain/oozeRules.ts",
    "src/protokits/trail-decal-domain-kit/index.ts",
  ],
  "follow-personal-trail-kit": ["src/features/game-state/domain/oozeRules.ts"],
  "reconcile-shared-trail-kit": ["src/features/networking/protocol/syncSnapshot.ts"],
  "character-movement-kit": ["src/features/player/domain/movement.ts"],
  "resolve-footing-kit": ["src/features/player/domain/collision.ts"],
  "update-orientation-kit": ["src/features/player/domain/cameraLook.ts"],
  "character-camera-kit": ["src/features/player/domain/cameraLook.ts"],
  "hold-relic-kit": [
    "src/features/game-state/domain/networkRules.ts",
    "src/components/game/GameCanvas.tsx",
  ],
  "keep-relics-kit": ["src/features/game-state/domain/gameTypes.ts"],
  "single-carry-kit": ["src/features/game-state/domain/networkRules.ts"],
  "signal-carry-state-kit": ["src/features/networking/protocol/syncSnapshot.ts"],
  "transfer-relic-custody-kit": ["src/features/game-state/domain/networkRules.ts"],
  "place-offering-kit": [
    "src/features/game-state/domain/networkRules.ts",
    "src/components/game/GameCanvas.tsx",
  ],
  "check-offering-order-kit": ["src/features/game-state/domain/winRules.ts"],
  "signal-objective-state-kit": ["src/features/networking/protocol/syncSnapshot.ts"],
  "lock-and-socket-kit": [
    "src/features/game-state/domain/winRules.ts",
    "src/components/game/GameCanvas.tsx",
  ],
  "steward-session-truth-kit": ["src/components/game/GameCanvas.tsx"],
});

const HOST_WIRED_TARGET_MAPPINGS = Object.freeze({
  "pointer-lock-input-kit": ["src/components/game/PointerLockGate.tsx"],
  "menu-flow-kit": ["src/components"],
  "minimal-play-hud-kit": ["src/components/hud"],
  "post-process-kit": ["src/features/render/three/createPostProcessing.ts"],
  "peer-transport-kit": ["src/features/networking/peer"],
  "protocol-serialization-kit": ["src/features/networking/protocol"],
  "snapshot-transport-kit": ["src/features/networking/protocol/syncSnapshot.ts"],
  "object-review-kit": ["scripts/review-object-kit.mjs"],
  "visual-match-kit": ["scripts/horror-corridor-visual-match.mjs"],
});

const PROOF_EVIDENCE = Object.freeze({
  "domain-blueprint-proof": {
    status: "passing",
    evidence: "npm run domain:check; src/engine/generated/horrorCorridorDomainBlueprint.json",
  },
  "protokit-smoke-proof": {
    status: "passing",
    evidence: "npm run smoke:protokits; src/app/api/procedural-kit-smoke/route.ts",
  },
  "reset-snapshot-proof": {
    status: "passing",
    evidence: "docs/live-player-harness/latest/report.json#nexusRuntime.resetReplay",
  },
  "live-player-proof": {
    status: "passing",
    evidence: "docs/live-player-harness/latest/report.json",
  },
  "object-review-proof": {
    status: "partial",
    evidence: "scripts/review-object-kit.mjs; testing/object-kits",
  },
  "visual-match-proof": {
    status: "partial-current-target",
    evidence: "docs/visual-targets/horror-corridor-expedition-room-v2.png; docs/live-player-harness/latest/starting-scene.png",
  },
});

const blueprint = JSON.parse(readFileSync(BLUEPRINT_PATH, "utf8"));
const liveReport = JSON.parse(readFileSync(LIVE_REPORT_PATH, "utf8"));
const reconnectReport = JSON.parse(readFileSync(RECONNECT_REPORT_PATH, "utf8"));
const floorMaterialReport = JSON.parse(
  readFileSync(FLOOR_MATERIAL_REPORT_PATH, "utf8"),
);
const liveAfter = liveReport.nexusRuntime?.after;
const resetReplay = liveReport.nexusRuntime?.resetReplay;

if (liveReport.status !== "passed" || !liveAfter || resetReplay?.passed !== true) {
  throw new Error(
    "Coverage generation requires a passing live report with reset/replay proof.",
  );
}

if (
  reconnectReport.status !== "passed" ||
  !reconnectReport.gates ||
  !Object.values(reconnectReport.gates).every(Boolean)
) {
  throw new Error(
    "Coverage generation requires a passing Shared Expedition reconnect/recovery proof.",
  );
}

if (
  floorMaterialReport.status !== "passed" ||
  !floorMaterialReport.validation?.gates ||
  !Object.values(floorMaterialReport.validation.gates).every(Boolean) ||
  floorMaterialReport.consoleErrors?.length > 0
) {
  throw new Error(
    "Coverage generation requires a passing wet concrete floor-material proof.",
  );
}

if (liveAfter.source?.sha256 !== blueprint.source.sha256) {
  throw new Error(
    "Live report source hash does not match the current domain blueprint.",
  );
}

const installedCoreIds = new Set(liveAfter.coreKitIds ?? []);
const installedDescriptorIds = new Set(liveAfter.descriptorKitIds ?? []);
const installedCompositionIds = new Set(liveAfter.compositionKitIds ?? []);
const installedLocalIds = new Set([
  ...installedDescriptorIds,
  ...installedCompositionIds,
]);

if (installedCoreIds.size !== liveAfter.coreKitCount) {
  throw new Error("Live report core kit ids do not match its core kit count.");
}

if (installedDescriptorIds.size !== liveAfter.descriptorKitCount) {
  throw new Error("Live report descriptor kit ids do not match its descriptor kit count.");
}

if (installedCompositionIds.size !== liveAfter.compositionKitCount) {
  throw new Error("Live report composition kit ids do not match its composition kit count.");
}

for (const [targetKit, runtimeKitIds] of Object.entries(
  LOCAL_TARGET_MAPPINGS,
)) {
  const missing = runtimeKitIds.filter((kitId) => !installedLocalIds.has(kitId));
  if (missing.length > 0) {
    throw new Error(
      `${targetKit} maps to missing installed local kit(s): ${missing.join(", ")}`,
    );
  }
}

const allDomains = [blueprint.root, ...blueprint.domains];
const kitOwners = new Map();

const addKitOwner = (kit, owner) => {
  const owners = kitOwners.get(kit) ?? [];
  owners.push(owner);
  kitOwners.set(kit, owners);
};

for (const domain of allDomains) {
  for (const kit of domain.kits) addKitOwner(kit, domain.path);
}

for (const host of blueprint.hosts) {
  for (const kit of host.kits) addKitOwner(kit, `host:${host.slug}`);
}

const publicCandidatePath = (targetKit) => {
  const candidate = join(
    REPO_ROOT,
    "node_modules/nexusengine/src",
    `${targetKit}.js`,
  );
  return existsSync(candidate) ? candidate : null;
};

const classifyKit = (targetKit) => {
  if (installedCoreIds.has(targetKit)) {
    return {
      status: "installed-core",
      evidence: `live coreKitIds -> ${targetKit}`,
      action: "Keep the current NexusEngine core owner and prove it in the owning slice.",
    };
  }

  if (installedLocalIds.has(targetKit)) {
    return {
      status: "installed-local",
      evidence: installedCompositionIds.has(targetKit)
        ? `live compositionKitIds -> ${targetKit}`
        : `live descriptorKitIds -> ${targetKit}`,
      action: "Keep the installed local kit and promote only after slice proof.",
    };
  }

  if (LOCAL_TARGET_MAPPINGS[targetKit]) {
    return {
      status: "installed-local",
      evidence: `live descriptorKitIds -> ${LOCAL_TARGET_MAPPINGS[targetKit].join(", ")}`,
      action: "Keep the mapped local behavior behind its target domain boundary.",
    };
  }

  if (IMPLEMENTED_TARGET_MAPPINGS[targetKit]) {
    return {
      status: "implemented-gameplay",
      evidence: IMPLEMENTED_TARGET_MAPPINGS[targetKit].join(", "),
      action: "Keep the behavior inside this natural gameplay boundary and preserve its live proof.",
    };
  }

  if (LEGACY_TARGET_MAPPINGS[targetKit]) {
    return {
      status: "legacy-cutover",
      evidence: LEGACY_TARGET_MAPPINGS[targetKit].join(", "),
      action: "Move the existing behavior behind the target DSK without changing player flow.",
    };
  }

  if (HOST_WIRED_TARGET_MAPPINGS[targetKit]) {
    return {
      status: "host-wired",
      evidence: HOST_WIRED_TARGET_MAPPINGS[targetKit].join(", "),
      action: "Keep this as a thin platform adapter and keep gameplay ownership out of the host.",
    };
  }

  const publicPath = publicCandidatePath(targetKit);
  if (publicPath) {
    return {
      status: "public-candidate",
      evidence: relative(REPO_ROOT, publicPath),
      action: "Audit the pinned public contract, then install it or record the mismatch.",
    };
  }

  return {
    status: "contract-only",
    evidence: "generated natural state owner only",
    action: "Implement when this kit becomes the selected UX slice; do not infer behavior from the tree.",
  };
};

const kitRows = [...kitOwners.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([kit, owners]) => ({
    kit,
    owners: [...new Set(owners)].sort(),
    ...classifyKit(kit),
  }));

const classificationCounts = Object.fromEntries(
  [...new Set(kitRows.map((row) => row.status))]
    .sort()
    .map((status) => [
      status,
      kitRows.filter((row) => row.status === status).length,
    ]),
);
const openStatuses = new Set([
  "contract-only",
  "legacy-cutover",
  "public-candidate",
]);
const openKitCount = kitRows.filter((row) => openStatuses.has(row.status)).length;

const topLevelOpen = new Map();
for (const row of kitRows.filter((entry) => openStatuses.has(entry.status))) {
  for (const owner of row.owners) {
    const bucket = owner.startsWith("host:")
      ? owner
      : owner.split(":").slice(0, 3).join(":");
    topLevelOpen.set(bucket, (topLevelOpen.get(bucket) ?? 0) + 1);
  }
}

const escapeCell = (value) =>
  String(value)
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");

const domainRows = allDomains.map((domain) => {
  const stateOwnerKit = `${domain.path.replaceAll(":", "-")}-domain-kit`;
  return `| ${escapeCell(domain.path)} | ${domain.states.length} | ${domain.kits.length} | ${escapeCell(stateOwnerKit)} | installed-state-owner |`;
});

const hostRows = blueprint.hosts.map((host) => {
  const covered = host.kits.filter(
    (kit) => !openStatuses.has(classifyKit(kit).status),
  ).length;
  return `| ${host.slug} | ${host.kits.length} | ${covered} | ${host.kits.length - covered} | host adapter is present; kit-level gaps remain explicit below |`;
});

const proofRows = blueprint.proofs.map((proof) => {
  const evidence = PROOF_EVIDENCE[proof.slug] ?? {
    status: "unmapped",
    evidence: "no evidence mapping",
  };
  return `| ${proof.slug} | ${evidence.status} | ${escapeCell(evidence.evidence)} |`;
});

const kitTableRows = kitRows.map(
  (row) =>
    `| ${escapeCell(row.kit)} | ${escapeCell(row.owners.join("<br>"))} | ${row.status} | ${escapeCell(row.evidence)} | ${escapeCell(row.action)} |`,
);

const lines = [
  "# Horror Corridor Domain-Service Coverage",
  "",
  "Status: generated active ledger",
  "",
  "## Evidence Boundary",
  "",
  `- Canonical source: \`${blueprint.source.file}\` at \`${blueprint.source.sha256}\`.`,
  `- Generated blueprint: \`${relative(REPO_ROOT, BLUEPRINT_PATH)}\`.`,
  `- Live proof: \`${relative(REPO_ROOT, LIVE_REPORT_PATH)}\`, created \`${liveReport.createdAt}\`, status \`${liveReport.status}\`.`,
  `- Shared recovery proof: \`${relative(REPO_ROOT, RECONNECT_REPORT_PATH)}\`, created \`${reconnectReport.createdAt}\`, status \`${reconnectReport.status}\`, ${reconnectReport.durationMs} ms, with ${Object.keys(reconnectReport.gates).length}/${Object.keys(reconnectReport.gates).length} gates passing.`,
  `- Wet concrete floor proof: \`${relative(REPO_ROOT, FLOOR_MATERIAL_REPORT_PATH)}\`, created \`${floorMaterialReport.createdAt}\`, status \`${floorMaterialReport.status}\`, with ${Object.values(floorMaterialReport.validation.gates).filter(Boolean).length}/${Object.keys(floorMaterialReport.validation.gates).length} gates passing and ${floorMaterialReport.consoleErrors.length} console errors.`,
  `- Installed composition: ${resetReplay.composition.installCount} total installs, ${installedCoreIds.size} current NexusEngine core kits, ${installedDescriptorIds.size} local descriptor kits, ${installedCompositionIds.size} top-level composition kits, ${resetReplay.composition.mutableDomainStateCount} mutable natural domain owners, and ${resetReplay.composition.registeredDomainPathCount} registered paths.`,
  `- Reset/replay proof: ${resetReplay.reset.resetDomainCount}/${resetReplay.composition.expectedMutableDomainStateCount} domains reset, ${resetReplay.reset.zeroRevisionCount} returned to revision zero, and reset/fresh replay digests match \`${resetReplay.replay.firstDigest}\`.`,
  "- Classification is intentionally strict: an installed state owner does not make its attached behavior kit implemented.",
  "",
  "## Summary",
  "",
  `- Natural domains: ${allDomains.length}.`,
  `- Unique target kit contracts across domains and hosts: ${kitRows.length}.`,
  `- Open behavior contracts: ${openKitCount}.`,
  `- Classification counts: ${Object.entries(classificationCounts)
    .map(([status, count]) => `${status}=${count}`)
    .join(", ")}.`,
  "",
  "### Open contracts by top-level owner",
  "",
  "| Owner | Open mounts |",
  "|---|---:|",
  ...[...topLevelOpen.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([owner, count]) => `| ${owner} | ${count} |`),
  "",
  "## Domain State Owners",
  "",
  "Every row below is installed, snapshotted, and reset by the generated natural-domain DSK. Attached kit counts are contracts, not implied behavior coverage.",
  "",
  "| Domain path | State fields | Attached kits | Runtime owner kit | State-owner status |",
  "|---|---:|---:|---|---|",
  ...domainRows,
  "",
  "## Hosts",
  "",
  "| Host | Kit contracts | Wired or installed | Open | Boundary |",
  "|---|---:|---:|---:|---|",
  ...hostRows,
  "",
  "## Proofs",
  "",
  "| Proof | Status | Evidence |",
  "|---|---|---|",
  ...proofRows,
  "",
  "## Kit Contract Ledger",
  "",
  "| Target kit | Owner(s) | Classification | Runtime evidence | Required action |",
  "|---|---|---|---|---|",
  ...kitTableRows,
  "",
].join("\n");

if (CHECK_ONLY) {
  if (!existsSync(OUTPUT_PATH)) {
    throw new Error(`${relative(REPO_ROOT, OUTPUT_PATH)} is missing.`);
  }
  const current = readFileSync(OUTPUT_PATH, "utf8");
  if (current !== lines) {
    throw new Error(
      `${relative(REPO_ROOT, OUTPUT_PATH)} is stale. Run npm run domain:coverage.`,
    );
  }
  console.log(
    `Domain coverage is current: ${allDomains.length} state owners, ${kitRows.length} kit contracts, ${openKitCount} open.`,
  );
} else {
  writeFileSync(OUTPUT_PATH, lines, "utf8");
  console.log(
    `Wrote ${relative(REPO_ROOT, OUTPUT_PATH)}: ${allDomains.length} state owners, ${kitRows.length} kit contracts, ${openKitCount} open.`,
  );
}
