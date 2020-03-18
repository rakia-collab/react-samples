/**
 * Default maxLength value applied to numeric component
 * Setting it at 17 prevents rounding. 21 will prevents number transformation into scientific notation.
 */
export const DEFAULT_NUMBER_MAX_LENGTH = 17;

/**
 *
 * @param {string|number} s
 * @returns {number}
 */
export function parseNumber(s) {
    if (!s) {
        return 0;
    }
    if (typeof(s) === "number") {
        return s;
    }

    if (/[^0-9.,\s]/i.test(s)) {
        return NaN;
    }

    s = s.replace(/\s/g, '');

    if (/^[\d,]+,[\d]+\.[\d]*$/.test(s)) {
        s = s.replace(/,/, '');

    } else if (/^[\d]+,[\d]*$/.test(s)) {
        s = s.replace(/,/, '.');
    }

    return parseFloat(s);
}

/**
 *
 * @param {number} v
 * @param {Intl} intl
 * @param {Object} [options]
 * @return {string|null}
 */
export function formatNumber(v, intl, options) {
    if (v === null || v === '') {
        return null;
    }

    let opts = {
        style: 'decimal',
        useGrouping: false,
        minimumFractionDigits: 2,
        ...(options || {})
    };

    let s = intl.formatNumber(v, opts);
    return s;
}

/**
 *
 * @param {number} x
 * @returns {number}
 */
export function round4(x) {
    if (typeof(x) !== "number") {
        return x;
    }

    return Math.round(x * 10000) / 10000;
}

/**
 *
 * @param {number} x
 * @returns {number}
 */
export function round2(x) {
    if (typeof(x) !== "number") {
        return x;
    }

    return Math.round(x * 100) / 100;
}

/**
 *
 * @param {number} x
 * @returns {number}
 */
export function floor2(x) {
    if (typeof(x) !== "number") {
        return x;
    }

    return Math.floor(x * 100) / 100;
}

/**
 * Round up with precision 2
 * @param {number} x
 * @returns {number}
 */
export function roundUP(x) {
    if (typeof(x) !== "number") {
        return x;
    }

    return (1 + Math.floor(x * 100)) / 100;
}

/**
 *
 * @param {number} x
 * @returns {number}
 */
export function ceil2(x) {
    if (typeof(x) !== "number") {
        return x;
    }

    return Math.ceil(x * 100) / 100;
}


export function parseFloatOrEmpty(value) {
    let parsedValue = parseNumber(value);
    if (isNaN(parsedValue)) {
        return undefined;
    }
    return parsedValue;
}

export function parseIntOrEmpty(value) {
    let parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
        return undefined;
    }
    return parsedValue;
}
export function parseIntOrZero(value) {
    let parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
        return 0;
    }
    return parsedValue;
}

export function isNumber(number) {
    return (number || number === 0) && !Number.isNaN(Number.parseFloat(number.toString().replace(",", ".")))
}
