
import Immutable from 'seamless-immutable';
import * as actions from './actions';

let initialState = {
    isTrimDetailLoade: false,
    nbrNavTabTrim:0,
    indexTrimSelected:0
};

function reducer(state = Immutable(initialState), action) {
    switch (action.type) {

        case actions.CHANGE_INDEX_TRIM_SELECTED:
            return Immutable.merge(state,{
                indexTrimSelected: action.result
            });

        case actions.CHANGE_NEWTRIM_NAVTAB_ADDED:
            return Immutable.merge(state,{
                nbrNavTabTrim: action.result
            });

        default:
            return state;
    }
}

export default reducer;