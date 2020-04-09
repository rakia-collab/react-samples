import React from 'react';

const withclass = (WrappedComponents,classes) => {
    return props => (
        <div className={classes}>
            <WrappedComponents/>
        </div>
    );
};

export default withclass;