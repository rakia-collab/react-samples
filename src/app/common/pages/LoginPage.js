import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl'
import {reduxForm, Field} from 'redux-form'
import {Link, withRouter} from 'react-router';
import Debug from 'debug';
import {Form, Div} from 'cassiopae-core';

import {
    notify,
    Loader,
    GlobalMessages,
    fillClassNames,
    $authenticationActions,
    TextEntryField,
    newProgressMonitor,
    getProgressMonitorState,
    SkinLoading,
} from 'cassiopae-core';
import {Routes} from '../../router';

import '../../common/less/app/loginPage.less';

const messages = defineMessages({
    invalidIdentification: {id: 'login.page.identification.impossible', defaultMessage: 'Unknown user or password'},
    btnRegister: {id: "core.login.btnregister", defaultMessage: "Register"},
    password: {id: "core.login.password", defaultMessage: "Password"},
    email: {id: "core.login.email", defaultMessage: "E-mail"},
    lnkforgotpassword: {id: "core.login.lnkforgotpassword", defaultMessage: "Forgot password?"},
    backhome: {id: "core.login.backhome", defaultMessage: "Go back to POS"},
    username: {id: "core.login.username", defaultMessage: "Username"},
    firstname: {id: "core.login.firstname", defaultMessage: "First name"},
    lastname: {id: "core.login.lastname", defaultMessage: "Last name"},
    serverTimeout: {id: 'core.login.serverTimeout', defaultMessage: 'Connection timeout, please retry later !'},
});

const debug = Debug('pos:common:pages:ErrorPage');

const ID = 'pos.login';

const validate = (values, props) => {
    debug('validate', 'values=', values, 'props=', props);

    const errors = {};
    if (!values.uticode && !props.uticode) {
        errors.uticode = GlobalMessages.fieldRequire;
    }
    if (!values.utipwd) {
        errors.utipwd = GlobalMessages.fieldRequire;
    }
    if (!values.utiprenom) {
        errors.utiprenom = GlobalMessages.fieldRequire;
    }
    if (!values.utinom) {
        errors.utinom = GlobalMessages.fieldRequire;
    }
    if (!values.email) {
        errors.email = GlobalMessages.fieldRequire;
    }
    if (props.passwordexpired) {
        if (!values.newpwd) {
            //errors = setIn(errors, 'utipwd', GlobalMessages.fieldRequire);
            errors.newpwd = GlobalMessages.fieldRequire;
        }
        if (!values.confirmpwd) {
            errors.confirmpwd = GlobalMessages.fieldRequire;
        }
        if (values.utipwd && !(values.newpwd === values.confirmpwd)) {
            errors.confirmpwd = GlobalMessages.verifyPassword;
        }
    }
    debug('validate', 'returns errors=', errors);
    return errors
};

function asyncValidate(values, dispatch, props) {
    if (props.location.query.register) {
        const {validateUser} = $authenticationActions();

        return dispatch(validateUser(values.uticode).then((response) => {
            if (!response.data) {
                const errors = {
                    uticode: GlobalMessages.duplicateUsername
                };
                return errors;
            }
        }));
    }

    return Promise.resolve(); // Must return a promise !
}

class LoginForm extends React.Component {
    static defaultProps = {
        logoSrc: 'img/login/logo_login.png',
        backgroundSrc: 'img/login/bg_login.jpg',
    };

    componentDidMount() {
        const {client} = this.props.location ? this.props.location.query : {};
        if (client) {
            this.props.fetchClientConfig(client);
        }
    }

    handleSubmit = (formData) => {
        const {intl: {formatMessage}, dispatch, router} = this.props;
        const {changePasswordStep} = this.props.location.query;
        const {
            login,
            getSession,
            register,
            forgotPassword,
            changePassword,
            fetchClientConfig,
            validateUser
        } = $authenticationActions();

        if (register) {
            dispatch(register(formData, false));
            return;
        }

        if (forgotPassword) {
            dispatch(forgotPassword(formData));
            return;
        }
        if (this.props.passwordexpired) {
            dispatch(changePassword(formData, formatMessage));
            return;
        }
        if (changePasswordStep) {
            formData.uticode = this.props.uticode;
            dispatch(changePassword(formData, formatMessage));
            return;
        }

        const progressMonitor = dispatch(newProgressMonitor('loginForm'));

        const {uticode: username, utipwd: password} = formData;
        let promise = dispatch(login({username, password}, null, progressMonitor));
        promise = progressMonitor.thenRelease(promise);

        promise = promise.then((result) => {
            debug('handleSubmit', 'result=', result);
            if (!result) {
                return;
            }

            const landingPage = result.options.landingpage || Routes.LANDING_PAGE;
            router.push(landingPage);

        }, (error) => {
            debug('handleSubmit', 'error=', error);
            console.error('Login error=', error);

            if (error.code === 'ECONNABORTED') {
                notify.show(messages.serverTimeout, notify.ERROR);

                return;
            }

            notify.show(messages.invalidIdentification, notify.ERROR);
        });

        return promise;
    };

