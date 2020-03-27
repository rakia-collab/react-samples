import React from 'react';
import { NavTabs,} from 'cassiopae-core';
import TrimDetail from './TrimDetail';


class NavTrimDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeTabKey: "tabTrimDetails"}
    }
    handleTabTrimDetailsChange = (key) => {
        this.setState({
            activeTabKey: key
        });
    };

    render() {
        const { intl, form, listModels, expModel, indexModel, nbrNavTab, nbrNavTabTrim } = this.props;

        const trims    =[];

//Affichage and modify trims for existing model
    let trimIndex=0;
     if(indexModel>=0 && nbrNavTabTrim >= 0) {
        if(nbrNavTabTrim <= 0 || listModels[indexModel].modelLevels === null || listModels[indexModel].modelLevels.length < 1) {
            trims.push({
                id: "trim.tab0",
                key: expModel + ".modelLevels[0]",
                title: "Trim level",
                body: <TrimDetail expTrim={expModel + ".modelLevels[0]"} form={form} intl={intl} {...this.props} />,
                active: this.state.activeTabKey === expModel + ".modelLevels[0]"
            });
        }
        else
        {


                    listModels[indexModel].modelLevels.map((trim) => {
                        trims.push({
                            id: "trim.tab" + trimIndex,
                            key: expModel + ".modelLevels[" + trimIndex + "]",
                            title: "Trim level " + (trimIndex == 0 ? '' : (trimIndex+1)),
                            body: <TrimDetail id='conf.trim.detail'
                                              expTrim={expModel + ".modelLevels[" + trimIndex + "]"} form={form}
                                              intl={intl} {...this.props} />,
                            active: this.state.activeTabKey === expModel + ".modelLevels[" + trimIndex + "]"
                        });
                        trimIndex = trimIndex + 1;
                    })

            }
        }







        return (<NavTabs className='options' id="conf.navtab.model.trims.detail"
                         handleTabChange={this.handleTabTrimDetailsChange}  tabs={trims}/>);
    }
}

export default NavTrimDetails;
