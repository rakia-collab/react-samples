import {fullModel} from '../../Constantes/Model'
export const SHOW_Model_DETAIL_POPUP = 'MODEL/SHOW_Model_DETAIL_POPUP';
export const SHOW_Model_DETAIL = 'MODEL/SHOW_Model_DETAIL';
export const INIT_Models_SUCCESS = 'MODEL/INIT_Models_SUCCESS';
export const FETCH_Model_SUCCESS = 'MODEL/FETCH_Model_SUCCESS';
export const FETCH_Model = 'MODEL/FETCH_Model';
export const FETCH_Model_FAIL= 'MODEL/FETCH_Model_FAIL';
export const CHANGE_INDEX_MODEL_SELECTED= 'MODEL/CHANGE_INDEX_MODEL_SELECTED';
export const CHANGE_NEWMODEL_NAVTAB_ADDED= 'MODEL/CHANGE_NEWMODEL_NAVTAB_ADDED';
export const CHANGE_FILEDMODEL_PATH= 'MODEL/CHANGE_FILEDMODEL_PATH';



export function showPopupModelDetail(show){
    return {
        type: SHOW_Model_DETAIL_POPUP,
        modeload: show
    };
}

export function showModelDetail(show){
    return {
        type: SHOW_Model_DETAIL,
        modeload: show
    };
}


export function initModels(data)
{
    return {
        type: INIT_Models_SUCCESS,
        result: data,
    };

}



export function fetchFullModel(param)
{
    return {
        types: [FETCH_Model, FETCH_Model_SUCCESS, FETCH_Model_FAIL],
        promise: (client) => client.get('/model',param),
    };

}

export function fetchModel(param)
{
    return {
        type: FETCH_Model_SUCCESS,
        result: fullModel,
    };

}

export function selectedModel(index)
{
    return {
        type:CHANGE_INDEX_MODEL_SELECTED,
        result:index
    };

}

export function changeNbrNavtabAddedOfModel(nombre)
{
    return {
        type:CHANGE_NEWMODEL_NAVTAB_ADDED,
        result:nombre
    };

}

export function changePathFileddOfModel(path)
{
    return {
        type:CHANGE_FILEDMODEL_PATH,
        result:path
    };

}
