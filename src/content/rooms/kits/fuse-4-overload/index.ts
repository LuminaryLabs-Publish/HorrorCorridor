import { createRoomKit } from "../../recipe";
import { fusePuzzle } from "../../families/fuse";

export const roomKit = createRoomKit({
  id: "fuse-4-overload", title: "Overload", ...fusePuzzle(4),
});
