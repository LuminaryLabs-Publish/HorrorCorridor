export type HorrorContentPack = Readonly<{
  id: string;
  version: string;
  dependsOn?: readonly string[];
  config: Record<string, unknown>;
}>;

const SLUG_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

const assertSlug = (value: string, fieldName: string): void => {
  if (!SLUG_PATTERN.test(value)) {
    throw new Error(`Invalid ${fieldName}: ${value}`);
  }
};

export const defineHorrorContentPack = (pack: HorrorContentPack): HorrorContentPack => {
  assertSlug(pack.id, "content pack id");
  if (pack.version.trim().length === 0) {
    throw new Error(`Content pack ${pack.id} must provide a version.`);
  }

  return Object.freeze({
    id: pack.id,
    version: pack.version,
    dependsOn: Object.freeze([...(pack.dependsOn ?? [])]),
    config: Object.freeze({ ...pack.config }),
  });
};

export const createHorrorContentPackManifest = (packs: readonly HorrorContentPack[]) => {
  const seen = new Set<string>();
  for (const pack of packs) {
    if (seen.has(pack.id)) {
      throw new Error(`Duplicate content pack id: ${pack.id}`);
    }
    seen.add(pack.id);
  }

  const missing = packs.flatMap((pack) =>
    (pack.dependsOn ?? [])
      .filter((dependency) => !seen.has(dependency))
      .map((dependency) => `${pack.id} depends on ${dependency}`),
  );

  if (missing.length > 0) {
    throw new Error(`Missing content pack dependencies: ${missing.join("; ")}`);
  }

  return Object.freeze({
    packs: Object.freeze([...packs]),
    packIds: Object.freeze(packs.map((pack) => pack.id)),
    config: Object.freeze(
      packs.reduce<Record<string, Record<string, unknown>>>((accumulator, pack) => {
        accumulator[pack.id] = pack.config;
        return accumulator;
      }, {}),
    ),
  });
};
