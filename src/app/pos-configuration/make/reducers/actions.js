import {dataInit} from '../../Constantes/IniMakeModel'
import {fullMake} from '../../Constantes/Make'
import {FETCH_MAKES_MODELS_FILTER, FETCH_MAKES_MODELS_FILTER_FAIL} from '../../reducers/actions';

export const FETCH_FULL_MAKE= 'MAKE/FETCH_FULL_MAKE_MODEL';
export const FETCH_FULL_MAKE_SUCCESS = 'MAKE/FETCH_FULL_MAKE_SUCCESS';
export const FETCH_FULL_MAKE_FAIL = 'MAKE/FETCH_FULL_MAKE_FAIL';

export const INIT_MAKE_MODEL = 'MAKE/INIT_MAKE_MODEL';
export const INIT_MAKE_MODEL_SUCCESS = 'MAKE/INIT_MAKE_MODEL_SUCCESS';
export const INIT_MAKE_MODEL_FAIL = 'MAKE/INIT_MAKE_MODEL_FAIL';

export const SAVE_MAKE_MODEL ='MAKE/SAVE_MAKE_MODEL';
export const SAVE_MAKE_MODEL_SUCCESS ='MAKE/SAVE_MAKE_MODEL_SUCCESS';
export const SAVE_MAKE_MODEL_FAIL ='MAKE/SAVE_MAKE_MODEL_FAIL';

export const UPDATE_MAKE_MODEL ='MAKE/UPDATE_MAKE_MODEL';
export const UPDATE_MAKE_MODEL_SUCCESS ='MAKE/UPDATE_MAKE_MODEL_SUCCESS';
export const UPDATE_MAKE_MODEL_FAIL ='MAKE/UPDATE_MAKE_MODEL_FAIL';

export const SELECT_CATEGORIE = 'config/make/SELECT_CATEGORIE';
export const REMOVE_CATEGORIE = 'config/make/REMOVE_CATEGORIE';



export function fetchFullMakeByCode(makecode) {
    return {
        types: [FETCH_FULL_MAKE, FETCH_FULL_MAKE_SUCCESS, FETCH_FULL_MAKE_FAIL],
        promise: (client) => client.get('/make'+makecode),
    };
}

export function fetchFullMake(makecode) {
    return {
        type: FETCH_FULL_MAKE_SUCCESS,
        result: fullMake
    };
}


export function initMakeModel(){
    return {
        type: INIT_MAKE_MODEL_SUCCESS,
        result: dataInit
    };
}


export function saveMakeModel(formData, onSuccess, onError) {
    return {
        types: [SAVE_MAKE_MODEL,  SAVE_MAKE_MODEL_SUCCESS, SAVE_MAKE_MODEL_FAIL],
        promise: (client) => client.post('/make/insert', formData),
        afterSuccess: (dispatch, getState, result) => {
            onSuccess(result.data);
        },
        afterError: (dispatch, getState, error) => {
            onError(error);
        }
    };
}

export function updateMakeModel(formData, onSuccess, onError) {
    return {
        types: [UPDATE_MAKE_MODEL,  UPDATE_MAKE_MODEL_SUCCESS, UPDATE_MAKE_MODEL_FAIL],
        promise: (client) => client.patch('/make/update', formData),
        afterSuccess: (dispatch, getState, result) => {
            onSuccess(result.data);
        },
        afterError: (dispatch, getState, error) => {
            onError(error);
        }
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
