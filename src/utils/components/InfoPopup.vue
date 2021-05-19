<template>
  <QBtn
    size="sm"
    round
    flat
    color="green"
    icon="fas fa-question-circle"
    :title="tooltip"
    @click.prevent
  >
    <QMenu
      square
      dark
      max-width="280px"
      class="q-pa-md text-center bg-primary"
    >
      <p
        v-if="title"
        class="text-h5"
      >
        {{ title }}
      </p>
      <p>{{ description }}</p>
      <QBtn
        v-close-popup
        flat
      >
        {{ $t('BUTTON.CLOSE') }}
      </QBtn>
      <QBtn
        v-if="infoLink"
        type="a"
        flat
        :href="infoLink.href"
        target="_blank"
      >
        {{ infoLink.text }}
      </QBtn>
    </QMenu>
  </QBtn>
</template>

<script>
import {
  QBtn,
  QMenu,
} from 'quasar'

export default {
  components: {
    QBtn,
    QMenu,
  },
  props: {
    tooltip: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
    infoLink: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
