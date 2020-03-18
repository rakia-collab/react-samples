import React from 'react'
import cls from 'classnames';
import {injectIntl} from "react-intl";

import {formatMessage} from "./components";
import {withAccessKeysAndCol} from '../../accesskeys/accessKeyWrapper';

class FormGroup extends React.Component {

    static displayName = 'pos.FormGroup';

    render() {
        const {className, classNames, children, forInputId, title} = this.props;

        const cl = {'form-group': true};
        if (className) {
            className.split(' ').forEach((c) => cl[c] = true);
        }

        const pc = classNames;
        if (pc) {
            for (let k in pc) {
                cl[k] = pc[k];
            }
        }

        const _title = formatMessage(intl, title);

        return (
            <div className={cls(cl)}>
                <label className="control-label" htmlFor={forInputId}>{_title}</label>
                {children}
            </div>);
    }
}

export default withAccessKeysAndCol(injectIntl(FormGroup));
