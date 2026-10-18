import { createRoomKit } from "../../recipe";
import { listeningPuzzle } from "../../families/listening";

export const roomKit = createRoomKit({
  id: "listening-3-the-interrupted-phrase", title: "The Interrupted Phrase", ...listeningPuzzle(3),
});
