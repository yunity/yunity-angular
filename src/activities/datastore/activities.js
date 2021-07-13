import activities from '@/activities/api/activities'
import { createMetaModule, withMeta, isValidationError, withPrefixedIdMeta, metaStatusesWithId, metaStatuses, indexById } from '@/utils/datastore/helpers'
import addDays from 'date-fns/addDays'
import reactiveNow from '@/utils/reactiveNow'

function initialState () {
  return {
    entries: {},
  }
}

export default {
  namespaced: true,
  modules: { meta: createMetaModule() },
  state: initialState(),
  getters: {
    get: (state, getters, rootState, rootGetters) => activityId => {
      return getters.enrich(state.entries[activityId])
    },
    enrich: (state, getters, rootState, rootGetters) => activity => {
      if (!activity) return
      const userId = rootGetters['auth/userId']
      const place = rootGetters['places/get'](activity.place)
      const activityType = rootGetters['activityTypes/get'](activity.activityType)
      const group = place && place.group
      return {
        ...activity,
        isUserMember: activity.participants.includes(userId),
        isEmpty: activity.participants.length === 0,
        isFull: activity.maxParticipants > 0 && activity.participants.length >= activity.maxParticipants,
        place,
        activityType,
        group,
        participants: activity.participants.map(rootGetters['users/get']),
        feedbackGivenBy: activity.feedbackGivenBy ? activity.feedbackGivenBy.map(rootGetters['users/get']) : [],
        feedbackDismissedBy: activity.feedbackDismissedBy ? activity.feedbackDismissedBy.map(rootGetters['users/get']) : [],
        hasStarted: activity.date <= reactiveNow.value && activity.dateEnd > reactiveNow.value,
        ...metaStatusesWithId(getters, ['save', 'join', 'leave'], activity.id),
      }
    },
    upcomingAndStarted: (state, getters) => {
      return Object.values(state.entries)
        .map(getters.enrich)
        .filter(p => p.dateEnd > reactiveNow.value)
        .sort(sortByDate)
    },
    byCurrentGroup: (state, getters) => {
      return getters.upcomingAndStarted.filter(({ group }) => group && group.isCurrentGroup)
    },
    byActivePlace: (state, getters) => {
      return getters.byCurrentGroup.filter(({ place }) => place && place.isActivePlace)
    },
    icsUrlForCurrentGroup: (state, getters, rootState, rootGetters) => {
      return activities.icsUrl({ group: rootGetters['currentGroup/id'] })
    },
    icsUrlForCurrentPlace: (state, getters, rootState, rootGetters) => {
      return activities.icsUrl({ place: rootGetters['places/activePlaceId'] })
    },
    joined: (state, getters) => getters.byCurrentGroup.filter(e => e.isUserMember),
    available: (state, getters) =>
      getters.byCurrentGroup
        .filter(isWithinOneWeek)
        .filter(e => !e.isFull && !e.isUserMember && !e.isDisabled && !e.hasStarted)
        .filter(e => e.place.isSubscribed),
    feedbackPossibleByCurrentGroup: (state, getters) => {
      return Object.values(state.entries)
        .filter(p => p.dateEnd < reactiveNow.value && p.feedbackDue > reactiveNow.value)
        .map(getters.enrich)
        .filter(p => p.isUserMember)
        .filter(p => p.group && p.group.isCurrentGroup)
        .filter(p => !p.feedbackGivenBy.find(u => u.isCurrentUser))
        .filter(p => !p.feedbackDismissedBy.find(f => f.isCurrentUser))
        .sort(sortByDate)
    },
    feedbackPossibleByActivePlace: (state, getters) =>
      getters.feedbackPossibleByCurrentGroup
        .filter(({ place }) => place && place.isActivePlace),
    ...metaStatuses(['create', 'fetchFeedbackPossible']),
    fetchingForCurrentGroup: (state, getters, rootState, rootGetters) => {
      const currentGroupId = rootState.currentGroup.id
      if (!currentGroupId) return false
      const status = getters['meta/status']('fetchListByGroupId', `group/${currentGroupId}`)
      return status.pending
    },
  },
  actions: {
    ...withMeta({
      async fetch ({ commit }, activityId) {
        commit('update', [await activities.get(activityId)])
      },
      async join ({ dispatch }, activityId) {
        try {
          await activities.join(activityId)
        }
        catch (error) {
          if (isValidationError(error)) dispatch('fetch', activityId)
          throw error
        }
      },
      async leave ({ dispatch }, activityId) {
        try {
          await activities.leave(activityId)
        }
        catch (error) {
          if (isValidationError(error)) dispatch('fetch', activityId)
          throw error
        }
      },
      async save ({ commit, dispatch }, activity) {
        commit('update', [await activities.save(activity)])
      },
      async create ({ commit, dispatch }, data) {
        await activities.create(data)
        dispatch('refresh')
      },
      async destroy ({ commit, dispatch }, id) {
        await activities.delete(id)
        dispatch('refresh')
      },
    }),
    ...withMeta({
      async fetchFeedbackPossible ({ commit }, groupId) {
        commit('update', (await activities.listFeedbackPossible(groupId)).results)
      },
    }, {
      findId: () => null,
    }),

    ...withPrefixedIdMeta('group/', {
      async fetchListByGroupId ({ commit }, groupId) {
        commit('update', (await activities.listByGroupId(groupId)).results)
      },
    }),

    async maybeFetch ({ state, getters, dispatch }, activityId) {
      const isPending = getters['meta/status']('fetch', activityId).pending
      if (!state.entries[activityId] && !isPending) {
        await dispatch('fetch', activityId)
      }
    },
    refresh ({ dispatch, rootGetters }) {
      const groupId = rootGetters['currentGroup/id']
      if (groupId) {
        dispatch('fetchListByGroupId', groupId)
      }
    },
    async dismissFeedback ({ commit, rootGetters }, activityId) {
      await activities.dismissFeedback(activityId)
    },
  },
  mutations: {
    clear (state) {
      Object.assign(state, initialState())
    },
    clearUpcomingForPlace (state, placeId) {
      const now = new Date()
      const rest = Object.fromEntries(Object.entries(state.entries)
        .filter(activity => !(activity.place === placeId && activity.date >= now)))
      Object.freeze(rest)
      state.entries = rest
    },
    update (state, activities) {
      state.entries = Object.freeze({ ...state.entries, ...indexById(activities) })
    },
    delete (state, activityId) {
      if (state.entries[activityId]) {
        const { [activityId]: _, ...rest } = state.entries
        Object.freeze(rest)
        state.entries = rest
      }
    },
  },
}

export function isWithinOneWeek (activity) {
  return activity.date < addDays(reactiveNow.value, 7)
}

export function sortByDate (a, b) {
  return a.date - b.date
}
