import moment from 'moment';
import {createSelectorCreator, defaultMemoize} from 'reselect';
import isEqual from 'lodash/isEqual';
import {createRegExps, ProgressMonitor} from 'cassiopae-core'
import axios from 'axios';

import {
    COUNTRY_CODE_CHINA,
    COUNTRY_CODE_SPAIN,
} from '../../common/utils/serverKeys';

/**
 *
 * @param {string}
 *            atenum
 * @returns {boolean} TRUE if rib number
 */
export function isValidRib(rib) {
    return /^\d{19}$/.test(rib);
}

/**
 * Check IBAN
 *
 * @param {string} iban
 * @param {core.ProgressMonitor} [progressMonitor]
 * @returns {Promise<boolean>}
 */
export function validateIban(iban, progressMonitor = ProgressMonitor.empty()) {

    progressMonitor.beginTask('Check iban', 1);

    const p = axios.post(`/actors/validateiban`, {iban}, {...progressMonitor.axios()});

    return p;
}

/**
 *
 * @param {string} phoneNumber
 * @returns {boolean} TRUE if telephone n
 */
export function isValidTelephoneNo(phoneNumber) {
    return /^\+\d{10,13}$|^\d{10}$/.test(phoneNumber);
}

export function normalizeFirstName(input) {
    if (input) {
        input = input.replace(/[^A-Za-z0-9 àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]/g, '');
        input = input.length > 0 ? input.replace(input[0], input[0].toUpperCase()) : '';
    }
    return input;
}

export function normalizeToUppercase(input) {
    input = normalizeFirstName(input);
    if (input) {
        input = input.toUpperCase();
    }
    return input;
}

/**
 *
 * @param {number|Date}
 *            birthDate
 * @param {number}
 *            [validAge]
 * @returns {boolean} If the date is valid
 */
export function isValidAge(birthDate, validAge = 18) {
    return moment(birthDate).add(validAge, "years").isBefore(moment());
}

/**
 *
 * @param current date
 * @returns {boolean} TRUE if date > now - 18 years
 */
export function isAdult(date) {
    if (!date) {
        return false;
    }
    const momentDate = moment(date);
    if (!momentDate.isValid()) {
        return false;
    }
    return momentDate.isBefore(moment().subtract(18, 'years'));
}

/**
 *
 * @param idCardNumber
 * @returns {boolean} TRUE if id card format correspond to Chinese id card format or if no control rule exists for the id card type
 */
function CN_isIdCardFormat(idCardNumber) {

    if (idCardNumber.length !== 18) {
        return false;
    }

    const expectedLastChar = CN_computeExpectedIdCardLastDigit(idCardNumber);
    const lastChar = idCardNumber.slice(-1);
    if (!expectedLastChar || lastChar != expectedLastChar) {
        return false;
    }

    return true;
}


// create a "selector creator" that uses lodash.isEqual instead of ===
export const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual,
);

const simpleRegExpSelectorByKeys = createDeepEqualSelector(
    (array) => array,
    createRegExps,
);


/**
 *
 * @param number
 * @param type is the type of Id card as 'NIE', 'NIF' or 'DIF' (used for ES for now)
 * @returns {boolean} TRUE if id card format correspond to Chinese id card format or if no control rule exists for the id card type
 */
function ES_isIdCardFormat(number, type) {

    const DNI_NIF_FORMAT = '^([0-9]|L|K){1}[0-9]{7}[A-Z]{1}$';
    const NIE_FORMAT = '^(X|Y|Z|M){1}[0-9]{7}[A-Z]{1}$';

    let regexpsToCreateList = [];
    switch (type) {
        case 'DNI':
        case 'NIF':
            regexpsToCreateList.push({key: type, pattern: DNI_NIF_FORMAT});
            break;
        case 'NIE':
            regexpsToCreateList.push({key: type, pattern: NIE_FORMAT});
            break;
        default:
            console.error(`Unknown id card type provided, type=${type}`);
            return false;
    }

    const regExps = simpleRegExpSelectorByKeys(regexpsToCreateList);

    if (regExps[type]) {
        regExps[type].lastIndex = 0;
        if (!regExps[type].test(number)) {
            return false;
        }
    }
    return true;
}

/**
 * @param {string} idCardNumber
 * @returns {string} the expected id card last digit as per Chinese computation rule
 */
function CN_computeExpectedIdCardLastDigit(idCardNumber) {
    const idCardNumberCut = idCardNumber.slice(0, -1);
    const X = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const Y = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    const sum = idCardNumberCut.split('').reduce((acc, digit, index) => {
        return acc + digit * X[index];
    }, 0);

    const yIndex = sum % 11;
    const lastChar = isNaN(yIndex) || yIndex > Y.length ? null : Y[yIndex];
    return lastChar;
}

/**
 *
 * @param number
 * @param countryOrigin
 * @param type is the type of Id card as 'NIE', 'NIF' or 'DIF' (used for ES for now)
 * @returns {boolean} TRUE if id card number correspond to the countryTitle id card number format or if no rules exists
 */
export function isIdCardFormat(number, countryOrigin, type) {
    switch (countryOrigin) {
        case COUNTRY_CODE_CHINA:
            return CN_isIdCardFormat(number);
        case COUNTRY_CODE_SPAIN:
            return ES_isIdCardFormat(number, type);
        default:
            return true;
    }
}

