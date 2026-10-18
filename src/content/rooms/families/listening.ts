import { equal as eq, recipe, set } from "../recipe";
export function listeningPuzzle(level: number) {
  const r = recipe("listening", level);
  r.initial.phrase = 0;
  r.object("source", "MUSIC BOX", "bell", { soundHz: 330, markings: level >= 3 ? "I · III · II" : "I", maximum: 0 });
  const phrase = level === 1 ? [0] : level === 2 ? [0, 2] : [0, 2, 1];
  for (let bell = 0; bell < 3; bell++) {
    const id = `bell-${bell}`;
    r.object(id, level === 1 ? `DRAWER ${bell + 1}` : `CHIME ${bell + 1}`, level === 1 ? "drawer" : "bell", { soundHz: bell === 0 ? 330 : bell === 1 ? 440 : 550, markings: ["I", "II", "III"][bell], color: 0xa3936c });
    for (let step = 0; step < phrase.length; step++) r.action(id, [eq("phrase", step)], [set("phrase", phrase[step] === bell ? step + 1 : 0), set(id, 1)]);
  }
  if (level >= 4) {
    r.object("mimic", "SILENT FLOOR PLATE", "bell", { soundHz: 330, markings: "NO VIBRATION", color: 0x6e746a });
    r.action("mimic", [], [set("phrase", 0)]);
  }
  r.solution.push(...phrase.map(i => `bell-${i}`)); r.goal.push(eq("phrase", phrase.length));
  if (level === 5) {
    r.dial("partition-a", "RESONATOR SCREEN I", "mirror", 1, 3, [], { markings: "I ↔ III" });
    r.dial("partition-b", "RESONATOR SCREEN II", "mirror", 2, 3, [], { markings: "III ↔ II" });
    r.latch("receiver", "EXIT RECEIVER", "bell", [eq("phrase", phrase.length), eq("partition-a", 1), eq("partition-b", 2)], { soundHz: 660 });
  }
  return r.finish();
}
