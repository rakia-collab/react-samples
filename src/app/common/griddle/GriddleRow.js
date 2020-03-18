import React from 'react';
import ColumnProperties from 'griddle-react/modules/columnProperties';
import deep from 'griddle-react/modules/deep';
import isFunction from 'lodash/isFunction';
import fromPairs from 'lodash/fromPairs';
import assign from 'lodash/assign';
import defaults from 'lodash/defaults';
import toPairs from 'lodash/toPairs';
import without from 'lodash/without';

class GridRow extends React.Component {
    static displayName = 'pos.GridRow';

    static defaultProps = {
        "isChildRow": false,
        "showChildren": false,
        "data": {},
        "columnSettings": null,
        "rowSettings": null,
        "hasChildren": false,
        "useGriddleStyles": true,
        "useGriddleIcons": true,
        "isSubGriddle": false,
        "paddingHeight": null,
        "rowHeight": null,
        "parentRowCollapsedClassName": "parent-row",
        "parentRowExpandedClassName": "parent-row expanded",
        "parentRowCollapsedComponent": "▶",
        "parentRowExpandedComponent": "▼",
        "onRowClick": null,
        "multipleSelectionSettings": null
    };

    handleClick = (e) => {
        if (this.props.onRowClick !== null && isFunction(this.props.onRowClick)) {
            this.props.onRowClick(this, e);
        } else if (this.props.hasChildren) {
            this.props.toggleChildren();
        }
    };

    handleSelectionChange = (e) => {
        //hack to get around warning that's not super useful in this case
        return;
    };

    handleSelectClick = (e) => {
        if (this.props.multipleSelectionSettings.isMultipleSelection) {
            if (e.target.type === "checkbox") {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, this.refs.selected.checked);
            } else {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.checked);
            }
        }
    };

    verifyProps() {
        if (this.props.columnSettings === null) {
            console.error("gridRow: The columnSettings prop is null and it shouldn't be");
        }
    }

    render() {
        this.verifyProps();
        let columnStyles = null;

        if (!this.props.columnSettings) {
            return false;
        }

        if (this.props.useGriddleStyles) {
            columnStyles = {
                margin: "0px",
                padding: this.props.paddingHeight + "px 5px " + this.props.paddingHeight + "px 5px",
                height: this.props.rowHeight ? this.props.rowHeight - this.props.paddingHeight * 2 + "px" : null,
                backgroundColor: "#FFF",
                borderTopColor: "#DDD",
                color: "#222"
            };
        }

        const columns = this.props.columnSettings.getColumns();

        // countryTitle sure that all the columns we need have default empty values
        // otherwise they will get clipped
        const defaultValues = fromPairs(columns, []);

        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
        const dataView = assign({}, this.props.data);

        defaults(dataView, defaultValues);
        const data = toPairs(deep.pick(dataView, without(columns, 'children')));
        const nodes = data.map((col, index) => {
            let returnValue = null;
            const meta = this.props.columnSettings.getColumnMetadataByName(col[0]);

            //todo: Make this not as ridiculous looking
            var firstColAppend = index === 0 && this.props.hasChildren && this.props.showChildren === false && this.props.useGriddleIcons ? React.createElement('span', {
                style: this.props.useGriddleStyles ? {
                    fontSize: "10px",
                    marginRight: "5px"
                } : null
            }, this.props.parentRowCollapsedComponent) : index === 0 && this.props.hasChildren && this.props.showChildren && this.props.useGriddleIcons ? React.createElement('span', {style: this.props.useGriddleStyles ? {fontSize: "10px"} : null}, this.props.parentRowExpandedComponent) : "";

            if (index === 0 && this.props.isChildRow && this.props.useGriddleStyles) {
                columnStyles = assign(columnStyles, {paddingLeft: 10});
            }

            if (this.props.columnSettings.hasColumnMetadata() && typeof meta !== 'undefined' && meta !== null) {
                if (typeof meta.customComponent !== 'undefined' && meta.customComponent !== null) {
                    const customComponent = React.createElement(meta.customComponent, {
                        data: col[1],
                        rowData: dataView,
                        metadata: meta
                    });
                    returnValue = React.createElement('td', {
                        onClick: this.handleClick,
                        className: meta.cssClassName,
                        key: index,
                        style: columnStyles
                    }, customComponent);
                } else {
                    returnValue = React.createElement('td', {
                        onClick: this.handleClick,
                        className: meta.cssClassName,
                        key: index,
                        style: columnStyles
                    }, firstColAppend, col[1]);
                }
            }

            return returnValue || React.createElement('td', {
                onClick: this.handleClick,
                key: index,
                style: columnStyles
            }, firstColAppend, col[1]);
        });

        if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
            const selectedRowIds = this.props.multipleSelectionSettings.getSelectedRowIds();

            nodes.unshift(React.createElement('td', {
                key: 'selection',
                style: columnStyles
            }, React.createElement('input', {
                type: 'checkbox',
                checked: this.props.multipleSelectionSettings.getIsRowChecked(dataView),
                onChange: this.handleSelectionChange,
                ref: 'selected'
            })));
        }

        //Get the row from the row settings.
        var className = this.props.rowSettings && this.props.rowSettings.getBodyRowMetadataClass(this.props.data) || "standard-row";

        if (this.props.isChildRow) {
            className = "child-row";
        } else if (this.props.hasChildren) {
            className = this.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
        }

        const rowMetadata = this.props.rowSettings.rowMetadata || {};

        const dataProps = rowMetadata && rowMetadata.getRowDataProps && rowMetadata.getRowDataProps(this.props.data);

        return React.createElement('tr', {
            onClick: this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection ? this.handleSelectClick : null,
            className: className,
            ...dataProps,
        }, nodes);
    }
}

export default GridRow;
