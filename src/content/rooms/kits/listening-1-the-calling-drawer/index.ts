import { createRoomKit } from "../../recipe";
import { listeningPuzzle } from "../../families/listening";

export const roomKit = createRoomKit({
  id: "listening-1-the-calling-drawer", title: "The Calling Drawer", ...listeningPuzzle(1),
});
