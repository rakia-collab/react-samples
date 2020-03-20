import React from 'react';
import StepContainer from '../../components/StepContainer';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {fetchFullMake, initMakeModel} from '../reducers/actions';
import messages from '../../Constantes/messages';



class makeContainer extends React.Component {
    constructor(props) {
        super(props);



    }

    componentDidMount() {

        const {
            params: {makecode}, location: {pathname},fetchMake, initMakeModel
        } = this.props;
        if (makecode) {
            fetchMake(makecode);
        }else {
            initMakeModel;
        }
    }


    render() {

        const {
           intl: {formatMessage},
        } = this.props;

        return (
            <div>
            <StepContainer id='pos.make' stepModal={false}/>
                <button type="button" className="btn-danger pull-right"  >

                    {formatMessage(messages.submit)}

                </button>
            </div>

        );
    }

}
const mapDispatchToProps = {
    fetchMake: fetchFullMake,initMakeModel
};
export default connect(null, mapDispatchToProps)(injectIntl(makeContainer));