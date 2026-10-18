import { createRoomKit } from "../../recipe";
import { rootsPuzzle } from "../../families/roots";

export const roomKit = createRoomKit({
  id: "roots-3-divided-growth", title: "Divided Growth", ...rootsPuzzle(3),
});
