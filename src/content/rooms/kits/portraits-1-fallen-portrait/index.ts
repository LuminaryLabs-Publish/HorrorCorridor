import { createRoomKit } from "../../recipe";
import { portraitsPuzzle } from "../../families/portraits";

export const roomKit = createRoomKit({
  id: "portraits-1-fallen-portrait", title: "Fallen Portrait", ...portraitsPuzzle(1),
});
