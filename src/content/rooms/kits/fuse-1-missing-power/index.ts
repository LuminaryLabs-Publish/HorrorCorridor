import { createRoomKit } from "../../recipe";
import { fusePuzzle } from "../../families/fuse";

export const roomKit = createRoomKit({
  id: "fuse-1-missing-power", title: "Missing Power", ...fusePuzzle(1),
});
