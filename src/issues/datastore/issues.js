import router from '@/base/router'
import Vue from 'vue'
import issues from '@/issues/api/issues'
import { withMeta, createMetaModule } from '@/utils/datastore/helpers'

function initialState () {
  return {
    entries: {
      /* 1: {
        'id': 1,
        'createdAt': '2019-01-21T11:13:17.828Z',
        'group': 13,
        'affectedUser': 222,
        'createdBy': 1,
        'topic': 'He is so unreliable and I cannot stand him!',
        'votings': [{
          'id': 1,
          'acceptedOption': 74,
          'expiresAt': '2019-01-28T11:13:17.828Z',
          'options': [{
            'id': 73,
            'sumScore': 7.0,
            'type': 'furtherDiscussion',
            'yourScore': null,
          },
          {
            'id': 74,
            'sumScore': 5.0,
            'type': 'removeUser',
            'yourScore': null,
          },
          { 'id': 75,
            'sumScore': 8.0,
            'type': 'offlineMediation',
            'yourScore': null,
          },
          { 'id': 76,
            'sumScore': -1.0,
            'type': 'noChange',
            'yourScore': null,
          },
          ],
        },
        ],
      },
      2: {
        'id': 2,
        'createdAt': '2019-01-15T11:13:17.828Z',
        'group': 13,
        'affectedUser': 222,
        'createdBy': 1,
        'topic': 'She is so unreliable and I cannot stand her!',
      },
    },
    past: {
      3: {
        'id': 3,
        'createdAt': '2019-01-01T11:13:17.828Z',
        'group': 13,
        'affectedUser': 222,
        'createdBy': 1,
        'topic': 'We should talk about this attitude, mister...',
      },
      4: {
        'id': 4,
        'createdAt': '2018-05-21T11:13:17.828Z',
        'group': 13,
        'affectedUser': 222,
        'createdBy': 1,
        'topic': 'I have a problem with how you behave in front of store employees. I think it makes us look unprofessional and impolite.',
      }, */
    },
    currentId: null,
  }
}
export default {
  namespaced: true,
  state: initialState(),
  modules: { meta: createMetaModule() },
  getters: {
    get: (state, getters, rootState, rootGetters) => issueId => {
      return getters.enrich(state.entries[issueId])
    },
    enrich: (state, getters, rootState, rootGetters) => issue => {
      return issue && {
        ...issue,
        affectedUser: rootGetters['users/get'](issue.affectedUser),
        group: rootGetters['groups/get'](issue.group),
        createdBy: rootGetters['users/get'](issue.createdBy),
      }
    },
    getCurrent: (state, getters) => {
      return getters.enrich(state.entries[state.currentId])
    },
    getForGroup: (state, getters) => Object.values(state.entries)
      .map(getters.enrich)
      .filter(i => i.group && i.group.isCurrentGroup)
      .sort(sortByCreatedAt),
    getOngoing: (state, getters) => getters.getForGroup.filter(i => i.status === 'ongoing'),
    getPast: (state, getters) => getters.getForGroup.filter(i => i.status !== 'ongoing'),
  },
  actions: {
    ...withMeta({
      async createIssue ({ dispatch, commit }, data) {
        const newIssue = await issues.create({ affectedUser: data.affectedUser, group: data.group, topic: data.topic })
        commit('update', [newIssue])
        dispatch('toasts/show', {
          message: 'ISSUE.CREATION.TOAST',
        }, { root: true })
        router.push({ name: 'issueTabs', params: { groupId: newIssue.group, issueId: newIssue.id } })
      },
      async fetchByGroupId ({ commit }, { groupId }) {
        const issueList = await issues.list({ group: groupId })
        console.log('The list :', issueList.results[0])
        commit('update', issueList.results)
      },
      async saveScores ({ commit, dispatch, state }, data) {
        await issues.vote(state.currentId, data)
        dispatch('toasts/show', {
          message: 'ISSUE.VOTING.TOAST',
        }, { root: true })
        commit('saveScores', data)
      },
    }),
    async beforeEnter ({ commit }, data) {
      console.log('In beforeEnter: ', data.issueId)
      const currentIssue = await issues.get(data.issueId)
      console.log('What was fetched: ', currentIssue)
      commit('setCurrentIssue', data.issueId)
      commit('update', [currentIssue])
    },
  },
  mutations: {
    setCurrentIssue (state, issueId) {
      state.currentId = issueId
    },
    saveScores (state, results) {
      for (let i = 0; i < results.length; i++) {
        Vue.set(state.entries[state.currentId].votings[0].options[i], 'yourScore', results[i].score)
      }
    },
    update (state, issues) {
      for (const issue of issues) {
        Vue.set(state.entries, issue.id, issue)
      }
    },
  },
}

export function sortByCreatedAt (a, b) {
  return b.createdAt - a.createdAt
}
