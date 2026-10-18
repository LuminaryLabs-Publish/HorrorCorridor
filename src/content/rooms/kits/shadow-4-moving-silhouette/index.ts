import { createRoomKit } from "../../recipe";
import { shadowPuzzle } from "../../families/shadow";

export const roomKit = createRoomKit({
  id: "shadow-4-moving-silhouette", title: "Moving Silhouette", ...shadowPuzzle(4),
});
