import { equal as eq, recipe } from "../recipe";
export function mirrorPuzzle(level: number) {
  const r = recipe("mirror", level);
  r.dial("mirror-a", "PIVOTING MIRROR", "mirror", 1, 3, [], { markings: "REFLECTED LATCH", targetMark: 1 });
  r.latch("latch", "HIDDEN LATCH", "box", [eq("mirror-a", 1)], { visibleWhen: [eq("mirror-a", 1)], x: 2.2, depth: 5.5, markings: "RECESSED" });
  if (level >= 2) r.dial("mirror-b", "CORNER MIRROR", "mirror", 2, 3, [eq("latch", 1)], { markings: "◇", targetMark: 2 });
  if (level >= 3) r.dial("diagram", "REFLECTED DIAGRAM", "dial", 3, 3, [eq("mirror-b", 2)], { markings: "I · II · III", targetMark: 3 });
  if (level >= 4) r.latch("guest", "UNREFLECTED FIGURE", "portrait", [eq("diagram", 3)], { markings: "EMPTY REFLECTION", color: 0x625a62 });
  if (level === 5) r.dial("arrangement", "REVERSED DISPLAY", "portrait", 2, 3, [eq("guest", 1)], { markings: "REFLECTION: II", targetMark: 2 });
  return r.finish();
}
