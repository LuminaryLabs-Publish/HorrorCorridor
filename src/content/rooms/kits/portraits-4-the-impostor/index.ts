import { createRoomKit } from "../../recipe";
import { portraitsPuzzle } from "../../families/portraits";

export const roomKit = createRoomKit({
  id: "portraits-4-the-impostor", title: "The Impostor", ...portraitsPuzzle(4),
});
