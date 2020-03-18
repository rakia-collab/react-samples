
import Immutable from 'seamless-immutable';
import * as actions from './actions';

let initialState = {
    isTrimDetailLoade: false,
};

function reducer(state = Immutable(initialState), action) {
    switch (action.type) {

        case actions.SHOW_TRIM_DETAIL:
            return Immutable.merge(state,{
                isTrimDetailLoade: action.trimload !== undefined ? action.trimload : !state.isTrimDetailLoade
            });

        default:
            return state;
    }
}

export default reducer;