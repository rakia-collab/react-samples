import React from 'react';
import {addCCHComponentExtension} from 'cassiopae-core';

import CCHSelectField from './CCHSelectField';

/**
 *
 * @param {core.extensions.Plugin} posPlugin
 */
export function addCCHRenderType(posPlugin) {
    addCCHComponentExtension(posPlugin, {
        type: 'COMBOTUSPARAM',
        component: CCHSelectField,
    });
    addCCHComponentExtension(posPlugin, {
        type: 'COMBOTTRPARAM',
        component: CCHSelectField,
    });
    addCCHComponentExtension(posPlugin, {
        type: 'DEFAULTCOMBOBOX',
        component: CCHSelectField,
    });
}
