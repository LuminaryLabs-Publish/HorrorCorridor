import {
  createHorrorRuntimeManifest,
  defineHorrorRuntimeKit,
  type HorrorRuntimeKit,
  type HorrorRuntimeKitConfig,
  type HorrorRuntimeKitMetadata,
  type HorrorRuntimeKitSystem,
} from "./runtimeKit";

export const HORROR_DOMAIN_NAMESPACE = "horror" as const;
export const HORROR_DOMAIN_METADATA_KIND = "domain-service-kit" as const;

export type HorrorDomainKitStability = "experimental" | "stable";

export type HorrorDomainKitMetadata = HorrorRuntimeKitMetadata &
  Readonly<{
    kind: typeof HORROR_DOMAIN_METADATA_KIND;
    namespace: typeof HORROR_DOMAIN_NAMESPACE;
    domain: string;
    apiName: string;
    stability: HorrorDomainKitStability;
    version: string;
    serializableState: boolean;
  }>;

export type HorrorDomainKit = HorrorRuntimeKit &
  Readonly<{
    provides: readonly string[];
    requires: readonly string[];
    metadata: HorrorDomainKitMetadata;
  }>;

export type HorrorDomainKitConfig = Omit<HorrorRuntimeKitConfig, "id" | "metadata" | "provides"> &
  Readonly<{
    id?: string;
    domain: string;
    apiName?: string;
    services?: readonly string[];
    provides?: readonly string[];
    requires?: readonly string[];
    stability?: HorrorDomainKitStability;
    version?: string;
    serializableState?: boolean;
    metadata?: HorrorRuntimeKitMetadata;
  }>;

const SLUG_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const TOKEN_PATTERN = /^horror:[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)*$/;

