import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as Data from "./data";
import * as Domain from "./domain";
import { SheetHeader, AbilityList, SkillList } from "./components/sheet-header";

export function createInitialState(): Domain.State {
  return {
    sheetHeaderEntries: {
      characterName: "",
      alignment: "",
      race: "",
      background: "",
      class: "",
      subclass: "",
      level: 1,
      attributes: {
        hit_points_current: 0,
        hit_points_max: 0,
        hit_dice_current: 1,
        hit_dice_max: 1,
        movement: 0,
      },
    },
    abilitiesByValue: {
      strength: 13,
      dexterity: 14,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    proficiencies: {
      proficiencyBonus: 2,
      armor: [],
      weapons: [],
      tools: [],
    },
    savingThrowProficiencies: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    },
    skillProficiencies: {
      acrobatics: false,
      animal_handling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleight_of_hand: false,
      stealth: false,
      survival: false,
    },
  };
};

export const useDndState = () => {
  const [state, setState] = useState(createInitialState);

  const toggleSkill = (skill: keyof Domain.State["skillProficiencies"]) =>
    setState((state: Domain.State) => ({
      ...state,
      skillProficiencies: {
        ...state.skillProficiencies,
        [skill]: !state.skillProficiencies[skill],
      },
    }));

  const incrementAbilityScore = (ability: Domain.Ability) => {
    setState((prevState: Domain.State) => {
      return {
        ...prevState,
        abilitiesByValue: {
          ...prevState.abilitiesByValue,
          [ability]: prevState.abilitiesByValue[ability] + 1,
        },
      };
    });
  };

  const decrementAbilityScore = (ability: Domain.Ability) => {
    setState((prevState: Domain.State) => {
      return {
        ...prevState,
        abilitiesByValue: {
          ...prevState.abilitiesByValue,
          [ability]: prevState.abilitiesByValue[ability] - 1,
        },
      };
    });
  };

  return {
    state,
    setState,
    toggleSkill,
    createIncrementAbilityScore: incrementAbilityScore,
    createDecrementAbilityScore: decrementAbilityScore,
  };
};

const App = () => {
  const {
    state,
    setState,
    toggleSkill,
    createIncrementAbilityScore,
    createDecrementAbilityScore,
  } = useDndState();

  return (
    <div>
      <SheetHeader />
      <AbilityList
        state={state}
        allAbilities={Data.allAbilities}
        createIncrementAbilityScore={createIncrementAbilityScore}
        createDecrementAbilityScore={createDecrementAbilityScore}
      />
      <SkillList toggleSkill={toggleSkill} state={state} setState={setState} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
