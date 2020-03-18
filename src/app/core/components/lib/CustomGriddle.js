import React, {Component} from 'react';
import gridTable from 'griddle-react/modules/gridTable.jsx';
import GridTitle from 'griddle-react/modules/gridTitle.jsx';
import GridRowContainer from 'griddle-react/modules/gridRowContainer.jsx';
import {FormattedDate, FormattedNumber} from 'react-intl';
import {Checkbox} from "react-bootstrap";
import classNames from "classnames";
import Griddle from '../../../common/griddle/Griddle';

import {Loader, TextEntry} from 'cassiopae-core';

export default class SuperGriddle extends Griddle {

    constructor(props) {
        super(props)
        this.state = {};
        this.getStandardGridSection = this.getGridSection;
    }

    componentWillReceiveProps(newProps) {
        super.componentWillReceiveProps(newProps);
        newProps.results && newProps.results.length && this._updateFilteredResults(this.state.filter, newProps.results);
    }

    _updateFilteredResults(filter, newResults) {
        let updatedState = {
            page: 0,
            filter: filter
        };

        if (!filter) return newResults;

        updatedState.filteredResults = newResults.filter((item) => {
            const itemKeys = Object.keys(item);
            for (var i = 0; i < itemKeys.length; i++) {
                if ((item[itemKeys[i]] || '').toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                    return true;
                }
            }

            return false;
        });

        updatedState.maxPage = this.getMaxPage(updatedState.filteredResults);

        this.setState(updatedState);
        this._resetSelectedRows();
    }

    getGridSection(data, cols, meta, pagingContent, hasMorePages) {
        var sortProperties = this.getSortObject();
        var multipleSelectionProperties = this.getMultipleSelectionObject();

        // no data section
        var showNoData = this.shouldShowNoDataSection(data);
        var noDataSection = this.getNoDataSection();
        return React.createElement('div', {className: 'griddle-body'}, React.createElement(GriddleTable, {
            useGriddleStyles: this.props.useGriddleStyles,
            noDataSection: noDataSection,
            showNoData: showNoData,
            columnSettings: this.columnSettings,
            rowSettings: this.rowSettings,
            sortSettings: sortProperties,
            multipleSelectionSettings: multipleSelectionProperties,
            filterByColumn: this.filterByColumn,
            isSubGriddle: this.props.isSubGriddle,
            useGriddleIcons: this.props.useGriddleIcons,
            useFixedLayout: this.props.useFixedLayout,
            showPager: this.props.showPager,
            showSummary: this.props.showSummary,
            pagingContent: pagingContent,
            data: data,
            className: this.props.tableClassName,
            enableInfiniteScroll: this.isInfiniteScrollEnabled(),
            nextPage: this.nextPage,
            showTableHeading: this.props.showTableHeading,
            useFixedHeader: this.props.useFixedHeader,
            parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
            parentRowExpandedClassName: this.props.parentRowExpandedClassName,
            parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
            parentRowExpandedComponent: this.props.parentRowExpandedComponent,
            bodyHeight: this.props.bodyHeight,
            paddingHeight: this.props.paddingHeight,
            rowHeight: this.props.rowHeight,
            infiniteScrollLoadTreshold: this.props.infiniteScrollLoadTreshold,
            externalLoadingComponent: this.props.externalLoadingComponent,
            externalIsLoading: this.props.externalIsLoading,
            hasMorePages: hasMorePages,
            onRowClick: this.props.onRowClick
        }));
    }
}

