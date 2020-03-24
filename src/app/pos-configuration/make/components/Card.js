import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';

import flow from 'lodash/flow';
import AuditCardComponent from './AuditCardComponent';
class Card extends Component {

    getLabelFromRefTable = (listRefTable, code)=> {
        let object;
        object = listRefTable.find((object)=> object.code === code);
        if (object && object.label) {
            return object.label;
        } else {
            return code;
        }
    }

    render() {
        const {card, isDragging, connectDragSource, connectDropTarget, color, colorTable, iconTable, customComponentMetadata} = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(
            <div className="card" style={{opacity}}>
                <AuditCardComponent
                                    row={card}
                                    customComponentMetadata={customComponentMetadata}/>

            </div>
        ));
    }
}
const cardSource = {
    beginDrag(props) {
        return {
            index: props.index,
            listId: props.listId,
            card: props.card
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult && dropResult.listId !== item.listId) {
            props.removeCard(item.index);
        }
    }
};

const cardTarget = {

    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        const sourceListId = monitor.getItem().listId;


        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        if (props.listId === sourceListId) {
            props.moveCard(dragIndex, hoverIndex);

            monitor.getItem().index = hoverIndex;
        }
    }
};
export default flow(
    DropTarget("CARD", cardTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource("CARD", cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(Card);