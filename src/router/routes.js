export const routes = [
  {
    path: '/',
    name: 'IssueCreator',
    component: () => import('@/components/IssueCreator.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('@/components/Success.vue')
  },
  {
    path: '*',
    component: () => import('@/components/404.vue')
  }
]
