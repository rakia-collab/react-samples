import React, {Component} from 'react'
import {Box, RefTableDisplay} from 'cassiopae-core';
import {AUDITSTOCKPLAN} from "../../index";
import {Link} from 'react-router'

class LinkDisplay extends Component {
    render() {
        //TODO  HAYTHEMO change 1 by id of wharehouse
        return (<Link to={AUDITSTOCKPLAN + "/" + 1}>
            <span className={this.props.clNameLink}></span>
        </Link>);
    }
}

export default class AuditCardComponent extends Component {
    render() {
        const {bgColor, panelColorClassName, row, iconClassName, customComponentMetadata} = this.props;
        const status = <RefTableDisplay data={row.status} metadata={customComponentMetadata}/>;
        return (

            <div className={panelColorClassName}>
                <div className="panel-heading" style={bgColor}>
                     {row.label}

                </div>



            </div>


        )
    }
}

