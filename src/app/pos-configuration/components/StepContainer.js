import React from 'react';
import {injectIntl} from 'react-intl';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import Immutable from 'seamless-immutable';
import {reduxForm,change, formValueSelector, getFormValues, getFormSyncErrors, arrayPush} from 'redux-form';
import GenarlInfoMake, {validateGeneralinfo} from '../make/components/GenarlInfoMake';
import ModelContainer , {validateModel} from '../model/components/ModelContainer';
import Filtrage from '../make/components/Filtrage';
const filtersalesIni ={
    "network" : null,
    "category" : "null"
};
import {
    Div,
    MultiStep,
    Form,
    EMPTY_OBJECT,
    ValidationScope,
    focusFirstError,
    createErrorSelector,
    notify, GlobalMessages
} from 'cassiopae-core';
import {NEWMAKEMODEL} from '../index';
import messages from '../Constantes/messages';
import * as c from '../Constantes/const';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
const categFS = [
    {code: 'CAR', label: 'Cars'},
    {code: 'MATERIAL', label: 'Material'},
    {code: 'INTANGIBLE', label: 'Finance'},

];

const catOth =[{code: 'REALESTATE', label: 'Real Estate',id:'0'}];

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
         let {saveMakeModel, updateMakeModel, location, change, form, dispatch, makeFormValues, touch, errors, listSelected, arrayPush} = this.props;
         errors = validate(makeFormValues, this.props);
         if (Object.keys(errors).length) {
             touch(errors);
             return;
         }

         if(listSelected.length>0) {
             let filteringByNetworkAndCategory = [];
             listSelected.forEach((item) => {
                 const found = categFS.find(element => element.code === item.code);
                 let code ="FS"
                 if (!found) {
                     const found = catOth.find(element => element.code === item.code);
                     code ="OTHER";
                 }
        //         arrayPush(form, 'make.filteringByNetworkAndCategory', {network: code, category: item.code});


             });

         }
         if (location.pathname === NEWMAKEMODEL) {

             saveMakeModel(data.make).then((result) => {
                 notify.show("Save Succes", notify.SUCCESS);
                  result.controlsMsgList.forEach((control) => {
                         notify.show(control.message, notify.WARNING);
                    });


             }).catch(error => {
                 const errMsg = ((error || {}).data || {}).message || messages.notifyFail;
                 notify.show(errMsg, notify.WARNING);

             });


         }
         else
             updateMakeModel(data.make).then((result) => {
                 notify.show("Update Succes", notify.SUCCESS);
                 result.controlsMsgList.forEach((item) => {
                         notify.show(item.message, notify.WARNING);
                     });


             }).catch(error => {
                 const errMsg = ((error || {}).data || {}).message || messages.notifyFail;
                 notify.show(errMsg, notify.ERROR);

             });

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
                        <OverlayTrigger trigger="hover" placement="top"
                                        overlay={<Tooltip>{formatMessage(messages.btsaveMakeTitle)}</Tooltip>}>

                        <button type="submit" className="btn-primary btn-box-tool  pull-right" >


                                {formatMessage(messages.submit)}
                        </button>
                        </OverlayTrigger>



                    </Div>
                </Form>


        );
    }



}
let submitFailedId = 1;

const validate = (values, props) => {

    let errors = {};
    errors = validateGeneralinfo(values, props, errors);
    //errors = validateModel(values, props, errors);
    return errors;
};

StepContainer = reduxForm({
    form: FORM,
    enableReinitialize: true,
    validate,

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
        form: FORM,
        errors: getFormSyncErrors(FORM)(state) || EMPTY_OBJECT,
        currentFields: state.form[FORM] ? state.form[FORM].registeredFields : [],
        makeFormValues: values,
        listSelected: state.make.listSelected
    };
}

const mapDispatchToProps = {
    change,arrayPush
};
export default connect(mapStateToProps, null)(injectIntl(withRouter(StepContainer)));
