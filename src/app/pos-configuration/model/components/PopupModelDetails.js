import React from 'react';
import messages from '../../Constantes/messages';
import ModelDetailsContainer from'./ModelDetailsContainer'
import {Modal} from 'cassiopae-core';


class PopupModelDetail extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { isPopupModelDetailLoade, onClose, intl, form  } = this.props;
        const titlePopup =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { intl.formatMessage(messages.detailModelTitle)}
        </div>)


        return (
            <Modal title={titlePopup} ref='modal' className='skin-sopra large-modal' show={isPopupModelDetailLoade} onClose={onClose} >
             <ModelDetailsContainer {...this.props}  form={form} intl={intl} />
            </Modal>
        );
    }
}

export default PopupModelDetail;
