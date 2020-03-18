import Immutable from 'seamless-immutable';
import * as actions from './actions';

let initialState = {

    isMakeSearchLoade: false,
    isMakesRemoveLoade: false,



};

function reducer(state = Immutable(initialState), action) {
    switch (action.type) {


        case actions.SHOW_MAKE_BOX_SEARCH:
            return state.merge({
                isMakeSearchLoade: action.modeload !== undefined ? action.modeload : !state.isMakeSearchLoade
            });
        case actions.SHOW_MAKE_REMOVE:
            return state.merge({
                isMakesRemoveLoade: action.modeload !== undefined ? action.modeload : !state.isMakesRemoveLoade
            });
        case actions.FETCH_MAKES_MODELS_SUCCESS:
          return state.merge({
                  makes:action.result
          }
            );




        default:
            return state;
    }
}

export default reducer;
