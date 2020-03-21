import React from 'react';
import ModelDetails from'./ModelDetails'
import {NavTabs} from 'cassiopae-core';
import NavTabTrimLevel from "./NavTabTrimLevel";
import TrimLevelContainer from "../../trimLevel/components/TrimLevelContainer";

class NavTabDetailModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeTabKey: "tabDetail" , expTrim:"make.models["+(this.props.make.models.length-1)+"].modelLevels[0]", expModel:"make.models["+(this.props.make.models.length-1)+"]", indexFirstNewModel:(this.props.make.models.length-1)}
    }
    handleTabModelChange = (key) => {
        this.setState({
            activeTabKey: key,
            expModel: key
        });
        this.props.changePathFileddOfModel(key)
    };
    handleTabTrimChange= (key) => {
        this.setState({
            activeTabKey: key,
            expTrim: key
        });
    };
    render() {
        const { intl, form, nbrNavTab, indexModel } = this.props;
        const { indexFirstNewModel,expModel, activeTabKey, expTrim } = this.state
        const newModels    =[];
        const trims    =[];
         let nbrNewModel=1;
         //************Part of mange Model with his Trim Level /*****************
        if(nbrNavTab >0) {
            for(let i= indexFirstNewModel;i< (indexFirstNewModel+nbrNavTab);i++) {
                if (newModels.length <=0 && i=== indexFirstNewModel) {
                    newModels.push({
                        id: "model.tab",
                        key: "make.models["+i+"]",
                        title: "Model détail",
                        body: <ModelDetails  expModel={expModel} {...this.props} test={"tabDetail"} form={form} intl={intl}/>,
                        active: activeTabKey === "make.models["+i+"]" || activeTabKey === "make.models["+i+"].modelLevels[0]",
                    });


                    trims.push({
                        id:"trim.tab",
                        key: "make.models["+i+"].modelLevels[0]",
                        title: "Trim level",
                        body:  <TrimLevelContainer expTrim={expTrim} form={form} intl={intl} {...this.props} />,
                        active: activeTabKey === "make.models["+i+"].modelLevels[0]"|| activeTabKey === "make.models["+i+"]" ,
                    });

                } else {
                    newModels.push({
                        id: "model.tab" + i,
                        key: "make.models["+i+"]",
                        title: "Model détail " + nbrNewModel,
                        body: <ModelDetails  expModel={this.state.expModel}  {...this.props} test={"tabDetail " + i} form={form} intl={intl}/>,
                        active: activeTabKey === "make.models["+i+"].modelLevels[0]" || activeTabKey === "make.models["+i+"]",
                    });


                    trims.push({
                        id:"trim.tab" + i,
                        key: "make.models["+i+"].modelLevels[0]",
                        title: "Trim level " + nbrNewModel,
                        body:  <TrimLevelContainer expTrim={expTrim} form={form} intl={intl} {...this.props} />,
                        active:activeTabKey === "make.models["+i+"].modelLevels[0]" || activeTabKey === "make.models["+i+"]" ,
                    });
                    nbrNewModel=nbrNewModel+1;
                }
            }
        }
        else {
           let expModel="make.models["+indexModel+"]";
           let expTrim="make.models["+indexModel+"].modelLevels[0]";
            newModels.push({
                id: "model.tab",
                key: "make.models["+indexModel+"]",
                title: "Model détail",
                body: <ModelDetails expModel={expModel} {...this.props} test={"tabDetail"} form={form} intl={intl}/>,
                active: activeTabKey === "make.models["+indexModel+"]" || activeTabKey === "make.models["+indexModel+"].modelLevels[0]",
            });

            newModels.push({
                id: "model.tab",
                key: "make.models["+indexModel+"]",
                title: "Model détail",
                body: <ModelDetails expModel={expModel} {...this.props} test={"tabDetail"} form={form} intl={intl}/>,
                active: activeTabKey === "make.models["+indexModel+"]" || activeTabKey === "make.models["+indexModel+"].modelLevels[0]",
            });


        }





        return (
            <div>
            <NavTabs className='options'
                         handleTabChange={this.handleTabModelChange}  tabs={newModels}/>
            <NavTabTrimLevel handleTabTrimChange={this.handleTabTrimChange }  trims={trims} form={form} intl={intl}     />
            </div>);
    }
}

export default NavTabDetailModel;
