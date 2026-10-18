import { createRoomKit } from "../../recipe";
import { balancePuzzle } from "../../families/balance";

export const roomKit = createRoomKit({
  id: "balance-4-draining-weight", title: "Draining Weight", ...balancePuzzle(4),
});
