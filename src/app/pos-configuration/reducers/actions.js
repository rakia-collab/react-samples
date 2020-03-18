import {data} from '../Constantes/MakesModels'


export const SHOW_MAKE_BOX_SEARCH = 'MAKE/SHOW_MAKE_BOX_SEARCH';

export const SHOW_MAKE_REMOVE = 'MAKE/SHOW_MAKE_REMOVE';




export const FETCH_MAKES_MODELS = 'MAKES/FETCH_MAKES_MODELS';
export const FETCH_MAKES_MODELS_SUCCESS = 'MAKES/FETCH_MAKES_MODELS_SUCCESS';
export const FETCH_MAKES_MODELS_FAIL = 'MAKES/FETCH_MAKES_MODELS_FAIL';













export function showSearchMAkeBox(show){
    return {
        type: SHOW_MAKE_BOX_SEARCH,
        modeload: show
    };
}


export function showMakeRemove(show){
    return {
        type: SHOW_MAKE_REMOVE,
        modeload: show
    };
}




export function fetchMakesModels(){
    return {
        type: FETCH_MAKES_MODELS_SUCCESS,
        result: data
    };
}



