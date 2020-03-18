import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import './debugInfos.less';
import {hideDebugInfos, SHOW_HIDDEN_FIELDS} from "../../reducers/authentication";
import {CCH_CONTEXT_FIELDNAME, CCH_CONTEXT_MODULE} from "../lib/Div";

const ATTRIBUTE_NAME = 'data-debugInfos';
var attributeId = 0;

class DebugInfos extends React.Component {

    state = {
        over: false,
        showRxname: true,
        showRxCid: false,
        showRxCch: false,
        showExtensionBox: false,
        showExtensionRow: false,
        showRxHidden: false,
        showCCHContext: false,
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }

    handleScroll = (event) => {
        let scrollTimerId = this._scrollTimerId;
        if (scrollTimerId) {
            this._scrollTimerId = undefined;

            if (!this.state.scrolling) {
                this.setState({scrolling: true});
            }

            clearTimeout(scrollTimerId);
        }

        this._scrollTimerId = setTimeout(() => {
            this.setState({scrolling: false});
        }, 1000);
    };

    handleOver = (event) => {
        const name = event.target.getAttribute('data-id');

//        console.log('Over', name);

        this.setState({over: name});
    };

    handleOut = (event) => {
        const name = event.target.getAttribute('data-id');

        this.setState({over: null});

//        console.log('Out', name);
    };

    handleFilter = (event) => {
        const type = event.target.getAttribute('data-type');
        const checked = event.target.checked;

        if (type === 'showRxHidden') {
            this.props.dispatch({type: SHOW_HIDDEN_FIELDS, show: checked});
        }

        this.setState({[type]: checked, disabled: false});
    };

    handleDisable = () => {
        this.setState({disabled: !this.state.disabled});
    };

    handleRefresh = () => {
        this.forceUpdate();
    };

    handleClose = () => {
        const {dispatch} = this.props;

        dispatch(hideDebugInfos());
    };

    render() {
        const {showDebugInfos} = this.props;
        if (!showDebugInfos) {
            return null;
        }

        const {
            over,
            disabled,
            showRxname,
            showRxCid,
            showRxCch,
            showExtensionBox,
            showExtensionRow,
            showRxHidden,
            scrolling,
            showCCHContext,
        } = this.state;

        const components = (!scrolling && !disabled) && this.listComponents() || [];

        const filtredMasks = components.reduce((acc, component) => {
            let name = component.getAttribute(ATTRIBUTE_NAME);
            if (!name) {
                name = 'key-' + (attributeId++);
                component.setAttribute(ATTRIBUTE_NAME, name);
            }

            const rect = component.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                return acc;
            }

            let depth = 0;

            for (let c = component; c.parentNode; c = c.parentNode) {
                depth++;
            }

            acc.push({
                name,
                component,
                rect,
                depth
            });
            return acc;
        }, []);


        const masks = filtredMasks.map(({name, component, rect}) => {

            const style = {
                top: rect.top + 'px',
                left: rect.left + 'px',
                width: rect.width + 'px',
                height: rect.height + 'px',
            };

            const cls = {
                'debug-info-key': true,
                'debug-box': showExtensionBox && component.getAttribute('data-extension-box'),
                'debug-row': showExtensionRow && component.getAttribute('data-extension-row'),
                'debug-name': showRxname && component.getAttribute('data-rxname'),
                'debug-cid': showRxCid && component.getAttribute('data-rxcid'),
                'debug-cch': showRxCch && component.getAttribute('data-rxcch'),
                'debug-hidden': showRxHidden && component.getAttribute('data-rxhidden'),
                'debug-over': name === over,
            };

            let label = "";
            if (cls['debug-box']) {
                label = 'BOX ' + cls['debug-box'];

            } else if (cls['debug-row']) {
                label = 'ROW ' + cls['debug-row'];

            } else if (cls['debug-name']) {
                label = '' + cls['debug-name'];

            } else if (cls['debug-cch']) {
                label = 'CCH ' + cls['debug-cch'];

            } else if (cls['debug-cid']) {
                label = '' + cls['debug-cid'];
            }

            if (cls['debug-hidden']) {
                label = 'Hidden ' + label;
            }

            if (showCCHContext) {
                const cchModule = component.getAttribute(CCH_CONTEXT_MODULE);
                const cchFieldName = component.getAttribute(CCH_CONTEXT_FIELDNAME);
                if (cchModule && cchFieldName) {
                    label += ` { ${cchModule} ${cchFieldName} }`;
                }
            }

            return <div key={name} className={classNames(cls)} style={style}>
                <label className='debug-label' data-id={name}
                       onMouseEnter={this.handleOver}
                       onMouseLeave={this.handleOut}>{label}</label>
            </div>;
        });

