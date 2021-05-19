<template>
  <div>
    <component :is="$q.platform.is.mobile ? 'div' : 'QCard'">
      <QTable
        :columns="columns"
        :rows="filteredActivityTypes"
        hide-pagination
        :pagination="{ rowsPerPage: 0 }"
        flat
      >
        <template #top-left>
          <QToggle
            v-model="showArchived"
            :label="$t('ACTIVITY_TYPES.SHOW_ARCHIVED')"
          />
        </template>
        <template #top-right>
          <QBtn
            round
            color="green"
            icon="fas fa-plus"
            @click="createNewActivityType()"
          />
        </template>
        <template #body="props">
          <QTr
            :key="props.key"
            :props="props"
            class="cursor-pointer"
            @click="toggleEdit(props.row)"
          >
            <QTd
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              :auto-width="col.autoWidth"
            >
              <QIcon
                v-if="col.name === 'icon'"
                size="md"
                v-bind="props.row.iconProps"
              />
              <QIcon
                v-else-if="col.name === 'feedback'"
                v-show="props.row.hasFeedback"
                size="md"
                v-bind="props.row.feedbackIconProps"
              />
              <template v-else-if="col.name === 'feedbackWeight'">
                <span v-show="props.row.hasFeedback && props.row.hasFeedbackWeight">
                  <QIcon
                    size="xs"
                    name="fas fa-check"
                  />
                </span>
              </template>
              <QBadge
                v-else-if="col.name === 'status'"
                :color="colourForStatus(col.value)"
              >
                {{ col.value }}
              </QBadge>
              <template v-else>
                {{ col.value }}
              </template>
            </QTd>
          </QTr>
          <QTr
            v-if="props.row.id === editActivityTypeId"
            :key="`${props.key}-expand`"
            :props="props"
          >
            <QTd
              colspan="100%"
              style="padding: 0;"
            >
              <ActivityTypeForm
                :value="editActivityType"
                :activity-types="activityTypes"
                :status="editActivityType.saveStatus"
                @save="save"
                @cancel="cancelActivityType"
              />
            </QTd>
          </QTr>
        </template>
      </QTable>
      <ActivityTypeForm
        v-if="newActivityType"
        :value="newActivityType"
        :activity-types="activityTypes"
        :status="activityTypeCreateStatus"
        :class="$q.platform.is.mobile ? '' : 'q-ma-md'"
        @save="saveNewActivityType"
        @cancel="cancelNewActivityType"
      />
    </component>
  </div>
</template>

<script>
import {
  QBtn,
  QCard,
  QTable,
  QTr,
  QTd,
  QIcon,
  QToggle,
  QBadge,
  Dialog,
} from 'quasar'
import ActivityTypeForm from '@/group/components/ActivityTypeForm'

export default {
  components: {
    ActivityTypeForm,
    QBtn,
    QCard,
    QTr,
    QTable,
    QTd,
    QIcon,
    QToggle,
    QBadge,
  },
  props: {
    activityTypes: {
      type: Array,
      required: true,
    },
    activityTypeCreateStatus: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      showArchived: false,
      editActivityTypeId: null,
      newActivityType: null,
    }
  },
  computed: {
    editActivityType () {
      if (!this.editActivityTypeId) return
      return this.activityTypes.find(item => item.id === this.editActivityTypeId)
    },
    filteredActivityTypes () {
      if (this.showArchived) return this.activityTypes
      return this.activityTypes.filter(activityType => activityType.status !== 'archived')
    },
    columns () {
      return [
        this.showArchived && { // don't need to see status unless we're viewing all ...
          name: 'status',
          label: this.$t('ACTIVITY_TYPES.STATUS'),
          field: row => row.status,
          align: 'left',
          autoWidth: true,
        },
        {
          name: 'icon',
          align: 'center',
          autoWidth: true,
        },
        {
          name: 'name',
          label: this.$t('ACTIVITY_TYPES.NAME'),
          field: row => row.translatedName,
          align: 'left',
          classes: 'text-weight-bold',
        },
        {
          name: 'feedback',
          label: this.$t('ACTIVITY_TYPES.FEEDBACK'),
          align: 'center',
          autoWidth: true,
        },
        {
          name: 'feedbackWeight',
          label: this.$t('ACTIVITY_TYPES.FEEDBACK_WEIGHT'),
          field: row => row.hasFeedbackWeight,
          align: 'center',
          autoWidth: true,
          hideOnMobile: true,
        },
      ].filter(Boolean).filter(col => !(this.$q.platform.is.mobile && col.hideOnMobile))
    },
  },
  watch: {
    'editActivityType.saveStatus' (status, prevStatus) {
      if (this.wasSuccessful(status, prevStatus)) {
        this.editActivityTypeId = null // hide the edit form
      }
    },
    activityTypeCreateStatus (status, prevStatus) {
      if (this.wasSuccessful(status, prevStatus)) {
        this.newActivityType = null // hide the new form
      }
    },
  },
  methods: {
    toggleEdit (activityType) {
      if (this.editActivityTypeId === activityType.id) {
        this.editActivityTypeId = null
      }
      else {
        this.editActivityTypeId = activityType.id
      }
    },
    save (activityType) {
      Dialog.create({
        title: this.$t('HISTORY.CONFIRM_CHANGES'),
        message: this.$t('HISTORY.CONFIRM_CHANGES_HINT'),
        prompt: {
          model: '',
          type: 'text',
        },
        cancel: this.$t('BUTTON.CANCEL'),
        ok: this.$t('BUTTON.SAVE_CHANGES'),
      })
        .onOk(updatedMessage => {
          if (updatedMessage) {
            this.$emit('save', { updatedMessage, ...activityType })
          }
          else {
            this.$emit('save', activityType)
          }
        })
    },
    colourForStatus (status) {
      return {
        active: 'green',
        archived: 'grey',
      }[status] || 'primary'
    },
    createNewActivityType () {
      this.newActivityType = {
        name: '',
        nameIsTranslatable: true,
        colour: '455a64', // blue-grey / 8
        status: 'active',
        icon: 'fas fa-asterisk',
        feedbackIcon: 'fas fa-reply',
        hasFeedback: false,
        hasFeedbackWeight: false,
      }
    },
    saveNewActivityType (activityType) {
      this.$emit('create', activityType)
    },
    cancelNewActivityType () {
      this.newActivityType = null
      this.resetNewActivityType()
    },
    cancelActivityType () {
      this.editActivityTypeId = null
      this.resetActivityType()
    },
    wasSuccessful (status, prevStatus) {
      // Means we just saved! I hate this convoluted way to find out the simplest of things...
      // I'm hoping the composable data layer concept will address this
      // See https://github.com/yunity/karrot-frontend/pull/2252
      if (!status || !prevStatus) return
      return prevStatus.pending && !status.pending && !status.hasValidationErrors
    },
    resetNewActivityType () {
      this.$store.dispatch('activityTypes/meta/clear', ['create'])
    },
    resetActivityType (activityId) {
      this.$store.dispatch('activityTypes/meta/clear', ['save', activityId])
    },
  },
}
</script>
