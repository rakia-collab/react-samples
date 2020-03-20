import Immutable from 'seamless-immutable';
import * as actions from './actions';
import {CHANGE_INDEX_MODEL_SELECTED} from "./actions";

let initialState = {
    isPopupModelDetailLoade: false,
    detailModelDisabled:false,
    isModelDetailLoade: false,
    indexModelSelected:0,
    nbrModelNavTab:0,


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
        case actions.INIT_Models_SUCCESS:
            return Immutable.merge(state,{
                models: action.result
            });
        case actions.FETCH_Model_SUCCESS:
            var index=-1;
            if(!action.result)
            {
                index = state.models.length

            }
            else{
                state.models.forEach(model => {
                    if (model.modelGeneralData.modelref !== action.result)
                        index = index + 1;
                }  );
            }

            return Immutable.merge(state,{
                indexModelSelected: index

            });
        case actions.CHANGE_INDEX_MODEL_SELECTED:
            return  Immutable.merge(state,{
                indexModelSelected: action.result

            });
        case actions.CHANGE_NEWMODEL_NAVTAB_ADDED:
            return   Immutable.merge(state,{
                nbrModelNavTab: action.result

            });


        default:
            return state;
    }
}

export default reducer;