        const cls = {
            'debug-infos': true,
            'debug-has-over': over,
            'debug-disabled': disabled,
        };

        return <div key='debug-infos' className={classNames(cls)}>
            <div key='overlay' className='debug-overlay'/>
            <div key='filters' className='debug-filters'>
                <div className='buttons'>
                    <label className='debug-button-box' title='These ids are to be used by plugins'>
                        <input type='checkbox' data-type='showExtensionBox' checked={showExtensionBox}
                               onChange={this.handleFilter}/>
                        Box
                    </label>
                    <label className='debug-button-row' title='These ids are to be used by plugins and CCH'>
                        <input type='checkbox' data-type='showExtensionRow' checked={showExtensionRow}
                               onChange={this.handleFilter}/>
                        Row (CCH)
                    </label>
                    <label className='debug-button-name' title='These ids are to be used by accesskeys configuration'>
                        <input type='checkbox' data-type='showRxname' checked={showRxname}
                               onChange={this.handleFilter}/>
                        Fieldname (Accesskeys)
                    </label>
                    <label className='debug-button-cid' title='These ids are to be used by accesskeys configuration'>
                        <input type='checkbox' data-type='showRxCid' checked={showRxCid}
                               onChange={this.handleFilter}/>
                        Ids
                    </label>
                    <label className='debug-button-cch' title='Show CCH components'>
                        <input type='checkbox' data-type='showRxCch' checked={showRxCch}
                               onChange={this.handleFilter}/>
                        CCH Components
                    </label>
                    <label className='debug-button-cch' title='Show CCH context'>
                        <input type='checkbox' data-type='showCCHContext' checked={showCCHContext}
                               onChange={this.handleFilter}/>
                        View CCH Context
                    </label>
                    <label className='debug-button-hidden' title='Show hidden components'>
                        <input type='checkbox' data-type='showRxHidden' checked={showRxHidden}
                               onChange={this.handleFilter}/>
                        Hidden components
                    </label>

                    <button onClick={this.handleDisable}>{disabled ? 'Show boxes' : 'Hide boxes'}</button>

                    <button onClick={this.handleRefresh}>Refresh</button>

                    <button onClick={this.handleClose}>X</button>
                </div>
            </div>
            {masks}
        </div>;
    }

    listComponents() {
        const {
            showRxname,
            showRxCid,
            showRxCch,
            showExtensionBox,
            showExtensionRow,
            showRxHidden,
        } = this.state;

        let ls = [];

        if (showExtensionBox) {
            ls = ls.concat(
                ...document.querySelectorAll('[data-extension-box]'),
            );
        }
        if (showExtensionRow) {
            ls = ls.concat(
                ...document.querySelectorAll('[data-extension-row]'),
            );
        }
        if (showRxname) {
            ls = ls.concat(
                ...document.querySelectorAll('[data-rxname]'),
            );
        }
        if (showRxCid) {
            ls = ls.concat(
                ...document.querySelectorAll('[data-rxcid]'),
            );
        }
        if (showRxCch) {
            ls = ls.concat(
                ...document.querySelectorAll('[data-rxcch]'),
            );
        }
        if (showRxHidden) {
            ls = ls.concat(
                ...document.querySelectorAll('[data-rxhidden]'),
            );
        }

        return ls;
    }
}

function mapStateToProps(state) {
    return {
        showDebugInfos: state.authentication && state.authentication.showDebugInfos,
    };
}

export default connect(mapStateToProps)(DebugInfos);
