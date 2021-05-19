<template>
  <QBtn
    :to="$q.platform.is.mobile && ({ name: 'messages' })"
    flat
    dense
    round
    :title="$t('GROUP.MESSAGES')"
    @click="maybeOpen"
  >
    <QIcon
      name="fas fa-comments"
      :class="{ hasUnread }"
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
      <LatestMessages />
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
const LatestMessages = () => import('@/messages/components/LatestMessages')

import { mapGetters } from 'vuex'

export default {
  components: {
    QBtn,
    QIcon,
    QBadge,
    QMenu,
    LatestMessages,
  },
  data () {
    return {
      showing: false,
    }
  },
  computed: {
    ...mapGetters({
      unseenCount: 'status/unseenCount',
      hasUnread: 'status/hasUnreadConversationsOrThreads',
    }),
  },
  methods: {
    maybeOpen () {
      if (!this.$q.platform.is.mobile) {
        this.showing = !this.showing
      }
      this.$emit('click')
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-icon:not(.hasUnread)
  opacity $topbar-opacity-low

.q-btn:hover .q-icon
  opacity 1
</style>
