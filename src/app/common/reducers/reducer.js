import Immutable from 'seamless-immutable';
import Debug from "debug";

const debug = Debug('myApplication:common:Reducer');

export const SHOW_SIDEBAR = 'sidebar/SHOW';

const initialState = {
    sidebarVisible: false
};

export default function reducer(state = Immutable(initialState), action) {
    const {type, payload} = action;

    switch (type) {
        case SHOW_SIDEBAR:
            debug(type, "payload=", payload);
            return state.set('sidebarVisible', payload.visibility);

        default:
            return state
    }
}
