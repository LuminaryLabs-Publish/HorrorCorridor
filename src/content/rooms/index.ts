import { roomKit as fuse1Kit } from "./kits/fuse-1-missing-power";
import { roomKit as shadow1Kit } from "./kits/shadow-1-broken-circle";
import { roomKit as boiler1Kit } from "./kits/boiler-1-shut-valve";
import { roomKit as balance1Kit } from "./kits/balance-1-empty-counterweight";
import { roomKit as portraits1Kit } from "./kits/portraits-1-fallen-portrait";
import { roomKit as listening1Kit } from "./kits/listening-1-the-calling-drawer";
import { roomKit as clock1Kit } from "./kits/clock-1-missing-pendulum";
import { roomKit as mirror1Kit } from "./kits/mirror-1-behind-you";
import { roomKit as mortuary1Kit } from "./kits/mortuary-1-unfinished-preparation";
import { roomKit as roots1Kit } from "./kits/roots-1-thirsty-roots";
import { roomKit as fuse2Kit } from "./kits/fuse-2-wrong-circuit";
import { roomKit as shadow2Kit } from "./kits/shadow-2-two-halves";
import { roomKit as boiler2Kit } from "./kits/boiler-2-leaking-branch";
import { roomKit as balance2Kit } from "./kits/balance-2-unequal-objects";
import { roomKit as portraits2Kit } from "./kits/portraits-2-family-arrangement";
import { roomKit as listening2Kit } from "./kits/listening-2-answering-bells";
import { roomKit as clock2Kit } from "./kits/clock-2-disconnected-hands";
import { roomKit as mirror2Kit } from "./kits/mirror-2-around-the-corner";
import { roomKit as mortuary2Kit } from "./kits/mortuary-2-swapped-tags";
import { roomKit as roots2Kit } from "./kits/roots-2-follow-the-light";
import { roomKit as fuse3Kit } from "./kits/fuse-3-limited-supply";
import { roomKit as shadow3Kit } from "./kits/shadow-3-the-wrong-height";
import { roomKit as boiler3Kit } from "./kits/boiler-3-shared-pressure";
import { roomKit as balance3Kit } from "./kits/balance-3-false-weight";
import { roomKit as portraits3Kit } from "./kits/portraits-3-before-the-fire";
import { roomKit as listening3Kit } from "./kits/listening-3-the-interrupted-phrase";
import { roomKit as clock3Kit } from "./kits/clock-3-different-speeds";
import { roomKit as mirror3Kit } from "./kits/mirror-3-reflected-symbols";
import { roomKit as mortuary3Kit } from "./kits/mortuary-3-missing-identity";
import { roomKit as roots3Kit } from "./kits/roots-3-divided-growth";
import { roomKit as fuse4Kit } from "./kits/fuse-4-overload";
import { roomKit as shadow4Kit } from "./kits/shadow-4-moving-silhouette";
import { roomKit as boiler4Kit } from "./kits/boiler-4-knock-in-the-pipes";
import { roomKit as balance4Kit } from "./kits/balance-4-draining-weight";
import { roomKit as portraits4Kit } from "./kits/portraits-4-the-impostor";
import { roomKit as listening4Kit } from "./kits/listening-4-borrowed-voices";
import { roomKit as clock4Kit } from "./kits/clock-4-the-striking-hour";
import { roomKit as mirror4Kit } from "./kits/mirror-4-the-unreflected-guest";
import { roomKit as mortuary4Kit } from "./kits/mortuary-4-the-breathing-drawer";
import { roomKit as roots4Kit } from "./kits/roots-4-sleeping-bloom";
import { roomKit as fuse5Kit } from "./kits/fuse-5-emergency-transfer";
import { roomKit as shadow5Kit } from "./kits/shadow-5-hidden-architecture";
import { roomKit as boiler5Kit } from "./kits/boiler-5-cold-restart";
import { roomKit as balance5Kit } from "./kits/balance-5-three-platforms";
import { roomKit as portraits5Kit } from "./kits/portraits-5-rewritten-history";
import { roomKit as listening5Kit } from "./kits/listening-5-acoustic-passage";
import { roomKit as clock5Kit } from "./kits/clock-5-the-stopped-minute";
import { roomKit as mirror5Kit } from "./kits/mirror-5-two-versions";
import { roomKit as mortuary5Kit } from "./kits/mortuary-5-the-unclaimed";
import { roomKit as roots5Kit } from "./kits/roots-5-living-lock";

/** Difficulty-major route: learn all ten families before revisiting harder versions. */
export const ROOM_KITS = Object.freeze([
  fuse1Kit,
  shadow1Kit,
  boiler1Kit,
  balance1Kit,
  portraits1Kit,
  listening1Kit,
  clock1Kit,
  mirror1Kit,
  mortuary1Kit,
  roots1Kit,
  fuse2Kit,
  shadow2Kit,
  boiler2Kit,
  balance2Kit,
  portraits2Kit,
  listening2Kit,
  clock2Kit,
  mirror2Kit,
  mortuary2Kit,
  roots2Kit,
  fuse3Kit,
  shadow3Kit,
  boiler3Kit,
  balance3Kit,
  portraits3Kit,
  listening3Kit,
  clock3Kit,
  mirror3Kit,
  mortuary3Kit,
  roots3Kit,
  fuse4Kit,
  shadow4Kit,
  boiler4Kit,
  balance4Kit,
  portraits4Kit,
  listening4Kit,
  clock4Kit,
  mirror4Kit,
  mortuary4Kit,
  roots4Kit,
  fuse5Kit,
  shadow5Kit,
  boiler5Kit,
  balance5Kit,
  portraits5Kit,
  listening5Kit,
  clock5Kit,
  mirror5Kit,
  mortuary5Kit,
  roots5Kit
]);
export const ROOM_DEFINITIONS = Object.freeze(ROOM_KITS.map(kit => kit.definition));
