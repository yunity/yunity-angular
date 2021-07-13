<template>
  <div>
    <ActivityList
      :activities="activities"
      :pending="pending"
      place-link
      filter
      :filter-activity-types="activityTypes"
      :ics-url="activitiesIcsUrl"
      @join="join"
      @leave="leave"
      @detail="detail"
    />
    <template v-if="hasNoActivities">
      <KNotice>
        <template #icon>
          <QIcon class="fas fa-bed" />
        </template>
        {{ $t('ACTIVITYLIST.NONE') }}
        <template #desc>
          {{ $t('ACTIVITYLIST.NONE_HINT') }}
        </template>
      </KNotice>
      <QCard>
        <QCardSection>
          <span v-t="'GROUP.PLACES'" />
        </QCardSection>
        <QCardSection>
          <PlaceList
            :group-id="groupId"
            :places="places"
            link-to="placeActivitiesManage"
          />
        </QCardSection>
      </QCard>
    </template>
  </div>
</template>

<script>
import {
  QCard,
  QIcon,
  QCardSection,
} from 'quasar'

import { mapGetters, mapActions } from 'vuex'

import ActivityList from '@/activities/components/ActivityList'
import KNotice from '@/utils/components/KNotice'
import PlaceList from '@/places/components/PlaceList'

export default {
  components: {
    QCard,
    QIcon,
    QCardSection,
    ActivityList,
    KNotice,
    PlaceList,
  },
  computed: {
    ...mapGetters({
      groupId: 'currentGroup/id',
      activities: 'activities/byCurrentGroup',
      activitiesIcsUrl: 'activities/icsUrlForCurrentGroup',
      activityTypes: 'activityTypes/byCurrentGroup',
      pending: 'activities/fetchingForCurrentGroup',
      places: 'places/byCurrentGroup',
    }),
    hasNoActivities () {
      if (this.pending) return false
      return this.activities && this.activities.length === 0
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

<style scoped lang="stylus">
.padding
  padding 1em

.notice
  .icon
    margin .1em 0 0 0
  padding 2em 3em
  transform translateZ(1px) rotate(-3deg)

  h5
    padding 0

.manage
  padding 8px

  q-btn
    display inline-block
    padding .3em
</style>
