import type { Vec3 } from "../../contracts";
import type { PlaceInstance } from "../corridor/places";
import { conditionsMatch, type RoomDefinition, type RoomInstanceState, type RoomSnapshot } from "./contracts";

/** Room owns puzzle instances. Recipes supply rules; providers never choose outcomes. */
export function createRoomDomain(definitions: readonly RoomDefinition[]) {
  if (!definitions.length) throw new Error("Room kits must be nonempty.");
  const registered = new Map<string, RoomDefinition>();
  for (const room of definitions) {
    const previous = registered.get(room.id);
    if (previous && JSON.stringify(previous) !== JSON.stringify(room)) throw new Error(`Conflicting Room kit: ${room.id}`);
    registered.set(room.id, room);
  }
  const catalog = [...registered.values()];
  let current: PlaceInstance | null = null;
  let states: Record<string, RoomInstanceState> = {};
  let revision = 0;
  const definition = (index = current?.index ?? 0) => catalog[index % catalog.length];
  const key = (index = current?.index ?? 0) => String(index);
  const fresh = (room: RoomDefinition): RoomInstanceState => ({ values: { ...room.initial }, phase: "locked", openingMs: 0, interactions: 0 });
  const state = () => states[key()] ?? fresh(definition());
  const visible = () => definition().objects.filter(object => conditionsMatch(state().values, object.visibleWhen ?? []));
  const positionOf = (object: RoomDefinition["objects"][number]): Vec3 => ({ x: object.x, y: object.y, z: (current?.entryZ ?? 4) - object.depth });
  const target = (position: Vec3, yaw: number, pitch: number) => {
    let selected: string | null = null, nearest = 2.8, alignment = 0.96;
    const direction = { x: -Math.sin(yaw) * Math.cos(pitch), y: Math.sin(pitch), z: -Math.cos(yaw) * Math.cos(pitch) };
    for (const object of visible()) {
      const p = positionOf(object), x = p.x - position.x, y = p.y - position.y, z = p.z - position.z;
      const distance = Math.hypot(x, y, z);
      const score = (x * direction.x + y * direction.y + z * direction.z) / distance;
      if (distance <= 2.8 && distance > 0.001 && (score > alignment + 0.000001 || (Math.abs(score - alignment) < 0.000001 && distance < nearest))) {
        selected = object.id; nearest = distance; alignment = score;
      }
    }
    return selected;
  };
  const snapshot = (pose?: Readonly<{position: Vec3; yaw: number; pitch: number}>): RoomSnapshot | null => {
    if (!current) return null;
    const room = definition(), s = state();
    return { schema: "horror-corridor.room/1", index: current.index, kitId: room.id, title: room.title, family: room.family,
      difficulty: room.difficulty, entryZ: current.entryZ, exitZ: current.exitZ, phase: s.phase, openingMs: s.openingMs, revision,
      carried: s.values.hand ? (room.family === "fuse" ? "CERAMIC FUSE" : `${s.values.hand} KG`) : null,
      focus: pose ? target(pose.position, pose.yaw, pose.pitch) : null,
      objects: visible().map(object => {
        const { visibleWhen: _conditions, ...display } = object;
        void _conditions;
        return { ...display, value: s.values[object.stateKey ?? object.id] ?? 0, position: positionOf(object) };
      }),
      rooms: structuredClone(states) };
  };
  const apply = (objectId: string) => {
    const s = state();
    if (s.phase !== "locked" || !visible().some(object => object.id === objectId)) return false;
    const rule = definition().rules.find(candidate => candidate.object === objectId && conditionsMatch(s.values, candidate.when));
    if (!rule) return false;
    const values = { ...s.values };
    for (const effect of rule.effects) values[effect.key] = effect.add ? (values[effect.key] ?? 0) + effect.value : effect.value;
    const solved = conditionsMatch(values, definition().goal);
    states[key()] = { values, phase: solved ? "opening" : "locked", openingMs: 0, interactions: s.interactions + 1 };
    revision++;
    return true;
  };
  return Object.freeze({
    snapshot,
    definitions: () => [...registered.values()],
    observe(place: PlaceInstance) {
      if (current?.id !== place.id) { current = place; states[key()] ??= fresh(definition()); revision++; }
    },
    target,
    interact(position: Vec3, yaw: number, pitch: number) {
      const objectId = target(position, yaw, pitch);
      return objectId ? apply(objectId) : false;
    },
    step(deltaMs: number) {
      const s = state();
      if (!current || s.phase !== "opening") return null;
      const openingMs = Math.min(1000, s.openingMs + Math.max(0, Math.min(100, deltaMs)));
      const opened = openingMs >= 1000;
      states[key()] = { ...s, openingMs, phase: opened ? "open" : "opening" };
      return opened ? { type: "room-opened" as const, roomId: definition().id, index: current.index } : null;
    },
    resolve(position: Vec3, previous: Vec3): Vec3 {
      if (!current) return previous;
      if (state().phase !== "open" && position.z < current.exitZ + 0.5) return { ...position, z: Math.max(previous.z, current.exitZ + 0.5) };
      for (const object of visible()) {
        const p = positionOf(object);
        if (Math.abs(position.x - p.x) < 0.5 && Math.abs(position.z - p.z) < 0.5) return previous;
      }
      return position;
    },
    reset() { states = {}; current = null; revision = 0; },
    load(next: RoomSnapshot, place: PlaceInstance) {
      if (next.schema !== "horror-corridor.room/1" || next.index !== place.index || next.kitId !== definition(place.index).id || !Number.isSafeInteger(next.revision) || next.revision < 0) throw new Error("Invalid Room snapshot identity.");
      const validated: Record<string, RoomInstanceState> = {};
      for (const [index, s] of Object.entries(next.rooms)) {
        if (!/^\d+$/.test(index) || !Number.isSafeInteger(Number(index))) throw new Error("Invalid Room instance index.");
        const room = definition(Number(index));
        if (!s || !s.values || Object.keys(s.values).sort().join() !== Object.keys(room.initial).sort().join() || Object.values(s.values).some(value => !Number.isFinite(value) || !Number.isInteger(value) || value < 0 || value > 1000) || !["locked", "opening", "open"].includes(s.phase) || !Number.isFinite(s.openingMs) || s.openingMs < 0 || s.openingMs > 1000 || !Number.isSafeInteger(s.interactions) || s.interactions < 0) throw new Error("Invalid Room state.");
        if (s.phase !== "locked" && !conditionsMatch(s.values, room.goal)) throw new Error("Room gate has no solved puzzle.");
        if (s.phase === "open" && s.openingMs !== 1000) throw new Error("Room gate animation is incomplete.");
        validated[index] = structuredClone(s);
      }
      if (!validated[String(place.index)]) throw new Error("Missing active Room state.");
      states = validated; current = place; revision = next.revision;
    },
  });
}

export type RoomDomain = ReturnType<typeof createRoomDomain>;
