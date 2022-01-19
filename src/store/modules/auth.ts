import { auth } from '../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { Commit } from 'vuex'
import { store } from '../index'

// const store = useStore()

export interface Auth {
  authIsReady: boolean

  status: boolean

  user: object

}


const state = () => ({
  status: false,
  authIsReady: false,
  token: '',
  user: {}
})

const getters = {}

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

  async login({ commit }: { commit: Commit }, { email, password }: { email: string, password: string }) {
    console.log('login action')

    const res = await signInWithEmailAndPassword(auth, email, password)
    if (res) {
      commit('setUser', res.user)
    } else {
      throw new Error('could not complete login')
    }
  },

  async logout({ commit }: { commit: Commit }) {
    console.log('logout action')
    await signOut(auth)
    commit('setUser', null)
  }
}

const mutations = {
  setUser(state: Auth, user: object) {
    state.user = user
    console.log('user state changed:', state)
  },
  setAuthIsReady(state: Auth, authIsReady: boolean) {
    state.authIsReady = authIsReady
  }
}

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('auth/setAuthIsReady', true)
  store.commit('auth/setUser', user)
  unsub()
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


