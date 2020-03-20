import React from 'react';
import messages from '../../Constantes/messages';
import ModelDetails from'./ModelDetails'
import {Button, Div, Modal, NavTabs, Row} from 'cassiopae-core';
import TrimContainer from '../../trimLevel/components/TrimContainer';
import {button} from "react-bootstrap";

class NavTabDetailModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeTabKey: "tabDetail", expModel:"make.models[0]"}
    }
    handleTabModelChange = (key) => {
        this.setState({
            activeTabKey: key,
            expModel: key
        });
        this.props.changePathFileddOfModel(key)
    };

    render() {
        const { intl,form, nbrNavTab  } = this.props;
        const newModels    =[];


     for(let i=0;i<=nbrNavTab;i++) {
            if (i === 0) {
                newModels.push({
                    id: "model.tab",
                    key: "make.models["+i+"]",
                    title: "Model détail",
                    body: <ModelDetails  expModel={this.state.expModel} {...this.props} test={"tabDetail"} form={form} intl={intl}/>,
                    active: this.state.activeTabKey === "make.models["+i+"]" || this.state.activeTabKey == "tabTrim",
                });
            } else {
                newModels.push({
                    id: "model.tab" + i,
                    key: "make.models["+i+"]",
                    title: "Model détail " + i,
                    body: <ModelDetails  expModel={this.state.expModel}  {...this.props} test={"tabDetail " + i} form={form} intl={intl}/>,
                    active: this.state.activeTabKey === "make.models["+i+"]" || this.state.activeTabKey == "tabTrim",
                });
            }
        }








        return ( <NavTabs className='options'
                         handleTabChange={this.handleTabModelChange}  tabs={newModels}/>);
    }
}

export default NavTabDetailModel;
