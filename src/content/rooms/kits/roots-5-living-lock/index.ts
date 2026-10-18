import { createRoomKit } from "../../recipe";
import { rootsPuzzle } from "../../families/roots";

export const roomKit = createRoomKit({
  id: "roots-5-living-lock", title: "Living Lock", ...rootsPuzzle(5),
});
