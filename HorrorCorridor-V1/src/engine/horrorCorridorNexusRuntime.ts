import {
  createCoreAssetsKit,
  createCoreAudioKit,
  createCoreCameraKit,
  createCoreCameraFramingKit,
  createCoreCaptureKit,
  createCoreCharacterKit,
  createCoreCompositionKit,
  createCoreCreatureKit,
  createCoreDataKit,
  createCoreDebugKit,
  createCoreDiagnosticsKit,
  createCoreGraphicsKit,
  createCoreInputKit,
  createCoreInteractionKit,
  createCoreMotionKit,
  createCoreNetworkKit,
  createCoreObjectFidelityKit,
  createCoreObjectKit,
  createCoreObjectShapeKit,
  createCorePlatformKit,
  createCorePersistenceKit,
  createCorePhysicsKit,
  createCorePlayerKit,
  createCorePresentationKit,
  createCorePresentationOutputKit,
  createCoreSceneKit,
  createCoreSimulationKit,
  createCoreSkyboxKit,
  createCoreSpatialKit,
  createCoreStartupKit,
  createCoreTransactionLedgerKit,
  createCoreUIKit,
  createCoreUIScaleKit,
  createCoreVegetationKit,
  createCoreAnimationKit,
  createCoreWorldDomain,
  createRealtimeGame,
  defineComponent,
  defineDomainServiceKit,
  defineEvent,
  defineResource,
  defineRuntimeKit,
  type NexusDefinition,
  type NexusEngine,
  type NexusRuntimeKit,
} from "nexusengine";
import {
  assertReplayDeterministic,
  createReplayRunner,
  type NexusReplayFixture,
} from "nexusengine/foundation";

import type { ReplicatedGameSnapshot, WorldPosition } from "@/types/shared";
import type { ConcretePavingState } from "@/features/corridor/domain/concretePaving";
import type { CeilingCollapseState } from "@/features/corridor/domain/ceilingCollapse";
import type { SharedRecoveryState } from "@/features/networking/domain/sharedRecovery";
import {
  createHorrorCorridorDomainKits,
  type HorrorDomainKit,
} from "@/protokits";

import blueprintJson from "./generated/horrorCorridorDomainBlueprint.json";

type DomainSpec = Readonly<{
  name: string;
  slug: string;
  path: string;
  parentPath: string | null;
  sourceDepth: number;
  states: readonly string[];
  kits: readonly string[];
  services: readonly string[];
}>;

type HostSpec = Readonly<{
  name: string;
  slug: string;
  kits: readonly string[];
}>;

type ProofSpec = Readonly<{
  name: string;
  slug: string;
}>;

type DomainBlueprint = Readonly<{
  schemaVersion: number;
  source: Readonly<{
    file: string;
    sha256: string;
  }>;
  counts: Readonly<{
    domains: number;
    states: number;
    kits: number;
    uniqueKits: number;
    domainKits: number;
    hostKits: number;
    services: number;
    hosts: number;
    proofs: number;
    maxCompositionDepth: number;
  }>;
  root: DomainSpec;
  domains: readonly DomainSpec[];
  hosts: readonly HostSpec[];
  proofs: readonly ProofSpec[];
}>;

type DomainState = Readonly<Record<string, unknown>>;

export type HorrorCorridorDomainSnapshot = Readonly<{
  path: string;
  name: string;
  parentPath: string | null;
  revision: number;
  state: DomainState;
  stateFields: readonly string[];
  kitContracts: readonly string[];
  services: readonly string[];
}>;

type DomainApi = Readonly<{
  path: string;
  name: string;
  parentPath: string | null;
  stateFields: readonly string[];
  kitContracts: readonly string[];
  services: readonly string[];
  snapshot: () => HorrorCorridorDomainSnapshot;
  patch: (patch: Readonly<Record<string, unknown>>) => HorrorCorridorDomainSnapshot;
  reset: () => HorrorCorridorDomainSnapshot;
}>;

export type HorrorCorridorNexusFrame = Readonly<{
  snapshot: ReplicatedGameSnapshot | null;
  screen: string;
  localPlayerId: string | null;
  localPlayerPosition: WorldPosition;
  pointerLocked: boolean;
  elapsedMs: number;
  sharedRecovery: SharedRecoveryState;
  concretePaving: ConcretePavingState | null;
  ceilingCollapse: CeilingCollapseState | null;
}>;

export type HorrorCorridorNexusRuntimeSnapshot = Readonly<{
  version: "0.0.3";
  source: DomainBlueprint["source"];
  counts: DomainBlueprint["counts"];
  installOrder: readonly string[];
  coreKitIds: readonly string[];
  compositionKitIds: readonly string[];
  descriptorKitIds: readonly string[];
  registeredDomainPaths: readonly string[];
  domains: readonly HorrorCorridorDomainSnapshot[];
  hosts: readonly HostSpec[];
  proofs: readonly ProofSpec[];
}>;

export type HorrorCorridorNexusPerformance = Readonly<{
  samples: number;
  averageTickMs: number;
  maxTickMs: number;
  lastTickMs: number;
  syncSamples: number;
  averageSyncMs: number;
  maxSyncMs: number;
  lastSyncMs: number;
}>;

export type HorrorCorridorNexusResetReplayProof = Readonly<{
  schema: "horror-corridor.nexus-reset-replay-proof/1";
  passed: boolean;
  durationMs: number;
  fixture: Readonly<{
    id: string;
    syncCount: number;
    tickCount: number;
    fixedDeltaSeconds: readonly number[];
  }>;
  composition: Readonly<{
    passed: boolean;
    installCount: number;
    registeredDomainPathCount: number;
    mutableDomainStateCount: number;
    expectedMutableDomainStateCount: number;
    installOrderStable: boolean;
    registeredPathsStable: boolean;
    completeMutableDomainGraph: boolean;
  }>;
  reset: Readonly<{
    passed: boolean;
    resetDomainCount: number;
    zeroRevisionCount: number;
    initialDigest: string;
    resetDigest: string;
  }>;
  replay: Readonly<{
    passed: boolean;
    fixtureChangedState: boolean;
    afterResetMatches: boolean;
    freshRuntimeMatches: boolean;
    firstDigest: string;
    afterResetDigest: string;
    freshRuntimeDigest: string;
  }>;
}>;

