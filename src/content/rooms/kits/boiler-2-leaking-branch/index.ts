import { createRoomKit } from "../../recipe";
import { boilerPuzzle } from "../../families/boiler";

export const roomKit = createRoomKit({
  id: "boiler-2-leaking-branch", title: "Leaking Branch", ...boilerPuzzle(2),
});
