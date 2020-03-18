import React from 'react';
import {connect} from 'react-redux';
import {getProgressMonitorsStates, SkinLoading} from 'cassiopae-core';

class HeaderLoader extends React.Component {

    render() {
        const {showLoading} = this.props;

        return <div className="pace" key='pace'>
            <SkinLoading type='pace' show={showLoading || 'progressMonitor'}/>
        </div>;
    }
}

function mapStateToProps(state) {
    const {isLoading, axiosProcessing} = state.loader;
    const progressMonitors = getProgressMonitorsStates(state);

    let showLoading = isLoading || axiosProcessing;

    if (!showLoading && progressMonitors) {
        const runningProgressMonitor = Object.keys(progressMonitors).find((name) => {
            return progressMonitors[name].running;
        });

        showLoading = (!!runningProgressMonitor);
    }

    return {
        showLoading,
    };
}


export default connect(mapStateToProps)(HeaderLoader);
