import React, {Component} from "react";
import {connect} from 'react-redux'

class ComboRefTableDisplay extends Component {

    render() {
        var label = this.props.data;
        if (this.props.options) {
            var obj = this.props.options.find(obj => {
                if (obj.tprcode) {
                    return obj.tprcode === this.props.data
                } else if (obj.tcocode) {
                    return obj.tcocode === this.props.data
                }

            });
            if (obj) {
                label = obj.pellibelle ? obj.pellibelle : obj.libelletypecommission;
            } else if (this.props.emptyValue) {
                label = this.props.emptyValue;
            }
        }

        if (this.props.options && this.props.options.length > 0) {
            let serviceOptions;
            if (this.props.options[0].tprcode) {
                serviceOptions = [(<option key="IND" value="IND"></option>),
                    ...this.props.options.map((row) => (
                        (<option key={row.tprcode} value={row.tprcode}>{row.pellibelle}</option>)
                    ))
                ];
            } else {
                serviceOptions = [(<option key="IND" value="IND"></option>),
                    ...this.props.options.map((row) => (
                        (<option key={row.tcocode} value={row.tcocode}>{row.libelletypecommission}</option>)
                    ))
                ];

            }

            return (<select className="dropdownInside"
                            defaultValue={this.props.data}
                            onChange={(event) => this.props.handleChanged(event, this.props.rowData)}>{serviceOptions}</select>);
        } else {
            return (<span>{label}</span>);
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        options: props.metadata.customComponentMetadata.options,
        handleChanged: props.metadata.customComponentMetadata.handleChanged

    }
}
export default connect(mapStateToProps)(ComboRefTableDisplay)