export type HorrorCorridorNexusRuntime = Readonly<{
  engine: NexusEngine;
  tick: (deltaSeconds: number) => void;
  syncHostFrame: (frame: HorrorCorridorNexusFrame) => void;
  domain: (path: string) => DomainApi | null;
  reset: () => HorrorCorridorNexusRuntimeSnapshot;
  snapshot: () => HorrorCorridorNexusRuntimeSnapshot;
  performance: () => HorrorCorridorNexusPerformance;
}>;

export type HorrorCorridorNexusRuntimeOptions = Readonly<{
  seed: string | number;
  roomId: string;
  sessionMode: "solo" | "host" | "client" | null;
}>;

const blueprint = blueprintJson as unknown as DomainBlueprint;
const ROOT_PATH = blueprint.root.path;
const VERSION = "0.0.3" as const;

const PATHS = Object.freeze({
  expedition: ROOT_PATH + ":expedition",
  delve: ROOT_PATH + ":expedition:delve",
  chronicle: ROOT_PATH + ":expedition:chronicle",
  monsterIndex: ROOT_PATH + ":expedition:chronicle:monster-index",
  corridor: ROOT_PATH + ":corridor",
  concrete: ROOT_PATH + ":corridor:ground:surface:paving:concrete",
  concreteSlabs: ROOT_PATH + ":corridor:ground:surface:paving:concrete:slabs",
  concreteSlab: ROOT_PATH + ":corridor:ground:surface:paving:concrete:slabs:slab",
  ceiling: ROOT_PATH + ":corridor:ruin:structure:ceilings:ceiling",
  ceilingOpenings: ROOT_PATH + ":corridor:ruin:structure:ceilings:ceiling:openings",
  cracking: ROOT_PATH + ":corridor:ruin:decay:cracking",
  rubble: ROOT_PATH + ":corridor:ground:rubble",
  fallenMasonry: ROOT_PATH + ":corridor:ground:rubble:fallen-masonry",
  maze: ROOT_PATH + ":corridor:maze",
  buildings: ROOT_PATH + ":corridor:maze:places:buildings",
  building: ROOT_PATH + ":corridor:maze:places:buildings:building",
  roomOffering: ROOT_PATH + ":corridor:maze:places:buildings:building:chambers:chamber:offering",
  overgrowth: ROOT_PATH + ":corridor:overgrowth",
  atmosphere: ROOT_PATH + ":corridor:atmosphere",
  party: ROOT_PATH + ":party",
  explorer: ROOT_PATH + ":party:explorers:explorer",
  body: ROOT_PATH + ":party:explorers:explorer:body",
  dread: ROOT_PATH + ":dread",
  darkness: ROOT_PATH + ":corridor:atmosphere:illumination:darkness",
  flashlightBeam: ROOT_PATH + ":corridor:atmosphere:illumination:flashlight-beam",
  hunter: ROOT_PATH + ":dread:hunter",
  hunterPresence: ROOT_PATH + ":dread:hunter:presence",
  hunterSigns: ROOT_PATH + ":dread:hunter:presence:signs",
  hunterNearness: ROOT_PATH + ":dread:hunter:presence:nearness",
  hunterEncounter: ROOT_PATH + ":dread:hunter:encounter",
  approach: ROOT_PATH + ":dread:hunter:encounter:approach",
  repulse: ROOT_PATH + ":dread:hunter:encounter:repulse",
  blackout: ROOT_PATH + ":dread:hunter:encounter:blackout",
  lastChance: ROOT_PATH + ":dread:hunter:encounter:last-chance",
  capture: ROOT_PATH + ":dread:hunter:encounter:capture",
  sharedExpedition: ROOT_PATH + ":shared-expedition",
  sharedDeparture: ROOT_PATH + ":shared-expedition:shared-departure",
  sharedJourney: ROOT_PATH + ":shared-expedition:shared-journey",
  stewardship: ROOT_PATH + ":shared-expedition:stewardship",
  sharedWorld: ROOT_PATH + ":shared-expedition:shared-world",
  rejoining: ROOT_PATH + ":shared-expedition:rejoining",
  sharedChronicle: ROOT_PATH + ":shared-expedition:shared-chronicle",
});

const clone = <T,>(value: T): T => structuredClone(value);

const now = (): number =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

const toApiName = (domainPath: string): string => {
  const segments = domainPath.split(":").slice(1);
  return segments
    .map((segment, index) => {
      const pascal = segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
      return index === 0
        ? pascal.charAt(0).toLowerCase() + pascal.slice(1)
        : pascal;
    })
    .join("");
};

const toKitId = (domainPath: string): string =>
  domainPath.replaceAll(":", "-") + "-domain-kit";

const createInitialState = (
  spec: DomainSpec,
  overrides: Readonly<Record<string, unknown>> = {},
): DomainState =>
  Object.freeze(
    Object.fromEntries(
      spec.states.map((field) => [
        field,
        field in overrides ? clone(overrides[field]) : null,
      ]),
    ),
  );

const assertKnownStateFields = (
  spec: DomainSpec,
  patch: Readonly<Record<string, unknown>>,
): void => {
  const known = new Set(spec.states);
  const unknown = Object.keys(patch).filter((field) => !known.has(field));

  if (unknown.length > 0) {
    throw new Error(
      spec.path + " does not own state field(s): " + unknown.join(", "),
    );
  }
};

const stableValue = (value: unknown): string =>
  JSON.stringify(value) ?? "undefined";

