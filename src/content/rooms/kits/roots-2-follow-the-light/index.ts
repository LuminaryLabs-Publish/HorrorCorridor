import { createRoomKit } from "../../recipe";
import { rootsPuzzle } from "../../families/roots";

export const roomKit = createRoomKit({
  id: "roots-2-follow-the-light", title: "Follow the Light", ...rootsPuzzle(2),
});
