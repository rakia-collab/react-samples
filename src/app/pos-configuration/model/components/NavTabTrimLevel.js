import React from 'react';
import { NavTabs,} from 'cassiopae-core';
import TrimLevelContainer from '../../trimLevel/components/TrimLevelContainer';


class NavTabTrimLevel extends React.Component {



    render() {
        const { handleTabTrimChange , trims} = this.props;





        return (<NavTabs className='options'
                         handleTabChange={handleTabTrimChange }  tabs={trims}/>);
    }
}

export default NavTabTrimLevel;