const createNaturalDomainKit = (input: Readonly<{
  spec: DomainSpec;
  initialState: DomainState;
  apisByPath: Map<string, DomainApi>;
  extraRequires?: readonly string[];
}>): NexusRuntimeKit => {
  const { spec } = input;
  const State = defineResource(spec.path + ":state");
  const StateChanged = defineEvent(spec.path + ":state-changed");
  let revision = 0;

  return defineDomainServiceKit({
    id: toKitId(spec.path),
    domain: spec.slug,
    domainPath: spec.path,
    parentDomainPath: spec.parentPath ?? undefined,
    apiPath: spec.path + ":api",
    apiName: toApiName(spec.path),
    stability: "experimental",
    version: VERSION,
    visibility: "public",
    services: spec.services,
    requires: [
      ...(spec.parentPath ? [spec.parentPath] : []),
      ...(input.extraRequires ?? []),
    ],
    resources: {
      State,
    },
    events: {
      StateChanged,
    },
    metadata: {
      purpose: "Owns the " + spec.name + " natural gameplay domain for Horror Corridor.",
      stateFields: spec.states,
      kitContracts: spec.kits,
      sourceDepth: spec.sourceDepth,
      source: blueprint.source,
    },
    initWorld({ world }) {
      world.setResource(State, clone(input.initialState));
    },
    createApi({ world }) {
      const readState = (): DomainState =>
        clone(world.getResource<DomainState>(State) ?? input.initialState);

      const snapshot = (): HorrorCorridorDomainSnapshot => ({
        path: spec.path,
        name: spec.name,
        parentPath: spec.parentPath,
        revision,
        state: readState(),
        stateFields: [...spec.states],
        kitContracts: [...spec.kits],
        services: [...spec.services],
      });

      const writeState = (next: DomainState): HorrorCorridorDomainSnapshot => {
        const previous = readState();

        if (stableValue(previous) === stableValue(next)) {
          return snapshot();
        }

        revision += 1;
        world.setResource(State, clone(next));
        world.emit(StateChanged, {
          path: spec.path,
          revision,
          previous,
          next: clone(next),
        });
        return snapshot();
      };

      const api: DomainApi = Object.freeze({
        path: spec.path,
        name: spec.name,
        parentPath: spec.parentPath,
        stateFields: Object.freeze([...spec.states]),
        kitContracts: Object.freeze([...spec.kits]),
        services: Object.freeze([...spec.services]),
        snapshot,
        patch(patch) {
          assertKnownStateFields(spec, patch);
          return writeState(
            Object.freeze({ ...readState(), ...clone(patch) }),
          );
        },
        reset() {
          revision = 0;
          world.setResource(State, clone(input.initialState));
          world.emit(StateChanged, {
            path: spec.path,
            revision,
            reset: true,
            next: clone(input.initialState),
          });
          return snapshot();
        },
      });

      input.apisByPath.set(spec.path, api);
      return api;
    },
  });
};

const toDefinitionRecord = <
  TKind extends "component" | "resource" | "event",
>(
  entries: Readonly<Record<string, unknown>>,
  factory: (name: string) => NexusDefinition<TKind>,
): Record<string, NexusDefinition<TKind>> =>
  Object.fromEntries(
    Object.entries(entries).map(([key, descriptor]) => [
      key,
      factory(typeof descriptor === "string" ? descriptor : key),
    ]),
  );

const adaptDescriptorKit = (sourceKit: HorrorDomainKit): NexusRuntimeKit => {
  const resources = toDefinitionRecord(sourceKit.resources, defineResource);
  const sourceMetadata = sourceKit.metadata;

  return defineRuntimeKit({
    id: sourceKit.id,
    components: toDefinitionRecord(sourceKit.components, defineComponent),
    resources,
    events: toDefinitionRecord(sourceKit.events, defineEvent),
    systems: sourceKit.systems.map((entry) => ({
      phase: entry.phase,
      name: entry.name,
      system: (context: unknown) => entry.system(context as never),
    })),
    provides: sourceKit.provides,
    requires: sourceKit.requires,
    bindings: sourceKit.bindings,
    metadata: {
      ...sourceMetadata,
      kind: "horror-descriptor-kit",
      sourceKind: sourceMetadata.kind,
      nexusAdapted: true,
    },
    initWorld({ world }) {
      for (const [key, definition] of Object.entries(resources)) {
        world.setResource(definition, {
          ownerKitId: sourceKit.id,
          key,
          descriptor: sourceKit.resources[key],
          config: clone(sourceMetadata.config ?? null),
        });
      }
    },
  });
};

const createCoreKits = (): readonly NexusRuntimeKit[] =>
  Object.freeze([
    createCoreStartupKit(),
    createCorePlatformKit(),
    createCoreCompositionKit(),
    createCoreDataKit(),
    createCoreTransactionLedgerKit(),
    createCorePersistenceKit(),
    createCoreAssetsKit(),
    createCoreInputKit(),
    createCoreSpatialKit(),
    createCoreWorldDomain(),
    createCoreSceneKit(),
    createCorePhysicsKit(),
    createCoreMotionKit(),
    createCoreSimulationKit({ resolution: true }),
    createCoreInteractionKit(),
    createCoreGraphicsKit(),
    createCoreSkyboxKit(),
    createCoreCameraKit(),
    createCoreCameraFramingKit(),
    createCorePresentationKit(),
    createCorePresentationOutputKit(),
    createCoreUIKit(),
    createCoreUIScaleKit(),
    createCoreAnimationKit(),
    createCoreAudioKit(),
    createCoreNetworkKit(),
    createCoreDiagnosticsKit(),
    createCoreDebugKit(),
    createCoreCaptureKit(),
    createCoreCreatureKit(),
    createCoreCharacterKit(),
    createCorePlayerKit(),
    createCoreObjectKit(),
    createCoreVegetationKit(),
    createCoreObjectShapeKit(),
    createCoreObjectFidelityKit(),
  ]);

const naturalSpecsUnder = (branchPath: string): readonly DomainSpec[] =>
  Object.freeze(
    [blueprint.root, ...blueprint.domains].filter(
      (spec) =>
        spec.path === branchPath || spec.path.startsWith(branchPath + ":"),
    ),
  );

const naturalPathsUnder = (branchPath: string): readonly string[] =>
  Object.freeze(naturalSpecsUnder(branchPath).map((spec) => spec.path));

