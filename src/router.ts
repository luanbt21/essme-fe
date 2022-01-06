import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('@/views/Question.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('@/views/NotFound.vue') }
  ]
})

export default router
