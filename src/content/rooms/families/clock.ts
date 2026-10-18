import { equal as eq, recipe } from "../recipe";
export function clockPuzzle(level: number) {
  const r = recipe("clock", level);
  r.latch("pendulum", "DETACHED PENDULUM", "clock", [], { markings: "MATCHED HINGE" });
  if (level >= 2) r.dial("gear", "HAND DRIVE", "clock", 2, 3, [eq("pendulum", 1)], { markings: "12 / 24 / 48 / 96", targetMark: 2 });
  if (level >= 3) r.dial("governor", "SECONDARY DRIVE", "clock", 1, 3, [eq("gear", 2)], { markings: "24 / 48 / 96 / 12", targetMark: 1 });
  if (level >= 4) r.latch("striker", "STRIKER RELEASE", "bell", [eq("gear", 2), eq("governor", 1)], { markings: "MATCHED HANDS" });
  if (level === 5) {
    r.dial("winder", "ESCAPE SPRING", "clock", 3, 3, [eq("striker", 1)], { markings: "WIND", targetMark: 3 });
    r.latch("escapement", "ESCAPEMENT", "valve", [eq("winder", 3), eq("striker", 1)], { markings: "RELEASE" });
  }
  return r.finish();
}
