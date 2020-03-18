import React from 'react'
import {Field, reduxForm} from 'redux-form';
import { Row, Col, button } from "react-bootstrap";
import {Box, DateEntry, TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {  injectIntl} from 'react-intl';
import {connect} from 'react-redux';


class TrimDetail extends React.Component {




    render() {

        const {intl: {formatMessage},handleCloseDetail} = this.props;

        const titleTrim =(<div className="box-tools-filter pull-left">
            <span className="glyphicon glyphicon-plus-sign"/>
            {formatMessage(messages.newTrimTitle)} </div>);

        const closeTools=     <div className="box-tools-filter pull-right">
            <button type="button" className="btn btn-box-tool" onClick={handleCloseDetail} >
                <i className="fa fa-remove"></i>
            </button>

        </div>
        return (
            <div>
                <Box title={titleTrim} tools={closeTools} type='primary'>
                    <Row >
                        <Col  xs={4}>
                            <Field name="test"
                                   component={TextEntry}
                                   title={formatMessage(messages.dtDebutTitle)}/>
                        </Col>
                        <Col  xs={4} >
                            <Field name="debut"
                                   component={DateEntry}
                                   title={messages.dtDebutTitle}/>
                        </Col>
                        <Col xs={4}>
                            <Field
                                name="dateFin"
                                component={DateEntry}
                                title={formatMessage(messages.dtFinTitle)}

                            />
                        </Col>
                    </Row>
                </Box>

                </div>
        )
    }
}

export default (injectIntl(TrimDetail));