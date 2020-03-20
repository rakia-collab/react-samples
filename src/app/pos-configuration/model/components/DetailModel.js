import React from 'react';
import {injectIntl} from 'react-intl';
import {TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import { Box, Col,Row, change,formValueSelector ,Field, reduxForm} from 'redux-form';
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import {connect} from 'react-redux';

class DetailModel extends React.Component {




    render() {
        const {intl: {formatMessage},modelField} = this.props;

        const titleModelDetail=   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.detailModelTitle)}
        </div>);
        const toolsModelDetail=   (       <div className="box-tools-filter pull-right">

            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btModifierModelTitle)}</Tooltip>}>

                <Button  className="btn-primary btn-box-tool ">
                    <i className="fa fa-edit"></i>
                </Button>
            </OverlayTrigger>
        </div>);

        return (<form>
            <Box title={titleModelDetail}  type='primary' tools={toolsModelDetail} >

                <Row>
                    <Col  >
                        <Field
                            name={`${modelField}.modelgeneraldata.modelref`}
                            component={TextEntry}
                            title={messages.modelRefTitle}/>
                    </Col>
                    <Col  >
                        <Field
                            name={`${modelField}.modelgeneraldata.vehicletype`}
                            component={TextEntry}
                            title={messages.typeVehicule}

                        />
                    </Col>
                </Row>



            </Box></form>
        );
    }

}

const FORM ='marqueForm';
const mapStateToProps = (state, props) => {

    var indexModel = state.model.indexModelSelected
    const modelField = `make.listmodels[${indexModel}]`;
    const selector = formValueSelector(FORM);
    return {
        modelField


    };
};


export default  connect(mapStateToProps, null) (injectIntl(DetailModel));
