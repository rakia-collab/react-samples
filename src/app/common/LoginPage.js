import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {injectIntl} from 'react-intl';
import {Field, reduxForm} from 'redux-form';
import {Col, Grid, Row} from 'react-bootstrap';
import {hashHistory, Link} from 'react-router';
import Debug from 'debug';

import messages from './constants/messages';
import {
    fillClassNames,
    GlobalMessages,
    progressActions,
    notify,
    TextEntry,
    authenticationActions2,
    PageConfiguration,
} from 'cassiopae-core';

import {Routes} from '../router';

import './less/loginPage.less';

const {login} = authenticationActions2;

const debug = Debug('myApplication:common:LoginPage');

class LoginForm extends React.Component {

    handleRegisterButton = () => {
        hashHistory.push(Routes.REGISTER);
    };

    handleSubmit = (formData) => {
        const {newProgressMonitor, login, intl: {formatMessage}} = this.props;

        debug('handleSubmit', 'formData=', formData);

        const progressMonitor = newProgressMonitor('login');

        let promise = login(formData, null, progressMonitor);

        promise = progressMonitor.thenRelease(promise);

        promise.then((result) => {
            debug('handleSubmit', 'result=', result);
            if (!result) {
                return;
            }

            const landingPage = result.options.landingpage || Routes.DEFAULT_LANDING_PAGE;
            hashHistory.push(landingPage);

        }, (error) => {
            debug('handleSubmit', 'error=', error);
            console.error('Login error=', error);

            notify.show(formatMessage(messages.identificationFailed), notify.ERROR);
        });
    };

    render() {
        const {handleSubmit, submitting, pristine, loginIsLoading, errorMessage, passwordexpired, uticode, utipwd, intl: {formatMessage}} = this.props;

        const classes = fillClassNames({'error': errorMessage});

        return (
            <div className={classNames(classes)}>
                <PageConfiguration key='pageConfiguration' className='skin-default'/>

                <div key='body' className='login-body'>
                    <Grid componentClass='FORM' className='login-form' onSubmit={handleSubmit(this.handleSubmit)}>
                        <Row>
                            <Col xs={12} sm={6} md={4} className='login-fields'>
                                <Field name='username'
                                       component={TextEntry}
                                       disabled={passwordexpired}
                                       placeholder={formatMessage(messages.userEmail)}
                                       autocomplete="username"
                                       groupClassName='input-text-login'
                                       value={uticode}/>

                                <Field name='password'
                                       component={TextEntry}
                                       type='password'
                                       autocomplete="current-password"
                                       placeholder={formatMessage(messages.password)}
                                       groupClassName='input-text-login'
                                       value={utipwd}/>
                            </Col>
                        </Row>
                        <Row className="login-row-options">
                            <Col xs={6}>
                                <Field name='rememberSession'
                                       id='keepPassword'
                                       component="check"
                                       className='login-checkbox'
                                       title={formatMessage(messages.rememberPassword)}/>
                            </Col>

                            <Col xs={6} className="forgotPasswordCol">
                                <Link to={Routes.REGISTER}>{formatMessage(messages.forgotYourPassword)}</Link>
                            </Col>
                        </Row>
                        <Row className="login-row-button">
                            <Col xs={12} className='login-buttons'>
                                <button type='submit' disabled={pristine || submitting || loginIsLoading}
                                        className='mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
                                    <span className='button-value'>{formatMessage(messages.validate)}</span>
                                </button>
                            </Col>
                        </Row>
                    </Grid>

                    <Grid>
                        <Row className='login-unregistred'>
                            <Col xs={12}>
                                <button type='button' onClick={this.handleRegisterButton}>
                                    {formatMessage(messages.createAnAccount)}
                                </button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

const validate = (values, props) => {
    const errors = {};
    if (!values.uticode && !props.uticode) {
        errors.uticode = GlobalMessages.fieldRequire;
    }
    if (!values.utipwd) {
        errors.utipwd = GlobalMessages.fieldRequire;
    }
    return errors;
};

LoginForm = reduxForm({
        form: 'login',
        validate,
    },
)(LoginForm);

const mapStateToProps = (state) => {
    const {authentication} = state;
    const {errorMessage, loginLoading, user} = authentication;

    return {
        errorMessage,
        loginIsLoading: loginLoading,
        uticode: user && user.uticode
    }
};

const mapDispatchToProps = {
    login,
    newProgressMonitor: progressActions.newProgressMonitor,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm));
