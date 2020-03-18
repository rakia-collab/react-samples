import Immutable from 'seamless-immutable';
import * as actions from './actions';

let initialState = {
    selectedList:[{id:'2',status:'blocking', firstName:'Asset 2'}],
    availbleList: [{id:'0',status:'blocking', firstName:'Asset Category'},{id:'1',status:'blocking', firstName:'Vehicule' }],
    showCategModal:false,
    make:{},
    formValues:{}


};
function reducer(state = Immutable(initialState), action) {
    switch (action.type) {

        case actions.FETCH_MAKE_MODEL_SUCCESS:

            return Immutable.merge(state,
                { formValues: Immutable.set(state.formValues, 'make', action.result),
                make: action.result}
                );


        case actions.INIT_MAKE_MODEL_SUCCESS:
            return Immutable.merge( state,{
                formValues: Immutable.set(state.formValues, 'make', action.result)
        });

        default:
            return state;
    }
}

export default reducer;