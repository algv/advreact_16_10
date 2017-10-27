import {all, put, call, takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, OrderedMap, OrderedSet} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

export const SELECT_EVENT = `${prefix}/SELECT_EVENT`


/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({}),
    selected: new OrderedSet([])
})

export const EventRecord = Record({
    uid: null,
    month: null,
    submissionDeadline: null,
    title: null,
    url: null,
    when: null,
    where: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_ALL_START:
        case FETCH_LAZY_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
        case FETCH_LAZY_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, EventRecord))

        case SELECT_EVENT:
            return state.update('selected', selected => selected.add(payload.uid))

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const selectionSelector = createSelector(stateSelector, state => state.selected.toArray())
export const eventListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const selectedEventsSelector = createSelector(entitiesSelector, selectionSelector, (entities, selection) =>
    selection.map(uid => entities.get(uid))
)

/**
 * Action Creators
 * */

export function fetchAllEvents() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function fetchLazyEvents() {
    return {
        type: FETCH_LAZY_REQUEST
    }
}

export function selectEvent(uid) {
    return {
        type: SELECT_EVENT,
        payload: { uid }
    }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
    const ref = firebase.database().ref('events')

    yield put({
        type: FETCH_ALL_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: snapshot.val()
    })
}

export function* fetchLazySaga() {
    yield put({
        type: FETCH_LAZY_START
    })

    const lastUid = stateSelector.entities ? stateSelector.entities.last().uid : ''

    const ref = firebase.database().ref('events')
        .orderByKey()
        .limitToFirst(10)
        .startAt(lastUid)

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: FETCH_LAZY_SUCCESS,
        payload: snapshot.val()
    })
}

export function* saga() {
    yield all([
        takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga)
    ])
}