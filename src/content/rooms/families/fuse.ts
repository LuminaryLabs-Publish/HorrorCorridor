import { equal as eq, recipe, set } from "../recipe";

export function fusePuzzle(level: number) {
  const r = recipe("fuse", level);
  r.initial.hand = 0;
  r.object("fuse", "CERAMIC FUSE", "fuse", { visibleWhen: [eq("fuse", 0)], color: 0xc7dfbd });
  r.action("fuse", [eq("fuse", 0), eq("hand", 0)], [set("fuse", 1), set("hand", 1)]);
  r.solution.push("fuse");
  if (level >= 4) {
    r.dial("heater", "HEATER · 8A", "valve", 1, 1, [], { markings: "TOTAL 12A / HEATER 8A / LIFT 8A" });
  }
  if (level === 5) r.latch("auxiliary", "AUXILIARY BATTERY", "box", [], { markings: "RESERVE", color: 0x8a9e75 });
  if (level >= 2) {
    r.object("cabinet", level >= 3 ? "CABINET CIRCUIT" : "VENTILATION CIRCUIT", "box", { markings: level >= 3 ? "SPARES" : "FAN", color: 0x708879 });
    r.action("cabinet", [eq("hand", 1), eq("cabinet", 0)], [set("hand", 0), set("cabinet", 1)]);
    r.action("cabinet", [eq("hand", 0), eq("cabinet", 1)], [set("hand", 1), set("cabinet", 0)]);
  }
  if (level >= 3) {
    r.object("spare", "SPARE FUSE", "fuse", { visibleWhen: [eq("cabinet", 1), eq("spare", 0)] });
    r.action("spare", [eq("cabinet", 1), eq("spare", 0), eq("hand", 0)], [set("spare", 1), set("hand", 1)]);
    r.solution.push("cabinet", "spare");
  }
  r.object("socket", "EXIT CIRCUIT", "box", { markings: "LIFT", color: 0x9b8268 });
  r.action("socket", [eq("hand", 1), eq("socket", 0), ...(level >= 4 ? [eq("heater", 1)] : []), ...(level === 5 ? [eq("auxiliary", 1)] : [])], [set("socket", 1), set("hand", 0)]);
  r.goal.push(eq("socket", 1)); r.solution.push("socket");
  if (level === 5) r.latch("lift", "LIFT CONTACTOR", "valve", [eq("socket", 1), eq("auxiliary", 1)], { color: 0x8dad8c });
  return r.finish();
}
