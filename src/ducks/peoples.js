import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'


/**
 * Constants
 * */
export const moduleName = 'peoples'
const prefix = `${appName}/${moduleName}`

export const ADD_PEOPLE = `${prefix}/ADD_PEOPLE`

/**
 * Reducer
 * */
const PeopleModel = Record({
    id: null,
    firstName: '',
    lastName: '',
    email: ''
})

const DefaultReducerState = Record({
    entities: new OrderedMap({}),
})

export default (peoples = new DefaultReducerState(), action) => {
    const {type, payload} = action

    switch (type) {
        case ADD_PEOPLE:
        return peoples.setIn(['entities'], new PeopleModel({
            ...payload.people,
        }))

        default:
            return peoples
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const peoplesSelector = createSelector(stateSelector, state => state.peoples.entities)

/**
 * Action Creators
 * */
export function addPeople(people) {
    return {
        type: ADD_PEOPLE,
        payload: {
            people: {...people, id: Date.now() + Math.random() }
        },
    }
}
