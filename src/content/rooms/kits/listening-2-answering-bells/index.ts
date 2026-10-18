import { createRoomKit } from "../../recipe";
import { listeningPuzzle } from "../../families/listening";

export const roomKit = createRoomKit({
  id: "listening-2-answering-bells", title: "Answering Bells", ...listeningPuzzle(2),
});
