import {signUp, signUpSaga, SIGN_UP_START, SIGN_UP_SUCCESS,
    signIn, signInSaga, SIGN_IN_START, SIGN_IN_SUCCESS} from './auth'
import {call, put, take} from 'redux-saga/effects'
import firebase from 'firebase'

it('should sign up', () => {
    const user = {
        email: 'authtest@example.com',
        password: '1234567890'
    }

    const auth = firebase.auth()

    const requestAction = signUp(user.email, user.password)

    const saga = signUpSaga()

    expect(saga.next().value).toEqual(take(SIGN_UP_START))

    expect(JSON.stringify(saga.next(requestAction).value)).toEqual(JSON.stringify(
        call([auth, auth.createUserWithEmailAndPassword], user.email, user.password)
    ))

    expect(saga.next(user).value).toEqual(put({
        type: SIGN_UP_SUCCESS,
        payload: {user}
    }))
})

it('should sign in', () => {
    const user = {
        email: 'authtest@example.com',
        password: '1234567890'
    }

    const auth = firebase.auth()

    const requestAction = signIn(user.email, user.password)

    const saga = signInSaga()

    expect(saga.next().value).toEqual(take(SIGN_IN_START))

    expect(saga.next(requestAction).value).toEqual(
        call([auth, auth.signInWithEmailAndPassword], user.email, user.password)
    )

    expect(saga.next(user).value).toEqual(put({
        type: SIGN_IN_SUCCESS,
        payload: {user}
    }))
})