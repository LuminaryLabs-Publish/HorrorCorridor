import { createRoomKit } from "../../recipe";
import { balancePuzzle } from "../../families/balance";

export const roomKit = createRoomKit({
  id: "balance-3-false-weight", title: "False Weight", ...balancePuzzle(3),
});
