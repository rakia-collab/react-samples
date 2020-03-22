import React from 'react'
import {Field, reduxForm} from 'redux-form';
import { Row, Col, button } from "react-bootstrap";
import {Box, DateEntry, TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {  injectIntl} from 'react-intl';
import {connect} from 'react-redux';


class TrimDetail extends React.Component {




    render() {

        const {intl: {formatMessage}, expTrim, nbrNavTab, id} = this.props;


        /*let nbrNewTrims=[];
        if(nbrNavTab>0) {
            for (let i = 1; i <= nbrNavTab; i++) {
                nbrNewTrims.push(
                    <button type="button" className="btn-primary btn-danger btn-box-tool">
                        {i}
                    </button>
                );
            }
        }
        const   btToolsTrim  =(<div>
            {nbrNewTrims}
        </div>);
*/
        return (

                    <Box id={id+"box.infoTrim"} >
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

                    </Box>


        )
    }
}

export default (TrimDetail);