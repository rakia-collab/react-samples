
export const SHOW_Model_DETAIL_POPUP = 'MODEL/SHOW_Model_DETAIL_POPUP';
export const SHOW_Model_DETAIL = 'MODEL/SHOW_Model_DETAIL';
export const INIT_Models_SUCCESS = 'MODEL/INIT_Models_SUCCESS';
export const FETCH_Model_SUCCESS = 'MODEL/FETCH_Model_SUCCESS';
export const INIT_Model_SUCCESS = 'MODEL/INIT_Model_SUCCESS';








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

export function initModel(data)
{
    return {
        type: INIT_Model_SUCCESS,
        result: data
    };

}


export function fetchModel(data)
{
    return {
        type: FETCH_Model_SUCCESS,
        result: data,
    };

}
