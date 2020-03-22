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
        const { intl, form, listModels, expModel, indexModel, nbrNavTab } = this.props;

        const trims    =[];


    let trimIndex=0;
        if(nbrNavTab > 0) {
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
                if (listModels[indexModel].modelLevels == null || listModels[indexModel].modelLevels.length <= 1) {
                    trims.push({
                        id: "trim.tab0",
                        key: expModel + ".modelLevels[0]",
                        title: "Trim level",
                        body: <TrimDetail expTrim={expModel + ".modelLevels[0]"} form={form}
                                          intl={intl} {...this.props} />,
                        active: this.state.activeTabKey === expModel + ".modelLevels[0]"
                    });

                } else {
                    listModels[indexModel].modelLevels.map((trim) => {
                        trims.push({
                            id: "trim.tab" + trimIndex,
                            key: expModel + ".modelLevels[" + trimIndex + "]",
                            title: "Trim level " + (trimIndex == 0 ? '' : trimIndex),
                            body: <TrimDetail expTrim={expModel + ".modelLevels[" + trimIndex + "]"} form={form}
                                              intl={intl} {...this.props} />,
                            active: this.state.activeTabKey === expModel + ".modelLevels[" + trimIndex + "]"
                        });
                        trimIndex = trimIndex + 1;
                    })
                }

        }







        return (<NavTabs className='options'
                         handleTabChange={this.handleTabTrimDetailsChange}  tabs={trims}/>);
    }
}

export default NavTrimDetails;
