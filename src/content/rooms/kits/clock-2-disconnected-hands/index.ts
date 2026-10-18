import { createRoomKit } from "../../recipe";
import { clockPuzzle } from "../../families/clock";

export const roomKit = createRoomKit({
  id: "clock-2-disconnected-hands", title: "Disconnected Hands", ...clockPuzzle(2),
});
