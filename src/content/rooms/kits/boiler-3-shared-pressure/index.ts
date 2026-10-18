import { createRoomKit } from "../../recipe";
import { boilerPuzzle } from "../../families/boiler";

export const roomKit = createRoomKit({
  id: "boiler-3-shared-pressure", title: "Shared Pressure", ...boilerPuzzle(3),
});
