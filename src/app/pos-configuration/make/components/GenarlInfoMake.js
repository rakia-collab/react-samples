import React from 'react';
import {Box, Col,Row, TextEntry, SelectField, SearchEntryField, CurrencyEntryField} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, Field, } from 'redux-form';
import DealerField from './DealerField'
export default class GenarlInfoMake extends React.Component {

    render() {

        const {intl: {formatMessage}, make, makeExp, makegeneraldataExp, makeotherdataExp, form, readOnly} = this.props;
        const title =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.makeDetail)}
        </div>);
        return (
            <div>
            <Box title={title} type='primary'>
                <Col xs={6}>
                    <Col >

                        <Field name={`${makegeneraldataExp}.brandref`}
                               component={TextEntry}
                               readOnly={readOnly}
                               title={formatMessage(messages.brand)}/>
                    </Col>
                    <Col >
                        <Field name={`${makegeneraldataExp}.countrycode`}
                               component={TextEntry}
                               readOnly={readOnly}
                               title={formatMessage(messages.country)}/>
                    </Col>

                    <Col >
                        <CurrencyEntryField name={`${makegeneraldataExp}.currencycode`}
                                            readOnly={readOnly}
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
                    <Field name={`${makeotherdataExp}.variantclassification`}
                           component={TextEntry}
                           readOnly={readOnly}
                           title={formatMessage(messages.codeVariant)}/>
                </Col>
                <Col  key='oem'  >
                    <Field name={`${makeotherdataExp}.oemclassification`}
                           readOnly={readOnly}
                           component={TextEntry}
                           title={messages.oem}/>
                </Col>
            </Col>
            </Box>
            </div>
        );
    }

}