const targetKitContractsUnder = (branchPath: string): readonly string[] =>
  Object.freeze(
    [...new Set(naturalSpecsUnder(branchPath).flatMap((spec) => spec.kits))],
  );

const createHorrorCorridorCompositionKits = (): readonly NexusRuntimeKit[] => {
  const expedition = defineRuntimeKit({
    id: "horror-expedition-kit",
    provides: ["n:horror-corridor:composition:expedition"],
    requires: [...naturalPathsUnder(PATHS.expedition), "n:core-composition"],
    metadata: {
      kind: "horror-domain-composition",
      purpose: "Composes expedition phase, delve, fate, score, and chronicle ownership.",
      targetKitContracts: targetKitContractsUnder(PATHS.expedition),
    },
  });
  const corridor = defineRuntimeKit({
    id: "horror-corridor-world-kit",
    provides: ["n:horror-corridor:composition:corridor"],
    requires: [...naturalPathsUnder(PATHS.corridor), "n:world"],
    metadata: {
      kind: "horror-domain-composition",
      purpose: "Composes corridor places, ruin, overgrowth, atmosphere, and traces.",
      targetKitContracts: targetKitContractsUnder(PATHS.corridor),
    },
  });
  const party = defineRuntimeKit({
    id: "horror-party-kit",
    provides: ["n:horror-corridor:composition:party"],
    requires: [...naturalPathsUnder(PATHS.party), "n:core-player"],
    metadata: {
      kind: "horror-domain-composition",
      purpose: "Composes party membership, explorer embodiment, memory, and signals.",
      targetKitContracts: targetKitContractsUnder(PATHS.party),
    },
  });
  const dread = defineRuntimeKit({
    id: "horror-dread-kit",
    provides: ["n:horror-corridor:composition:dread"],
    requires: [...naturalPathsUnder(PATHS.dread), "n:core-simulation"],
    metadata: {
      kind: "horror-domain-composition",
      purpose: "Composes tension, hazards, hauntings, and monster encounters.",
      targetKitContracts: targetKitContractsUnder(PATHS.dread),
    },
  });
  const sharedExpedition = defineRuntimeKit({
    id: "horror-shared-expedition-kit",
    provides: ["n:horror-corridor:composition:shared-expedition"],
    requires: [
      ...naturalPathsUnder(PATHS.sharedExpedition),
      "n:core-network",
    ],
    metadata: {
      kind: "horror-domain-composition",
      purpose: "Composes shared departure, stewardship, recovery, and shared truth.",
      targetKitContracts: targetKitContractsUnder(PATHS.sharedExpedition),
    },
  });
  const game = defineRuntimeKit({
    id: "horror-corridor-game-kit",
    provides: ["n:horror-corridor:game"],
    requires: [
      ROOT_PATH,
      "n:core-composition",
      "n:horror-corridor:composition:expedition",
      "n:horror-corridor:composition:corridor",
      "n:horror-corridor:composition:party",
      "n:horror-corridor:composition:dread",
      "n:horror-corridor:composition:shared-expedition",
    ],
    metadata: {
      kind: "horror-game-composition",
      purpose: "Assembles the five active HorrorCorridor natural-domain compositions.",
    },
  });

  return Object.freeze([expedition, corridor, party, dread, sharedExpedition, game]);
};

const topLevelRequires: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    [PATHS.expedition]: ["n:core-composition", "n:core-data", "n:core-persistence", "n:core-simulation"],
    [PATHS.corridor]: ["n:world", "n:core-scene", "n:core-spatial", "n:core-object"],
    [PATHS.party]: ["n:core-character", "n:core-player", "n:core-network"],
    [PATHS.dread]: ["n:core-audio", "n:core-simulation", "n:core-graphics", "n:presentation"],
    [PATHS.sharedExpedition]: ["n:core-network", "n:core-persistence"],
  });

const focusedDomainRequires: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    [PATHS.chronicle]: ["n:core-transaction-ledger"],
    [PATHS.monsterIndex]: ["n:core-data", "n:core-transaction-ledger"],
    [PATHS.overgrowth]: ["n:object:vegetation"],
    [PATHS.atmosphere]: ["n:core-skybox"],
    [PATHS.flashlightBeam]: ["n:core-graphics", "n:core-spatial", "n:core-interaction"],
    [PATHS.hunterEncounter]: ["n:core-simulation", "n:core-interaction"],
    [PATHS.blackout]: ["n:core-simulation", "n:core-animation"],
    [PATHS.capture]: ["n:core-animation", "n:presentation"],
    [PATHS.rejoining]: ["n:core-network", "n:core-persistence"],
    [PATHS.sharedChronicle]: ["n:core-transaction-ledger", "n:core-persistence"],
  });

const createInitialStateOverrides = (
  options: HorrorCorridorNexusRuntimeOptions,
): Readonly<Record<string, Readonly<Record<string, unknown>>>> =>
  Object.freeze({
    [PATHS.expedition]: {
      "current phase": "loading",
      "elapsed journey": 0,
      "completion status": "incomplete",
      "encounters survived": 0,
    },
    [PATHS.corridor]: {
      "world identity": "horror-corridor-expedition",
      "world seed": options.seed,
      "active region": "entrance",
    },
    [PATHS.party]: {
      "party identity": options.roomId,
      "party readiness": false,
    },
    [PATHS.dread]: {
      "current pressure": 0,
      "pressure trend": "quiet",
    },
    [PATHS.sharedExpedition]: {
      "session identity": options.roomId,
    },
    [PATHS.sharedDeparture]: {
      "room identity": options.roomId,
      membership: [],
      readiness: false,
    },
    [PATHS.stewardship]: {
      "host truth": options.sessionMode === "host" || options.sessionMode === "solo",
      "participant views": [],
    },
    [PATHS.rejoining]: {
      connection:
        options.sessionMode === "host" || options.sessionMode === "solo"
          ? "connected"
          : "idle",
      disconnection: null,
      recovery: null,
      "restored place": null,
    },
    [PATHS.sharedChronicle]: {
      "recovery history": [],
    },
  });

