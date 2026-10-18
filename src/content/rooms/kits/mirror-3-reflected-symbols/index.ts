import { createRoomKit } from "../../recipe";
import { mirrorPuzzle } from "../../families/mirror";

export const roomKit = createRoomKit({
  id: "mirror-3-reflected-symbols", title: "Reflected Symbols", ...mirrorPuzzle(3),
});
