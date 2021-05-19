import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import splashRoutes from '@/base/routes/splash'
import mainRoutes from '@/base/routes/main'

const MainLayout = () => import('@/base/pages/MainLayout')
const SplashLayout = () => import('@/base/pages/SplashLayout')
const RouteError = () => import('@/base/components/RouteError')

Vue.use(VueRouter)

export default createRouter({
  routes: [
    {
      path: '',
      component: MainLayout,
      children: [
        ...mainRoutes,
        {
          path: '',
          component: SplashLayout,
          children: splashRoutes,
        },
      ],
    },
    // Always leave this last one
    { path: '*', component: RouteError }, // Not found
  ],
  scrollBehavior (to, from, savedPosition) {
    // keep scroll position if we stay on same page
    if (from.name === to.name) return

    if (to.hash) {
      return {
        selector: to.hash,
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { left: 0, top: 0 }
    }
  },

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  hash: createWebHashHistory(process.env.VUE_ROUTER_BASE),
})
