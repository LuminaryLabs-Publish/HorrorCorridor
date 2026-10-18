import { createRoomKit } from "../../recipe";
import { balancePuzzle } from "../../families/balance";

export const roomKit = createRoomKit({
  id: "balance-1-empty-counterweight", title: "Empty Counterweight", ...balancePuzzle(1),
});
