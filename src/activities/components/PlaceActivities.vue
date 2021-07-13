<template>
  <div>
    <KNotice v-if="isInactive">
      <template #icon>
        <QIcon class="far fa-handshake" />
      </template>
      {{ $t('STOREDETAIL.INACTIVE') }}
      <template #desc>
        <RouterLink
          v-if="isEditor"
          :to="{name: 'placeEdit', params: { placeId }}"
        >
          {{ $t('STOREDETAIL.CHANGE_STATUS') }}
        </RouterLink>
      </template>
    </KNotice>
    <KNotice v-else-if="hasNoActivities">
      <template #icon>
        <QIcon class="fas fa-bed" />
      </template>
      {{ $t('ACTIVITYLIST.NONE') }}
      <template #desc>
        <RouterLink
          v-if="isEditor"
          :to="{name: 'placeActivitiesManage', params: { placeId }}"
        >
          {{ $t('ACTIVITYLIST.STORE_NONE_HINT') }}
        </RouterLink>
      </template>
    </KNotice>
    <ActivityList
      :pending="fetchPending"
      :activities="activities"
      :ics-url="activitiesIcsUrl"
      @join="join"
      @leave="leave"
      @detail="detail"
    />
  </div>
</template>

<script>
import { QIcon } from 'quasar'

import ActivityList from '@/activities/components/ActivityList'
import KNotice from '@/utils/components/KNotice'

import {
  mapGetters,
  mapActions,
} from 'vuex'

export default {
  components: {
    ActivityList,
    KNotice,
    QIcon,
  },
  computed: {
    ...mapGetters({
      placeId: 'places/activePlaceId',
      place: 'places/activePlace',
      activities: 'activities/byActivePlace',
      activitiesIcsUrl: 'activities/icsUrlForCurrentPlace',
      fetchPending: 'activities/fetchingForCurrentGroup',
      isEditor: 'currentGroup/isEditor',
    }),
    hasNoActivities () {
      if (this.fetchPending) return false
      return this.activities && this.activities.length === 0
    },
    isInactive () {
      return this.place && this.place.status !== 'active'
    },
  },
  methods: {
    ...mapActions({
      join: 'activities/join',
      leave: 'activities/leave',
      detail: 'detail/openForActivity',
    }),
  },
}
</script>
