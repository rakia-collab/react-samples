import React from 'react';
import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import Debug from "debug";

const debug = Debug('pos:core:LocalesProviderContainer');
const debugI18n = Debug('pos:core:I18n');

/*
 In order to log i18n error messages, you must set environment variable DEBUG='pos:core:I18n'
 */
function onIntlError(error) {
    // Hide message
    debugI18n(error);
}

const formatsSelector = createSelector(
    state => state.locales.currencyCode || state.authentication.user.currencycode,
    state => state.authentication.user.currencysymbol,
    (currencycode, currencysymbol) => {
        return {
            number: {
                currencyFormat: {
                    style: 'currency',
                    currency: currencycode,
                    currencyDisplay: 'symbol',
                    minimumIntegerDigits: 1
                },
                float: {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            },
            currency: currencycode,
            currencySymbol: currencysymbol
        }
    }
);

const messagesSelector = createSelector(
    state => state.locales.messages,
    state => state.authentication.stringOverride,
    (messages, stringOverride) => stringOverride ? messages.merge(stringOverride) : messages
);

const mapStateToProps = (state) => {
    const {lang, key} = state.locales;
    return {
        key: key,
        locale: lang,
        messages: messagesSelector(state),
        formats: formatsSelector(state),
        onError: onIntlError,
    };
};

export default connect(mapStateToProps)(IntlProvider);
