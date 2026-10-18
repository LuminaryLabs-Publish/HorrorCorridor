import { createRoomKit } from "../../recipe";
import { clockPuzzle } from "../../families/clock";

export const roomKit = createRoomKit({
  id: "clock-5-the-stopped-minute", title: "The Stopped Minute", ...clockPuzzle(5),
});
