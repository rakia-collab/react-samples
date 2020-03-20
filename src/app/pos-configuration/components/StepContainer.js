import React from 'react';
import {injectIntl} from 'react-intl';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Button} from 'react-bootstrap';
import {reduxForm,change, formValueSelector, getFormValues} from 'redux-form';
import GenarlInfoMake from '../make/components/GenarlInfoMake';
import Filtrage from '../make/components/Filtrage';
import Debug from 'debug';
import {
    Div,
    MultiStep,
    Form,
    EMPTY_OBJECT
} from 'cassiopae-core';
import Immutable from 'seamless-immutable';

import {NEWMAKEMODEL} from '../index';
export const ID = 'newDealMultiStepForm';
import ModelContainer from '../model/components/ModelContainer';

import messages from '../Constantes/messages';
const debug = Debug('pos.config.step²:StepContainer');
const FORM ='marqueForm'
 class StepContainer extends React.Component {

     constructor() {
         super();
         this.state = {
             stepKey: 'generalInfo'
         }
     }

     handleStepChange = (stepIndex, stepKey) => {

         this.setState({
             stepKey: stepKey
         });
     };

     handleOnSubmit = (data) => {
         const {saveMakeModel, updateMakeModel, location} = this.props;

         if (location.pathname === NEWMAKEMODEL) {
             saveMakeModel(data.make);
         }
         else
             updateMakeModel(data.make);
     };

    stepsSelector = createSelector(
        (props) => props.step,
        (props) => props.key,

        (...args) => {
            return this.computeSteps(...args);
        }
    );
     computeSteps(step, key) {

         const {intl, makeExp, make} = this.props;

                return [
                {
                    key: 'generalInfo',
                    id: 'pos.countryTitle.step.generalinfo',
                    order: 1,
                    name: messages.generalInformation,
                    component: <GenarlInfoMake form={FORM} {...this.props}/>,

                },
                {
                    key: 'filtrage',
                    id: 'pos.countryTitle".step.customer',
                    order: 2,
                    name: "Filtrage",
                    component: <Filtrage intl={intl} form={FORM} {...this.props} />,
                    validationScope: '',
                },
                {
                    key: 'model',
                    id: 'pos.countryTitle.step.model',
                    order: 3,
                    name: 'model',
                    component: <ModelContainer  intl={intl}  form={FORM} {...this.props} />,
                }
            ];

     }


    render() {

        const {
            stepKey,
        } = this.state;
        const {
            intl: {formatMessage},reset, handleSubmit
        } = this.props;

        let steps = this.stepsSelector(this.props);
        const labels = Immutable([{code: 'jalcode', label: 'Make Model Configuration'},]);
        const colors = Immutable([{code: 'jalcode', label: 'red'},]);


        const id = 'stepContainer';
        return (

                <Form ref="portalquote"    skin={true} name={FORM} onSubmit={handleSubmit(this.handleOnSubmit)}>
                    <Div id={id} className='newDeal' parentProps={this.props} parentState={this.state}>
                <MultiStep id={id + ':multistep'}
                           steps={steps}
                           stepKey={stepKey}
                           onStepChange={this.handleStepChange}/>

                        <Button type="submit" bsStyle="success" className="pull-right">

                            {formatMessage(messages.submit)}

                        </Button>

                    </Div>
                </Form>


        );
    }



}
StepContainer = reduxForm({
    form: FORM,
    enableReinitialize: true

})(StepContainer);

const selector = formValueSelector(FORM);
const formValues = getFormValues(FORM);
function mapStateToProps(state, props) {
    const values = formValues(state) || EMPTY_OBJECT;
    const make = state.make;
    const readOnly = false;
    return {
        make,
        readOnly,
        makeExp:'make',
        modelExp:'make.listmodels',
        makegeneraldataExp:'make.makeGeneralData',
        makeotherdataExp:'make.makeOtherData',
        makeDesignationByLanguageExp:'make.makeDesignationByLanguage[0]',
        submitFailedId: values.submitFailedId,
       initialValues: {make:state.make.make,},
        form: FORM
    };
}

const mapDispatchToProps = {
    change,
};
export default connect(mapStateToProps, null)(injectIntl(withRouter(StepContainer)));
