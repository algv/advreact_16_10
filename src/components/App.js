import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import ProtectedRoute from './common/ProtectedRoute'
import AdminPage from './routes/Admin'
import AuthPage from './routes/Auth'
import PeoplePage from './routes/PeoplePage'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <ProtectedRoute path = '/admin' component = {AdminPage}/>
                <Route path = '/auth' component = {AuthPage}/>
                <Route path = '/people' component = {PeoplePage}/>
            </div>
        )
    }
}

export default App