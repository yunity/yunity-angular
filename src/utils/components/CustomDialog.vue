<template>
  <QDialog
    v-bind="$attrs"
    v-on="$listeners"
  >
    <QCard
      class="q-dialog-plugin"
      :style="{ width: $attrs.width ? $attrs.width : ''}"
    >
      <QCardSection class="q-dialog__title">
        <slot name="title" />
      </QCardSection>
      <QCardSection class="q-dialog__message">
        <slot name="message" />
      </QCardSection>
      <QCardActions :align="$attrs['actions-align'] ? $attrs['actions-align'] : 'right'">
        <slot name="actions" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script>
import {
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
} from 'quasar'

export default {
  components: {
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
  },
}
</script>
