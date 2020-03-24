import {dataInit} from '../../Constantes/IniMakeModel'
import {fullMake} from '../../Constantes/Make'

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
export const SET_SELECTED_LIST = 'config/make/SET_SELECTED_LIST';
export const SET_AVAILBLE_LIST = 'config/make/SET_AVAILBLE_LIST';


export function fetchFullMakeByCode(makecode) {
    return {
        types: [FETCH_FULL_MAKE, FETCH_FULL_MAKE_SUCCESS, FETCH_FULL_MAKE_FAIL],
        promise: (client) => client.get('/assetconfig/make/'+makecode),
    };
}



export function initMakeModel(){
    return {
        type: INIT_MAKE_MODEL_SUCCESS,
        result: dataInit
    };
}


export function saveMakeModel(formData) {
    return {
        types: [SAVE_MAKE_MODEL,  SAVE_MAKE_MODEL_SUCCESS, SAVE_MAKE_MODEL_FAIL],
        promise: (client) => client.post('/assetconfig/make', formData),
        afterSuccess: (dispatch, getState, result) => {

        },
        afterError: (dispatch, getState, error) => {

        }
    };
}

export function updateMakeModel(formData) {
    return {
        types: [UPDATE_MAKE_MODEL,  UPDATE_MAKE_MODEL_SUCCESS, UPDATE_MAKE_MODEL_FAIL],
        promise: (client) => client.patch('/assetconfig/make', formData),
        afterSuccess: (dispatch, getState, result) => {

        },
        afterError: (dispatch, getState, error) => {

        }
    };
}


export function selectCategorie(listSelected) {
    return {
        type: SELECT_CATEGORIE,
        listSelected
    };
}

export function removeCategorie(removeList) {
    return {
        type: REMOVE_CATEGORIE,
        removeList
    };
}
    export function setAvailbleList(availbleList) {
        return {
            type: SET_AVAILBLE_LIST,
            availbleList
        };


}
export function setSelectedList(listSelected) {
    return {
        type: SET_SELECTED_LIST,
        listSelected
    };


}
