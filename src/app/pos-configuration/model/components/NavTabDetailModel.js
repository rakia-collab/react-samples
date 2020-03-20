import React from 'react';
import messages from '../../Constantes/messages';
import ModelDetails from'./ModelDetails'
import {Button, Div, Modal, NavTabs, Row} from 'cassiopae-core';
import TrimContainer from '../../trimLevel/components/TrimContainer';
import {button} from "react-bootstrap";

class NavTabDetailModel extends React.Component {

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
        const { intl,form  } = this.props;


        const tab1    =[];

        tab1.push({
            id:"model.tab",
            key: "tabDetail",
            title: "Model détail",
            body:  <ModelDetails form={form} intl={intl}  />,
            active: this.state.activeTabKey ==="tabDetail" || this.state.activeTabKey =="tabTrim",
        });
        tab1.push({
            id:"model.tab2",
            key: "tabDetail2",
            title: "Model détail 2",
            body:  <ModelDetails form={form} intl={intl}  />,
            active: this.state.activeTabKey ==="tabDetail2" || this.state.activeTabKey =="tabTrim2",
        });

        tab1.push({
            id:"model.tab3",
            key: "tabDetail3",
            title: "Model détail 3",
            body:  <ModelDetails form={form} intl={intl}  />,
            active: this.state.activeTabKey ==="tabDetail3" || this.state.activeTabKey =="tabTrim3",
        });


        return ( <NavTabs className='options'
                         handleTabChange={this.handleTabChange}  tabs={tab1}/>);
    }
}

export default NavTabDetailModel;
