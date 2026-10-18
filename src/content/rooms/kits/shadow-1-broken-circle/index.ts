import { createRoomKit } from "../../recipe";
import { shadowPuzzle } from "../../families/shadow";

export const roomKit = createRoomKit({
  id: "shadow-1-broken-circle", title: "Broken Circle", ...shadowPuzzle(1),
});