class GriddleTable extends gridTable {
    getNodeContent() {
        this.verifyProps();
        var that = this;

        //figure out if we need to wrap the group in one tbody or many
        var anyHasChildren = false;

        // If the data is still being loaded, don't build the nodes unless this is an infinite scroll table.
        if (!this.props.externalIsLoading || this.props.enableInfiniteScroll) {
            var nodeData = that.props.data;
            var aboveSpacerRow = null;
            var belowSpacerRow = null;
            var usingDefault = false;

            // If we have a row height specified, only render what's going to be visible.
            if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && this.refs.scrollable !== undefined) {
                var adjustedHeight = that.getAdjustedRowHeight();
                var visibleRecordCount = Math.ceil(that.state.clientHeight / adjustedHeight);

                // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
                var displayStart = Math.max(0, Math.floor(that.state.scrollTop / adjustedHeight) - visibleRecordCount * 0.25);
                var displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length - 1);

                // Split the amount of nodes.
                nodeData = nodeData.slice(displayStart, displayEnd + 1);

                // Set the above and below nodes.
                var aboveSpacerRowStyle = {height: displayStart * adjustedHeight + "px"};
                aboveSpacerRow = React.createElement('tr', {
                    key: 'above-' + aboveSpacerRowStyle.height,
                    style: aboveSpacerRowStyle
                });
                var belowSpacerRowStyle = {height: (this.props.data.length - displayEnd) * adjustedHeight + "px"};
                belowSpacerRow = React.createElement('tr', {
                    key: 'below-' + belowSpacerRowStyle.height,
                    style: belowSpacerRowStyle
                });
            }

            var nodes = nodeData.map(function (row, index) {
                var hasChildren = typeof row["children"] !== "undefined" && row["children"].length > 0;
                var uniqueId = that.props.rowSettings.getRowKey(row, index);

                //at least one item in the group has children.
                if (hasChildren) {
                    anyHasChildren = hasChildren;
                }

                return React.createElement(GridRowContainer, {
                    useGriddleStyles: that.props.useGriddleStyles,
                    isSubGriddle: that.props.isSubGriddle,
                    parentRowExpandedClassName: that.props.parentRowExpandedClassName,
                    parentRowCollapsedClassName: that.props.parentRowCollapsedClassName,
                    parentRowExpandedComponent: that.props.parentRowExpandedComponent,
                    parentRowCollapsedComponent: that.props.parentRowCollapsedComponent,
                    data: row,
                    key: uniqueId + '-container',
                    uniqueId: uniqueId,
                    columnSettings: that.props.columnSettings,
                    rowSettings: that.props.rowSettings,
                    paddingHeight: that.props.paddingHeight,
                    multipleSelectionSettings: that.props.multipleSelectionSettings,
                    rowHeight: that.props.rowHeight,
                    hasChildren: hasChildren,
                    tableClassName: that.props.className,
                    onRowClick: that.props.onRowClick
                });
            });

            // no data section
            if (this.props.showNoData) {
                var colSpan = this.props.columnSettings.getVisibleColumnCount();
                nodes.push(React.createElement('tr', {key: 'no-data-section'}, React.createElement('td', {colSpan: colSpan}, this.props.noDataSection)));
            }

            // Add the spacer rows for nodes we're not rendering.
            if (aboveSpacerRow) {
                nodes.unshift(aboveSpacerRow);
            }
            if (belowSpacerRow) {
                nodes.push(belowSpacerRow);
            }

