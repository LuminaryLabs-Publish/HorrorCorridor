import { createRoomKit } from "../../recipe";
import { clockPuzzle } from "../../families/clock";

export const roomKit = createRoomKit({
  id: "clock-3-different-speeds", title: "Different Speeds", ...clockPuzzle(3),
});