const patchDomain = (
  apisByPath: ReadonlyMap<string, DomainApi>,
  path: string,
  patch: Readonly<Record<string, unknown>>,
): void => {
  const api = apisByPath.get(path);
  if (api) api.patch(patch);
};

const summarizeMazeTopology = (
  maze: ReplicatedGameSnapshot["maze"],
): Readonly<{
  width: number;
  height: number;
  cellCount: number;
  wallCells: number;
  walkableCells: number;
}> => {
  let maxX = -1;
  let maxY = -1;
  let wallCells = 0;

  for (const cell of maze) {
    maxX = Math.max(maxX, cell.grid.x);
    maxY = Math.max(maxY, cell.grid.y);
    if (cell.value === 0) wallCells += 1;
  }

  return Object.freeze({
    width: maxX + 1,
    height: maxY + 1,
    cellCount: maze.length,
    wallCells,
    walkableCells: maze.length - wallCells,
  });
};

const buildRuntimeSnapshot = (input: Readonly<{
  engine: NexusEngine;
  apisByPath: ReadonlyMap<string, DomainApi>;
  coreKitIds: readonly string[];
  compositionKitIds: readonly string[];
  descriptorKitIds: readonly string[];
}>): HorrorCorridorNexusRuntimeSnapshot => ({
  version: VERSION,
  source: blueprint.source,
  counts: blueprint.counts,
  installOrder: [...(input.engine.gameComposer?.installOrder ?? [])],
  coreKitIds: [...input.coreKitIds],
  compositionKitIds: [...input.compositionKitIds],
  descriptorKitIds: [...input.descriptorKitIds],
  registeredDomainPaths:
    input.engine.n.paths?.().map((record) => record.path) ?? [],
  domains: [blueprint.root, ...blueprint.domains]
    .map((spec) => input.apisByPath.get(spec.path)?.snapshot())
    .filter(
      (domainSnapshot): domainSnapshot is HorrorCorridorDomainSnapshot =>
        Boolean(domainSnapshot),
    ),
  hosts: clone(blueprint.hosts),
  proofs: clone(blueprint.proofs),
});

