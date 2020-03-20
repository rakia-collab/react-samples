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
        const { intl,form  } = this.props;

        const tab2    =[];


        tab2.push({
            id:"trim.tab.detail",
            key: "tabTrimDetails",
            title: "Trim level details",
            body:  <TrimDetail form={form} intl={intl} {...this.props} />,
            active: this.state.activeTabKey =="tabTrimDetails" ,
        });




        return (<NavTabs className='options'
                         handleTabChange={this.handleTabTrimDetailsChange}  tabs={tab2}/>);
    }
}

export default NavTrimDetails;
