<template>
  <div
    class="bg-white q-pa-md"
  >
    <div class="k-logo-container row no-wrap items-center">
      <RouterLink
        :to="'/'"
        class="logo self-start"
      >
        <KarrotLogo />
      </RouterLink>
      <h4
        v-t="'GLOBAL.ABOUT_KARROT'"
        class="col q-ma-none q-pl-md"
      />
    </div>

    <QList class="q-mt-md">
      <QItem
        tag="a"
        rel="noopener noreferrer"
        href="https://community.foodsaving.world/t/how-to-get-involved-onboarding-into-the-karrot-team/661"
        target="_blank"
      >
        <QItemSection side>
          <QIcon name="fas fa-users" />
        </QItemSection>
        <QItemSection>
          <QItemLabel>
            <!-- this is in English because so far people working on Karrot are communicating in English only-->
            How to Get Involved
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem
        tag="a"
        rel="noopener noreferrer"
        href="https://github.com/yunity/karrot-frontend"
        target="_blank"
      >
        <QItemSection side>
          <QIcon name="fab fa-fw fa-github" />
        </QItemSection>
        <QItemSection>
          <QItemLabel>
            {{ $t('GLOBAL.GITHUB_NOTE') }}
          </QItemLabel>
          <QItemLabel caption>
            {{ $t('SIDENAV.GIT_SUB') }}
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem
        tag="a"
        rel="noopener noreferrer"
        href="https://fosstodon.org/@karrot"
        target="_blank"
      >
        <QItemSection side>
          <QIcon name="fab fa-fw fa-mastodon" />
        </QItemSection>
        <QItemSection>
          <QItemLabel>
            Mastodon
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem
        tag="a"
        rel="noopener noreferrer"
        href="https://community.foodsaving.world"
        target="_blank"
      >
        <QItemSection side>
          <QIcon name="fas fa-fw fa-globe" />
        </QItemSection>

        <QItemSection>
          <QItemLabel>
            Community
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem
        tag="a"
        rel="noopener noreferrer"
        href="mailto:info@karrot.world"
      >
        <QItemSection side>
          <QIcon name="fas fa-fw fa-envelope" />
        </QItemSection>

        <QItemSection>
          <QItemLabel>
            info@karrot.world
          </QItemLabel>
        </QItemSection>
      </QItem>
    </QList>

    <div class="text-center k-about-footer">
      karrot
      <a
        v-if="release"
        :href="release.link"
        target="_blank"
        rel="noopener"
      >
        {{ release.name }}
      </a>
      <br><br>
      made with
      <i class="fas fa-heart text-red" />
      by
      <a
        href="https://community.foodsaving.world/people"
        target="_blank"
        rel="noopener"
      >
        karrot team
      </a>
    </div>

    <div class="row justify-end q-mt-sm">
      <QBtn
        flat
        :label="$t('BUTTON.CLOSE')"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QIcon,
} from 'quasar'

import { mapGetters } from 'vuex'

import KarrotLogo from '@/logo/components/KarrotLogo'

export default {
  components: {
    KarrotLogo,
    QBtn,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QIcon,
  },
  computed: {
    ...mapGetters({
      deployed: 'about/deployed',
    }),
    release () {
      if (process.env.DEV) {
        return {
          link: '',
          name: 'local dev',
        }
      }
      if (this.deployed) {
        if (this.deployed.env === 'production') {
          return {
            link: 'https://github.com/yunity/karrot-frontend/blob/master/CHANGELOG.md',
            name: this.deployed.date,
          }
        }
        if (this.deployed.env === 'development') {
          return {
            link: `https://github.com/yunity/karrot-frontend/tree/${this.deployed.commitSHA}`,
            name: this.deployed.date,
          }
        }
      }
      return {
        link: '',
        name: '',
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'

.k-logo-container
  height 75px

  .logo
    width 62px
    height 62px

  > div
    height 80px
    filter drop-shadow(0px 1px 1px rgba(0, 0, 0, .7))

.k-about-footer
  margin-top 50px
</style>
