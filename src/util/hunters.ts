export enum HunterType {
  ASSAR = 'assar',
  GRIMGIER = 'grimgier',
  HELGA = 'helga',
  IONA = 'iona',
  KRIM = 'krim',
  VARJA = 'varja'
}

export interface GameMapHunter {
  type: HunterType;
  health: number;
  wounds: number;
}

export const HUNTER_HEALTH = {
  [HunterType.ASSAR]: 4,
  [HunterType.GRIMGIER]: 4,
  [HunterType.HELGA]: 3,
  [HunterType.IONA]: 4,
  [HunterType.KRIM]: 3,
  [HunterType.VARJA]: 3
}

export const HUNTERS = [
  HunterType.ASSAR,
  HunterType.GRIMGIER,
  HunterType.HELGA,
  HunterType.IONA,
  HunterType.KRIM,
  HunterType.VARJA
]

export const toHunter = (type: HunterType, wounds = 0): GameMapHunter => ({
  type,
  health: HUNTER_HEALTH[type],
  wounds
});

export const getAvailableHunters = (activeHunters: HunterType[]) => HUNTERS.filter(h => !activeHunters.includes(h));

export const getNextAvailableHunter = (activeHunters: HunterType[]) => getAvailableHunters(activeHunters)[0];