import { FC } from "react";
import * as Data from "../data";
import * as Domain from "../domain";

// type Ability = typeof allAbilities[number];
// type Abilities = Ability[];
// type Skill = typeof allSkills[number];

type SheetHeaderEntry = typeof Data.sheetHeaderEntries[number];
type OptionsList =
  | []
  | typeof Data.allAlignments
  | typeof Data.allcharacterClasses
  | typeof Data.allBackgrounds
  | typeof Data.allRaces;

type AbilityListProps = {
  state: Domain.State;
  createIncrementAbilityScore: (ability: Domain.Ability) => void;
  createDecrementAbilityScore: (ability: Domain.Ability) => void;
  allAbilities: Domain.Abilities;
};

type SkillListProps = {
  toggleSkill: (skill: Domain.Skill) => void;
  state: Domain.State;
  setState: (state: Domain.State) => void;
};

export const AbilityList: FC<AbilityListProps> = (props) => {
  const { state } = props;
  const { createIncrementAbilityScore } = props;
  const { createDecrementAbilityScore } = props;
  return (
    <ul>
      {props.allAbilities.map((ability) => {
        const label = ability;
        return (
          <li key={ability}>
            {label}
            <input value={state.abilitiesByValue[ability]}></input>
            <button onClick={() => createIncrementAbilityScore(ability)}>
              +
            </button>
            <button onClick={() => createDecrementAbilityScore(ability)}>
              -
            </button>
            <span>{Domain.getAbilityModifier(ability, state)}</span>
          </li>
        );
      })}
    </ul>
  );
};

export const SkillList: React.FC<SkillListProps> = (props) => {
  const { toggleSkill } = props;
  // equivalent zu:
  // const createToggleSkill = props.createToggleSkill;
  return (
    <ul>
      {Data.allSkills.map((skill) => {
        const label = skill;
        const state = props.state;
        const skillsByAbility = Data.skillsByAbility;
        const getSkillModifier = Domain.getSkillModifier(skill, state);
        const associatedAbility = skillsByAbility[skill];
        return (
          <li key={skill}>
            {/* TODO: if(checkbox.checked){
                        add skill to proficiencies in state
                        rerender skill mod value
                        } */}
            <input
              type="checkbox"
              checked={state.skillProficiencies[skill]}
              onChange={() => toggleSkill(skill)}
            ></input>
            {`${label} (${associatedAbility})`}
            <span>{getSkillModifier}</span>
          </li>
        );
      })}
    </ul>
  );
};

export const SheetHeaderInput: React.FC<{
  sheetHeaderEntry: SheetHeaderEntry;
}> = (props) => {
  const label = props.sheetHeaderEntry;
  return (
    <div>
      {label}
      <input></input>
    </div>
  );
};

export const SheetHeaderDropdown: React.FC<{
  sheetHeaderEntry: SheetHeaderEntry;
}> = (props) => {
  // let optionsList: OptionsList; results in error in line 54:
  // "Variable 'optionsList' is used before being assigned.ts(2454)"
  // WORKAROUND: initially assign "[]"" and add "[]" to type OptionsList
  let optionsList: OptionsList = [];
  const label = props.sheetHeaderEntry;
  switch (props.sheetHeaderEntry) {
    case "alignment":
      optionsList = Data.allAlignments;
      break;
    case "class":
      optionsList = Data.allcharacterClasses;
      break;
    case "background":
      optionsList = Data.allBackgrounds;
      break;
    case "race":
      optionsList = Data.allRaces;
      break;
  }
  return (
    <div>
      {label}
      <select>
        {optionsList.map((dropdownOption) => {
          return (
            <option key={dropdownOption} value={`${dropdownOption}`}>
              {dropdownOption}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const Attributes = () => {
  const attributes = Data.attributes;
  return (
    <div>
      {attributes.map((attribute) => {
        return (
          <div key={attribute}>
            {attribute}
            <input></input>
          </div>
        );
      })}
    </div>
  );
};

export const SheetHeader = () => {
  return (
    <div>
      {Data.sheetHeaderEntries.forEach((sheetHeaderEntry) => {
        if (
          sheetHeaderEntry === "character name" ||
          sheetHeaderEntry === "level"
        ) {
          return (
            <SheetHeaderInput
              key={sheetHeaderEntry}
              sheetHeaderEntry={sheetHeaderEntry}
            />
          );
        } else {
          return (
            <SheetHeaderDropdown
              key={sheetHeaderEntry}
              sheetHeaderEntry={sheetHeaderEntry}
            />
          );
        }
      })}
      <Attributes />
    </div>
  );
};
