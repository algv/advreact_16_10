import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPeople} from '../../ducks/peoples'
import AddPeopleForm from '../people/AddPeopleForm'

class PeoplePage extends Component {
    static propTypes = {

    };

    render() {
        const {peoples}= this.props;
        console.log("-- peoples", peoples)

        return (
            <div>
                <h2>People page</h2>
                <AddPeopleForm onSubmit = {this.handleSubmit}/>
            </div>
        )
    }

    handleSubmit = ({firstName, lastName, email}) => {
        const { addPeople } = this.props;

        addPeople({firstName, lastName, email})
    } 
}

export default connect(null, { addPeople })(PeoplePage)