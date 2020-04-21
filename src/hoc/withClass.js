import React from 'react';

const withClass = (WrappedComponents,classes) => {
    return props => (
        <div className={classes}>
            <WrappedComponents {...props}/>
        </div>
    );
};

export default withClass;