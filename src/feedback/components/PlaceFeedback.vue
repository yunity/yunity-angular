<template>
  <div>
    <QCard class="no-shadow grey-border">
      <div class="generic-padding relative-position">
        <KSpinner v-show="!statistics" />
        <div
          v-if="statistics"
          class="infoChips row no-wrap"
        >
          <QChip
            :icon="$icon('activity')"
            color="secondary"
            text-color="white"
            square
            :title="$t('FEEDBACKLIST.NUMBER_ACTIVITIES', { count: statistics.activitiesDone })"
          >
            <strong class="q-ml-sm">{{ statistics.activitiesDone }}</strong>
          </QChip>
          <QChip
            v-if="statistics.feedbackCount > 0"
            :icon="$icon('feedback')"
            color="secondary"
            text-color="white"
            square
            :title="$t('FEEDBACKLIST.NUMBER_FEEDBACK', { count: statistics.feedbackCount })"
          >
            <strong class="q-ml-sm">{{ statistics.feedbackCount }}</strong>
          </QChip>
          <QChip
            v-if="statistics.feedbackWeight > 0"
            icon="fas fa-weight"
            color="secondary"
            text-color="white"
            square
            :title="$t('FEEDBACKLIST.WEIGHT_SUM', { sum: statistics.feedbackWeight })"
          >
            <strong class="q-ml-sm">{{ statistics.feedbackWeight }}&nbsp;kg</strong>
          </QChip>
        </div>
        <span v-if="statistics && statistics.feedbackWeight > 0">
          {{ $tc('FEEDBACKLIST.SAVED', 2, { amount: statistics.feedbackWeight }) }}
        </span>
      </div>
    </QCard>
    <FeedbackList
      :feedback="feedback"
      :status="fetchStatus"
      :can-fetch-past="canFetchPast"
      :fetch-past="fetchPast"
      :fetch-past-status="fetchPastStatus"
      :feedback-possible="feedbackPossible"
      :feedback-possible-status="feedbackPossibleStatus"
    />
  </div>
</template>

<script>
import FeedbackList from '@/feedback/components/FeedbackList'
import KSpinner from '@/utils/components/KSpinner'

import {
  QCard,
  QChip,
} from 'quasar'

import {
  mapGetters,
  mapActions,
} from 'vuex'

export default {
  components: {
    FeedbackList,
    KSpinner,
    QCard,
    QChip,
  },
  computed: {
    ...mapGetters({
      place: 'places/activePlace',
      feedback: 'feedback/byActivePlace',
      fetchStatus: 'feedback/fetchStatus',
      canFetchPast: 'feedback/canFetchPast',
      fetchPastStatus: 'feedback/fetchPastStatus',
      feedbackPossible: 'activities/feedbackPossibleByActivePlace',
      feedbackPossibleStatus: 'activities/fetchFeedbackPossibleStatus',
    }),
    statistics () {
      return this.place && this.place.statistics
    },
  },
  methods: {
    ...mapActions({
      fetchPast: 'feedback/fetchPast',
    }),
  },
}
</script>

<style scoped lang="stylus">
.infoChips
  padding-bottom 15px

  .q-chip
    padding 2px 16px
    margin-right 8px
</style>
