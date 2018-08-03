import Debug from 'debug';

const debug = Debug('myApp:common:Actions');

export function showSidebar(visibility) {
    debug("showSidebar", "visibility=", visibility);
    return {
        type: SHOW_SIDEBAR,
        payload: {visibility}
    };
}

