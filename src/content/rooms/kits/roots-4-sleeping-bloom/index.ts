import { createRoomKit } from "../../recipe";
import { rootsPuzzle } from "../../families/roots";

export const roomKit = createRoomKit({
  id: "roots-4-sleeping-bloom", title: "Sleeping Bloom", ...rootsPuzzle(4),
});
