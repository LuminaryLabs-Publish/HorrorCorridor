import { equal as eq, recipe } from "../recipe";
export function portraitsPuzzle(level: number) {
  const r = recipe("portraits", level);
  if (level === 1) {
    r.latch("portrait", "FALLEN PORTRAIT", "portrait", [], { markings: "OVAL DUST OUTLINE", targetMark: 1 });
  } else {
    const records = level === 2 ? ["MOTHER · 1901", "CHILD · 1924"] : ["BEFORE · 1901", "FIRE · 1918", "AFTER · 1924"];
    records.forEach((label, i) => r.dial(`frame-${i}`, label, "portrait", i + 1, 3, [], { markings: label, targetMark: i + 1 }));
    if (level >= 4) r.latch("impostor", "UNCLAIMED FRAME", "portrait", [eq("frame-0", 1), eq("frame-1", 2)], { markings: "1950 / REGISTRY ENDS 1924", color: 0x95685f });
    if (level === 5) r.latch("underpainting", "LOOSE BACKING", "box", [eq("frame-2", 3), eq("impostor", 1)], { markings: "ORIGINAL SIGNATURE", visibleWhen: [eq("frame-2", 3)] });
  }
  return r.finish();
}
