import { createRoomKit } from "../../recipe";
import { listeningPuzzle } from "../../families/listening";

export const roomKit = createRoomKit({
  id: "listening-5-acoustic-passage", title: "Acoustic Passage", ...listeningPuzzle(5),
});
