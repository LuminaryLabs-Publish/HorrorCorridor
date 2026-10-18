import { createRoomKit } from "../../recipe";
import { mirrorPuzzle } from "../../families/mirror";

export const roomKit = createRoomKit({
  id: "mirror-5-two-versions", title: "Two Versions", ...mirrorPuzzle(5),
});
