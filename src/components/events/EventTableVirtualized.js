import React, { Component } from 'react'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import {connect} from 'react-redux'
import {fetchLazyEvents, selectEvent, selectedEventsSelector, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

class EventTableVirtualized extends Component {
    componentDidMount() {
        this.props.fetchLazyEvents()
    }

    isRowLoaded = ({ index }) => !!this.props.events[index]

    loadMoreRows = () => this.props.fetchLazyEvents()
      
    render() {
        const {events, loading, selectEvent} = this.props

        if (loading) return <Loader />

        const remoteRowCount = events.length;

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={remoteRowCount}
            >
                {({ onRowsRendered, registerChild }) => (
                    <Table
                        height={400}
                        width={600}
                        headerHeight={40}
                        rowHeight={40}
                        rowHeaderHeight={40}
                        rowGetter={this.rowGetter}
                        rowCount={remoteRowCount}
                        onRowClick={({ rowData }) => selectEvent(rowData.uid)}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        overscanRowCount={2}
                    >
                        <Column
                            dataKey='title'
                            width={300}
                            label='title'
                        />
                        <Column
                            dataKey='where'
                            width={200}
                            label='where'
                        />
                        <Column
                            dataKey='when'
                            width={200}
                            label='when'
                        />
                    </Table>
                )}
            </InfiniteLoader>
        )
    }

    rowGetter = ({ index }) => this.props.events[index]
}

export default connect((state, props) => ({
    events: eventListSelector(state, props),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    selected: selectedEventsSelector(state)
}), { fetchLazyEvents, selectEvent })(EventTableVirtualized)