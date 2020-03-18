'use strict'
import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {
    newAccessKeysSelector,
    Box,
    TextEntry,
    Row,
    Col,
    Button
} from 'cassiopae-core';
import {connect} from 'react-redux';
import messages from '../Constantes/messages';
import {injectIntl} from 'react-intl';

const FORM = 'formSearchMake';

class SearchMakeModelContainer extends React.Component {

    componentWillMount() {
    }


    render() {
        const {intl: {formatMessage}} = this.props;
        const suffixSearch=   <span className='glyphicon glyphicon-search' />
        const toolBox = (
            <div className="box-tools-filter pull-right">
                <button type="button" className="btn btn-box-tool" onClick={this.props.handleClose} >
                    <i className="fa fa-remove"></i>
                </button>

            </div>

        );
        const titleSearch=   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-search" />
            {formatMessage(messages.recherche)} </div> );

        return (
                <Row>
                <Box type='primary' withBoder='true'   title={titleSearch} collapsible={true} tools={toolBox}  >
                    <Row  >
                        <Col xs={4} >

                    <Field name="make"
                           component={TextEntry}
                           title={formatMessage(messages.makeTitle)}
                           suffix={suffixSearch} />
                        </Col>
                        <Col xs={4}>
                    <Field name="country"
                           component={TextEntry}
                           title={formatMessage(messages.countryTitle)}
                           suffix={suffixSearch} />
                            </Col>
                        <Col xs={4}>
                            <Field
                                name="dealer"
                                component={TextEntry}
                                title={formatMessage(messages.concessionaireTitle)}
                                suffix={suffixSearch} />
                        </Col>
                    </Row>
                    <Row>
                    <Col   >

                            <Button   className='primary fa fa-search pull-right' >
                               {formatMessage(messages.btSearchTitle)}
                            </Button>
                    </Col>
                    </Row>


                </Box>
                </Row>
        )
    }
}
SearchMakeModelContainer = reduxForm({
    form: FORM
})(SearchMakeModelContainer);

const mapStateToProps = (state, props) => {
       return {

    };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SearchMakeModelContainer));
