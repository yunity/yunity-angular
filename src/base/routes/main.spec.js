import { createLocalVue, mount } from '@vue/test-utils'
import { nextTicks } from '>/helpers'
import createMockModules from '>/createMockModules'

const mockJoin = jest.fn()

jest.mock('@/group/api/groups', () => ({
  join: mockJoin,
}))

jest.mock('@/router', () => {
  const VueRouter = require('vue-router')
  return new VueRouter({
    mode: 'hash',
    routes: [
      // we always need this route as we often redirect to it immediately
      {
        name: 'groupsGallery',
        path: '/groupPreview',
      },
    ],
  })
})

jest.mock('@/groupInfo/components/GroupPreviewUI', () => ({
  name: 'GroupPreviewUI',
  props: ['group', 'isLoggedIn', 'user'],
  methods: {
    visit () {
      this.$emit('go-visit', this.group.id)
    },
    join () {
      this.$emit('join', this.group.id)
    },
  },
  render (h) {
    return h('div', 'A mocked GroupPreviewUI')
  },
}))

function mountRouterViewWith ({ localVue, datastore, router }) {
  const i18n = require('@/base/i18n')

  i18n.locale = 'en'

  return mount({
    template: '<router-view/>',
  }, {
    localVue,
    i18n,
    store: datastore,
    router,
  })
}

function loadMainRoute (name) {
  const routes = require('./main').default
  return routes.find(route => route.name === name)
}

function waitForRouterReady (router) {
  return router.isReady()
}

describe('main routes', () => {
  beforeEach(() => jest.resetModules())

  let localVue
  let router
  let datastore
  let mockModules
  let wrapper
  let routedPaths
  let user

  beforeEach(() => { router = require('@/router') })

  // TODO https://next.router.vuejs.org/guide/migration/index.html#usage-of-history-state
  beforeEach(() => window.history.pushState({}, 'home', '#/')) // always reset location or tests will interfere

  beforeEach(() => {
    localVue = createLocalVue()
    const Vuex = require('vuex')
    const VueRouter = require('vue-router')
    localVue.use(Vuex)
    localVue.use(VueRouter)
  })

  beforeEach(() => {
    const Vuex = require('vuex')
    user = { id: getRandomId() }
    mockModules = createMockModules({ user })
    datastore = new Vuex.Store({
      modules: {
        ...mockModules,
        groups: require('@/groupInfo/datastore/groups').default,
        routeMeta: require('@/base/datastore/routeMeta').default,
      },
      plugins: [require('@/base/datastore/routerPlugin').default],
    })
    wrapper = mountRouterViewWith({ localVue, datastore, router })
  })

  beforeEach(async () => {
    await waitForRouterReady(router)
    routedPaths = []
    routedPaths.push(router.currentRoute.path)
    router.beforeEach((to, from, next) => {
      routedPaths.push(to.path)
      next()
    })
  })

  afterEach(() => {
    expect(mockModules.routeError.actions.set).not.toBeCalled()
  })

  describe('groupPreview', () => {
    let group

    beforeEach(() => {
      router.addRoutes([
        loadMainRoute('groupPreview'),
        {
          name: 'group',
          path: '/group/:groupId',
        },
      ])
      group = {
        id: getRandomId(),
        name: 'some group name',
        members: [],
      }
      datastore.commit('groups/set', [group])
    })

    it('lets you join the group', async () => {
      router.push({ name: 'groupPreview', params: { groupPreviewId: group.id } })

      await nextTicks(2)

      const ui = wrapper.findComponent({ name: 'GroupPreviewUI' })
      expect(ui).toBeDefined()
      ui.vm.join() // trigger the join

      await nextTicks(2)

      expect(mockJoin).toBeCalledWith(group.id)

      expect(routedPaths).toEqual([
        '/groupPreview',
        `/groupPreview/${group.id}`,
        `/group/${group.id}`,
      ])
    })

    it('lets you visit the group', async () => {
      router.push({ name: 'groupPreview', params: { groupPreviewId: group.id } })

      await nextTicks(2)

      const ui = wrapper.findComponent({ name: 'GroupPreviewUI' })
      expect(ui).toBeDefined()
      ui.vm.visit()

      await nextTicks(2)

      expect(routedPaths).toEqual([
        '/groupPreview',
        `/groupPreview/${group.id}`,
        `/group/${group.id}`,
      ])

      // note: it did not actually check if we were a member of the group
    })
  })
})

function getRandomId () {
  return getRandomInt(0, 1000)
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.realRandom() * (max - min)) + min
}
