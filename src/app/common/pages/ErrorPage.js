import React from 'react'
import {connect} from 'react-redux'
import Debug from "debug";

const debug = Debug("pos:common:pages:ErrorPage");

class ErrorPage extends React.Component {

    render() {
        const {
            errorMessage, logoComponent, logoSrc, intl: {formatMessage}
        } = this.props;

        const formattedMsg = formatMessage(errorMessage);

        let _logoComponent = logoComponent;
        if (!logoComponent && logoSrc) {
            _logoComponent = <img className="logo" src={logoSrc} alt="Logo"/>;
        }

        return (
            <div className="error-page">
                {_logoComponent}
                <div className="error-message">
                    <p>
                        {formattedMsg}
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.authentication.errorPageMessage,
    }
};

export default connect(mapStateToProps)(ErrorPage);
