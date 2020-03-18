import Immutable from 'seamless-immutable';

function isRequiredThrowError(isRequired, propName, componentName) {
    if (isRequired) {
        throw new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Is Mandatory.',
        );
    }
}

function isImmutableObject(isRequired) {
    return function (props, propName, componentName) {
        const prop = props[propName];
        if (prop == null) {
            isRequiredThrowError(isRequired, propName, componentName);
        } else {
            if (!Immutable.isImmutable(prop)
                || typeof Immutable.asMutable(prop) !== 'object') {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. Must be an Immutable Object.',
                );
            }
        }
    }
}

function isImmutableArray(isRequired) {
    return function (props, propName, componentName) {
        const prop = props[propName];
        if (prop == null) {
            isRequiredThrowError(isRequired, propName, componentName);
        } else {
            if (!Immutable.isImmutable(prop)
                || !Array.isArray(prop)) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. Must be an Immutable Array.',
                );
            }
        }
    }
}

// Using the factory, create two different versions of your prop type
export const immutableObject = isImmutableObject(false);
immutableObject.isRequired = isImmutableObject(true);
export const immutableArray = isImmutableArray(false);
immutableArray.isRequired = isImmutableArray(true);