const normalizeSlug = (value: string, fieldName: string): string => {
  const slug = value.trim().toLowerCase();
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid ${fieldName}: ${value}`);
  }
  return slug;
};

const toCamel = (slug: string): string =>
  slug.replaceAll(/-([a-z0-9])/g, (_match, char: string) => char.toUpperCase());

const normalizeToken = (token: string): string => {
  const next = token.trim();
  if (!TOKEN_PATTERN.test(next)) {
    throw new Error(`Malformed horror domain token: ${token}`);
  }
  return next;
};

const unique = <T,>(values: readonly T[]): readonly T[] => Object.freeze(Array.from(new Set(values)));

const assertNoDuplicateKeys = (
  base: Record<string, unknown>,
  extension: Record<string, unknown> | undefined,
  fieldName: string,
): void => {
  const duplicates = Object.keys(extension ?? {}).filter((key) => key in base);
  if (duplicates.length > 0) {
    throw new Error(`Domain kit extension has duplicate ${fieldName}: ${duplicates.join(", ")}`);
  }
};

const systemName = (system: HorrorRuntimeKitSystem): string => system.name;

export const createHorrorDomainToken = (domain: string, service?: string): string => {
  const base = `${HORROR_DOMAIN_NAMESPACE}:${normalizeSlug(domain, "domain")}`;
  return service === undefined ? base : `${base}:${normalizeSlug(service, "service")}`;
};

export const defineHorrorDomainKit = (config: HorrorDomainKitConfig): HorrorDomainKit => {
  const domain = normalizeSlug(config.domain, "domain");
  const id = config.id ?? `${domain}-domain-kit`;
  const apiName = config.apiName ?? toCamel(domain);
  const baseToken = createHorrorDomainToken(domain);
  const serviceTokens = (config.services ?? []).map((service) => createHorrorDomainToken(domain, service));
  const provides = unique([baseToken, ...serviceTokens, ...(config.provides ?? []).map(normalizeToken)]);
  const requires = unique((config.requires ?? []).map(normalizeToken));
  const metadata: HorrorDomainKitMetadata = Object.freeze({
    ...config.metadata,
    kind: HORROR_DOMAIN_METADATA_KIND,
    namespace: HORROR_DOMAIN_NAMESPACE,
    domain,
    apiName,
    stability: config.stability ?? "experimental",
    version: config.version ?? "0.0.1",
    serializableState: config.serializableState ?? true,
  });

  return validateHorrorDomainKit(
    defineHorrorRuntimeKit({
      ...config,
      id,
      provides,
      requires,
      metadata,
    }) as HorrorDomainKit,
  );
};

export const validateHorrorDomainKit = (kit: HorrorDomainKit): HorrorDomainKit => {
  if (kit.metadata.kind !== HORROR_DOMAIN_METADATA_KIND) {
    throw new Error(`Kit ${kit.id} is not a horror domain kit.`);
  }
  if (kit.metadata.namespace !== HORROR_DOMAIN_NAMESPACE) {
    throw new Error(`Kit ${kit.id} has invalid namespace ${kit.metadata.namespace}.`);
  }
  normalizeSlug(kit.metadata.domain, "metadata.domain");
  normalizeToken(createHorrorDomainToken(kit.metadata.domain));
  for (const token of [...kit.provides, ...kit.requires]) {
    normalizeToken(token);
  }
  if (!kit.provides.includes(createHorrorDomainToken(kit.metadata.domain))) {
    throw new Error(`Kit ${kit.id} must provide ${createHorrorDomainToken(kit.metadata.domain)}.`);
  }
  return kit;
};

export const extendHorrorDomainKit = (
  baseKit: HorrorDomainKit,
  extensionConfig: Partial<HorrorDomainKitConfig> & Readonly<{ id?: string }>,
): HorrorDomainKit => {
  validateHorrorDomainKit(baseKit);
  assertNoDuplicateKeys(baseKit.components, extensionConfig.components, "components");
  assertNoDuplicateKeys(baseKit.resources, extensionConfig.resources, "resources");
  assertNoDuplicateKeys(baseKit.events, extensionConfig.events, "events");
  assertNoDuplicateKeys(baseKit.bindings, extensionConfig.bindings, "bindings");

  const baseSystemNames = new Set(baseKit.systems.map(systemName));
  const duplicateSystems = (extensionConfig.systems ?? [])
    .map(systemName)
    .filter((name) => baseSystemNames.has(name));
  if (duplicateSystems.length > 0) {
    throw new Error(`Domain kit extension has duplicate systems: ${duplicateSystems.join(", ")}`);
  }

  return defineHorrorDomainKit({
    ...extensionConfig,
    id: extensionConfig.id ?? `${baseKit.id}-extension`,
    domain: extensionConfig.domain ?? baseKit.metadata.domain,
    apiName: extensionConfig.apiName ?? `${baseKit.metadata.apiName}Extension`,
    stability: extensionConfig.stability ?? baseKit.metadata.stability,
    version: extensionConfig.version ?? baseKit.metadata.version,
    serializableState: extensionConfig.serializableState ?? baseKit.metadata.serializableState,
    components: { ...baseKit.components, ...(extensionConfig.components ?? {}) },
    resources: { ...baseKit.resources, ...(extensionConfig.resources ?? {}) },
    events: { ...baseKit.events, ...(extensionConfig.events ?? {}) },
    bindings: { ...baseKit.bindings, ...(extensionConfig.bindings ?? {}) },
    systems: [...baseKit.systems, ...(extensionConfig.systems ?? [])],
    requires: unique([...(baseKit.requires ?? []), ...(extensionConfig.requires ?? [])]),
    provides: unique([...(baseKit.provides ?? []), ...(extensionConfig.provides ?? [])]),
    metadata: {
      ...baseKit.metadata,
      ...(extensionConfig.metadata ?? {}),
      extends: baseKit.id,
    },
  });
};

export const createHorrorDomainManifest = (kits: readonly HorrorDomainKit[]) => {
  const manifest = createHorrorRuntimeManifest(kits);
  const provided = new Set(manifest.providedTokens);
  const missing = kits.flatMap((kit) =>
    kit.requires
      .filter((token) => !provided.has(token))
      .map((token) => `${kit.id} requires ${token}`),
  );

  if (missing.length > 0) {
    throw new Error(`Missing horror domain dependencies: ${missing.join("; ")}`);
  }

  return Object.freeze({
    ...manifest,
    kits,
    domains: Object.freeze(kits.map((kit) => kit.metadata.domain)),
  });
};
