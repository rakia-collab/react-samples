import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {defineMessages, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {createSelector} from 'reselect';
import {withRouter} from "react-router";

import {
    SelectField,
    dashboardActions,
    authenticationActions,
    getDashboardStates,
    getProgressMonitorState, newProgressMonitor,
} from 'cassiopae-core';
import {initRefTables} from '../utils/tables';

const NO_BER_DROWN = 0;
const ONE_BER_DROWN = 1;

// Code disabled because of Thomas Nokin request, no more taking in account value 2 of TWO_BER_DROWN
// const TWO_BER_DROWN = 2;
const messages = defineMessages({
    dealershipPlaceHolder: {id: 'core.profile.dealership.placeholder', defaultMessage: 'Select dealership'},
    dealershipBrandPlaceHolder: {
        id: 'core.profile.dealershipbrand.placeholder',
        defaultMessage: 'Select dealership/brand'
    },
    brandPlaceHolder: {id: 'core.profile.brand.placeholder', defaultMessage: 'Select brand'},
    btnApply: {id: 'core.profile.apply.btn', defaultMessage: 'Apply'},
    defaultCheckbox: {id: 'core.profile.default.checkbox', defaultMessage: 'Default'},
    dealershipOrBrand: {id: 'core.profile.dealershipBrand.title', defaultMessage: 'Dealership / Brand'},
    dealerships: {id: 'core.profile.dealership.title', defaultMessage: 'Dealerships'},
    brands: {id: 'core.profile.brands.title', defaultMessage: 'Brands'}
});

const FORM = 'preference';

class DealershipBrandContainer extends React.Component {

    componentWillMount() {
        let {networkStepSelection, fetchDealerShips} = this.props;

        if (networkStepSelection) {
            fetchDealerShips();

            // Code disabled because of Thomas Nokin request, no more taking in account value 2 of TWO_BER_DROWN
            // if (this.props.networkStepSelection === TWO_BER_DROWN && this.props.defaultDealership) { // if dealership defined, fetch brands
            //     this.props.fetchFinancialBrands(this.props.defaultDealership);
            // }
        }
    }

    afterChanging = () => {
        const {router, initRefTables, dashboards, fetchDashboardLayout, landingPage} = this.props;

        initRefTables();
        Object.keys(dashboards || {}).forEach(key => key !== '$EDITOR$' && fetchDashboardLayout(dashboards[key].id));// refresh each dashboards allready showed, unless the $EDITOR$
        router.push(landingPage);
    };

    handleChangeDealership = (event, value) => {
        let {fetchFinancialBrands, removeCache, updateConfiguration} = this.props;

        fetchFinancialBrands(value);
        removeCache();
        updateConfiguration({dealershipcurrent: value}).then(this.afterChanging);
    };

    handleBrandChange = (event, value) => {
        let {removeCache, updateConfiguration} = this.props;

        removeCache();
        updateConfiguration({brandcurrent: value}).then(this.afterChanging);
    };

    handleApplyOnClick = (data) => {
        let {networkStepSelection, updateConfiguration, newProgressMonitor} = this.props;

        if (!data) {
            return;
        }

        let config = {};
        let {dealership, brand, dealershipbrand, setAsDefault} = data;

        // Code disabled because of Thomas Nokin request, no more taking in account value 2 of TWO_BER_DROWN
        // if (this.props.networkStepSelection === TWO_BER_DROWN && data.dealership && data.brand) {
        //     pos-configuration.dealershipcurrent = data.dealership;
        //     pos-configuration.brandcurrent = data.brand;
        // } else {
        let values = data.dealershipbrand.split('-');
        config.dealershipcurrent = values[0];
        config.brandcurrent = values[1];
        // }

        if (setAsDefault) {
            config.dealershipdefault = config.dealershipcurrent;
            config.branddefault = config.brandcurrent;
        }

        const progressMonitor = newProgressMonitor('updateConfiguration');
        const promise = updateConfiguration(config, progressMonitor);
        progressMonitor.thenRelease(promise);
    };

    handleDealerShipBrandChange = (event, value) => {
        let {networkStepSelection, removeCache, updateConfiguration} = this.props;

        if (networkStepSelection === ONE_BER_DROWN) {
            let values = value.split('-');

            removeCache();
            updateConfiguration({dealershipcurrent: values[0], brandcurrent: values[1]}).then(this.afterChanging);
        }
    };

    render() {
        let {intl: {formatMessage}, handleSubmit, submitting, dealerships, brands, networkStepSelection} = this.props;

        // Prepare fields for the dealerships and brands select
        let dealershipsSelectField = false;
        let brandsSelectField = false;
        let dealershipPreferenceForm = false;
        if (networkStepSelection && networkStepSelection !== NO_BER_DROWN) {
            if (dealerships && dealerships.length > 0) {
                if (networkStepSelection === ONE_BER_DROWN) {
                    dealershipsSelectField = (<SelectField name='dealershipbrand'
                                                           title={messages.dealershipOrBrand}
                                                           noEmptyOption={true}
                                                           placeholder={messages.dealershipBrandPlaceHolder}
                                                           options={dealerships}
                                                           onChange={this.handleDealerShipBrandChange}
                    />);
                }
                // Code disabled because of Thomas Nokin request
                // else if (networkStepSelection === TWO_BER_DROWN) {
                //     dealershipsSelectField = ( <Field name="dealership"
                //                                       title={<FormattedMessage id="core.profile.dealership.title"
                //                                                                defaultMessage="Dealerships"/>}
                //                                       component={SelectField}
                //                                       placeholder={this.props.intl.formatMessage(messages.dealershipPlaceHolder)}
                //                                       options={dealerships} onChange={this.handleChangeDealership}
                //     />);
                //     if (brands && brands.length > 0) {
                //         brandsSelectField = ( <Field name="brand"
                //                                      title={<FormattedMessage id="core.profile.brands.title"
                //                                                               defaultMessage="Brands"/>}
                //                                      component={SelectField}
                //                                      placeholder={this.props.intl.formatMessage(messages.brandPlaceHolder)}
                //                                      options={brands}
                //                                      onChange={this.handleBrandChange}/>);
                //     }
                // }

                dealershipPreferenceForm = (
                    <form>
                        {dealershipsSelectField}
                        {brandsSelectField}
                        <Row className='verticalCenter'>
                            <Col md={3}>
                                <label htmlFor='setAsDefault'>{formatMessage(messages.defaultCheckbox)}</label>
                            </Col>
                            <Col md={1}>
                                <div>
                                    <Field id='setAsDefault'
                                           name='setAsDefault'
                                           component='input'
                                           type='checkbox'/>
                                </div>
                            </Col>
                            <Col md={8}>
                                <Button type='submit' bsStyle='primary' className='form-group pull-right'
                                        disabled={submitting} onClick={handleSubmit(this.handleApplyOnClick)}>
                                    {formatMessage(messages.btnApply)}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                );
            }
        }

        return (
            <div>
                {dealershipPreferenceForm}
            </div>
        );
    }
}

DealershipBrandContainer = reduxForm({
    form: FORM,
    enableReinitialize: true
})(DealershipBrandContainer);

// This variable is used inside the mapStateToProps. Think always to use selector for these kind of vars
// otherwise (if declared inside mapStateToProps), for each state change, a new reference is given to this var , so bad perfs
const initValuesFromUserState = createSelector(
    state => state.authentication.user.dealershipcurrent,
    state => state.authentication.user.brandcurrent,
    (dealershipcurrent, brandcurrent) => {
        return {
            dealership: dealershipcurrent
            , brand: brandcurrent
            , dealershipbrand: dealershipcurrent + '-' + brandcurrent
        }
    }
);

const mapStateToProps = (state) => {
    let authentication = state.authentication;
    return {
        defaultDealership: authentication.user.dealershipdefault,
        defaultBrand: authentication.user.branddefault,
        currentDealership: authentication.user.dealershipcurrent,
        currentBrand: authentication.user.brandcurrent,
        dealerships: authentication.dealerships,
        brands: authentication.brands,
        initialValues: initValuesFromUserState(state),
        networkStepSelection: authentication.options.networkstepselection,
        dashboards: getDashboardStates(state).dashboards,
        landingPage: state.authentication.options.landingpage
    };
};

const mapDispatchToProps = {
    fetchDealerShips: authenticationActions.fetchDealerShips,
    fetchFinancialBrands: authenticationActions.fetchFinancialBrands,
    updateConfiguration: authenticationActions.updateConfiguration,
    removeCache: authenticationActions.removeCache,
    initRefTables,
    newProgressMonitor,
    fetchDashboardLayout: dashboardActions.fetchDashboardLayout,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(DealershipBrandContainer)));
