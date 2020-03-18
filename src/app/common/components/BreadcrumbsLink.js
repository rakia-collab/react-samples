import React, {Component} from 'react'

import {FormattedMessage} from 'react-intl';
import {intlOrElementPropType, Link} from 'cassiopae-core';

class BreadcrumbsLink extends Component {

    static displayName = 'pos.BreadcrumbsLink';

    render() {
        const {children, ...otherProps} = this.props;
        let _children = children;
        if (typeof children === 'object') {
            // i18n Message
            _children = <FormattedMessage {...children}/>;
        }

        return (
            <Link {...otherProps}>
                {_children}
            </Link>
        );
    }
}

BreadcrumbsLink.propTypes = {
    ...Link.propTypes,
    children: intlOrElementPropType,
};

export default BreadcrumbsLink;
