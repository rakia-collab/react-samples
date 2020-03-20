import React from 'react'
import {Field, reduxForm} from 'redux-form';
import { Row, Col, button } from "react-bootstrap";
import {Box, DateEntry, TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {  injectIntl} from 'react-intl';
import {connect} from 'react-redux';


class TrimDetail extends React.Component {




    render() {

        const {intl: {formatMessage},handleCloseDetail,expTrim} = this.props;



        const closeTools=     <div className="box-tools-filter pull-right">
            <button type="button" className="btn btn-box-tool" onClick={handleCloseDetail} >
                <i className="fa fa-remove"></i>
            </button>

        </div>
        return (

                    <Row >
                        <Col  xs={4}>
                            <Field name={`${expTrim}.code`}
                                   component={TextEntry}
                                   title={formatMessage(messages.trimCodeTitle)}/>
                        </Col>
                        <Col  xs={4} >
                            <Field name={`${expTrim}.levelDesignations`}
                                   component={TextEntry}
                                   title={messages.trimFinitionTitle}/>
                        </Col>

                    </Row>


        )
    }
}

export default (TrimDetail);