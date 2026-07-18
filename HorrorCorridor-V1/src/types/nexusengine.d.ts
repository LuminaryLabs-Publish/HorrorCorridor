declare module "nexusengine" {
  export type NexusDefinitionKind = "component" | "resource" | "event";

  export type NexusDefinition<TKind extends NexusDefinitionKind = NexusDefinitionKind> = Readonly<{
    kind: TKind;
    name: string;
  }>;

  export type NexusWorld = {
    setResource: <T>(definition: NexusDefinition<"resource">, value: T) => T;
    getResource: <T>(definition: NexusDefinition<"resource">) => T | undefined;
    hasResource: (definition: NexusDefinition<"resource">) => boolean;
    emit: <T>(definition: NexusDefinition<"event">, value: T) => T;
  };

  export type NexusRuntimeKit = Readonly<{
    id: string;
    components: Record<string, NexusDefinition<"component">>;
    resources: Record<string, NexusDefinition<"resource">>;
    events: Record<string, NexusDefinition<"event">>;
    systems: readonly Readonly<{
      phase: string;
      name: string;
      system: (context: unknown) => void;
    }>[];
    provides: readonly string[];
    requires: readonly string[];
    bindings: Readonly<Record<string, unknown>>;
    metadata: Readonly<Record<string, unknown>>;
  }>;

  export type NexusDomainPathRecord = Readonly<{
    path: string;
    parentPath?: string;
    ownerKitId: string;
    domain?: string;
    status?: string;
    version?: string;
  }>;

  export type NexusEngine = {
    world: NexusWorld;
    kits: NexusRuntimeKit[];
    tick: (deltaSeconds?: number) => unknown;
    step: (deltaSeconds?: number) => unknown;
    n: Record<string, unknown> & {
      path?: (path: string) => NexusDomainPathRecord | null;
      paths?: () => NexusDomainPathRecord[];
      apis?: () => unknown[];
      realtime?: {
        getClock?: () => Readonly<{
          delta: number;
          elapsed: number;
          frame: number;
        }>;
      };
    };
    gameComposer?: Readonly<{
      installOrder: readonly string[];
      provides: readonly string[];
    }>;
    game?: Readonly<{
      installOrder: readonly string[];
      bindings: Readonly<Record<string, unknown>>;
    }>;
  };

  export type NexusRuntimeKitConfig = Readonly<{
    id: string;
    components?: Record<string, NexusDefinition<"component">>;
    resources?: Record<string, NexusDefinition<"resource">>;
    events?: Record<string, NexusDefinition<"event">>;
    systems?: readonly Readonly<{
      phase: string;
      name?: string;
      system: (context: unknown) => void;
    }>[];
    provides?: readonly string[];
    requires?: readonly string[];
    bindings?: Readonly<Record<string, unknown>>;
    metadata?: Readonly<Record<string, unknown>>;
    initWorld?: (context: Readonly<{
      engine: NexusEngine;
      world: NexusWorld;
      kit: NexusRuntimeKit;
      options: unknown;
    }>) => void;
    install?: (context: Readonly<{
      engine: NexusEngine;
      world: NexusWorld;
      kit: NexusRuntimeKit;
      options: unknown;
    }>) => void;
  }>;

  export type NexusDomainServiceKitConfig = Omit<NexusRuntimeKitConfig, "id"> &
    Readonly<{
      id?: string;
      domain: string;
      domainPath?: string;
      parentDomainPath?: string;
      apiPath?: string;
      apiName?: string;
      services?: readonly string[];
      stability: string;
      version: string;
      visibility?: "public" | "internal" | "editor-safe";
      inputs?: readonly string[];
      outputs?: readonly string[];
      createApi?: (context: Readonly<{
        engine: NexusEngine;
        world: NexusWorld;
        kit: NexusRuntimeKit;
        options: unknown;
      }>) => unknown;
    }>;

  export function defineComponent(name: string): NexusDefinition<"component">;
  export function defineResource(name: string): NexusDefinition<"resource">;
  export function defineEvent(name: string): NexusDefinition<"event">;
  export function defineRuntimeKit(config: NexusRuntimeKitConfig): NexusRuntimeKit;
  export function defineDomainServiceKit(config: NexusDomainServiceKitConfig): NexusRuntimeKit;
  export function createRealtimeGame(config?: Readonly<{
    kits?: readonly NexusRuntimeKit[];
    root?: unknown;
    canvas?: unknown;
    [key: string]: unknown;
  }>): NexusEngine;

  export function createCoreAssetsKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreAudioKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreCameraFramingKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreCameraKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreCaptureKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreCharacterKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreCompositionKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreCreatureKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreDataKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreDebugKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreDiagnosticsKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreGraphicsKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreInputKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreInteractionKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreMotionKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreSimulationKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreAnimationKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreWorldDomain(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreNetworkKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreObjectFidelityKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreObjectKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreObjectShapeKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCorePersistenceKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCorePhysicsKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCorePlatformKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCorePlayerKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCorePresentationOutputKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCorePresentationKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreSceneKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreSkyboxKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreSpatialKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreStartupKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreTransactionLedgerKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreUIKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreUIScaleKit(config?: Record<string, unknown>): NexusRuntimeKit;
  export function createCoreVegetationKit(config?: Record<string, unknown>): NexusRuntimeKit;
}

declare module "nexusengine/foundation" {
  export type NexusReplayStep = Readonly<{
    call?: string;
    args?: readonly unknown[];
    tick?: Readonly<{
      count?: number;
      dt?: number;
    }>;
  }>;

  export type NexusReplayFixture = Readonly<{
    id?: string;
    steps?: readonly NexusReplayStep[];
  }>;

  export type NexusReplayResult<TSnapshot = unknown> = Readonly<{
    id: string;
    events: readonly unknown[];
    snapshot: TSnapshot;
  }>;

  export function createReplayRunner<TEngine, TSnapshot>(config?: Readonly<{
    snapshot?: (engine: TEngine) => TSnapshot;
    tick?: (engine: TEngine, deltaSeconds: number) => unknown;
  }>): Readonly<{
    run: (
      engine: TEngine,
      fixture?: NexusReplayFixture,
    ) => NexusReplayResult<TSnapshot>;
  }>;

  export function assertReplayDeterministic(
    first: unknown,
    second: unknown,
  ): true;
}