export const createHorrorCorridorNexusRuntime = (
  options: HorrorCorridorNexusRuntimeOptions,
): HorrorCorridorNexusRuntime => {
  const apisByPath = new Map<string, DomainApi>();
  const coreKits = createCoreKits();
  const compositionKits = createHorrorCorridorCompositionKits();
  const localComposition = createHorrorCorridorDomainKits();
  const descriptorKits =
    localComposition.domainManifest.kits.map(adaptDescriptorKit);
  const overrides = createInitialStateOverrides(options);
  const naturalDomainKits = [blueprint.root, ...blueprint.domains].map((spec) =>
    createNaturalDomainKit({
      spec,
      initialState: createInitialState(spec, overrides[spec.path]),
      apisByPath,
      extraRequires:
        [
          ...(spec.path === ROOT_PATH
            ? ["n:core-composition", "n:core-startup", "n:core-platform"]
            : topLevelRequires[spec.path] ?? []),
          ...(focusedDomainRequires[spec.path] ?? []),
        ],
    }),
  );
  const engine = createRealtimeGame({
    kits: [...coreKits, ...descriptorKits, ...naturalDomainKits, ...compositionKits],
    driveSequenceNodesWithTick: false,
  });
  const coreKitIds = Object.freeze(coreKits.map((kit) => kit.id));
  const compositionKitIds = Object.freeze(
    compositionKits.map((kit) => kit.id),
  );
  const descriptorKitIds = Object.freeze(
    descriptorKits.map((kit) => kit.id),
  );
  let samples = 0;
  let totalTickMs = 0;
  let maxTickMs = 0;
  let lastTickMs = 0;
  let syncSamples = 0;
  let totalSyncMs = 0;
  let maxSyncMs = 0;
  let lastSyncMs = 0;
  let lastReplicatedTick: number | null = null;
  let mazeTopologySeed: number | null = null;

  const snapshot = (): HorrorCorridorNexusRuntimeSnapshot =>
    buildRuntimeSnapshot({
      engine,
      apisByPath,
      coreKitIds,
      compositionKitIds,
      descriptorKitIds,
    });

  return Object.freeze({
    engine,
    tick(deltaSeconds) {
      const startedAt = now();
      engine.tick(deltaSeconds);
      lastTickMs = Math.max(0, now() - startedAt);
      samples += 1;
      totalTickMs += lastTickMs;
      maxTickMs = Math.max(maxTickMs, lastTickMs);
    },
    syncHostFrame(frame) {
      const startedAt = now();
      const replicated = frame.snapshot;
      const localPlayer =
        replicated?.players.find(
          (player) => player.id === frame.localPlayerId,
        ) ?? null;
      const complete = replicated?.gameState === "victory";
      const playing = frame.screen === "PLAYING";
      const expedition = replicated?.expedition ?? null;
      const encounter = expedition?.activeEncounter ?? null;
      const flashlightDirection = localPlayer
        ? {
            x: -Math.sin(localPlayer.rotationY),
            y: -Math.sin(localPlayer.pitch),
            z: -Math.cos(localPlayer.rotationY),
          }
        : null;

      patchDomain(apisByPath, PATHS.expedition, {
        "current phase": expedition?.phase ?? (complete
          ? "complete"
          : playing
            ? "exploring"
            : frame.screen.toLowerCase()),
        "elapsed journey": Math.max(0, (expedition?.elapsedMs ?? frame.elapsedMs) / 1000),
        "completion status": expedition?.phase === "caught" ? "lost" : complete ? "complete" : "incomplete",
        "encounters survived": expedition?.encountersSurvived ?? 0,
      });
      patchDomain(apisByPath, PATHS.corridor, {
        "world identity": "horror-corridor-expedition",
        "world seed": replicated?.seed ?? options.seed,
        "active region": expedition?.phase === "intro"
          ? "entrance"
          : `building-${Math.max(1, expedition?.buildingNumber ?? 1)}`,
      });
      if (frame.concretePaving) {
        patchDomain(apisByPath, PATHS.concrete, {
          "concrete areas": clone(frame.concretePaving.concreteAreas),
          "aggregate exposure": frame.concretePaving.aggregateExposure,
          moisture: frame.concretePaving.moisture,
        });
        patchDomain(apisByPath, PATHS.concreteSlabs, {
          "slab membership": clone(frame.concretePaving.slabMembership),
          "slab alignment": clone(frame.concretePaving.slabAlignment),
        });
        patchDomain(apisByPath, PATHS.concreteSlab, {
          body: clone(frame.concretePaving.slab.body),
          cracks: clone(frame.concretePaving.slab.cracks),
          displacement: clone(frame.concretePaving.slab.displacement),
          wetness: frame.concretePaving.slab.wetness,
        });
      }
      if (frame.ceilingCollapse) {
        patchDomain(apisByPath, PATHS.ceiling, {
          span: clone(frame.ceilingCollapse.ceiling.span),
          height: frame.ceilingCollapse.ceiling.height,
          stability: frame.ceilingCollapse.ceiling.stability,
          surface: clone(frame.ceilingCollapse.ceiling.surface),
        });
        patchDomain(apisByPath, PATHS.ceilingOpenings, {
          "opening bounds": clone(frame.ceilingCollapse.opening.openingBounds),
          "sky exposure": frame.ceilingCollapse.opening.skyExposure,
          "falling debris": frame.ceilingCollapse.opening.fallingDebris,
        });
        patchDomain(apisByPath, PATHS.cracking, {
          "crack paths": clone(frame.ceilingCollapse.cracking.crackPaths),
          "crack widths": clone(frame.ceilingCollapse.cracking.crackWidths),
          "active movement": frame.ceilingCollapse.cracking.activeMovement,
        });
        patchDomain(apisByPath, PATHS.rubble, {
          "rubble areas": clone(frame.ceilingCollapse.rubble.rubbleAreas),
          "pile heights": clone(frame.ceilingCollapse.rubble.pileHeights),
          passability: clone(frame.ceilingCollapse.rubble.passability),
        });
        patchDomain(apisByPath, PATHS.fallenMasonry, {
          "fallen masonry": clone(
            frame.ceilingCollapse.fallenMasonry.fallenMasonry,
          ),
          "source structures": clone(
            frame.ceilingCollapse.fallenMasonry.sourceStructures,
          ),
          settlement: clone(frame.ceilingCollapse.fallenMasonry.settlement),
        });
      }
      const dreadPressure = encounter
        ? Math.max(0, Math.min(1, 1 - encounter.distance / 18))
        : 0;
      patchDomain(apisByPath, PATHS.dread, {
        "current pressure": dreadPressure,
        "pressure trend": encounter?.beamContact
          ? "breaking"
          : encounter
            ? "closing"
            : "quiet",
      });
      patchDomain(apisByPath, PATHS.delve, {
        "current depth": expedition?.distanceTravelled ?? 0,
        "farthest depth": expedition?.distanceTravelled ?? 0,
        "current destination": expedition?.phase === "intro" ? "entrance passage" : "next building",
        "current building": expedition?.buildingNumber ?? 0,
        "buildings crossed": expedition?.buildingsCrossed ?? 0,
      });
      patchDomain(apisByPath, PATHS.monsterIndex, {
        "known monsters": expedition?.monsterIndex.filter((entry) => entry.knowledge !== "unknown") ?? [],
        "learned scares": expedition?.monsterIndex.filter((entry) => entry.knowledge === "studied" || entry.knowledge === "collected") ?? [],
        "collected monsters": expedition?.monsterIndex.filter((entry) => entry.knowledge === "collected") ?? [],
      });
      patchDomain(apisByPath, PATHS.buildings, {
        "building membership": Array.from(
          { length: expedition?.buildingsCrossed ?? 0 },
          (_, index) => `building-${index + 1}`,
        ),
        "building succession": expedition?.buildingNumber ?? 0,
      });
      patchDomain(apisByPath, PATHS.building, {
        identity: expedition?.buildingNumber ? `building-${expedition.buildingNumber}` : null,
        bounds: "current procedural maze reach",
        entrances: expedition?.buildingNumber ? ["previous threshold"] : ["expedition entrance"],
        condition: encounter ? "occupied" : "open",
      });
      patchDomain(apisByPath, PATHS.roomOffering, {
        boon: expedition?.roomOffer ?? null,
        "claim status": expedition?.roomOffer?.claimed ? "claimed" : expedition?.roomOffer ? "offered" : "absent",
        consequence: expedition?.roomOffer?.claimed ? expedition.boons : null,
      });
      patchDomain(apisByPath, PATHS.darkness, {
        "dark places": expedition?.flashlight.mode === "blackout" ? ["player reach"] : [],
        depth: expedition?.flashlight.mode === "blackout" ? 1 : encounter ? Math.max(0, 1 - encounter.distance / 18) : 0,
        adaptation: expedition?.phase === "intro" ? "unsettled" : "deepening",
      });
      patchDomain(apisByPath, PATHS.flashlightBeam, {
        origin: clone(frame.localPlayerPosition),
        direction: flashlightDirection,
        reach: expedition?.flashlight.mode === "blackout" ? 0 : 1,
        interruption: expedition?.flashlight.mode ?? "steady",
        "revealed subjects": encounter?.beamContact ? [encounter.monsterId] : [],
      });
      patchDomain(apisByPath, PATHS.hunter, {
        presence: Boolean(encounter),
        intent: encounter?.state ?? null,
        pursuit: encounter ? { monsterId: encounter.monsterId, distance: encounter.distance } : null,
      });
      patchDomain(apisByPath, PATHS.hunterPresence, {
        direction: encounter?.bearingRadians ?? null,
        distance: encounter?.distance ?? null,
        pressure: encounter ? Math.max(0, 1 - encounter.distance / 18) : 0,
      });
      patchDomain(apisByPath, PATHS.hunterSigns, {
        "audible signs": encounter ? [encounter.audioCue.kind] : [],
        "sign direction": encounter?.audioCue.pan ?? null,
        "sign intensity": encounter?.audioCue.intensity ?? 0,
      });
      patchDomain(apisByPath, PATHS.hunterNearness, {
        "current distance": encounter?.distance ?? null,
        "closest approach": encounter?.closestDistance ?? null,
        "arrival status": encounter?.state ?? "absent",
      });
      patchDomain(apisByPath, PATHS.hunterEncounter, {
        participants: encounter ? [encounter.monsterId, frame.localPlayerId] : [],
        place: encounter ? `building-${encounter.buildingNumber}` : null,
        proximity: encounter?.distance ?? null,
        "beam contact": encounter?.beamContact ?? false,
        outcome: expedition?.phase === "caught" ? "captured" : encounter ? "unresolved" : "survived-or-absent",
      });
      patchDomain(apisByPath, PATHS.approach, {
        "approach direction": encounter?.bearingRadians ?? null,
        "approach distance": encounter?.distance ?? null,
        "warning signs": encounter ? [encounter.audioCue.kind] : [],
      });
      patchDomain(apisByPath, PATHS.repulse, {
        "beam contact": encounter?.beamContact ?? false,
        "held exposure": encounter?.beamHoldMs ?? 0,
        "retreat distance": encounter?.state === "repelling" ? encounter.distance : 0,
      });
      patchDomain(apisByPath, PATHS.blackout, {
        cause: encounter?.state === "blackout" ? encounter.monsterId : null,
        "remaining darkness": encounter?.blackoutRemainingMs ?? 0,
        "completed darkness": encounter?.fullScareWitnessed ?? false,
      });
      patchDomain(apisByPath, PATHS.lastChance, {
        "remaining response": encounter?.lastChanceRemainingMs ?? 0,
        "restored beam": encounter?.state === "last-chance",
        "response outcome": encounter?.state === "jumpscare" ? "missed" : encounter?.beamContact ? "responding" : "pending",
      });
      patchDomain(apisByPath, PATHS.capture, {
        "capture status": expedition?.phase === "caught" ? "complete" : encounter?.state === "jumpscare" ? "impact" : "none",
        jumpscare: encounter?.state === "jumpscare",
        "expedition loss": expedition?.phase === "caught",
      });
      patchDomain(apisByPath, PATHS.party, {
        "party identity": replicated?.room.roomId ?? options.roomId,
        "party readiness": Boolean(replicated && replicated.players.length > 0),
      });
      patchDomain(apisByPath, PATHS.explorer, {
        identity: frame.localPlayerId,
      });
      patchDomain(apisByPath, PATHS.body, {
        position: clone(frame.localPlayerPosition),
        facing: localPlayer?.rotationY ?? null,
        posture: "standing",
      });
      patchDomain(apisByPath, PATHS.sharedExpedition, {
        "session identity": replicated?.room.roomId ?? options.roomId,
      });
      patchDomain(apisByPath, PATHS.sharedJourney, {
        lobby: frame.screen === "LOBBY",
        loading: frame.screen === "LOADING",
        playing,
        paused: frame.screen === "PAUSED",
        complete: frame.screen === "COMPLETED",
      });
      patchDomain(apisByPath, PATHS.rejoining, {
        connection: frame.sharedRecovery.connection,
        disconnection: clone(frame.sharedRecovery.disconnection),
        recovery: clone(frame.sharedRecovery.recovery),
        "restored place": clone(frame.sharedRecovery.restoredPlace),
      });
      patchDomain(apisByPath, PATHS.sharedChronicle, {
        "recovery history": clone(frame.sharedRecovery.recoveryHistory),
      });
      if (replicated && replicated.tick !== lastReplicatedTick) {
        lastReplicatedTick = replicated.tick;
        if (mazeTopologySeed !== replicated.seed) {
          mazeTopologySeed = replicated.seed;
          patchDomain(apisByPath, PATHS.maze, {
            topology: summarizeMazeTopology(replicated.maze),
            entrance:
              replicated.maze.find((cell) => cell.value === 3)?.grid ?? null,
            destination:
              replicated.maze.find((cell) => cell.value === 4)?.grid ?? null,
          });
        }
        patchDomain(apisByPath, PATHS.sharedDeparture, {
          "room identity": replicated.room.roomId,
          membership: replicated.room.players,
          readiness: true,
        });
        patchDomain(apisByPath, PATHS.stewardship, {
          "host truth":
            options.sessionMode === "host" || options.sessionMode === "solo",
          "participant views": replicated.players.map((player) => player.id),
        });
        patchDomain(apisByPath, PATHS.sharedWorld, {
          "expedition view": {
            phase: frame.screen,
            elapsedMs: frame.elapsedMs,
          },
          "corridor view": {
            seed: replicated.seed,
            mazeCells: replicated.maze.length,
          },
          "party view": replicated.players,
          "anomaly view": replicated.anomaly,
          "dread view": apisByPath.get(PATHS.dread)?.snapshot().state ?? null,
        });
      }

      lastSyncMs = Math.max(0, now() - startedAt);
      syncSamples += 1;
      totalSyncMs += lastSyncMs;
      maxSyncMs = Math.max(maxSyncMs, lastSyncMs);
    },
    domain(path) {
      return apisByPath.get(path) ?? null;
    },
    reset() {
      for (const api of apisByPath.values()) api.reset();
      samples = 0;
      totalTickMs = 0;
      maxTickMs = 0;
      lastTickMs = 0;
      syncSamples = 0;
      totalSyncMs = 0;
      maxSyncMs = 0;
      lastSyncMs = 0;
      lastReplicatedTick = null;
      mazeTopologySeed = null;
      return snapshot();
    },
    snapshot,
    performance() {
      return {
        samples,
        averageTickMs: samples === 0 ? 0 : totalTickMs / samples,
        maxTickMs,
        lastTickMs,
        syncSamples,
        averageSyncMs: syncSamples === 0 ? 0 : totalSyncMs / syncSamples,
        maxSyncMs,
        lastSyncMs,
      };
    },
  });
};

