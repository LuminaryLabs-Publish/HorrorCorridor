import { createRoomKit } from "../../recipe";
import { mirrorPuzzle } from "../../families/mirror";

export const roomKit = createRoomKit({
  id: "mirror-1-behind-you", title: "Behind You", ...mirrorPuzzle(1),
});
