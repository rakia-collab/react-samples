import React from 'react';
import {withAccessKeys} from 'cassiopae-core';

class SectionsBox extends React.Component {

    renderFields() {
        const {metadatas, accessKeys, refField, id, baseId, ...otherProps} = this.props;

        return metadatas.map((item) => {
            const {id, value, hidden} = item;

            const nid = (baseId) ? `${baseId}.${id}` : id;
            const accessKey = accessKeys[nid];
            if ((!accessKey && hidden) || (accessKey && accessKey.hidden)) {
                return false;
            }

            return (
                <item.customComponent key={id}
                                      {...otherProps}
                                      id={nid}
                                      data={value}
                                      quoteField={refField}
                                      accessKeys={accessKeys}
                />
            )
        });

    }

    render() {
        return <div> {this.renderFields()} </div>;
    }
}

export default withAccessKeys(SectionsBox);
