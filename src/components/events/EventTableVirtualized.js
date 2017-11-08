import React, { Component } from 'react'
import {Table, Column} from 'react-virtualized'
import {connect} from 'react-redux'
import {fetchAllEvents, deleteEvent, selectEvent, selectedEventsSelector, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import EventsRow from './EventsRow'
import 'react-virtualized/styles.css'

class EventTableVirtualized extends Component {
    componentDidMount() {
        this.props.fetchAllEvents()
        console.log('---', 'load events')
    }

    render() {
        const { loaded, events } = this.props

        if (this.props.loading) return <Loader />
        return (
            <Table
                rowCount={events.length}
                rowGetter={this.rowGetter}
                rowHeight={40}
                headerHeight={50}
                overscanRowCount={5}
                width={700}
                height={300}
                onRowClick={this.handleRowClick}
                rowRenderer={this.rowRenderer}
            >
                <Column
                    label="title"
                    dataKey="title"
                    width={300}
                />
                <Column
                    label="where"
                    dataKey="where"
                    width={250}
                />
                <Column
                    label="when"
                    dataKey="month"
                    width={150}
                />
            </Table>
        )
    }

    rowGetter = ({ index }) => this.props.events[index]
    rowRenderer = (props) => <EventsRow {...props} deleteEvent={(uid) => this.handleDelete(uid)}/>

    handleDelete = (uid) => {
        const {deleteEvent} = this.props
        
        deleteEvent(uid)
    }
}

export default connect((state, props) => ({
    events: eventListSelector(state, props),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    selected: selectedEventsSelector(state)
}), { fetchAllEvents, selectEvent, deleteEvent })(EventTableVirtualized)