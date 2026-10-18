import { createRoomKit } from "../../recipe";
import { listeningPuzzle } from "../../families/listening";

export const roomKit = createRoomKit({
  id: "listening-4-borrowed-voices", title: "Borrowed Voices", ...listeningPuzzle(4),
});
