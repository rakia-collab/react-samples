import React from 'react';
import ModelDetails from'./ModelDetails'
import {NavTabs} from 'cassiopae-core';

class NavTabDetailModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeTabKey: "tabDetail", expModel:"make.models["+this.props.make.models.length+"]", indexFirstNewModel:this.props.make.models.length}
    }
    handleTabModelChange = (key) => {
        this.setState({
            activeTabKey: key,
            expModel: key
        });
        this.props.changePathFileddOfModel(key)
    };

    render() {
        const { intl,form, nbrNavTab } = this.props;
        const newModels    =[];
         let nbrNewModel=1;
     for(let i= this.state.indexFirstNewModel;i<= (this.state.indexFirstNewModel+nbrNavTab);i++) {
            if (i === this.state.indexFirstNewModel) {
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
                    title: "Model détail " + nbrNewModel,
                    body: <ModelDetails  expModel={this.state.expModel}  {...this.props} test={"tabDetail " + i} form={form} intl={intl}/>,
                    active: this.state.activeTabKey === "make.models["+i+"]" || this.state.activeTabKey == "tabTrim",
                });
                nbrNewModel=nbrNewModel+1;
            }
        }








        return ( <NavTabs className='options'
                         handleTabChange={this.handleTabModelChange}  tabs={newModels}/>);
    }
}

export default NavTabDetailModel;
