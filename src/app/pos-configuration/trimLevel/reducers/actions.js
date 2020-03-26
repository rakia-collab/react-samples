
export const CHANGE_INDEX_TRIM_SELECTED = 'TRIM/CHANGE_INDEX_TRIM_SELECTED';
export const CHANGE_NEWTRIM_NAVTAB_ADDED = 'TRIM/CHANGE_NEWTRIM_NAVTAB_ADDED';


export function selectedTrim(index)
{
    return {
        type:CHANGE_INDEX_TRIM_SELECTED,
        result:index
    };

}

export function changeNbrNavTabAddedOfTrim(nombre)
{
    return {
        type:CHANGE_NEWTRIM_NAVTAB_ADDED,
        result:nombre
    };

}