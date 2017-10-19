import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class AddPeopleForm extends Component {
    static propTypes = {

    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h3>Add new people</h3>
                <form onSubmit = {handleSubmit}>
                    <Field name = 'firstName' component = {ErrorField} type = 'text' label = 'firstName'/>
                    <Field name = 'lastName' component = {ErrorField} type = 'text' label = 'lastName'/>
                    <Field name = 'email' component = {ErrorField} type = 'text' label = 'email'/>
                    <div>
                        <input type = 'submit' disabled={this.props.invalid}/>
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({ firstName, lastName, email}) => {
    const errors = {}

    if (!firstName) errors.firstName = 'firstName is a required field'
    if (!lastName) errors.lastName = 'lastName is a required field'
    if (!email) errors.email = 'email is a required field'

    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    return errors
}

export default reduxForm({
    form: 'people',
    validate
})(AddPeopleForm)