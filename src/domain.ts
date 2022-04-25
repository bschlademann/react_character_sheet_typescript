// alles, was vom UI getrennt ist, reine business-logik
// hier: z.B: alle D&D Regeln

import { allAbilities, allSkills, skillsByAbility } from "./data";

export type Ability = typeof allAbilities[number];
export type Abilities = readonly Ability[];
export type Skill = typeof allSkills[number];
export type State = {
  sheetHeaderEntries: {
    characterName: string;
    alignment: string;
    race: string;
    background: string;
    class: string;
    subclass: string;
    level: number;
    attributes: {
      hit_points_current: number;
      hit_points_max: number;
      hit_dice_current: number;
      hit_dice_max: number;
      movement: number;
    };
  };
  abilitiesByValue: Record<Ability, number>;
  proficiencies: {
    proficiencyBonus: number;
    armor: string[];
    weapons: string[];
    tools: string[];
  };
  savingThrowProficiencies: {
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  };
  skillProficiencies: Record<Skill, boolean>;
};

export const getAbilityModifier = (ability: Ability, state: State) =>
  Math.floor((state.abilitiesByValue[ability] - 10) / 2);

export const getSkillModifier = (skill: Skill, state: State): number => {
  const ability: Ability = skillsByAbility[skill];
  const proficiencyCheck: boolean = state.skillProficiencies[skill];
  const proficiencyBonus = proficiencyCheck
    ? state.proficiencies.proficiencyBonus
    : 0;
  const skillModifier = getAbilityModifier(ability, state) + proficiencyBonus;
  return skillModifier;
};

export const clamp = (min: number, max: number, value: number) =>
  value < min ? min : value > max ? max : value;

export const setProficiencyBonus = (state: State) => {
  const characterLevel = state.sheetHeaderEntries.level;
  const proficiencyIncreaseThresholds = [5, 9, 13, 17];
  let proficiencyBonusIncrease = 0;
  proficiencyIncreaseThresholds.forEach((thresholdLevel) => {
    if (characterLevel >= thresholdLevel) {
      proficiencyBonusIncrease++;
    }
  });
  state.proficiencies.proficiencyBonus = 2 + proficiencyBonusIncrease;
};

export const subClassThresholdReached = (
  characterLevel: number,
  characterClass: string
) =>
  (characterLevel >= 3 && characterClass !== "") ||
  (characterLevel >= 2 &&
    (characterClass === "cleric" ||
      characterClass === "druid" ||
      characterClass === "wizard")) ||
  characterClass === "sorcerer" ||
  characterClass === "warlock";
