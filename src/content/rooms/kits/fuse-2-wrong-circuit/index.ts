import { createRoomKit } from "../../recipe";
import { fusePuzzle } from "../../families/fuse";

export const roomKit = createRoomKit({
  id: "fuse-2-wrong-circuit", title: "Wrong Circuit", ...fusePuzzle(2),
});
