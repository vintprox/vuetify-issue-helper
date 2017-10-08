export const routes = [
  {
    path: '/',
    name: 'IssueCreator',
    component: () => import('@/components/IssueCreator.vue')
  },
  {
    path: '*',
    component: () => import('@/components/404.vue')
  }
]
