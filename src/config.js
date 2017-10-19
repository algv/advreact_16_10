import firebase from 'firebase'

export const appName = 'advreact-1610'
const appId = 'ec352'

firebase.initializeApp({
    apiKey: "AIzaSyB3LVTO7RSDrZAkHBkpzg9T5KkuoCoy4qo",
    authDomain: `${appName}-${appId}.firebaseapp.com`,
    databaseURL: `https://${appName}-${appId}.firebaseio.com`,
    projectId: `${appName}-${appId}`,
    storageBucket: `${appName}-${appId}.appspot.com`,
    messagingSenderId: "651090769196"
})