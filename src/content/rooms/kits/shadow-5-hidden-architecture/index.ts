import { createRoomKit } from "../../recipe";
import { shadowPuzzle } from "../../families/shadow";

export const roomKit = createRoomKit({
  id: "shadow-5-hidden-architecture", title: "Hidden Architecture", ...shadowPuzzle(5),
});
