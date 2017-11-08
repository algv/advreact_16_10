//https://github.com/react-dnd/react-dnd/blob/master/examples/01%20Dustbin/Single%20Target/Dustbin.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

const spec = {
    drop() {
        return { name: 'Dustbin' }
    },
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
})

class Trash extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props
        const isActive = canDrop && isOver

        let backgroundColor = '#222'
        if (isActive) {
            backgroundColor = 'darkgreen'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
        }

        return connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
                {isActive ? 'Release to trash' : 'Drag a event for trash'}
            </div>,
        )
    }
}

export default (DropTarget(['event'], spec, collect)(Trash))