import datastore from '@/base/datastore'
import router from '@/base/router'
import messageAPI from '@/messages/api/messages'
import conversationsAPI from '@/messages/api/conversations'

document.addEventListener('deviceready', onDeviceReady, false)

const devicereadyTimeout = setTimeout(() => {
  console.error('deviceready not fired within 5 seconds, is cordova.js loaded? FCM will not work otherwise.')
}, 5000)

function onDeviceReady () {
  clearTimeout(devicereadyTimeout)
  const { PushNotification } = window
  const push = PushNotification.init({
    android: {
      forceShow: true,
      icon: 'push_icon',
      iconColor: 'green',
    },
  })
  push.on('registration', receiveFCMToken)
  push.on('notification', receiveNotification)
  push.on('error', console.log)
  push.on('mark', data => {
    console.log('mark as read', data)
    const { conversationId, messageId, threadId } = data.additionalData.karrot
    if (threadId) {
      messageAPI.markThread(threadId, messageId)
    }
    else {
      conversationsAPI.mark(conversationId, { seenUpTo: messageId })
    }
  })
}

function receiveNotification (data) {
  console.log('data', data)
  // this seems always to get triggered when receiving notifications, not just when tapping
  const { foreground, dismissed } = data.additionalData
  if (foreground || dismissed) return

  // Notification was received on device tray and tapped by the user
  const { path } = data.additionalData.karrot
  if (path) {
    const pendingRoute = datastore.state.routeMeta.next
    if (pendingRoute && pendingRoute.path === path) return
    router.push(path)
  }
}

function receiveFCMToken (data) {
  console.log('token', data)

  datastore.commit('fcm/setToken', data.registrationId)
}
