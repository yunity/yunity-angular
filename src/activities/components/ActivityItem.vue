<template>
  <QCard
    :class="{ full: activity.isFull }"
  >
    <QCardSection
      class="no-padding content"
      :class="{ isEmpty: activity.isEmpty, isUserMember: activity.isUserMember, isDisabled: activity.isDisabled }"
    >
      <div class="content-inner">
        <div class="row no-wrap items-start justify-between">
          <div>
            <strong class="featured-text">
              {{ $d(activity.date, 'hourMinute') }}
              <template v-if="activity.hasDuration"> &mdash; {{ $d(activity.dateEnd, 'hourMinute') }}</template>
            </strong>
            <template v-if="placeLink">
              <template v-if="dense">
                <span>{{ $d(activity.date, 'dateWithDayName') }}</span>
                <br>
              </template>
              <span v-if="activity.place">
                <RouterLink :to="{ name: 'place', params: { placeId: activity.place.id }}">
                  {{ activity.place.name }}
                </RouterLink>
              </span>
            </template>
            <template v-else>
              {{ $d(activity.date, 'dateLongWithDayName') }}
            </template>
          </div>
          <QIcon
            v-if="activity.activityType"
            v-bind="activity.activityType.iconProps"
            title=""
            size="xs"
            class="q-ml-sm"
            style="top: 1px;"
          >
            <q-tooltip v-if="activity.activityType.iconProps && activity.activityType.iconProps.title">
              {{ activity.activityType.iconProps.title }}
            </q-tooltip>
          </QIcon>
        </div>
        <div
          v-if="activity.isDisabled"
          class="q-my-xs"
        >
          <b class="text-negative">{{ $t('ACTIVITYLIST.ACTIVITY_DISABLED') }}</b>
        </div>
        <div
          v-if="activity.hasStarted"
          class="q-my-xs"
        >
          <b class="text-orange">{{ $t('ACTIVITYLIST.ACTIVITY_STARTED') }}</b>
        </div>
        <!-- eslint-disable vue/multiline-html-element-content-newline -->
        <div
          v-if="activity.description"
          class="q-my-xs multiline"
        >{{ activity.description }}</div>
        <!-- eslint-enable vue/multiline-html-element-content-newline -->
        <div class="q-mt-sm q-mb-none full-width">
          <ActivityUsers
            :activity="activity"
            @leave="leave"
            @join="join"
          />
          <CustomDialog v-model="joinDialog">
            <template #title>
              <QIcon
                v-bind="activity.activityType.iconProps"
                size="sm"
                class="q-pr-sm"
              />
              {{ $t('ACTIVITYLIST.ITEM.JOIN_CONFIRMATION_HEADER', { activityType: activity.activityType.translatedName }) }}
            </template>
            <template #message>
              {{ $t('ACTIVITYLIST.ITEM.JOIN_CONFIRMATION_TEXT', { date: $d(activity.date, 'long') }) }}
            </template>
            <template #actions>
              <QBtn
                v-close-popup
                flat
                color="primary"
                :label="$t('BUTTON.CANCEL')"
              />
              <QBtn
                v-close-popup
                flat
                color="primary"
                data-autofocus
                :label="$t('BUTTON.OF_COURSE')"
                @click="$emit('join', activity.id)"
              />
            </template>
          </CustomDialog>
          <CustomDialog v-model="leaveDialog">
            <template #title>
              <QIcon
                v-bind="activity.activityType.iconProps"
                size="sm"
                class="q-pr-sm"
              />
              {{ $t('ACTIVITYLIST.ITEM.LEAVE_CONFIRMATION_HEADER', { activityType: activity.activityType.translatedName }) }}
            </template>
            <template #message>
              {{ $t('ACTIVITYLIST.ITEM.LEAVE_CONFIRMATION_TEXT') }}
            </template>
            <template #actions>
              <QBtn
                v-close-popup
                flat
                color="primary"
                :label="$t('BUTTON.CANCEL')"
              />
              <QBtn
                v-close-popup
                flat
                color="primary"
                data-autofocus
                :label="$t('BUTTON.YES')"
                @click="$emit('leave', activity.id)"
              />
            </template>
          </CustomDialog>
        </div>
      </div>
    </QCardSection>
    <QCardSection
      class="row no-padding full-width justify-end bottom-actions"
    >
      <QBtn
        v-if="activity.isUserMember"
        :href="icsUrl"
        flat
        no-caps
        type="a"
        color="secondary"
        class="action-button"
      >
        <template #default>
          <QIcon
            name="event"
            size="xs"
            class="q-mr-xs"
          />
          <span>{{ $t('ACTIVITYLIST.ITEM.DOWNLOAD_ICS') }}</span>
        </template>
      </QBtn>
      <QBtn
        flat
        no-caps
        color="secondary"
        class="action-button"
        @click.native.stop="detail"
      >
        <template #default>
          <QIcon
            name="chat"
            size="xs"
            class="q-mr-xs icon-chat"
          />
          <span class="block">{{ $t('CONVERSATION.OPEN') }}</span>
        </template>
      </QBtn>
    </QCardSection>
  </QCard>
</template>

<script>
import {
  QCard,
  QCardSection,
  QIcon,
  QBtn,
} from 'quasar'
import ActivityUsers from './ActivityUsers'
import CustomDialog from '@/utils/components/CustomDialog'

export default {
  components: {
    CustomDialog,
    QCard,
    QCardSection,
    QIcon,
    QBtn,
    ActivityUsers,
  },
  props: {
    activity: {
      type: Object,
      required: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    placeLink: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      joinDialog: false,
      leaveDialog: false,
    }
  },
  computed: {
    icsUrl () {
      // host added to the ICS url so that it still works in Cordova
      // see https://github.com/yunity/karrot-frontend/issues/2400
      return `${window.location.origin}/api/activities/${this.activity.id}/ics/`
    },
  },
  methods: {
    join () {
      this.leaveDialog = false
      this.joinDialog = true
    },
    leave () {
      if (!this.activity.hasStarted) {
        this.joinDialog = false
        this.leaveDialog = true
      }
    },
    detail (event) {
      if (event.target.closest('a')) return // ignore actual links
      this.$emit('detail', this.activity)
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'

.content
  width 100%
  transition background-color 2s ease

  &.isUserMember
    &:not(.isDisabled)
      background linear-gradient(to right, $lightGreen, $lighterGreen)

  &.isDisabled
    background $lightRed

  .content-inner
    width 100%
    padding 12px

    .featured-text
      display inline
      margin-right .3em

.bottom-actions
  font-weight 500
  color $secondary
  box-shadow 0 -1px 0 rgba(0, 0, 0, 0.06)

.q-btn.action-button
  >>> .q-btn__wrapper
    padding 10px 16px !important

    .icon-chat
      transform rotateY(180deg)
</style>
