<template>
  <div>
    <QTable
      :title="$t('STATISTICS.ACTIVITY_HISTORY')"
      flat
      square
      :loading="loading"
      :columns="columns"
      :rows="enrichedDataWithTotals"
      row-key="id"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template #top-right>
        <QSelect
          v-model="userFilter"
          :label="$t('STATISTICS.FILTER_USER_LABEL')"
          filled
          :options="userFilterOptions"
          use-input
          fill-input
          hide-selected
          class="q-mr-sm"
          @filter="filterUser"
        />
        <QSelect
          v-model="periodFilter"
          :label="$t('STATISTICS.FILTER_TIME_LABEL')"
          filled
          :options="periodFilterOptions"
        />
      </template>
    </QTable>
  </div>
</template>

<script>
import { QSelect, QTable } from 'quasar'
import subDays from 'date-fns/subDays'
import subMonths from 'date-fns/subMonths'

import api from '@/statistics/api/statistics'
import { mapGetters } from 'vuex'
import { indexById } from '@/utils/datastore/helpers'

export default {
  components: {
    QSelect,
    QTable,
  },
  data () {
    return {
      loading: true,
      periodFilter: null,
      userFilter: null,
      userFilterByName: null, // when the user types something in
      data: [],
      columns: [
        {
          name: 'place',
          label: this.$t('STATISTICS.COLUMN_PLACE'),
          field: row => row.place && row.place.name,
          align: 'left',
        },
        ...[
          ['doneCount', this.$t('STATISTICS.COLUMN_ACTIVITY_DONE')],
          ['leaveCount', this.$t('STATISTICS.COLUMN_ACTIVITY_LEFT')],
          ['leaveLateCount', this.$t('STATISTICS.COLUMN_ACTIVITY_LEFT_LATE')],
        ].map(([field, label]) => ({
          name: field,
          label,
          field: row => row[field],
          align: 'right',
        })),
        {
          name: 'feedbackWeight',
          label: this.$t('STATISTICS.COLUMN_FEEDBACK_WEIGHT'),
          field: row => row.feedbackWeight.toFixed(1),
          format: value => `${value} kg`,
          align: 'right',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      currentGroupId: 'currentGroup/id',
      users: 'users/byCurrentGroup',
      getPlace: 'places/get',
    }),
    usersById () {
      return indexById(this.users)
    },
    usersAsOptions () {
      return this.users.map(user => ({
        label: user.displayName,
        value: user.id,
      })).sort((a, b) => a.label.localeCompare(b.label))
    },
    userFilterOptions () {
      return [
        {
          label: this.$t('STATISTICS.FILTER_ALL_USERS'),
          value: null,
        },
        ...this.usersAsOptions,
      ].filter(option => {
        return !this.userFilterByName || option.label.toLowerCase().includes(this.userFilterByName)
      })
    },
    periodFilterOptions () {
      return [
        // If you add new options, be sure to handle them in dateQuery too
        {
          label: this.$t('STATISTICS.FILTER_TIME_PREVIOUS_DAYS', { count: 7 }),
          value: '7days',
        },
        {
          label: this.$t('STATISTICS.FILTER_TIME_PREVIOUS_DAYS', { count: 30 }),
          value: '30days',
        },
        {
          label: this.$t('STATISTICS.FILTER_TIME_PREVIOUS_MONTHS', { count: 3 }),
          value: '3months',
        },
        {
          label: this.$t('STATISTICS.FILTER_TIME_PREVIOUS_MONTHS', { count: 6 }),
          value: '6months',
        },
        {
          label: this.$t('STATISTICS.FILTER_TIME_FOREVER'),
          value: null,
          disable: this.userFilter && this.userFilter.value !== null,
        },
      ]
    },
    totals () {
      return [
        'doneCount',
        'leaveCount',
        'leaveLateCount',
        'feedbackWeight',
      ].reduce((acc, field) => {
        acc[field] = this.data.reduce((sum, entry) => sum + entry[field], 0)
        return acc
      }, {})
    },
    enrichedData () {
      return this.data.map(entry => {
        return {
          ...entry,
          place: this.getPlace(entry.place) || {},
        }
      })
    },
    enrichedDataWithTotals () {
      if (this.enrichedData.length === 0) return []
      return [
        ...this.enrichedData,
        {
          name: this.$t('STATISTICS.TOTAL_LABEL'),
          ...this.totals,
        },
      ]
    },
    query () {
      return {
        group: this.currentGroupId,
        user: this.userFilter && this.userFilter.value,
        ...this.dateQuery,
      }
    },
    dateQuery () {
      if (!this.periodFilter) return {}
      const now = new Date()
      switch (this.periodFilter.value) {
        case '7days':
          return {
            dateAfter: subDays(now, 7),
          }
        case '30days':
          return {
            dateAfter: subDays(now, 30),
          }
        case '3months':
          return {
            dateAfter: subMonths(now, 3),
          }
        case '6months':
          return {
            dateAfter: subMonths(now, 6),
          }
        case null:
          return {}
        default:
          throw new Error(`unknown date filter option: ${this.periodFilter.value}`)
      }
    },
  },
  watch: {
    'userFilter.value' (value) {
      if (value !== null && this.periodFilter.value === null) {
        // It's required to have a period if have a user...
        this.periodFilter = this.periodFilterOptions.find(option => option.value === '6months')
      }
    },
    query: {
      immediate: true,
      async handler (params) {
        if (Object.keys(params).length === 0) return
        // don't run until options have been initialized
        if (!this.userFilter || !this.periodFilter) return
        // never permit user filters without date filter
        if (params.user && !params.dateAfter) return
        this.loading = true
        try {
          this.data = await api.activityHistory(params)
        }
        finally {
          this.loading = false
        }
      },
    },
  },
  created () {
    // Initial values
    this.periodFilter = this.periodFilterOptions[0]
    this.userFilter = this.userFilterOptions[0]
  },
  methods: {
    filterUser (val, update) {
      this.userFilterByName = val
      update()
    },
  },
}
</script>

<style scoped lang="stylus">
// the last row is our special totals row, so make it stand out
>>> tr:last-child td
  font-weight 500
</style>
