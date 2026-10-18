import { equal as eq, recipe } from "../recipe";
export function mortuaryPuzzle(level: number) {
  const r = recipe("mortuary", level);
  r.latch("keepsake", "SILVER LOCKET", "box", [], { markings: "E. VALE", color: 0x9aafb6 });
  r.dial("tray", "IDENTIFICATION TRAY", "drawer", 2, 3, [eq("keepsake", 1)], { markings: "I MOSS / II VALE / III REED", targetMark: 2 });
  if (level >= 2) r.dial("tag", "SWAPPED TAG", "portrait", 1, 3, [eq("tray", 2)], { markings: "VALE: ADMITTED FIRST", targetMark: 1 });
  if (level >= 3) r.dial("record", "ADMISSION REGISTER", "portrait", 3, 3, [eq("tag", 1)], { markings: "VALE · PATCH III", targetMark: 3 });
  if (level >= 4) r.latch("breathing", "DRAWER WITH WARM HANDLE", "drawer", [eq("record", 3)], { markings: "WARM / FOGGED GLASS", color: 0x9c8675 });
  if (level === 5) r.latch("departure", "UNCLAIMED EFFECTS", "box", [eq("breathing", 1), eq("tray", 2), eq("record", 3)], { markings: "E. VALE · DEPARTURE" });
  return r.finish();
}
