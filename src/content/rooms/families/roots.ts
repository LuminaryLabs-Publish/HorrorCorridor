import { equal as eq, recipe } from "../recipe";
export function rootsPuzzle(level: number) {
  const r = recipe("roots", level);
  r.latch("water", "DRY ROOT BASIN", "plant", [], { markings: "CRACKED SOIL", color: 0x708958 });
  if (level >= 2) r.dial("lamp", "GROW LAMP", "dial", 2, 3, [eq("water", 1)], { markings: "LEAVES LEAN II", targetMark: 2, color: 0xbed38a });
  if (level >= 3) r.dial("channel", "IRRIGATION FORK", "valve", 1, 2, [eq("lamp", 2)], { markings: "BRIDGE ROOTS I", targetMark: 1 });
  if (level >= 4) r.latch("shade", "BLOOM SHUTTER", "plant", [eq("channel", 1)], { markings: "BLOOM IN LIGHT / ROOTS IN SHADE", color: 0x6e594f });
  if (level === 5) {
    r.latch("platform", "LIVING PLATFORM", "plant", [eq("shade", 1), eq("water", 1)], { color: 0x94b368 });
    r.latch("release", "ROOT-BOUND VALVE", "valve", [eq("platform", 1)], { visibleWhen: [eq("platform", 1)], markings: "EXIT FEED" });
  }
  return r.finish();
}
