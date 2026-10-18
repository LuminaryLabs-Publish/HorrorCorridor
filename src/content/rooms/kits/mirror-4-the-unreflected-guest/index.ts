import { createRoomKit } from "../../recipe";
import { mirrorPuzzle } from "../../families/mirror";

export const roomKit = createRoomKit({
  id: "mirror-4-the-unreflected-guest", title: "The Unreflected Guest", ...mirrorPuzzle(4),
});
