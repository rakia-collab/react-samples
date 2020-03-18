import axios from 'axios';
import React from 'react';
import {Button} from 'react-bootstrap';

export function getStepStyle(code) {
    switch (code) {
        case 'D_CREE':
            return 'badge bg-blue';
        case 'D_WDEC2':
        case 'D_WTDEC':
            return 'badge bg-gray';
        case 'D_MINFO':
            return 'badge bg-orange';
        case 'EMAILS':
        case 'VALID':
        case 'D_VALID':
        case 'TRANSOK':
            return 'badge bg-green';
        case 'TRAKO':
        case 'D_SSUIT':
            return 'badge bg-red';
        default:
            return 'badge bg-blue';
    }
}

export function getBootstrapResolution(resolution) {
    var res = -1;
    switch (resolution) {
        case "xs":      //less than

        case "sm":      //more than
            res = 768;
            break;
        case "md":      //more than
            res = 970;
            break;
        case "lg":      //more than
            res = 1170;
            break;
    }
    if (res == -1)
        return false;
    else
        return res + "px";
}

export function transformLocaleSpecific(locale) {
    switch (locale) {
        case 'en-ES':
            return 'es-ES';
        default:
            return locale;
    }
}

export function isColHidden(statePath, accessKeys) {
    return accessKeys[statePath] && accessKeys[statePath].hidden;
}

export function createCustomButons(accessKeys, count) {
    const customButtons = [];
    let n = 1;
    while (n <= count) {
        const key = `pos.deal.stepcontainer.customButton${n}`;
        const customButtonAccessKey = (accessKeys && accessKeys[key]);
        let customButton;
        if (customButtonAccessKey && !customButtonAccessKey.hidden) {
            let customButtonlabel;
            try {
                customButtonlabel = formatMessage(customButtonAccessKey.label);
            } catch (error) {
                customButtonlabel = customButtonAccessKey.label;
            }
            customButton = <Button type='button' key={key} bsSize='small' bsStyle='primary'
                                   onClick={() => handleOnClickCustomButton(key, customButtonAccessKey)}>
                {customButtonlabel || 'customButton1'}
            </Button>;
        }
        customButtons.push(customButton);
        n++;
    }
    return customButtons;
}

const hasMSSaveOrOpenBlob = !!(window.navigator && window.navigator.msSaveOrOpenBlob);
export const handleOnClickCustomButton = (component, accessKey = {}) => {
    const {url, method = 'GET', body = {}, responseType = 'blob'} = accessKey;
    if (!url) {
        console.error('No URL defined in component: ' + component);
        return;
    }
    switch (method) {
        // Additionnal method to be managed later
        case 'POST':
            axios.post(url, body, {responseType})
                .then((response) => {
                    // Additionnal response type to be managed later
                    switch (responseType) {
                        case 'blob':
                            if (hasMSSaveOrOpenBlob) {
                                const blobObject = new Blob([response.data], {type: response.data.type});
                                window.navigator.msSaveOrOpenBlob(blobObject);
                            } else {
                                const blob = new File([response.data], name, {type: response.data.type});
                                const fileURL = URL.createObjectURL(blob);
                                window.open(fileURL);
                            }

                            break;
                        default:
                            console.error('Unknow responseType ' + responseType + ' defined in component: ' + component);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
            break;
        default:
            console.error('Unknow method ' + method + ' defined in component: ' + component);
    }
};

export function wrapURLs(text, new_window = true) {
    const url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
    const target = new_window ? '_blank' : '';

    return text.replace(url_pattern, function (url) {
        const protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
        const href = protocol_pattern.test(url) ? url : 'http://' + url;
        return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    });
};