import Immutable from 'seamless-immutable';
import * as actions from './actions';
import {SAVE_MAKE_MODEL_SUCCESS} from './actions';
import {SELECT_CATEGORIE} from './actions';
import {REMOVE_CATEGORIE} from './actions';
import {SET_AVAILBLE_LIST} from './actions';

let initialState = {
    listSelected:[],
    availbleList:[],
    showCategModal:false,
    make:{},
    formValues:{}


};
const categFS = [
    {code: 'CAR', label: 'Cars',id:'0'},
    {code: 'MATERIAL', label: 'Material',id:'1'},
    {code: 'INTANGIBLE', label: 'Finance',id:'2'},

];

const catOth =[{code: 'REALESTATE', label: 'Real Estate',id:'0'}];
function reducer(state = Immutable(initialState), action) {
    switch (action.type) {

        case actions.FETCH_FULL_MAKE_SUCCESS:

            return Immutable.merge(state,
                { formValues: Immutable.set(state.formValues, 'make', action.result),
                make: action.result.data}
                );


        case actions.INIT_MAKE_MODEL_SUCCESS:
            return Immutable.merge(state,{ make: action.result});

        case actions.SAVE_MAKE_MODEL_SUCCESS:
            return Immutable.merge(state,{ make: action.result.data});

        case actions.SELECT_CATEGORIE:
            return Immutable.merge(state,{ listSelected: action.listSelected});

        case actions.REMOVE_CATEGORIE:
        { let selectedList = state.listSelected;
            action.removeList.forEach(item => {
                selectedList =  selectedList.filter(selected => selected.code != item.code );
            });
            return Immutable.merge(state,{ listSelected: selectedList, availbleList: action.removeList});
        }
        case actions.SET_AVAILBLE_LIST:

            return Immutable.merge(state,{ availbleList: action.availbleList});


        case actions.SET_SELECTED_LIST:

            return Immutable.merge(state,{ listSelected: action.listSelected});


        default:
            return state;
    }
}

export default reducer;