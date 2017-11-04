/**
 * Store independent helpers
 * If a helper depends on the vuex store, put it in storeHelpers.js
 */

import Vue from 'vue'

/**
 * Returns an object that maps entries of iterables by their `id` field
 *
 * @param iterable array to be indexed
 * @returns {object}
 */
export function indexById (iterable) {
  return iterable.reduce((acc, cur, i) => {
    acc[cur.id] = cur
    return acc
  }, {})
}

export function onlyHandleAPIError (error, handleFn) {
  const { response: { status = -1, data } = {} } = error
  if (status >= 400 && status < 500) {
    handleFn({ error: data })
  }
  else {
    handleFn({ error })
    throw error
  }
}

/**
 * Defines a vues module that can be used to handle async request metadata.
 *
 * Instantiation:

 const meta = defineRequestModule()
 export const modules = { meta }

 * Usage:

async save ({ commit, dispatch }, group) {
  dispatch('meta/request', {
    id: `save-${group.id}`,
    async run () {
      const updatedGroup = await groups.save(group)
      commit(types.RECEIVE_GROUP, { group: updatedGroup }) // other commits when successful
    },
  })
},
 */
export function defineRequestModule () {
  const types = {
    REQUEST: 'Request',
    RECEIVE_SUCCESS: 'Receive Success',
    RECEIVE_ERROR: 'Receive Error',
    CLEAR: 'Clear',
  }

  const state = {
    entries: {},
  }

  const getters = {
    get: state => id => state.entries[id] || ({
      isWaiting: false,
      error: null,
      success: false,
    }),
    error: (state, getters) => id => field => {
      const { [field]: [ message ] = [] } = getters.get(id).error
      return message
    },
    isWaiting: (state, getters) => id => getters.get(id).isWaiting,
    success: (state, getters) => id => getters.get(id).success,
  }

  const actions = {
    async request ({ commit }, { id, run }) {
      commit(types.REQUEST, { id })
      try {
        await run()
        commit(types.RECEIVE_SUCCESS, { id })
      }
      catch (error) {
        const { response: { status = -1, data } = {} } = error
        if (status >= 400 && status < 500) {
          commit(types.RECEIVE_ERROR, { id, error: data })
        }
        else {
          throw error
        }
      }
    },
    clear ({ commit }) {
      commit('clear')
    },
  }

  const mutations = {
    [types.REQUEST] (state, { id }) {
      Vue.set(state.entries, id, {
        isWaiting: true,
        error: null,
        success: false,
      })
    },
    [types.RECEIVE_SUCCESS] (state, { id }) {
      Vue.set(state.entries, id, {
        isWaiting: false,
        error: null,
        success: true,
      })
    },
    [types.RECEIVE_ERROR] (state, { id, error }) {
      Vue.set(state.entries, id, {
        isWaiting: false,
        error,
        success: false,
      })
    },
    [types.CLEAR] (state, { id }) {
      Vue.set(state.entries, id, {
        isWaiting: false,
        error: null,
        success: false,
      })
    },
  }

  return {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
}
