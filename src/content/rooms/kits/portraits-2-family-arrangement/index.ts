import { createRoomKit } from "../../recipe";
import { portraitsPuzzle } from "../../families/portraits";

export const roomKit = createRoomKit({
  id: "portraits-2-family-arrangement", title: "Family Arrangement", ...portraitsPuzzle(2),
});
