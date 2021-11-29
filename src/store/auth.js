import * as firebase from 'firebase/app'
// import * as firebase from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import { getDatabase, ref, set } from 'firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyDUQXQHSv_sUZZpRjY1tSzEJ6FVGktyqC4',
  authDomain: 'vue-yt-bcff3.firebaseapp.com',
  projectId: 'vue-yt-bcff3',
  storageBucket: 'vue-yt-bcff3.appspot.com',
  messagingSenderId: '527784368472',
  appId: '1:527784368472:web:c18bf91ae6d4aa95572d2d',
  measurementId: 'G-TWMXJHTS3L'
})

const auth = getAuth()
const db = getDatabase()

export default {
  actions: {
    async login ({
      dispatch,
      commit
    }, {
      email,
      password
    }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch }, {
      email,
      password,
      name
    }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        await set(ref(db, `/users/${uid}/info`), {
          bill: 100000,
          name
        })
      } catch (e) {
        throw e
      }
    },
    getUid () {
      // return user ? user.uid : null
      const user = auth.currentUser
      return user ? user.uid : null
    },
    async logout () {
      await signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      })
    },
  }
}

