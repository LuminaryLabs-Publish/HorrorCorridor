export type HorrorRuntimeKitPhase =
  | "input"
  | "simulate"
  | "resolve"
  | "cleanup"
  | "render"
  | "network"
  | (string & {});

export type HorrorRuntimeKitSystem = Readonly<{
  phase: HorrorRuntimeKitPhase;
  name: string;
  system: (context: HorrorRuntimeKitSystemContext) => void;
}>;

export type HorrorRuntimeKitSystemContext = Readonly<{
  engine?: unknown;
  world?: unknown;
  deltaSeconds?: number;
  elapsedSeconds?: number;
  frame?: number;
}>;

export type HorrorRuntimeKitInstallContext = Readonly<{
  engine?: unknown;
  world?: unknown;
  options?: unknown;
}>;

export type HorrorRuntimeKitMetadata = Readonly<Record<string, unknown>>;

export type HorrorRuntimeKit = Readonly<{
  id: string;
  components: Record<string, unknown>;
  resources: Record<string, unknown>;
  events: Record<string, unknown>;
  bindings: Record<string, unknown>;
  systems: readonly HorrorRuntimeKitSystem[];
  provides: readonly string[];
  requires: readonly string[];
  metadata: HorrorRuntimeKitMetadata;
  initWorld?: (context: HorrorRuntimeKitInstallContext) => void;
  install?: (context: HorrorRuntimeKitInstallContext) => void;
}>;

export type HorrorRuntimeKitConfig = Partial<
  Pick<
    HorrorRuntimeKit,
    | "components"
    | "resources"
    | "events"
    | "bindings"
    | "systems"
    | "provides"
    | "requires"
    | "initWorld"
    | "install"
  >
> &
  Readonly<{
    id: string;
    metadata?: HorrorRuntimeKitMetadata;
  }>;

const normalizeStringList = (value: readonly string[] | undefined): readonly string[] =>
  Object.freeze([...(value ?? [])]);

const normalizeSystem = (entry: HorrorRuntimeKitSystem): HorrorRuntimeKitSystem => {
  if (typeof entry.system !== "function") {
    throw new Error(`Runtime kit system ${entry.name} must provide a system function.`);
  }

  return Object.freeze({
    phase: entry.phase,
    name: entry.name,
    system: entry.system,
  });
};

export const defineHorrorRuntimeKit = (config: HorrorRuntimeKitConfig): HorrorRuntimeKit => {
  if (config.id.trim().length === 0) {
    throw new Error("Horror runtime kit id must be a non-empty string.");
  }

  return Object.freeze({
    id: config.id,
    components: Object.freeze({ ...(config.components ?? {}) }),
    resources: Object.freeze({ ...(config.resources ?? {}) }),
    events: Object.freeze({ ...(config.events ?? {}) }),
    bindings: Object.freeze({ ...(config.bindings ?? {}) }),
    systems: Object.freeze((config.systems ?? []).map(normalizeSystem)),
    provides: normalizeStringList(config.provides),
    requires: normalizeStringList(config.requires),
    metadata: Object.freeze({ ...(config.metadata ?? {}) }),
    initWorld: config.initWorld,
    install: config.install,
  });
};

export type HorrorRuntimeManifest = Readonly<{
  kits: readonly HorrorRuntimeKit[];
  kitIds: readonly string[];
  providedTokens: readonly string[];
}>;

export const createHorrorRuntimeManifest = (kits: readonly HorrorRuntimeKit[]): HorrorRuntimeManifest => {
  const seenIds = new Set<string>();

  for (const kit of kits) {
    if (seenIds.has(kit.id)) {
      throw new Error(`Duplicate runtime kit id: ${kit.id}`);
    }
    seenIds.add(kit.id);
  }

  return Object.freeze({
    kits: Object.freeze([...kits]),
    kitIds: Object.freeze(kits.map((kit) => kit.id)),
    providedTokens: Object.freeze(Array.from(new Set(kits.flatMap((kit) => kit.provides)))),
  });
};
