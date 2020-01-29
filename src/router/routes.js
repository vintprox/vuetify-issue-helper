export const routes = [
  {
    path: '/',
    name: 'IssueCreator',
    component: () => Promise.resolve(require('@/components/IssueCreator.vue')),
  },
  {
    path: '*',
    component: () => Promise.resolve(require('@/components/404.vue')),
  },
]
