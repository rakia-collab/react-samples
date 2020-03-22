import React from 'react';
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import {
    Box,
    Col,
    Row,
    TextEntry,
    SelectField,
    SearchEntryField,
    CurrencyEntryField,
    GlobalMessages,
} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, Field, } from 'redux-form';
import DealerField from './DealerField'
import LabelTraductionPopup from '../../components/LabelTraductionPopup'
import ReactFlagsSelect from '../../components/ReactFlagsSelect';
import setIn from 'redux-form/lib/structure/plain/setIn';
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
                    <Row>
                        <Col xs={6}>
                            <Col xs={11}>
                                <Field name={`${makeDesignationByLanguageExp}.designation`}
                                       component={TextEntry}
                                       readOnly={readOnly}
                                       title={formatMessage(messages.designation)}>

                                </Field>
                            </Col>

                            <Col xs={1}>

                                <button type="button" className="btn-primary btn-language"
                                        onClick={this.handleShowModal}>
                                    <i className="fa fa-language"></i>
                                </button>
                            </Col>
                        </Col>
                        <Col xs={6}>

                            <DealerField
                                form={form}
                                make={make}
                                readOnly={readOnly}
                                makeotherdataExp={makeotherdataExp}
                                title={messages.dealer}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className='reactflag'>

                            <div className='text-left'>
                                <label>{formatMessage(messages.country)}</label>
                            </div>
                            <ReactFlagsSelect name={`${makegeneraldataExp}.countryCode`}
                                              onSelect={this.onSelectFlag}
                                              defaultCountry="FR"/>

                        </Col>
                        <Col xs={6}>
                            <Field name={`${makegeneraldataExp}.brandRef`}
                                   component={TextEntry}
                                   readOnly={readOnly}
                                   title={formatMessage(messages.makeCodeTitle)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Field name={`${makeotherdataExp}.oemClassification`}
                                   readOnly={readOnly}
                                   component={TextEntry}
                                   title={messages.oem}/>

                        </Col>
                        <Col xs={6}>
                            <Field name={`${makeotherdataExp}.variantClassification`}
                                   component={TextEntry}
                                   readOnly={readOnly}
                                   title={formatMessage(messages.codeVariant)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <SelectField  name={`${makegeneraldataExp}.currencyCode`}
                                          options={options}
                                          title={formatMessage(messages.currency)}/>
                        </Col>

                    </Row>

                </Box>
            </div>
        );
    }

}

    export const validateGeneralinfo = (values, props, errors) => {

        let {makeGeneralData, makeOtherData, makeDesignationByLanguage} = values.make;
        let {makeDesignationByLanguageExp} = props;
        if (!makeGeneralData) {
            errors = setIn(errors, 'make.makeGeneralData.currencyCode', GlobalMessages.fieldRequire);
            errors = setIn(errors, 'make.makeGeneralData.countryCode', GlobalMessages.fieldRequire);
            errors = setIn(errors, 'make.makeGeneralData.brandRef', GlobalMessages.fieldRequire);
        } else {
            if (!makeGeneralData.currencyCode) {
                errors = setIn(errors, 'make.makeGeneralData.currencyCode', GlobalMessages.fieldRequire);
            }
            if (!makeGeneralData.countryCode) {
                errors = setIn(errors, 'make.makeGeneralData.countryCode', GlobalMessages.fieldRequire);
            }

            if (!makeGeneralData.brandRef) {
                errors = setIn(errors, 'make.makeGeneralData.brandRef', GlobalMessages.fieldRequire);
            }

        }
        if (!makeOtherData) {
            errors = setIn(errors, 'make.makeOtherData.dealer', GlobalMessages.fieldRequire);
            errors = setIn(errors, 'make.makeOtherData.variantClassification', GlobalMessages.fieldRequire);
            errors = setIn(errors, 'make.makeOtherData.oemClassification', GlobalMessages.fieldRequire);
        } else {
            if (!makeOtherData.dealer) {
                errors = setIn(errors, 'make.makeOtherData.dealer', GlobalMessages.fieldRequire);
            }



            if (!makeOtherData.variantClassification) {
                errors = setIn(errors, 'make.makeOtherData.variantClassification', GlobalMessages.fieldRequire);
            }

            if (!makeOtherData.oemClassification) {
                errors = setIn(errors, 'make.makeOtherData.oemClassification', GlobalMessages.fieldRequire);
            }

        }
        if(!makeDesignationByLanguage)
        {
            errors = setIn(errors, `${makeDesignationByLanguageExp}.designation`, GlobalMessages.fieldRequire);
        }
        return errors;
    };
