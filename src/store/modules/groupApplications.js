import Vue from 'vue'
import groupApplications from '@/services/api/groupApplications'
import router from '@/router'
import { indexById, withMeta, createMetaModule, metaStatuses } from '@/store/helpers'

function initialState () {
  return {
    entries: {},
    idList: [],
  }
}
export default {
  namespaced: true,
  modules: { meta: createMetaModule() },
  state: initialState(),
  getters: {
    get: (state, getters, rootState, rootGetters) => applicationId => {
      return getters.enrich(state.entries[applicationId])
    },
    enrich: (state, getters, rootState, rootGetters) => application => {
      return application && {
        ...application,
        applicant: rootGetters['users/get'](application.user),
        isPending: application.status === 'pending',
        isDeclined: application.status === 'declined',
        isAccepted: application.status === 'accepted',
        isWithdrawn: application.status === 'withdrawn',
      }
    },
    getByGroupId: state => groupId => {
      return Object.values(state.entries).find(a => a.group === groupId)
    },
    all: (state, getters) => Object.keys(state.entries).map(getters.get),
    ...metaStatuses(['apply']),
  },
  actions: {
    ...withMeta({

      async fetchMine ({ commit, rootGetters }) {
        const userId = rootGetters['auth/userId']
        const applicationList = await groupApplications.list({ user: userId, status: 'pending' })
        commit('set', applicationList)
      },

      async fetchPendingByGroupId ({ commit, getters }, { groupId }) {
        const applicationList = await groupApplications.list({ group: groupId })
        commit('set', applicationList)
        const all = getters.all
        console.log('give me that array!', all)
      },

      async apply ({commit}, data) {
        const newApplication = await groupApplications.create(data)
        commit('create', newApplication)
        router.push({ name: 'groupPreview', params: { groupPreviewId: data.group } })
      },

      async withdraw ({ commit }, applicationId) {
        const removedApplication = await groupApplications.withdraw(applicationId)
        commit('delete', removedApplication.id)
      },

      async accept ({commit}, data) {
        const acceptedApplication = await groupApplications.accept(data)
        commit('delete', acceptedApplication.id)
      },

      async decline ({ commit }, data) {
        const declinedApplication = await groupApplications.decline(data)
        commit('delete', declinedApplication.id)
      },

    }),
    clearGroupPreviewAndStatus ({ dispatch }) {
      dispatch('meta/clear', ['apply'])
      dispatch('groups/clearGroupPreview', null, { root: true })
    },
  },
  mutations: {
    create (state, newApplication) {
      Vue.set(state.entries, newApplication.id, newApplication)
    },
    set (state, applicationList) {
      state.entries = indexById(applicationList)
    },
    delete (state, id) {
      Vue.delete(state.entries, id)
    },
  },
}
