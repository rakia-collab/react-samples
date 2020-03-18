import Immutable from 'seamless-immutable';
import * as actions from './actions';

let initialState = {
    isPopupModelDetailLoade: false,
    detailModelDisabled:false,
    isModelDetailLoade: false,
    indexModelSelected:0,


};

function reducer(state = Immutable(initialState), action) {
    switch (action.type) {
        case actions.SHOW_Model_DETAIL_POPUP:
            return Immutable.merge(state,{
                isPopupModelDetailLoade: action.modeload !== undefined ? action.modeload : !state.isPopupModelDetailLoade
            });
        case actions.SHOW_Model_DETAIL:
            returnImmutable.merge(state,{
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
                    if (model.modelgeneraldata.modelref !== action.result)
                        index = index + 1;
                }  );
            }

            return Immutable.merge(state,{
                indexModelSelected: index

            });

        default:
            return state;
    }
}

export default reducer;