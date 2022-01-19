import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('~/views/Home.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('~/views/Question.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('~/views/News.vue')
    },

  
    {
      path: '/expert',
      name: 'expert',
      component: () => import('~/views/ExpertPage.vue')
    },

    {
      path: '/events',
      name: 'events',
      component: () => import('~/views/Events.vue'),
      props: true
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('~/views/NotFound.vue') }

  ]
})

export default router