    render() {
        const {
            id = ID,
            passwordexpired, handleSubmit, submitting, pristine, loginProgress, logoComponent, logoSrc, backgroundSrc, form,
            intl: {formatMessage}, errorMessage,
        } = this.props;

        const loading = loginProgress.running;

        let _logoComponent;
        if (!logoComponent && logoSrc) {
            _logoComponent = <img className="login-logo" src={logoSrc} alt="Logo"/>;
        }

        const {register, forgotPassword, changePasswordStep, sessionExpired} = this.props.location.query;

        let loginFields = false;
        if (!forgotPassword) {
            loginFields = this.renderLoginFields(changePasswordStep);
        }

        let resetPasswordFields = false;
        if (passwordexpired || changePasswordStep) {
            resetPasswordFields = this.renderResetPwdFields();
        }

        let registerFields = false;
        if (register) {
            registerFields = this.renderRegisterFields();
        }

        let forgotPasswordFields = false;
        if (forgotPassword || register) {
            forgotPasswordFields = this.renderForgotPwdFields();
        }

        let buttonLabel;
        if (register) {
            buttonLabel = formatMessage(messages.btnRegister);

        } else if (forgotPassword || changePasswordStep) {
            buttonLabel = <FormattedMessage id="core.login.btnsubmit" defaultMessage="Submit"/>;

        } else {
            buttonLabel = <FormattedMessage id="core.login.btnlogin" defaultMessage="Login"/>;
        }

        let _errorMessage = false;
        if (errorMessage && errorMessage.id) {
            _errorMessage = formatMessage(errorMessage);

        } else if (errorMessage) {
            _errorMessage = errorMessage;

        } else if (sessionExpired) {
            _errorMessage = formatMessage(GlobalMessages.sessionExpired);
        }

        const classes = fillClassNames('login-page', {'error': _errorMessage});
        const styles = {
            backgroundImage: `url(${backgroundSrc})`,
        };

        return (
            <Div key="body" id={id} className={classes} style={styles} parentProps={this.props}>
                {_logoComponent}
                <Form className="login-form"
                      onSubmit={handleSubmit(this.handleSubmit)}
                      name={form}>
                    {loading && <SkinLoading type='indicator' progressMonitorName='login'/>}
                    {loginFields}
                    {resetPasswordFields}
                    {registerFields}
                    {forgotPasswordFields}

                    {_errorMessage && <div key='error-message' className="login-error-message">
                        <p>{_errorMessage}</p>
                    </div>
                    }

                    <Div key='login-buttons' id={id + '.buttons'} className="login-buttons" parentProps={this.props}>
                        <button type="submit"
                                disabled={pristine || submitting}
                                className="mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                            <span className="button-value">{buttonLabel}</span>
                        </button>
                    </Div>

                    <Div key='login-links' id={id + '.links'} className="login-links" parentProps={this.props}>
                        {(forgotPassword || register || changePasswordStep) &&
                        <Link to={{pathname: "login", query: {forgotPassword: true}}}>
                            {formatMessage(messages.lnkforgotpassword)}
                        </Link>}

                        {changePasswordStep &&
                        <Link to={{pathname: "#"}}>
                            {formatMessage(messages.backhome)}
                        </Link>}
                    </Div>
                </Form>
            </Div>
        );
    }

    renderLoginFields(changePasswordStep) {
        return (
            <div className="login-fields">
                {!changePasswordStep && <TextEntryField name="uticode"
                                                        disabled={this.props.passwordexpired}
                                                        className="input-text-login"
                                                        value={this.props.uticode}
                                                        title={messages.username}
                                                        placeholder={messages.username}
                                                        mandatory={true}
                />}
                <TextEntryField name="utipwd"
                                type="password"
                                className="input-text-login"
                                title={messages.password}
                                placeholder={messages.password}
                                mandatory={true}
                />
            </div>
        );
    }

    renderRegisterFields() {
        return (
            <div className="login-register-fields">
                <TextEntryField name="utiprenom"
                                className="input-text-login"
                                title={messages.firstname}
                                mandatory={true}
                />
                <TextEntryField name="utinom"
                                className="input-text-login"
                                title={messages.lastname}
                                mandatory={true}
                />
            </div>
        );
    }

    renderForgotPwdFields() {
        return (
            <div className="login-forgot-fields">
                <TextEntryField name="email"
                                className="input-text-login"
                                title={messages.email}
                                type="email"
                                mandatory={true}
                />
            </div>
        );
    }

    renderResetPwdFields() {
        return (
            <div className="login-reset-fields">
                <TextEntryField name="newpwd"
                                type="password"
                                className="input-text-login"
                                mandatory={true}
                                title={GlobalMessages.newPassword}
                />
                <TextEntryField name="confirmpwd"
                                type="password"
                                className="input-text-login"
                                mandatory={true}
                                title={GlobalMessages.confirmPassword}
                />
            </div>
        );
    }
}


function mapStateToProps(state, props) {
    const {locales, authentication = {}} = state;
    const {errorMessage, favicon, passwordexpired, user = {}} = authentication;
    const {uticode} = user;

    const loginProgress = getProgressMonitorState(state, 'login');

    return {
        loginProgress,
        errorMessage,
        favicon,
        uticode,
        locales,
        passwordexpired,
    };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'login',
    validate,
    asyncValidate,
    asyncBlurFields: ['uticode'],
})(injectIntl(withRouter(LoginForm))));