            // Send back the nodes.
            return {
                nodes: nodes,
                anyHasChildren: anyHasChildren
            };
        } else {
            return null;
        }
    }

    render() {
        var that = this;
        var nodes = [];

        // for if we need to wrap the group in one tbody or many
        var anyHasChildren = false;

        // Grab the nodes to render
        var nodeContent = this.getNodeContent();
        if (nodeContent) {
            nodes = nodeContent.nodes;
            anyHasChildren = nodeContent.anyHasChildren;
        }

        var gridStyle = null;
        var loadingContent = null;
        var tableStyle = {
            width: "100%"
        };

        if (this.props.useFixedLayout) {
            tableStyle.tableLayout = "fixed";
        }

        if (this.props.enableInfiniteScroll) {
            // If we're enabling infinite scrolling, we'll want to include the max height of the grid body + allow scrolling.
            gridStyle = {
                "position": "relative",
                "overflowY": "scroll",
                "height": this.props.bodyHeight + "px",
                "width": "100%"
            };
        }

        // If we're currently loading, populate the loading content
        if (this.props.externalIsLoading) {
            var defaultLoadingStyle = null;
            var defaultColSpan = null;

            if (this.props.useGriddleStyles) {
                defaultLoadingStyle = {
                    textAlign: "center",
                    paddingBottom: "40px"
                };

            }
            defaultColSpan = this.props.columnSettings.getVisibleColumnCount();

            var loadingComponent = this.props.externalLoadingComponent ? React.createElement(this.props.externalLoadingComponent, null) :
                <Loader/>;

            loadingContent = React.createElement('tbody', null, React.createElement('tr', null, React.createElement('td', {
                style: defaultLoadingStyle,
                colSpan: defaultColSpan
            }, loadingComponent)));
        }

        //construct the table heading component
        var tableHeading = this.props.showTableHeading ? React.createElement(GridTitle, {
            useGriddleStyles: this.props.useGriddleStyles, useGriddleIcons: this.props.useGriddleIcons,
            sortSettings: this.props.sortSettings,
            multipleSelectionSettings: this.props.multipleSelectionSettings,
            columnSettings: this.props.columnSettings,
            filterByColumn: this.props.filterByColumn,
            rowSettings: this.props.rowSettings
        }) : undefined;

        //check to see if any of the rows have children... if they don't wrap everything in a tbody so the browser doesn't auto do this
        if (!anyHasChildren) {
            nodes = React.createElement('tbody', null, nodes);
        }

        var footerContent = React.createElement('tbody', null);
        if (this.props.showPager || this.props.showSummary) {

            let summary = this.props.showSummary ? this.renderSummary() : null
            let pager = this.props.showPager ? this.renderPager() : null;
            footerContent = React.createElement('tbody', null, [
                summary,
                pager
            ]);

        }

        // If we have a fixed header, split into two tables.
        if (this.props.useFixedHeader) {
            if (this.props.useGriddleStyles) {
                tableStyle.tableLayout = "fixed";
            }

            return React.createElement('div', null, React.createElement('table', {
                className: this.props.className,
                style: this.props.useGriddleStyles && tableStyle || null
            }, tableHeading), React.createElement('div', {
                ref: 'scrollable',
                onScroll: this.gridScroll,
                style: gridStyle
            }, React.createElement('table', {
                className: this.props.className,
                style: this.props.useGriddleStyles && tableStyle || null
            }, nodes, loadingContent, footerContent)));
        }

        return React.createElement('div', {
            ref: 'scrollable',
            onScroll: this.gridScroll,
            style: gridStyle
        }, React.createElement('table', {
            className: this.props.className,
            style: this.props.useGriddleStyles && tableStyle || null
        }, tableHeading, nodes, loadingContent, footerContent));
    }

    renderPager() {
        let pagingComponentClasses = {
            "footer-container": true,
            "use-griddle-styles-for-paging": this.props.useGriddleStyles,
            "use-griddle-styles-for-paging-extra-height": this.props.showNoData
        }
        return React.createElement('tr', null, React.createElement('td', {
            colSpan: this.props.multipleSelectionSettings.isMultipleSelection ? this.props.columnSettings.getVisibleColumnCount() + 1 : this.props.columnSettings.getVisibleColumnCount(),
            className: classNames(pagingComponentClasses)
        }, !this.props.showNoData ? this.props.pagingContent : null))
    }

    renderSummary() {
        let cells = this.props.columnSettings.columnMetadata.map((meta) => {
            let content = null;
            if (meta.summaryLabel) {
                content = meta.summaryLabel;
            }

            if (meta.summaryType) {
                switch (meta.summaryType.toUpperCase()) {
                    case 'AVERAGE':
                        content = this.props.data.reduce((total, row) => total += row[meta.columnName], 0) / this.props.data.length;
                    case 'SUM':
                    default:
                        content = this.props.data.reduce((total, row) => total + (row[meta.columnName] || 0), 0);
                }

                if (meta.customComponent) {
                    var dataView = Object.assign({}, this.props.data);
                    content = React.createElement(meta.customComponent, {
                        data: content,
                        rowData: dataView,
                        metadata: meta
                    });
                }
            }

            return <td>{content}</td>
        });

        return <tr className="summary">{cells}</tr>;
    }
}

