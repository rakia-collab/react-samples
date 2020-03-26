import React from 'react';
import StepContainer from '../../components/StepContainer';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {fetchFullMakeByCode, initMakeModel, saveMakeModel, updateMakeModel} from '../reducers/actions';
import messages from '../../Constantes/messages';



class makeContainer extends React.Component {
    constructor(props) {
        super(props);



    }

    componentDidMount() {

        const {
            params: {makecode}, fetchMake, initMakeModel, fetchFullMakeByCode
        } = this.props;
        if (makecode) {
            fetchFullMakeByCode(makecode);
        }else {
            initMakeModel();
        }
    }


    render() {

        const {
            saveMakeModel, updateMakeModel
        } = this.props;
        return (

            <StepContainer id='pos.make'
                           stepModal={false}
                           saveMakeModel={saveMakeModel}
                           updateMakeModel={updateMakeModel}
            />


        );
    }

}
const mapDispatchToProps = {
    fetchFullMakeByCode,
    initMakeModel,
    saveMakeModel,
    updateMakeModel
};
export default connect(null, mapDispatchToProps)(injectIntl(makeContainer));