import { defineRuntimeKit } from "nexusengine";
import { ROOM_DOMAIN_PATH, type RoomCondition, type RoomDefinition, type RoomEffect, type RoomFamily, type RoomObject, type RoomRule } from "../../game/domains/room/contracts";

export const equal = (key: string, value: number): RoomCondition => ({ key, value });
export const set = (key: string, value: number): RoomEffect => ({ key, value });

/** Authored object/rule assembly; mutable progress belongs only to Room. */
export function recipe(family: RoomFamily, difficulty: number) {
  const initial: Record<string, number> = {};
  const objects: RoomObject[] = [];
  const rules: RoomRule[] = [];
  const solution: string[] = [];
  const goal: RoomCondition[] = [];
  return {
    initial, objects, rules, solution, goal,
    object(id: string, label: string, shape: RoomObject["shape"], options: Partial<RoomObject> = {}) {
      const index = objects.length;
      const object: RoomObject = { id, label, shape, x: index % 2 ? 1.25 : -1.25, depth: 4 + Math.floor(index / 2) * 2.7,
        y: 1.2, color: 0xbfa97b, stateKey: id, maximum: 1, ...options };
      initial[object.stateKey ?? id] ??= 0;
      objects.push(object);
      return id;
    },
    action(object: string, when: readonly RoomCondition[], effects: readonly RoomEffect[]) { rules.push({ object, when, effects }); },
    dial(id: string, label: string, shape: RoomObject["shape"], target: number, maximum = 3, when: readonly RoomCondition[] = [], options: Partial<RoomObject> = {}) {
      this.object(id, label, shape, { maximum, targetMark: target, ...options });
      for (let value = 0; value <= maximum; value++) this.action(id, [...when, equal(id, value)], [set(id, (value + 1) % (maximum + 1))]);
      for (let turn = 0; turn < target; turn++) solution.push(id);
      goal.push(equal(id, target));
    },
    latch(id: string, label: string, shape: RoomObject["shape"], when: readonly RoomCondition[], options: Partial<RoomObject> = {}) {
      this.object(id, label, shape, options);
      this.action(id, [equal(id, 0), ...when], [set(id, 1)]);
      solution.push(id);
      goal.push(equal(id, 1));
    },
    finish(): Omit<RoomDefinition, "id" | "title"> {
      return { family, difficulty: difficulty as RoomDefinition["difficulty"], initial, objects, rules, solution, goal };
    },
  };
}

export function createRoomKit(definition: RoomDefinition) {
  const copy = structuredClone(definition);
  if (!/^[a-z0-9-]+$/.test(copy.id) || !copy.title || !Number.isInteger(copy.difficulty) || copy.difficulty < 1 || copy.difficulty > 5 || !copy.objects.length || !copy.goal.length || !copy.solution.length) throw new Error(`Incomplete room kit: ${copy.id}`);
  const ids = new Set(copy.objects.map(object => object.id));
  if (ids.size !== copy.objects.length || copy.rules.some(rule => !ids.has(rule.object)) || copy.solution.some(id => !ids.has(id))) throw new Error(`Invalid room object graph: ${copy.id}`);
  const conditions = [...copy.goal, ...copy.rules.flatMap(rule => rule.when), ...copy.objects.flatMap(object => object.visibleWhen ?? [])];
  if (conditions.some(condition => !(condition.key in copy.initial)) || copy.rules.flatMap(rule => rule.effects).some(effect => !(effect.key in copy.initial))) throw new Error(`Undeclared room state: ${copy.id}`);
  const freeze = (value: unknown): void => {
    if (value && typeof value === "object") { Object.values(value).forEach(freeze); Object.freeze(value); }
  };
  freeze(copy);
  return Object.freeze({
    definition: copy,
    createRuntimeKit: () => defineRuntimeKit({ id: `horror-room-${copy.id}-kit`, requires: [ROOM_DOMAIN_PATH], provides: [`horror-room:${copy.id}`],
      bindings: { roomDefinition: copy }, metadata: { owner: ROOM_DOMAIN_PATH, kind: "object-assembly-kit", version: "1.0.0" } }),
  });
}
