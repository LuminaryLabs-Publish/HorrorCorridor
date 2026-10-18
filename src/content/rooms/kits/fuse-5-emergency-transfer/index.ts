import { createRoomKit } from "../../recipe";
import { fusePuzzle } from "../../families/fuse";

export const roomKit = createRoomKit({
  id: "fuse-5-emergency-transfer", title: "Emergency Transfer", ...fusePuzzle(5),
});
