import { createRoomKit } from "../../recipe";
import { mortuaryPuzzle } from "../../families/mortuary";

export const roomKit = createRoomKit({
  id: "mortuary-1-unfinished-preparation", title: "Unfinished Preparation", ...mortuaryPuzzle(1),
});
