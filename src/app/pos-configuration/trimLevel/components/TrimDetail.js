import React from 'react'
import {Field, reduxForm} from 'redux-form';
import { Row, Col, button } from "react-bootstrap";
import {Box, DateEntry, SelectField, TextEntry, withAccessKeysAndCol} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {  injectIntl} from 'react-intl';
import {connect} from 'react-redux';


class TrimDetail extends React.Component {




    render() {

        const {intl: {formatMessage},trim} = this.props;

        const titleTrim =trim.MMOLIBELLE? (<div className="box-tools-filter pull-left">
            <span className="fa fa-edit"/>
            {formatMessage(messages.ModifierTrimTitle)} </div>):(<div className="box-tools-filter pull-left">
            <span className="glyphicon glyphicon-plus-sign"/>
            {formatMessage(messages.newTrimTitle)} </div>);

        const closeTools=     <div className="box-tools-filter pull-right">
            <button type="button" className="btn btn-box-tool" onClick={this.props.handleCloseDetail} >
                <i className="fa fa-remove"></i>
            </button>

        </div>
        return (
            <div>
                <Box title={titleTrim} tools={closeTools} type='primary'>
                    <Row>
                        <Col xs={6}>

                            <TextEntry
                                value={trim.MMOLIBELLE}
                                title={formatMessage(messages.modelTitle)}/>
                        </Col>
                        <Col xs={6}>
                            <TextEntry
                                value={trim.MMOCODE}
                                title={formatMessage(messages.makeTitle)}

                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>

                            <DateEntry
                                value={trim.MMODTSTART}

                                title={formatMessage(messages.dtDebutTitle)}/>
                        </Col>
                        <Col xs={6}>
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
const mapStateToProps = (state, props) => {

    return {
    };
};

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps) ( withAccessKeysAndCol(injectIntl(TrimDetail)));