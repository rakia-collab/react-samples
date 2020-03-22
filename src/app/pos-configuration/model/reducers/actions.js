import {change} from 'redux-form';

export const SHOW_Model_DETAIL_POPUP = 'MODEL/SHOW_Model_DETAIL_POPUP';
export const SHOW_Model_DETAIL = 'MODEL/SHOW_Model_DETAIL';
export const FETCH_Model_SUCCESS = 'MODEL/FETCH_Model_SUCCESS';
export const FETCH_Model = 'MODEL/FETCH_Model';
export const FETCH_Model_FAIL= 'MODEL/FETCH_Model_FAIL';
export const CHANGE_INDEX_MODEL_SELECTED= 'MODEL/CHANGE_INDEX_MODEL_SELECTED';
export const CHANGE_NEWMODEL_NAVTAB_ADDED= 'MODEL/CHANGE_NEWMODEL_NAVTAB_ADDED';
export const CHANGE_FILEDMODEL_PATH= 'MODEL/CHANGE_FILEDMODEL_PATH';
export const CHANGE_READONLY_SUCCESS= 'MODEL/CHANGE_READONLY_SUCCESS';


export function changeReadOnlyModel(edit= false){
    return {
        type: CHANGE_READONLY_SUCCESS,
        readonly: edit
    };
}

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
export function fetchFullModel(param,form, edit =false)
{

    return (dispatch, getState) => {
        const make = getState().form[form].values.make;
        var modelSelected=[]
        var indexModelSelected=-1;
        var i=0;
        make && make.models.map((Model) => {
            if(Model.modelGeneralData.modelRef===param.modelRef)
            { modelSelected=Model;
              indexModelSelected=i;
            }
            i=i+1;
            }  );
        dispatch(selectedModel(indexModelSelected));
        dispatch(changeReadOnlyModel(edit));
       return dispatch({
        types: [FETCH_Model, FETCH_Model_SUCCESS, FETCH_Model_FAIL],
        promise: (client) => client.get('/assetconfig/make/model',{params: {brandRef: param.brandRef,modelRef:param.modelRef}}),
        afterSuccess: (dispatch, getState, result) => {
            dispatch(change(form, "make.models["+indexModelSelected+"]",result.data));
            dispatch(showPopupModelDetail(true, edit));
        },
    })
    }
}


export function selectedModel(index)
{
    return {
        type:CHANGE_INDEX_MODEL_SELECTED,
        result:index
    };

}

export function changeNbrNavTabAddedOfModel(nombre)
{
    return {
        type:CHANGE_NEWMODEL_NAVTAB_ADDED,
        result:nombre
    };

}

export function changePathFiledOfModel(path)
{
    return {
        type:CHANGE_FILEDMODEL_PATH,
        result:path
    };

}
