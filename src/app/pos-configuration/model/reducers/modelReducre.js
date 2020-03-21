import Immutable from 'seamless-immutable';
import * as actions from './actions';
import {FETCH_Model_SUCCESS} from "./actions";

let initialState = {
    isPopupModelDetailLoade: false,
    detailModelDisabled:false,
    isModelDetailLoade: false,
    indexModelSelected:0,
    nbrModelNavTab:0,
    modelField:"make.models[0]"


};

function reducer(state = Immutable(initialState), action) {
    switch (action.type) {
        case actions.SHOW_Model_DETAIL_POPUP:
            return Immutable.merge(state,{
                isPopupModelDetailLoade: action.modeload !== undefined ? action.modeload : !state.isPopupModelDetailLoade
            });
        case actions.SHOW_Model_DETAIL:
            return Immutable.merge(state,{
                isModelDetailLoade: action.modeload !== undefined ? action.modeload : !state.isModelDetailLoade
            });
        case actions.FETCH_Model_SUCCESS:
            return Immutable.merge(state,{
                fullModel: action.result.data

            });
        case actions.CHANGE_INDEX_MODEL_SELECTED:
            return  Immutable.merge(state,{
                indexModelSelected: action.result

            });
        case actions.CHANGE_NEWMODEL_NAVTAB_ADDED:
            return   Immutable.merge(state,{
                nbrModelNavTab: action.result

            });
        case actions.CHANGE_FILEDMODEL_PATH:
            return   Immutable.merge(state,{
                modelField: action.result

            });

        default:
            return state;
    }
}

export default reducer;