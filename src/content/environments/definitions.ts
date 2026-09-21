/** Generated corridor geometry is authoritative; presentation consumes it. */
export type EnvironmentDefinition = Readonly<{
  id: string;
  version: 1;
  title: string;
  role: "investigation" | "threat";
  length: number;
  width: number;
  height: number;
  entrance: Readonly<{ width: number; floorY: 0 }>;
  exit: Readonly<{ width: number; floorY: 0 }>;
  presentation: Readonly<{ greybox: string; model: string | null }>;
  fixtures: readonly Readonly<{ id: string; x: number; z: number; width: number; depth: number; height: number }>[];
  clue: string;
}>;

export const BASE_CORRIDOR_ID = "base-corridor" as const;
export const DEFAULT_ROUTE_SEED = 0x48435632;
export const GENERATED_PROOF_DISTANCE_METERS = 256;

const LENGTHS = [24, 32, 40] as const;
const WIDTHS = [6.4, 7.2, 8.4] as const;
const CLUES = [
  "The corridor carries every sound forward. Keep your footsteps moving.",
  "A light waits somewhere ahead. Do not mistake silence for safety.",
  "The walls change before the route does. Listen for the seam.",
] as const;

function hash(routeSeed: number, index: number): number {
  let value = (routeSeed ^ Math.imul(index + 1, 0x9e3779b1)) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x21f0aaad) >>> 0;
  value ^= value >>> 15;
  return value >>> 0;
}

function fixture(id: string, x: number, z: number, width: number, depth: number, height: number) {
  return Object.freeze({ id, x, z, width, depth, height });
}

export function createCorridorDefinition(routeSeed: number, index: number): EnvironmentDefinition {
  const safeIndex = Math.max(0, Math.floor(index));
  const value = hash(routeSeed, safeIndex);
  const length = LENGTHS[value % LENGTHS.length];
  const width = WIDTHS[(value >>> 3) % WIDTHS.length];
  const height = 3.8 + ((value >>> 6) % 2) * 0.35;
  const side = (value & 1) === 0 ? -1 : 1;
  const outerX = width / 2 - 0.95;
  const fixtureDepth = 1.1 + ((value >>> 9) % 3) * 0.35;
  const fixtureWidth = 0.65 + ((value >>> 12) % 3) * 0.2;
  const fixtures = [
    fixture(`corridor-${safeIndex}-fixture-a`, side * outerX, length * 0.38, fixtureWidth, fixtureDepth, 1.2 + ((value >>> 15) % 3) * 0.35),
    ...((value & 0x10) !== 0
      ? [fixture(`corridor-${safeIndex}-fixture-b`, -side * outerX, length * 0.72, fixtureWidth, fixtureDepth + 0.25, 1.4 + ((value >>> 18) % 3) * 0.3)]
      : []),
  ];
  return Object.freeze({
    id: `${BASE_CORRIDOR_ID}-${safeIndex}`,
    version: 1,
    title: `Corridor ${String(safeIndex + 1).padStart(3, "0")}`,
    role: (value & 0x20) === 0 ? "investigation" : "threat",
    length,
    width,
    height,
    entrance: Object.freeze({ width: 3, floorY: 0 as const }),
    exit: Object.freeze({ width: 3, floorY: 0 as const }),
    presentation: Object.freeze({ greybox: `${BASE_CORRIDOR_ID}:greybox/1`, model: null }),
    fixtures: Object.freeze(fixtures),
    clue: CLUES[(value >>> 21) % CLUES.length],
  });
}

export function validateCorridorDefinition(definition: EnvironmentDefinition): void {
  if (definition.length <= 0 || definition.width < definition.entrance.width || definition.height < 2.4) {
    throw new Error(`Invalid generated corridor bounds: ${definition.id}`);
  }
  const ids = new Set<string>();
  for (const fixtureValue of definition.fixtures) {
    if (ids.has(fixtureValue.id)) throw new Error(`Duplicate generated fixture: ${fixtureValue.id}`);
    ids.add(fixtureValue.id);
    if (
      Math.abs(fixtureValue.x) + fixtureValue.width / 2 > definition.width / 2 ||
      fixtureValue.z - fixtureValue.depth / 2 < 0 ||
      fixtureValue.z + fixtureValue.depth / 2 > definition.length ||
      Math.abs(fixtureValue.x) - fixtureValue.width / 2 < 1.5
    ) throw new Error(`Generated fixture blocks or leaves corridor: ${fixtureValue.id}`);
  }
}

export function validateCorridorGrammar(routeSeed = DEFAULT_ROUTE_SEED): void {
  for (let index = 0; index < 96; index += 1) validateCorridorDefinition(createCorridorDefinition(routeSeed, index));
}
