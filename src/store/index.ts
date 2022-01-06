import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import auth, { Auth } from './modules/auth'

const strict = process.env.NODE_ENV !== 'production'

export interface State {
  auth: Auth
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    auth
  },
  strict
})

export function useStore() {
  return baseUseStore(key)
}