SuperGriddle.DefaultProps = {
    "columns": [],
    "gridMetadata": null,
    "columnMetadata": [],
    "rowMetadata": null,
    "results": [], // Used if all results are already loaded.
    "initialSort": "",
    "gridClassName": "",
    "tableClassName": "",
    "customRowComponentClassName": "",
    "settingsText": "Settings",
    "filterPlaceholderText": "Filter search results",
    "nextText": "Next",
    "previousText": "Previous",
    "maxRowsText": "Rows per page",
    "enableCustomFormatText": "Enable Custom Formatting",
    //this column will determine which column holds subgrid data
    //it will be passed through with the data object but will not be rendered
    "childrenColumnName": "children",
    //Any column in this list will be treated as metadata and will be passed through with the data but won't be rendered
    "metadataColumns": [],
    "showFilter": false,
    "showSettings": false,
    "useCustomRowComponent": false,
    "useCustomGridComponent": false,
    "useCustomPagerComponent": false,
    "useCustomFilterer": false,
    "useCustomFilterComponent": false,
    "useGriddleStyles": true,
    "useGriddleIcons": true,
    "customRowComponent": null,
    "customGridComponent": null,
    "customPagerComponent": {},
    "customFilterComponent": null,
    "customFilterer": null,
    "globalData": null,
    "enableToggleCustom": false,
    "noDataMessage": "There is no data to display.",
    "noDataClassName": "griddle-nodata",
    "customNoDataComponent": null,
    "allowEmptyGrid": false,
    "showTableHeading": true,
    "showPager": true,
    "useFixedHeader": false,
    "useExternal": false,
    "externalSetPage": null,
    "externalChangeSort": null,
    "externalSetFilter": null,
    "externalSetPageSize": null,
    "externalMaxPage": null,
    "externalCurrentPage": null,
    "externalSortColumn": null,
    "externalSortAscending": true,
    "externalLoadingComponent": null,
    "externalIsLoading": false,
    "enableInfiniteScroll": false,
    "bodyHeight": null,
    "paddingHeight": 5,
    "rowHeight": 25,
    "infiniteScrollLoadTreshold": 50,
    "useFixedLayout": true,
    "isSubGriddle": false,
    "enableSort": true,
    "onRowClick": null,
    /* css class names */
    "sortAscendingClassName": "sort-ascending",
    "sortDescendingClassName": "sort-descending",
    "parentRowCollapsedClassName": "parent-row",
    "parentRowExpandedClassName": "parent-row expanded",
    "settingsToggleClassName": "settings",
    "nextClassName": "griddle-next",
    "previousClassName": "griddle-previous",
    "headerStyles": {},
    /* icon components */
    "sortAscendingComponent": " ▲",
    "sortDescendingComponent": " ▼",
    "sortDefaultComponent": null,
    "parentRowCollapsedComponent": "▶",
    "parentRowExpandedComponent": "▼",
    "settingsIconComponent": "",
    "nextIconComponent": "",
    "previousIconComponent": "",
    "isMultipleSelection": false, //currently does not support subgrids
    "selectedRowIds": [],
    "uniqueIdentifier": "id"
};


export class CurrencyDisplay extends Component {
    render() {
        let value = this.props.data || "";
        return <FormattedNumber value={value} format="currencyFormat"/>
    }
}

export class PercentDisplay extends Component {

    render() {

        let value = this.props.data;
        if (value > 1) {
            value = parseFloat(value / 100);
        }

        return <FormattedNumber value={value} style="percent"/>
    }
}

export class NumberDisplay extends Component {
    render() {
        return <FormattedNumber value={this.props.data}/>
    }
}

export class DateDisplay extends Component {

    static toJsonExport(data) {
        if (data) {
            const date = new Date(data.data);
            return date.toLocaleDateString(data.state.locales.lang); // react intl never use localDateString
        }
        return '';
    }