type DeterministicRuntimeState = Readonly<{
  version: HorrorCorridorNexusRuntimeSnapshot["version"];
  installOrder: readonly string[];
  registeredDomainPaths: readonly string[];
  domains: readonly Readonly<{
    path: string;
    revision: number;
    state: DomainState;
  }>[];
}>;

const toDeterministicRuntimeState = (
  runtime: HorrorCorridorNexusRuntime,
): DeterministicRuntimeState => {
  const snapshot = runtime.snapshot();

  return Object.freeze({
    version: snapshot.version,
    installOrder: Object.freeze([...snapshot.installOrder]),
    registeredDomainPaths: Object.freeze([...snapshot.registeredDomainPaths]),
    domains: Object.freeze(
      snapshot.domains.map((domain) =>
        Object.freeze({
          path: domain.path,
          revision: domain.revision,
          state: clone(domain.state),
        }),
      ),
    ),
  });
};

const digestDeterministicState = (value: unknown): string => {
  const source = stableValue(value);
  let hash = 0x811c9dc5;

  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return "fnv1a32:" + (hash >>> 0).toString(16).padStart(8, "0");
};

const replayMatches = (first: unknown, second: unknown): boolean => {
  try {
    return assertReplayDeterministic(first, second);
  } catch {
    return false;
  }
};

