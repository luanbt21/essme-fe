import { auth } from '../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { Commit } from 'vuex'
import { store } from '../index'
import axios from 'axios'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
// const store = useStore()

export interface Auth {
  authIsReady: boolean

  status: boolean

  user: {}

  token: string

}


const state = () => ({
  status: false,
  authIsReady: false,
  token: '',
  user: {
    accessToken: ''
  }
})

const getters = {
  getToken: (state: Auth) => {
    return state.token
  }
}

const actions = {
  async signup({ commit }: { commit: Commit }, { email, password }: { email: string, password: string }) {
    console.log('signup action')

    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (res) {
      commit('setUser', res.user)
    } else {
      throw new Error('could not complete signup')
    }
  },

  async login({ commit }: { commit: Commit }) {
    console.log('login action')

    const res = await signInWithPopup(auth, provider)
      .then((result) => {
        const token = GoogleAuthProvider.credentialFromResult(result)?.idToken
        const user = result.user;
        return { user: user, token: token }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode)
        console.log(errorMessage)
        console.log(email)
        console.log(credential)
      });
    if (res) {
      const user = res.user
      const token = res.token
      commit('setUser', { user, token })
    } else {
      throw new Error('could not complete login')
    }
  },

  async logout({ commit }: { commit: Commit }) {
    console.log('logout action')
    await signOut(auth)
    commit('setUser1', null)
    commit('setAuthIsReady', false)
    commit('setTokenID', null)

  }
}

const mutations = {
  setUser(state: Auth, { user, token }: { user: object, token: string }) {
    state.user = user
    state.token = token
    console.log('user state changed:', state)
  },
  setUser1(state: Auth, user: object) {
    state.user = user
  },
  setAuthIsReady(state: Auth, authIsReady: boolean) {
    state.authIsReady = authIsReady
  },
  setTokenID(state: Auth, token: string) {
    state.token = token
  },
}

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('auth/setAuthIsReady', true)
  store.commit('auth/setUser1', user)
  unsub()
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


