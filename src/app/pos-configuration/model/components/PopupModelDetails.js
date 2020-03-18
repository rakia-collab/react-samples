import React from 'react';
import messages from '../../Constantes/messages';
import ModelDetails from'./ModelDetails'
import { Modal, NavTabs} from 'cassiopae-core';
import TrimContainer from '../../trimLevel/components/TrimContainer';

class PopupModelDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeTabKey: "tabDetail"}
    }
    handleTabChange = (key) => {
        this.setState({
            activeTabKey: key,
        });
    };

    render() {
        const { isPopupModelDetailLoade, onClose,intl,form  } = this.props;

        const titlePopup =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { intl.formatMessage(messages.detailModelTitle)}
        </div>)
        const tabs    =[];

        tabs.push({
            id:"model.tab",
            key: "tabDetail",
            title: "Model détail",
            body:  <ModelDetails form={form} intl={intl}  />,
            active: this.state.activeTabKey ==="tabDetail",
        });

        tabs.push({
            id:"trim.tab",
            key: "tabTrim",
            title: "Trim level",
            body:  <TrimContainer form={form} intl={intl}  />,
            active: this.state.activeTabKey ==="tabTrim",
        });

        return (
            <Modal ref='modal' className='skin-sopra large-modal' show={isPopupModelDetailLoade}  onClose={onClose} >
                <NavTabs className='options'
                         handleTabChange={this.handleTabChange}  tabs={tabs}/>

            </Modal>
        );
    }
}

export default PopupModelDetail;
