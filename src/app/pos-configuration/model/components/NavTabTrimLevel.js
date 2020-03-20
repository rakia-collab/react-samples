import React from 'react';
import { NavTabs,} from 'cassiopae-core';
import TrimContainer from '../../trimLevel/components/TrimContainer';


class NavTabTrimLevel extends React.Component {


    render() {
        const { intl,form  } = this.props;

        const tab2    =[];


        tab2.push({
            id:"trim.tab",
            key: "tabTrim",
            title: "Trim level",
            body:  <TrimContainer form={form} intl={intl}  />,
            active: this.state.activeTabKey =="tabTrim" || this.state.activeTabKey =="tabDetail" ,
        });

        tab2.push({
            id:"trim.tab2",
            key: "tabTrim2",
            title: "Trim level 2",
            body:  <TrimContainer form={form} intl={intl}  />,
            active: this.state.activeTabKey =="tabTrim2" || this.state.activeTabKey =="tabDetail2" ,
        });
        tab2.push({
            id:"trim.tab3",
            key: "tabTrim3",
            title: "Trim level 3",
            body:  <TrimContainer form={form} intl={intl}  />,
            active: this.state.activeTabKey =="tabTrim3" || this.state.activeTabKey =="tabDetail3" ,
        });


        return (<NavTabs className='options'
                         handleTabChange={this.handleTabChange}  tabs={tab2}/>);
    }
}

export default NavTabTrimLevel;
