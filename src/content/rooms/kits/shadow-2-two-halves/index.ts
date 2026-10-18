import { createRoomKit } from "../../recipe";
import { shadowPuzzle } from "../../families/shadow";

export const roomKit = createRoomKit({
  id: "shadow-2-two-halves", title: "Two Halves", ...shadowPuzzle(2),
});
