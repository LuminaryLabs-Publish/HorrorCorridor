import { createRoomKit } from "../../recipe";
import { mortuaryPuzzle } from "../../families/mortuary";

export const roomKit = createRoomKit({
  id: "mortuary-3-missing-identity", title: "Missing Identity", ...mortuaryPuzzle(3),
});
