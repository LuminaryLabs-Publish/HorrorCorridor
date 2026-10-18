import { createRoomKit } from "../../recipe";
import { mortuaryPuzzle } from "../../families/mortuary";

export const roomKit = createRoomKit({
  id: "mortuary-5-the-unclaimed", title: "The Unclaimed", ...mortuaryPuzzle(5),
});
