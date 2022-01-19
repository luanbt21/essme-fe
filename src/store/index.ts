import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

import expert_id, { ID_expert } from './modules/expert_id'

const strict = process.env.NODE_ENV !== 'production'

export interface State {

  expert_id: ID_expert

}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    
    expert_id
  },
  strict
})

export function useStore() {
  return baseUseStore(key)
}
