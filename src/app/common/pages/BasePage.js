import React from 'react';
import {connect} from 'react-redux';
import {
    fetchLocale,
    Notifications,
    PageConfiguration,
    ScreenSizes,
    SkinDiv,
    getPublicPagesFavicon,
    ColorScheme,
} from 'cassiopae-core';
import Debug from "debug";

import './BasePage.less';

const debug = Debug("pos:common:pages:BasePAge");

const DEFAULT_FAVICON = "./img/favicon/favicon.ico";

class BasePage extends React.Component {

    componentDidMount() {
        const {language} = this.props;

        debug("componentWillMount", "language=", language);

        if (!language) {
            this.props.dispatch(fetchLocale());
        }

        const qs = document.querySelectorAll('.remove-after-boot');
        if (qs.length) {
            [...qs].forEach((q) => q.parentNode.removeChild(q));
        }
    }

    render() {
        const {favicon, main, children} = this.props;

        return (<SkinDiv className='app-page'>
                <Notifications key="notifications" className="app-notifications"/>
                <PageConfiguration key='pageConfiguration' favicon={favicon}/>
                <ScreenSizes key='screenSizes'/>
                <ColorScheme key='colorScheme'/>
                {main || children}
            </SkinDiv>
        )
    }
}

function mapStateToProps(state) {
    let favicon = state.authentication.options && state.authentication.options.toplefttitleimagemin;
    if (!favicon) {
        favicon = getPublicPagesFavicon();
    }
    if (!favicon) {
        favicon = DEFAULT_FAVICON;
    }

    return {
        favicon,
        language: state.locales.language
    };
}

export default connect(mapStateToProps)(BasePage);
