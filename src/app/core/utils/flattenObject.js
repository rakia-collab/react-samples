function walk(found, object, path = []) {

    let parent = true;

    for (const key in object) {
        if (!object.hasOwnProperty(key)) {
            continue;
        }

        const o = object[key];

        if (Array.isArray(o)) {
            for (let i = 0; i < o.length; i++) {
                if (path.length) {
                    path.push(`.${key}[${i}]`);
                } else {
                    path.push(`${key}[${i}]`);
                }
                if (walk(found, o[i], path) === false) {
                    found(path, o[i]);
                }
                path.pop();
            }
            continue;
        }

        if ((typeof o) === 'object') {
            if (path.length) {
                path.push(`.${key}`);
            } else {
                path.push(key);
            }

            if (walk(found, o, path) === false) {
                found(path, o);
            }
            path.pop();
            continue;
        }

        parent = false;
    }

    return parent;
}

/**
 *
 * @param {object} object
 * @returns {Array}
 */
export function flattenObjectToArray(object) {
    const toReturn = [];

    walk((path, object) => {
        toReturn.push(path.join(''));
    }, object);

    return toReturn;
}

/**
 *
 * @param {object} object
 * @returns {object}
 */
export function flattenObjectToObject(object) {
    const toReturn = {};

    walk((path, object) => {
        toReturn[path.join('')] = object;
    }, object);

    return toReturn;
}
