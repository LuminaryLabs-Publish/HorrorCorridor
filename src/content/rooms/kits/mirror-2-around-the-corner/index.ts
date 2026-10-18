import { createRoomKit } from "../../recipe";
import { mirrorPuzzle } from "../../families/mirror";

export const roomKit = createRoomKit({
  id: "mirror-2-around-the-corner", title: "Around the Corner", ...mirrorPuzzle(2),
});