    render() {
        const {data} = this.props;
        if (data) {
            const date = new Date(this.props.data);
            return <FormattedDate value={date}/>;
        }
        return null;
    }
}

export class AmountDisplay extends Component {
    render() {
        let value = this.props.data || "";
        return <FormattedNumber value={value} format="currencyFormat"
                                currency={this.props.metadata.customComponentMetadata.currencycode}/>
    }
}

export class RateTaxDisplay extends Component {
    render() {
        let rateTaxValue;
        if (this.props.metadata && this.props.metadata.customComponentMetadata && this.props.metadata.customComponentMetadata.getTaxRate) {
            let taxObject = this.props.metadata.customComponentMetadata.getTaxRate(this.props.data);
            rateTaxValue = taxObject && taxObject.taxrate ? taxObject.taxrate / 100 : 0;
        } else {
            rateTaxValue = this.props.data || "";
        }
        return <FormattedNumber value={rateTaxValue} style="percent"/>
    }
}

export class SelectByKeyDisplay extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (args) => {
        if (this.props.metadata.customComponentMetadata.onChange) {
            this.props.metadata.customComponentMetadata.onChange(this.props.rowData, args);
        }
    }

    render() {
        let {listByKey, keyName, readOnly} = this.props.metadata.customComponentMetadata;
        let label = this.props.data;
        const key = this.props.rowData[keyName];
        const options = listByKey && listByKey.find((item) => item.key === key) && listByKey.find((item) => item.key === key).listOptions;

        if (options && options.length > 0) {
            const screenOptions = options.map((opt) => (<option key={opt.code} value={opt.code}>{opt.label}</option>));

            return (<select className="form-control"
                            defaultValue={this.props.data}
                            disabled={readOnly}
                            onChange={this.handleChange}>{screenOptions}</select>);
        } else {
            return (<span>{label}</span>);
        }


    }
}

export class CheckBoxDisplay extends Component {

    handleChange = (args) => {
        if (this.props.metadata.customComponentMetadata.handleCheckBoxClick) {
            this.props.metadata.customComponentMetadata.handleCheckBoxClick(this.props.rowData, !this.props.data);
        } else {
            this.props.metadata.customComponentMetadata.onChange(args, this.props.rowData, this.props.metadata.columnName);
        }
    };

    render() {
        const selected = (this.props.data !== undefined && this.props.data !== null) ? this.props.data : (this.props.rowData.active ? true : false);
        const disabled = this.props.metadata.customComponentMetadata.isCheckBoxDisabled && this.props.metadata.customComponentMetadata.isCheckBoxDisabled(this.props.rowData) === true;
        return (
            <Checkbox disabled={disabled}
                      checked={selected}
                      onChange={this.handleChange}/>
        );
    }
}

export class InputDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.data};
    }

    handleChange(value) {
        this.setState({value});
    }

    render() {

        let readOnly = false;
        return (
            <TextEntry value={this.state.value}
                       className="form-control"
                       onChange={(event) => this.props.metadata.customComponentMetadata.onChange(event, this.props.rowData, this.props.metadata.columnName)}
                       readOnly={readOnly}
            />);

    }
}

export class GriddleFixFilterPager extends Griddle {
    componentWillReceiveProps(newProps) {
        super.componentWillReceiveProps(newProps);
        newProps.results && newProps.results.length && this._updateFilteredResults(this.state.filter, newProps.results);
    }

    _updateFilteredResults(filter, newResults) {
        let updatedState = {
            page: 0,
            filter: filter
        };

        if (!filter) return

        if (this.props.useCustomFilterer) {
            updatedState.filteredResults = this.props.customFilterer(newResults, filter)
        } else {
            updatedState.filteredResults = newResults.filter((item) => {
                const itemKeys = Object.keys(item);
                for (var i = 0; i < itemKeys.length; i++) {
                    if ((item[itemKeys[i]] || '').toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                        return true;
                    }
                }

                return false;
            });
        }
        updatedState.maxPage = this.getMaxPage(updatedState.filteredResults);

        this.setState(updatedState);
        this._resetSelectedRows();
    }
}
