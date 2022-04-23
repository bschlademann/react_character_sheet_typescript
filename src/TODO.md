## validation ##
- sheet-header:
    - name: {validation rules?}

/**
 * TODO:
 * typescript ausprobieren
 * checkbox-> isChecked in state
 */


## sheet-header
- selection of subclass
- fetch from dnd5api (classes, etc)
    - save in localStorage / sessionStorage (https://javascript.info/localstorage)

# Abilites:
- clamp ability score entry (3-18)
- hp: <input> {current hp; may not exceed max hp} / <input> {max hp}
- hd: <input> {current hd; may not exceed max hd} / <input> {max hd}
- ac: <div> {10+dexMod}
- movement: <div> {from race}
- initiative: <div> {dexMod}
- proficiency bonus: <div> {from level}
- drag and drop standart array (https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- Notizen aus index_timm_state.js extrahieren und Rest löschen, damit keine Fehler mehr von ESLint angezeigt werden

experience points (sheet header)
- passive perception
- inspiration

- initiative
- speed

- death saves (checkboxes, leftmost is active, rest inactive)
    -> successes
    -> failures

- character randomizer
    -> everything that is left empty is randomized, everything selected stays