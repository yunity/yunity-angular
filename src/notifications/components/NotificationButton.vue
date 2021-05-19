<template>
  <QBtn
    :to="$q.platform.is.mobile && ({ name: 'notifications' })"
    flat
    dense
    round
    :title="$t('NOTIFICATION_BELLS_LIST.TITLE')"
    @click="maybeOpen"
  >
    <QIcon
      name="fas fa-bell"
      :class="{ hasUnseen: unseenCount > 0 }"
    />
    <QBadge
      v-if="unseenCount > 0"
      floating
      color="secondary"
    >
      {{ unseenCount > 9 ? '9+' : unseenCount }}
    </QBadge>
    <QMenu
      v-if="!$q.platform.is.mobile"
      v-model="showing"
      no-parent-event
      style="width: 500px"
      anchor="bottom middle"
      self="top middle"
    >
      <Notifications
        as-popover
      />
    </QMenu>
  </QBtn>
</template>

<script>
import {
  QBtn,
  QIcon,
  QBadge,
  QMenu,
} from 'quasar'
const Notifications = () => import('@/notifications/components/Notifications')

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    QBtn,
    QIcon,
    QBadge,
    QMenu,
    Notifications,
  },
  data () {
    return {
      showing: false,
    }
  },
  computed: {
    ...mapGetters({
      unseenCount: 'status/unseenNotificationCount',
    }),
  },
  methods: {
    ...mapActions({
      fetchInitial: 'notifications/fetchInitial',
      markSeen: 'notifications/markSeen',
    }),
    async maybeOpen () {
      await this.fetchInitial()
      if (!this.$q.platform.is.mobile) {
        this.showing = !this.showing
        this.markSeen()
      }
      this.$emit('click')
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-icon:not(.hasUnseen)
  opacity $topbar-opacity-low

.q-btn:hover .q-icon
  opacity 1
</style>
