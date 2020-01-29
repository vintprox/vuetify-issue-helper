// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import('@/layouts/base/Index'),
      children: [
        {
          path: '/',
          name: 'IssueCreator',
          component: () => import('@/components/IssueCreator.vue'),
        },
        {
          path: '*',
          component: () => import('@/components/404.vue'),
        },
      ],
    },
  ],
})
