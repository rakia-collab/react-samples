import Immutable from 'seamless-immutable';
import * as actions from './actions';

let initialState = {

    isMakeSearchLoade: false,
    isMakesRemoveLoade: false,



};

function reducer(state = Immutable(initialState), action) {
    switch (action.type) {


        case actions.SHOW_MAKE_BOX_SEARCH:
            return Immutable.merge(state,{
                isMakeSearchLoade: action.modeload !== undefined ? action.modeload : !state.isMakeSearchLoade
            });
        case actions.SHOW_MAKE_REMOVE:
            return Immutable.merge(state,{
                isMakesRemoveLoade: action.modeload !== undefined ? action.modeload : !state.isMakesRemoveLoade
            });
        case actions.FETCH_MAKES_MODELS_SUCCESS:
          return Immutable.merge(state,{
                  makes:action.result.data
          });
        case actions.FETCH_MAKES_MODELS_FILTER_SUCCESS:
            return Immutable.merge(state,{
                    makes:action.result.data
                }
            );

        default:
            return state;
    }
}

export default reducer;
