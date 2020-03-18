import React from 'react';
import {injectIntl} from 'react-intl';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import Debug from 'debug';
import {
    Div,
    MultiStep
} from 'cassiopae-core';
import ModelDetails from '../model/components/ModelDetails';
import TrimContainer from '../trimLevel/components/TrimContainer';
import messages from '../Constantes/messages';
import {change,formValueSelector,getFormValues } from 'redux-form';



const debug = Debug('conf.config.step:StepContainerModal');


const FORM ='marqueForm'
class StepContainerModal extends React.Component {

    constructor() {
        super();
        this.state = {
            stepKey: 'detailModel'
        }
    }

    handleStepChange = (stepIndex, stepKey) => {
        this.setState({stepKey});
    };

    handleStepUpdate = (stepIndex, stepKey) => {

    };
    static displayName = 'conf.StepContainerModal';
    stepsSelector = createSelector(
        (props) => props.step,
        (props) => props.key,

        (...args) => {
            return this.computeSteps(...args);
        }
    );
    computeSteps(step, key) {


        const {intl,modelField,form} = this.props;


            return [
                {
                    key: 'detailModel',
                    id: 'conf.modal.step.etailModel',
                    order: 1,
                    name: messages.detailModelTitle,
                    component: <ModelDetails intl={intl} form={FORM} {...this.props} />,

                },
                {
                    key: 'trim',
                    id: 'conf.modal.step.trimInfo',
                    order: 2,
                    name: messages.trimTitle,
                    component: <TrimContainer intl={intl} form={FORM} {...this.props} />
                }
            ];


    }
    handleStepChange = (stepIndex, stepKey) => {

        this.setState({
            stepKey: stepKey
        });
    };
    handleStepUpdate = (stepIndex, stepKey) => {
        debug('onStepUpdate', 'stepIndex=', stepIndex, 'stepKey=', stepKey, 'errors=', 'rrr');

    };
    handleOnSave = () => {
        debug('componentDidMount', 'props=', this.props);
        const {setCurrentEvent, onSave} = this.props;

        // We release the current event when saving deal
        setCurrentEvent(null);
        onSave(null);
    };

    render() {

        const {
            stepKey,
        } = this.state;

        let steps = this.stepsSelector(this.props);


        const id = 'stepContainer';
        return (


                <Div id={id} className='skin-sopra newDeal' parentProps={this.props} parentState={this.state}>
                    <MultiStep id={id + ':multistepmodel'}
                               steps={steps}
                               stepKey={stepKey}
                               onStepChange={this.handleStepChange}
                               onStepUpdate={this.handleStepUpdate}/>
                </Div>



        );
    }



}



const mapStateToProps = (state, props) => {

    const selector = formValueSelector(FORM);
    const formValues = getFormValues(FORM);
    const make = selector(state, 'make');
    var listModels = make.listmodels;
    var indexModel = state.model.indexModelSelected
    const modelField = `make.listmodels[${indexModel}]`;
    const values = formValues(state) || EMPTY_OBJECT;

    return {
        values,
        listModels,
        isPopupModelDetailLoade: state.model.isPopupModelDetailLoade,
        indexModel:indexModel,
        modelField,
        form:FORM


    };
};


export default connect(mapStateToProps, null)  (injectIntl(StepContainerModal));
