import React, { Component } from 'react'
import {DragSource} from 'react-dnd'
import {defaultTableRowRenderer} from 'react-virtualized'
import 'react-virtualized/styles.css'

const spec = {
    beginDrag(props) {
        return {
            id: props.rowData.uid,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            props.deleteEvent(item.id);
            alert(`You dropped ${item.id} into trash!`) // eslint-disable-line no-alert
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
})

class EventsRow extends Component {
    render() {
        const {connectDragSource, ...rest} = this.props
        return (
            connectDragSource(defaultTableRowRenderer(rest))
        )
    }
}

export default DragSource('event', spec, collect)(EventsRow)