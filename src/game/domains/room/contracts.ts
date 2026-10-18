import type { Vec3 } from "../../contracts";

export const ROOM_DOMAIN_PATH = "n:horror-corridor-v2:room";
export type RoomFamily = "fuse" | "shadow" | "boiler" | "balance" | "portraits" | "listening" | "clock" | "mirror" | "mortuary" | "roots";
export type RoomCondition = Readonly<{ key: string; value: number; not?: boolean }>;
export type RoomEffect = Readonly<{ key: string; value: number; add?: boolean }>;
export type RoomObject = Readonly<{
  id: string; label: string; shape: "box" | "fuse" | "dial" | "valve" | "weight" | "portrait" | "bell" | "clock" | "mirror" | "drawer" | "plant";
  x: number; depth: number; y: number; color: number;
  stateKey?: string; maximum?: number; visibleWhen?: readonly RoomCondition[];
  markings?: string; targetMark?: number; soundHz?: number;
}>;
export type RoomRule = Readonly<{ object: string; when: readonly RoomCondition[]; effects: readonly RoomEffect[] }>;
export type RoomDefinition = Readonly<{
  id: string; title: string; family: RoomFamily; difficulty: 1 | 2 | 3 | 4 | 5;
  initial: Readonly<Record<string, number>>; objects: readonly RoomObject[];
  rules: readonly RoomRule[]; goal: readonly RoomCondition[];
  /** Designer proof witness. Never included in the player snapshot. */
  solution: readonly string[];
}>;
export type RoomInstanceState = Readonly<{ values: Readonly<Record<string, number>>; phase: "locked" | "opening" | "open"; openingMs: number; interactions: number }>;
export type RoomSnapshot = Readonly<{
  schema: "horror-corridor.room/1"; index: number; kitId: string; title: string;
  family: RoomFamily; difficulty: number; entryZ: number; exitZ: number;
  phase: RoomInstanceState["phase"]; openingMs: number; revision: number;
  objects: readonly (RoomObject & { value: number; position: Vec3 })[];
  carried: string | null;
  focus: string | null;
  rooms: Readonly<Record<string, RoomInstanceState>>;
}>;

export function conditionsMatch(values: Readonly<Record<string, number>>, conditions: readonly RoomCondition[]): boolean {
  return conditions.every(condition => condition.not ? values[condition.key] !== condition.value : values[condition.key] === condition.value);
}
