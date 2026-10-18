import { createRoomKit } from "../../recipe";
import { boilerPuzzle } from "../../families/boiler";

export const roomKit = createRoomKit({
  id: "boiler-1-shut-valve", title: "Shut Valve", ...boilerPuzzle(1),
});
