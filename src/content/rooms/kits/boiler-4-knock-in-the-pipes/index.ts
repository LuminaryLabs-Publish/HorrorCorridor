import { createRoomKit } from "../../recipe";
import { boilerPuzzle } from "../../families/boiler";

export const roomKit = createRoomKit({
  id: "boiler-4-knock-in-the-pipes", title: "Knock in the Pipes", ...boilerPuzzle(4),
});
