import { createStore } from 'vuex'

// alphabetical
import agreements from '@/agreements/datastore'
import alerts from '@/alerts/datastore'
import applications from '@/applications/datastore'
import authuser from '@/authuser/datastore'
import base from '@/base/datastore/base'
import communityFeed from '@/communityFeed/datastore'
import feedback from '@/feedback/datastore'
import group from '@/group/datastore'
import groupInfo from '@/groupInfo/datastore'
import history from '@/history/datastore'
import invitations from '@/invitations/datastore'
import issues from '@/issues/datastore'
import messages from '@/messages/datastore'
import notifications from '@/notifications/datastore'
import activities from '@/activities/datastore'
import sidenav from '@/sidenav/datastore'
import places from '@/places/datastore'
import status from '@/status/datastore'
import subscriptions from '@/subscriptions/datastore'
import offers from '@/offers/datastore'
import topbar from '@/topbar/datastore'
import unsubscribe from '@/unsubscribe/datastore'
import users from '@/users/datastore'
import utils from '@/utils/datastore'

// alphabetical
const appModules = [
  agreements,
  alerts,
  applications,
  authuser,
  base,
  communityFeed,
  feedback,
  group,
  groupInfo,
  history,
  invitations,
  issues,
  messages,
  notifications,
  activities,
  sidenav,
  places,
  status,
  subscriptions,
  offers,
  topbar,
  unsubscribe,
  users,
  utils,
]

const collectedModules = {}
const collectedPlugins = []

appModules.forEach(({ modules = {}, plugins = [] }) => {
  Object.assign(collectedModules, modules)
  collectedPlugins.push(...plugins)
})

const debug = process.env.DEV

export default createStore({
  modules: collectedModules,
  plugins: collectedPlugins,
  strict: debug,
})
