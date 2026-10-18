import { createRoomKit } from "../../recipe";
import { mortuaryPuzzle } from "../../families/mortuary";

export const roomKit = createRoomKit({
  id: "mortuary-2-swapped-tags", title: "Swapped Tags", ...mortuaryPuzzle(2),
});
