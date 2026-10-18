import { createRoomKit } from "../../recipe";
import { mortuaryPuzzle } from "../../families/mortuary";

export const roomKit = createRoomKit({
  id: "mortuary-4-the-breathing-drawer", title: "The Breathing Drawer", ...mortuaryPuzzle(4),
});
