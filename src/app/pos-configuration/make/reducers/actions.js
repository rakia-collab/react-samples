import {dataInit} from '../../Constantes/IniMakeModel'
import {data} from '../../Constantes/MakesModels'

export const FETCH_MAKE_MODEL = 'MAKE/FETCH_MAKE_MODEL';
export const FETCH_MAKE_MODEL_SUCCESS = 'MAKE/FETCH_MAKE_MODEL_SUCCESS';
export const FETCH_MAKE_MODEL_FAIL = 'MAKE/FETCH_MAKE_MODEL_FAIL';

export const INIT_MAKE_MODEL = 'MAKE/INIT_MAKE_MODEL';
export const INIT_MAKE_MODEL_SUCCESS = 'MAKE/INIT_MAKE_MODEL_SUCCESS';
export const INIT_MAKE_MODEL_FAIL = 'MAKE/INIT_MAKE_MODEL_FAIL';

export const SELECT_CATEGORIE = 'config/make/SELECT_CATEGORIE';
export const REMOVE_CATEGORIE = 'config/make/REMOVE_CATEGORIE';

export function fetchMake(makecode) {
    return {
        type: FETCH_MAKE_MODEL_SUCCESS,
        result: data.find(make => make.makegeneraldata.brandref == makecode)
    };
}


export function initMakeModel(){
    return {
        type: INIT_MAKE_MODEL_SUCCESS,
        result: dataInit
    };
}

export function selectCategorie(index) {
    return {
        type: SELECT_CATEGORIE,
        index
    };
}

export function removeCategorie(card) {
    return {
        type: REMOVE_CATEGORIE,
        card
    };
}
