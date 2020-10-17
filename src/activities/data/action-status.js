// action statuses
import { shallowReactive, toRefs } from '@vue/composition-api'
import { isNetworkError, isServerError, isValidationError } from '@/utils/datastore/helpers'

const INITIAL = 'INITIAL'
const PENDING = 'PENDING'
const SUCCESS = 'SUCCESSS'
const ABORTED = 'ABORTED'
const VALIDATION_ERRORS = 'VALIDATION_ERRORS'
const SERVER_ERROR = 'SERVER_ERROR'
const NETWORK_ERROR = 'NETWORK_ERROR'
const UNHANDLED_ERROR = 'UNHANDLED_ERROR'

function initialActionStatus () {
  return {
    status: INITIAL,
    pending: false,
    validationErrors: {},
    hasValidationErrors: false,
    serverError: false,
    networkError: false,
    startedAt: null,
    aborted: false,
    unhandledError: null,
    result: null,
  }
}

export function actionStatus (fn) {
  const res = shallowReactive(initialActionStatus())

  Object.assign(res, {
    status: PENDING,
    pending: true,
    startedAt: new Date(),
  })

  Promise.resolve(fn.apply(arguments)).then(result => {
    res.result = result
    res.pending = false
    res.status = SUCCESS
  }).catch(error => {
    res.pending = false
    if (error.type === 'ActionAborted') {
      console.warn('action aborted!')
      res.aborted = true
      res.status = ABORTED
    }
    else if (isValidationError(error)) {
      res.status = VALIDATION_ERRORS
      res.validationErrors = error.response.data
      // if (error.response.status === 403) {
      //   commit('auth/setMaybeLoggedOut', true, { root: true })
      // }
      // return false
    }
    else if (isServerError(error)) {
      res.status = SERVER_ERROR
      res.serverError = true
    }
    else if (isNetworkError(error)) {
      res.status = NETWORK_ERROR
      res.networkError = true
    }
    else {
      // some other error, can't handle it here
      res.unhandledError = error
      res.status = UNHANDLED_ERROR
      throw error
    }
  })

  return toRefs(res)
}