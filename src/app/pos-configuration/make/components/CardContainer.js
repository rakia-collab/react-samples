import React, {Component} from 'react';
import Card from './Card';
import {DropTarget} from 'react-dnd';

class CardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {cards: props.list};
    }

    pushCard(card) {
        let {removeCategorie} = this.props;
        var mycards = this.state.cards;
        // removeCategorie(card);
        mycards.push(card)
        this.setState({cards: mycards})
    }

    removeCard(index) {
        let {selectCategorie} = this.props;
        var mycards = this.state.cards
        mycards.splice(index, 1)
        this.setState({cards: mycards})
        //selectCategorie(index);
    }

    moveCard(dragIndex, hoverIndex) {
        var mycards = this.state.cards
        const dragCard = mycards[dragIndex];
        mycards.splice(dragIndex, 1)
        mycards.splice(hoverIndex, 0, dragCard)
        this.setState({cards: mycards})
    }

    render() {
        const {cards} = this.state;
        const {canDrop, isOver, connectDropTarget, colorTable, iconTable, customComponentMetadata} = this.props;
        const isActive = canDrop && isOver;
        const color = {"DONE": "panel-green", "TODO": "panel-red", "INPROG": "panel-grey"};
        const cardss = cards.map((card, i) => {
            return (
                <Card
                    key={card.id}
                    index={i}
                    listId={this.props.id}
                    card={card}
                    removeCard={this.removeCard.bind(this)}
                    moveCard={this.moveCard.bind(this)}
                    color={color}
                    colorTable={colorTable}
                    iconTable={iconTable}
                    customComponentMetadata={customComponentMetadata}/>
            );
        })
        const backgroundColor = isActive ? 'maroon' : '#FFF';
        const cards1 = (cardss && cardss.length > 0) ? cardss : <div className="empty-element"> add new element</div>;
        return connectDropTarget(
            <div className="card-container" style={{backgroundColor}}>

                {cards1}

            </div>
        );
    }
}
const cardTarget = {
    drop(props, monitor, component) {
        const {id} = props;
        const sourceObj = monitor.getItem();
        if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
        return {
            listId: id
        };
    }
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(CardContainer);