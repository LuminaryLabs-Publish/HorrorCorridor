import { createRoomKit } from "../../recipe";
import { balancePuzzle } from "../../families/balance";

export const roomKit = createRoomKit({
  id: "balance-5-three-platforms", title: "Three Platforms", ...balancePuzzle(5),
});
