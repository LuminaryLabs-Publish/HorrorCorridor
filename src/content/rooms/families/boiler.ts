import { equal as eq, recipe, set } from "../recipe";
export function boilerPuzzle(level: number) {
  const r = recipe("boiler", level);
  if (level >= 2) r.dial("leak", "RELIEF BRANCH", "valve", 1, 1, [], { markings: "STEAM LEAK", color: 0xab6958 });
  if (level === 5) r.latch("water", "WATER INLET", "valve", [], { markings: "COLD" });
  r.dial("supply", "MAIN SUPPLY", "valve", 1, 1, level === 5 ? [eq("water", 1)] : [], { markings: "TANK → MAIN" });
  if (level >= 3) {
    r.latch("reservoir", "ACCUMULATOR", "box", [eq("supply", 1), eq("leak", 1)], { markings: "STORED PRESSURE", color: 0x7f9c99 });
    // The reservoir must be charged and isolated, not merely opened.
    r.goal.splice(r.goal.findIndex(c => c.key === "supply"), 1);
    r.solution.push("supply"); r.goal.push(eq("supply", 0));
    r.latch("piston", "DOOR PISTON", "valve", [eq("reservoir", 1), eq("supply", 0)], { markings: "ISOLATED FEED" });
  }
  if (level >= 4) {
    r.object("bypass", "RATTLING BYPASS", "valve", { markings: "RETURN LINE", color: 0x6f8f75 });
    r.action("bypass", [eq("bypass", 0), eq("reservoir", 1)], [set("bypass", 1)]);
    r.goal.push(eq("bypass", 1)); r.solution.push("bypass");
  }
  return r.finish();
}
