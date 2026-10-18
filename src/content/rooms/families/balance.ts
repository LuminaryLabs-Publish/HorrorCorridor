import { equal as eq, recipe, set } from "../recipe";
export function balancePuzzle(level: number) {
  const r = recipe("balance", level);
  r.initial.hand = 0; r.initial.pan = 0;
  if (level >= 4) r.latch("seal", "LEAKING WEIGHT · SEAL", "box", [], { markings: "OPEN SEAM", color: 0x709a93 });
  const weights = level === 1 ? [3] : level === 2 ? [1, 2, 4] : [1, 2, 3, 4];
  for (const [index, weight] of weights.entries()) {
    const id = `weight-${index}`;
    r.object(id, level >= 3 ? `SEALED CANISTER ${index + 1}` : `${weight} KG`, "weight", { markings: level >= 3 ? `STAMP ${index + 1}` : `${weight}`, maximum: 1, visibleWhen: [eq(id, 0)] });
    r.action(id, [eq(id, 0), eq("hand", 0), ...(level >= 4 ? [eq("seal", 1)] : [])], [set(id, 1), set("hand", weight)]);
  }
  r.object("pan", "WEIGHING PLATFORM", "weight", { stateKey: "pan", maximum: 12, markings: level === 1 ? "3 KG" : "5 KG", color: 0x8caa9d });
  for (const weight of weights) r.action("pan", [eq("hand", weight)], [{ key: "pan", value: weight, add: true }, set("hand", 0)]);
  r.object("return", "COUNTERWEIGHT RELEASE", "valve", { markings: "↶" });
  r.action("return", [], [set("pan", 0), set("hand", 0), ...weights.map((_, i) => set(`weight-${i}`, 0))]);
  r.goal.push(eq("pan", level === 1 ? 3 : 5));
  r.solution.push(...(level === 1 ? ["weight-0", "pan"] : ["weight-1", "pan", "weight-2", "pan"]));
  if (level === 2) r.solution.splice(r.solution.length - 4, 4, "weight-0", "pan", "weight-2", "pan");
  if (level >= 3) r.object("scale", "BENCH SCALE", "box", { markings: "I=1 / II=2 / III=3 / IV=4", color: 0x727e76 });
  if (level === 5) {
    r.latch("lock-a", "FIRST PLATFORM BRAKE", "valve", [eq("pan", 5)]);
    r.solution.push("return", "weight-0", "pan", "weight-2", "pan");
    r.latch("lock-b", "SECOND PLATFORM BRAKE", "valve", [eq("lock-a", 1), eq("pan", 4)]);
    r.goal.splice(r.goal.findIndex(c => c.key === "pan"), 1);
  }
  return r.finish();
}