export const proveHorrorCorridorNexusResetReplay = (
  options: HorrorCorridorNexusRuntimeOptions,
  frame: HorrorCorridorNexusFrame,
): HorrorCorridorNexusResetReplayProof => {
  const startedAt = now();
  const replayFrame = clone(frame);
  const laterFrame = Object.freeze({
    ...clone(frame),
    elapsedMs: frame.elapsedMs + 100,
  });
  const fixture = Object.freeze({
    id: "horror-corridor-mounted-domain-reset-replay",
    steps: Object.freeze([
      Object.freeze({ call: "syncHostFrame", args: Object.freeze([replayFrame]) }),
      Object.freeze({ tick: Object.freeze({ count: 3, dt: 1 / 60 }) }),
      Object.freeze({ call: "syncHostFrame", args: Object.freeze([laterFrame]) }),
      Object.freeze({ tick: Object.freeze({ count: 2, dt: 1 / 30 }) }),
    ]),
  }) satisfies NexusReplayFixture;
  const runner = createReplayRunner<
    HorrorCorridorNexusRuntime,
    DeterministicRuntimeState
  >({
    snapshot: toDeterministicRuntimeState,
    tick: (runtime, deltaSeconds) => runtime.tick(deltaSeconds),
  });
  const runtime = createHorrorCorridorNexusRuntime(options);
  const initialState = toDeterministicRuntimeState(runtime);
  const first = runner.run(runtime, fixture);
  runtime.reset();
  const resetState = toDeterministicRuntimeState(runtime);
  const afterReset = runner.run(runtime, fixture);
  const freshRuntime = createHorrorCorridorNexusRuntime(options);
  const fresh = runner.run(freshRuntime, fixture);
  const initialByPath = new Map(
    initialState.domains.map((domain) => [domain.path, domain] as const),
  );
  const resetDomainCount = resetState.domains.filter((domain) =>
    stableValue(domain) === stableValue(initialByPath.get(domain.path)),
  ).length;
  const zeroRevisionCount = resetState.domains.filter(
    (domain) => domain.revision === 0,
  ).length;
  const expectedMutableDomainStateCount = blueprint.domains.length + 1;
  const installOrderStable =
    stableValue(initialState.installOrder) ===
    stableValue(fresh.snapshot.installOrder);
  const registeredPathsStable =
    stableValue(initialState.registeredDomainPaths) ===
    stableValue(fresh.snapshot.registeredDomainPaths);
  const completeMutableDomainGraph =
    initialState.domains.length === expectedMutableDomainStateCount &&
    resetState.domains.length === expectedMutableDomainStateCount &&
    fresh.snapshot.domains.length === expectedMutableDomainStateCount;
  const compositionPassed =
    installOrderStable && registeredPathsStable && completeMutableDomainGraph;
  const resetPassed =
    resetDomainCount === expectedMutableDomainStateCount &&
    zeroRevisionCount === expectedMutableDomainStateCount;
  const fixtureChangedState =
    stableValue(initialState.domains) !== stableValue(first.snapshot.domains);
  const afterResetMatches = replayMatches(first, afterReset);
  const freshRuntimeMatches = replayMatches(first, fresh);
  const replayPassed =
    fixtureChangedState && afterResetMatches && freshRuntimeMatches;

  return Object.freeze({
    schema: "horror-corridor.nexus-reset-replay-proof/1",
    passed: compositionPassed && resetPassed && replayPassed,
    durationMs: Math.max(0, now() - startedAt),
    fixture: Object.freeze({
      id: fixture.id ?? "replay",
      syncCount: 2,
      tickCount: 5,
      fixedDeltaSeconds: Object.freeze([1 / 60, 1 / 30]),
    }),
    composition: Object.freeze({
      passed: compositionPassed,
      installCount: initialState.installOrder.length,
      registeredDomainPathCount: initialState.registeredDomainPaths.length,
      mutableDomainStateCount: initialState.domains.length,
      expectedMutableDomainStateCount,
      installOrderStable,
      registeredPathsStable,
      completeMutableDomainGraph,
    }),
    reset: Object.freeze({
      passed: resetPassed,
      resetDomainCount,
      zeroRevisionCount,
      initialDigest: digestDeterministicState(initialState),
      resetDigest: digestDeterministicState(resetState),
    }),
    replay: Object.freeze({
      passed: replayPassed,
      fixtureChangedState,
      afterResetMatches,
      freshRuntimeMatches,
      firstDigest: digestDeterministicState(first.snapshot),
      afterResetDigest: digestDeterministicState(afterReset.snapshot),
      freshRuntimeDigest: digestDeterministicState(fresh.snapshot),
    }),
  });
};

export const HORROR_CORRIDOR_DOMAIN_BLUEPRINT = blueprint;
