import { createRoomKit } from "../../recipe";
import { portraitsPuzzle } from "../../families/portraits";

export const roomKit = createRoomKit({
  id: "portraits-5-rewritten-history", title: "Rewritten History", ...portraitsPuzzle(5),
});
