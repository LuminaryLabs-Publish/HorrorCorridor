import { createRoomKit } from "../../recipe";
import { shadowPuzzle } from "../../families/shadow";

export const roomKit = createRoomKit({
  id: "shadow-3-the-wrong-height", title: "The Wrong Height", ...shadowPuzzle(3),
});
