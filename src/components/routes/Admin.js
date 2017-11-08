import React, { Component } from 'react'
import PeopleList from '../people/PeopleList'
import EventList from '../events/EventTableVirtualized'
import SelectedEvents from '../events/SelectedEvents'
import Trash from '../events/Trash'

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <SelectedEvents/>
                <PeopleList/>
                <Trash/>
                <EventList/>
            </div>
        )
    }
}

export default Admin