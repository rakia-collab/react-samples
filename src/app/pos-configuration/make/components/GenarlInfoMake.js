import React from 'react';
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import {Box, Col,Row, TextEntry, SelectField, SearchEntryField, CurrencyEntryField} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, Field, } from 'redux-form';
import DealerField from './DealerField'
import LabelTraductionPopup from '../../components/LabelTraductionPopup'
import ReactFlagsSelect from '../../components/ReactFlagsSelect';
const options = [
    {code: 'EUR', label: 'Euro'},
    {code: 'USD', label: 'US Dollar'},
    {code: 'TWD', label: 'Taiwan New Dollar'},
    ];


export default class GenarlInfoMake extends React.Component {

    state = {
        searchPopupShow: false,
    };
    handleShowModal = () => {
       this.setState({
            searchPopupShow: true,
        });
    };

    closeModal = () => {
        this.setState({searchPopupShow:false});
    }
    handleCurencyChange = (event, value) => {

        let {form,  makegeneraldataExp, change} = this.props;
        const label = event.target.item.label;
        if (label) {
            change(form, `${makegeneraldataExp}.currencyCode`, label);
        }
    };
    onSelectFlag = (countryCode) => {

        let {form,  makegeneraldataExp, change} = this.props;
        if (countryCode) {
            change(form, `${makegeneraldataExp}.countryCode`, countryCode);
        }
    };
    render() {

        const {intl: {formatMessage}, make, makeExp, makegeneraldataExp, makeotherdataExp,makeDesignationByLanguageExp, form, readOnly} = this.props;
        const {searchPopupShow} = this.state;
        const title =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.makeDetail)}
        </div>);
        return (
            <div>
            <Box title={title} type='primary'>
                <Col xs={6}>
                    <Col className='reactflag'>
                        <div className='text-left'>
                            <label>{formatMessage(messages.country)}</label>
                        </div>
                        <ReactFlagsSelect name={`${makegeneraldataExp}.countryCode`}
                                          onSelect={this.onSelectFlag}
                                          defaultCountry="FR"/>

                    </Col>
                    <Col >
                        <Field name={`${makeDesignationByLanguageExp}.designation`}
                               component={TextEntry}
                               readOnly={readOnly}
                               title="Mak code"/>
                    </Col>

                    <Col >

                        <Row>
                            <Col xs={11}>

                                <Field name={`${makeDesignationByLanguageExp}.designation`}
                                       component={TextEntry}
                                       readOnly={readOnly}
                                       title={formatMessage(messages.designation)}>

                                </Field>
                            </Col>
                            <Col xs={1}>

                                <button type="button" className="btn-primary btn-language" onClick={this.handleShowModal}>
                                    <i className="fa fa-language"></i>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                    <Col >


                        <SelectField  name={`${makegeneraldataExp}.currencyCode`}
                                      options={options}
                                      title={formatMessage(messages.currency)}/>
                    </Col>
                </Col>
            <Col xs={6}>

                <Row>

                    <DealerField
                        form={form}
                        make={make}
                        readOnly={readOnly}
                        makeotherdataExp={makeotherdataExp}
                        title={messages.dealer}/>
                </Row>
                <Col >
                    <Field name={`${makeotherdataExp}.variantClassification`}
                           component={TextEntry}
                           readOnly={readOnly}
                           title={formatMessage(messages.codeVariant)}/>
                </Col>
                <Col  key='oem'  >
                    <Field name={`${makeotherdataExp}.oemClassification`}
                           readOnly={readOnly}
                           component={TextEntry}
                           title={messages.oem}/>
                </Col>
            </Col>
            </Box>
            <LabelTraductionPopup
                onClose={this.closeModal}
                show={searchPopupShow}/>
            </div>
        );
    }

}


