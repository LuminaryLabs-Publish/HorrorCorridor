import { equal as eq, recipe } from "../recipe";
export function shadowPuzzle(level: number) {
  const r = recipe("shadow", level);
  if (level >= 4) r.latch("brake", "PROJECTOR BRAKE", "valve", [], { markings: "BRAKE" });
  const brake = level >= 4 ? [eq("brake", 1)] : [];
  r.dial("silhouette", "BROKEN CIRCLE", "dial", 3, 3, brake, { markings: "◯", color: 0xa5977e });
  if (level >= 2) r.dial("second", "KEY SHADOW", "dial", 1, 3, brake, { markings: "◇" });
  if (level >= 3) r.dial("lamp", "PROJECTOR HEIGHT", "box", 2, 3, brake, { markings: "▱" });
  if (level === 5) r.latch("reveal", "RECESSED CONTACT", "box", [eq("silhouette", 3), eq("second", 1), eq("lamp", 2)], { visibleWhen: [eq("silhouette", 3), eq("second", 1), eq("lamp", 2)], color: 0xa8c6ae });
  return r.finish();
}
