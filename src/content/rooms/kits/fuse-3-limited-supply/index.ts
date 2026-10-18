import { createRoomKit } from "../../recipe";
import { fusePuzzle } from "../../families/fuse";

export const roomKit = createRoomKit({
  id: "fuse-3-limited-supply", title: "Limited Supply", ...fusePuzzle(3),
});
