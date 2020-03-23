import React from 'react';
import ModelDetails from'./ModelDetails'
import {NavTabs} from 'cassiopae-core';

class NavTabDetailModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeTabKey: "tabDetail" , expModel:"make.models["+(props.make.models.length-1)+"]", indexFirstNewModel:(this.props.make.models.length-1)}
    }
    handleTabModelChange = (key) => {
        this.setState({
            activeTabKey: key,
            expModel: key
        });
        this.props.changePathFiledOfModel(key)
    };
    handleTabTrimChange= (key) => {
        this.setState({
            activeTabKey: key,
        });
    };
    render() {
        const { intl, form, nbrNavTab, indexModel } = this.props;
        const { indexFirstNewModel,expModel, activeTabKey } = this.state
        const newModels    =[];
         let nbrNewModel=1;
         let totalModels=indexFirstNewModel+nbrNavTab

        if(nbrNavTab >0) {    //************this condition inform us about the new model and an existing model /*****************
            for(let i= indexFirstNewModel;i<totalModels;i++) {

                if (newModels.length <=0 && i=== indexFirstNewModel) {

                    newModels.push({
                        id: "model.tab",
                        key: "make.models["+i+"]",
                        title: "Model détail",
                        body: <ModelDetails indexModelTab={i} id={"model.tab" + i}  expModel={expModel} {...this.props}  form={form} intl={intl}/>,
                    });




                } else {


                    newModels.push({
                        id: "model.tab" + i,
                        key: "make.models["+i+"]",
                        title: "Model détail " + nbrNewModel,
                        body: <ModelDetails indexModelTab={i} id={"model.tab" + i} expModel={this.state.expModel}  {...this.props}  form={form} intl={intl}/>,
                        active:  activeTabKey === "make.models["+i+"]",
                    });



                    nbrNewModel=nbrNewModel+1;
                }
            }
        }
        else {
           let expModel="make.models["+indexModel+"]";


            newModels.push({
                id: "model.tab",
                key: "make.models["+indexModel+"]",
                title: "Model détail",
                body: <ModelDetails indexModelTab={indexModel} id={"model.tab"}   expModel={expModel} {...this.props} form={form} intl={intl}/>,
                active: activeTabKey === "make.models["+indexModel+"]" ,
            });


        }





        return (
            <div>
            <NavTabs className='options' id="conf.model.navtab"
                         handleTabChange={this.handleTabModelChange}  tabs={newModels}/>

            </div>);
    }
}

export default NavTabDetailModel;
