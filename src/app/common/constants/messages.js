import {defineMessages} from 'react-intl';

const messages = defineMessages({
    userEmail: {id: 'common.loginPage.userEmail', defaultMessage: 'User email'},
    password: {id: 'common.loginPage.password', defaultMessage: 'Password'},
    rememberPassword: {id: 'common.loginPage.rememberPassword', defaultMessage: 'Remember password'},
    validate: {id: 'common.loginPage.validate', defaultMessage: 'Validate'},
    forgotYourPassword: {id: 'common.loginPage.forgotYourPassword', defaultMessage: 'Forgot your password ?'},
    createAnAccount: {id: 'common.loginPage.createAnAccount', defaultMessage: 'Create an account'},
    identificationFailed: {id: 'common.loginPage.identificationFailed', defaultMessage: 'Identification failed'},

    processingLogout: {id: 'common.logoutPage.label', defaultMessage: 'Processing logout'},
});

export default messages;
