import { createRoomKit } from "../../recipe";
import { clockPuzzle } from "../../families/clock";

export const roomKit = createRoomKit({
  id: "clock-1-missing-pendulum", title: "Missing Pendulum", ...clockPuzzle(1),
});
