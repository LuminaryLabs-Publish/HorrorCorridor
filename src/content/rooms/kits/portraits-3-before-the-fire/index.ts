import { createRoomKit } from "../../recipe";
import { portraitsPuzzle } from "../../families/portraits";

export const roomKit = createRoomKit({
  id: "portraits-3-before-the-fire", title: "Before the Fire", ...portraitsPuzzle(3),
});
