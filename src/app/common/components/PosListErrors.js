import React from 'react';
import {createSelector} from 'reselect';
import PropTypes from 'prop-types';
import {flattenObjectToObject, EMPTY_ARRAY, EMPTY_OBJECT, ListErrors, intlPropType, classNamePropType} from 'cassiopae-core';

import Scopes from '../validation/validationScopes';

import './PosListErrors.less';

class PosListErrors extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string,
        className: classNamePropType,
        scopeNamesI18n: PropTypes.objectOf(intlPropType).isRequired,
        onErrorClick: PropTypes.func,
        errors: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.object, // Recursive Error
            PropTypes.shape({
                scopeName: PropTypes.string,
                id: PropTypes.string,
            })])),
        control: PropTypes.shape({
            controlemsgList: PropTypes.arrayOf(PropTypes.shape({
                anomalie: PropTypes.string,
            }))
        }),
    };

    errorListSelector = createSelector(
        (props) => (props.errors || EMPTY_OBJECT),
        (props) => ((props.control || {}).controlemsgList || EMPTY_ARRAY),
        (errors, controlemsgList) => {

            const flattenErrors = flattenObjectToObject(errors);

            const errorList = [];

            const errorByScopeName = {};
            for (const key in flattenErrors) {
                if (key === '_error') {
                    continue;
                }
                const error = flattenErrors[key];
                const {scopeName, id: messageId, $accessKey} = error;

                let errorByScope = errorByScopeName[scopeName];
                if (!errorByScope) {
                    errorByScope = {
                        scopeName,
                        count: 0,
                        selectable: (scopeName !== Scopes.GLOBAL),
                        list: [],
                    };
                    errorByScopeName[scopeName] = errorByScope;
                    errorList.push(errorByScope);
                }

                errorByScope.count++;
                const msg = errorByScope.list.find((msg) => (msg.id === messageId));
                if (msg) {
                    msg.count++;
                } else {
                    errorByScope.list.push({...error, count: 1});
                }
            }

            if (controlemsgList.length) {
                const el = {
                    scopeName: Scopes.FUNCTIONNAL,
                    count: controlemsgList.length,
                    list: controlemsgList.map((msg, index) => {
                        return {
                            defaultMessage: msg.anomalie,
                            key: index,
                            type: 'control',
                        }
                    }),
                };

                errorList.push(el);
            }

            return errorList;
        },
    );

    render() {
        const {scopeNamesI18n, onErrorClick} = this.props;
        const errorList = this.errorListSelector(this.props);

        return <ListErrors errorList={errorList} scopeNamesI18n={scopeNamesI18n} onErrorClick={onErrorClick}/>;
    }
}

export default PosListErrors;
