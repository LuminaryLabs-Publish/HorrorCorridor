import {MONSTER_PROFILES, type MonsterProfile} from "../../../content/monsters";
export type Difficulty="easy"|"normal"|"hard";
export function selectEncounter(context:Readonly<{seed:number;ordinal:number;placeId:string;recentFamilies:readonly string[]}>):MonsterProfile {
  // Filter physical affordances before seeded selection. One lethal threat only.
  const eligible=MONSTER_PROFILES.filter(monster=>
    (monster.sensoryChannel!=="water"||context.placeId.includes("laundry")) &&
    // Stationary response is valid in light; darkness still requires movement.
    monster.beamHoldMs<monster.lastChanceMs);
  const novel=eligible.filter(monster=>!context.recentFamilies.includes(monster.family));
  const candidates=novel.length?novel:eligible;
  if(!candidates.length)throw new Error("No eligible encounter");
  const hash=(Math.imul(context.seed^context.ordinal,0x45d9f3b)>>>0);
  return candidates[hash%candidates.length];
}
export function tuneEncounter(profile:MonsterProfile,difficulty:Difficulty):MonsterProfile {
  const pace=difficulty==="easy"?0.8:difficulty==="hard"?1.2:1;
  return {...profile,approachMetersPerSecond:profile.approachMetersPerSecond*pace,
    signDurationMs:Math.max(3900,profile.signDurationMs/pace),
    lastChanceMs:Math.min(9000,Math.max(5500,profile.lastChanceMs/pace))};
}
