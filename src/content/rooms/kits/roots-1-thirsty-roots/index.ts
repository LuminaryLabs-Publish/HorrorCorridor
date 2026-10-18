import { createRoomKit } from "../../recipe";
import { rootsPuzzle } from "../../families/roots";

export const roomKit = createRoomKit({
  id: "roots-1-thirsty-roots", title: "Thirsty Roots", ...rootsPuzzle(1),
});
