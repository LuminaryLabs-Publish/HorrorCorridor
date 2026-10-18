import { createRoomKit } from "../../recipe";
import { clockPuzzle } from "../../families/clock";

export const roomKit = createRoomKit({
  id: "clock-4-the-striking-hour", title: "The Striking Hour", ...clockPuzzle(4),
});
