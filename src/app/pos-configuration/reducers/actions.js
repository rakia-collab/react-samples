import {data} from '../Constantes/MakesModels'


export const SHOW_MAKE_BOX_SEARCH = 'MAKE/SHOW_MAKE_BOX_SEARCH';
export const SHOW_MAKE_REMOVE = 'MAKE/SHOW_MAKE_REMOVE';

export const FETCH_MAKES_MODELS = 'MAKES/FETCH_MAKES_MODELS';
export const FETCH_MAKES_MODELS_SUCCESS = 'MAKES/FETCH_MAKES_MODELS_SUCCESS';
export const FETCH_MAKES_MODELS_FAIL = 'MAKES/FETCH_MAKES_MODELS_FAIL';

export const FETCH_MAKES_MODELS_FILTER = 'MAKES/FETCH_MAKES_MODELS_FILTER';
export const FETCH_MAKES_MODELS_FILTER_SUCCESS = 'MAKES/FETCH_MAKES_MODELS_FILTER_SUCCESS';
export const FETCH_MAKES_MODELS_FILTER_FAIL = 'MAKES/FETCH_MAKES_MODELS_FILTER_FAIL';




export function fetchFilterMakes(parameters) {

    return {
        types: [FETCH_MAKES_MODELS_FILTER, FETCH_MAKES_MODELS_FILTER_SUCCESS, FETCH_MAKES_MODELS_FILTER_FAIL],
        promise: (client) => client.get('/make', {params: parameters}),
    };
}


export function fetchMakes() {

    return {
        types: [FETCH_MAKES_MODELS, FETCH_MAKES_MODELS_SUCCESS, FETCH_MAKES_MODELS_FAIL],
        promise: (client) => client.get('/make'),
    };
}

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



