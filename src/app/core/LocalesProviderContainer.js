import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import React from 'react';
import {createSelector} from 'reselect'
import Debug from "debug";

const debug = Debug('vwapp:core:LocalesProviderContainer');

const formatsSelector = createSelector(
    (state) => (state.locales.currencyCode || (state.authentication.user && state.authentication.user.currencycode)),
    (state) => (state.authentication.user && state.authentication.user.currencysymbol),
    (currencyCode, currencySymbol) => {
        const formats = {
            number: {
                currencyFormat: {
                    style: 'currency',
                    currency: currencyCode || '',
                    currencyDisplay: 'symbol',
                    minimumIntegerDigits: 1
                },
                float: {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            },
            currency: currencyCode || '',
            currencySymbol: currencySymbol || ''
        };

        debug("formatsSelector", "currencyCode=", currencyCode, "currencySymbol=", currencySymbol, "=> formats=", formats);

        return formats;
    }
);

const messagesSelector = createSelector(
    (state) => (state.locales.messages),
    (state) => (state.authentication.stringOverride),
    (messages, stringOverride) => {
        const ret = (stringOverride ? messages.merge(stringOverride) : messages);

        debug("messagesSelector", "messages=", ret, "stringOverride=", stringOverride);

        return ret;
    }
);

const mapStateToProps = (state) => {
    const {language: locale, key} = state.locales;

    return {
        key,
        locale,
        messages: messagesSelector(state),
        formats: formatsSelector(state)
    };
};

export default connect(mapStateToProps)(IntlProvider);
