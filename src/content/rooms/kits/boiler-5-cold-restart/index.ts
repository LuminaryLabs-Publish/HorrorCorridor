import { createRoomKit } from "../../recipe";
import { boilerPuzzle } from "../../families/boiler";

export const roomKit = createRoomKit({
  id: "boiler-5-cold-restart", title: "Cold Restart", ...boilerPuzzle(5),
});
