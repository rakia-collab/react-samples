'use strict'
import React from 'react'
import { reduxForm} from 'redux-form';
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import  MakeModelContainer from './MakeModelContainer'
import {connect} from 'react-redux';
import messages from '../Constantes/messages';
import {injectIntl} from 'react-intl';



class ToolbarMakeModel extends React.Component {

    componentWillMount() {
    }




    render() {
        const {intl: {formatMessage}} = this.props;

        return (
            <Row xs={4} className="box-tools-filter pull-right">
                <Col xs={4}>
                    <OverlayTrigger trigger="hover" placement="top"
                                    overlay={<Tooltip>{formatMessage(messages.btSearchTitle)}</Tooltip>}>

                        <button type="button" className="btn-default btn-box-tool" onClick={this.props.handleShowSearch}>
                            <i className="fa fa-search"></i>
                        </button>
                    </OverlayTrigger>
                </Col>
                <Col xs={4}>
                    <OverlayTrigger trigger="hover" placement="top"
                                    overlay={<Tooltip>{formatMessage(messages.btAddTitle)}</Tooltip>}>

                        <button type="button" className="btn-default btn-box-tool" onClick={this.props.handleShowAdd} >
                            <i className="fa fa-plus"></i>
                        </button>
                    </OverlayTrigger>
                </Col>
                <Col xs={4}>
                    <OverlayTrigger trigger="hover" placement="top"
                                    overlay={<Tooltip>{formatMessage(messages.btRemoveTitle)}</Tooltip>}>

                        <button type="button" className="btn-default btn-box-tool " onClick={this.props.handleShowRemove}>
                            <i className="fa fa-remove"></i>
                        </button>
                    </OverlayTrigger>
                </Col>

            </Row>);
                    }

}


export default (injectIntl(ToolbarMakeModel));
