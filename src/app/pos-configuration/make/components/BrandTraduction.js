'use strict'
import React from 'react'
import {Field, reduxForm} from 'redux-form';
import { Row, Col, Button} from "react-bootstrap";
import { Box,  TextEntry, SelectField} from 'cassiopae-core';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import { country ,acttypeList} from '../../Constantes/SelectFields';
import ReactFlagsSelect from '../../components/ReactFlagsSelect';
class BrandTraduction extends React.Component {

    componentWillMount() {
    }


    render() {
        const {intl: {formatMessage}} = this.props;


        return (

            <div className="search-heading">
                <Row  >
                    <Col xs={6}>

                        <div className='text-left'>
                            <label>Country</label>
                        </div>
                        <ReactFlagsSelect defaultCountry="FR"/>

                    </Col>
                    <Col xs={6}>
                        <Field name='brand'
                               title='Brand'
                               component={TextEntry} />

                    </Col>



                </Row>


                <Row>
                    <Button  className="btn-primary  pull-right"
                             onClick={this.props.handleClose}>
                        Ajouter
                    </Button>
                </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BrandTraduction));
