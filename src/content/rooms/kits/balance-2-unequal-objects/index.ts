import { createRoomKit } from "../../recipe";
import { balancePuzzle } from "../../families/balance";

export const roomKit = createRoomKit({
  id: "balance-2-unequal-objects", title: "Unequal Objects", ...balancePuzzle(2),
});
