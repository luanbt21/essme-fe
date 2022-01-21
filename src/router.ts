import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('~/views/Home.vue')
    },

<<<<<<< HEAD
    
=======
>>>>>>> 26df849fb3ca5c0a44b107005e5590c3c0803836
    {
      path: '/news',
      name: 'news',
      component: () => import('~/views/NewsPage.vue')
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
    {
      path: '/login',
      name: 'login',
      component: () => import('~/views/SignInForm.vue')
    },
    {
      path: "/register",
      component: () => import("~/views/SignUpForm.vue"),
    },
    {
      path: '/ExpertOrCustomerStatus',
      name: 'ExpertOrCustomerStatus',
      component: () => import('~/views/ExpertOrCustomerStatus.vue'),
    },

    {
      path: '/fields',
      name: 'fields',
      component: () => import('~/views/Fields.vue'),
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('~/views/NotFound.vue') }

  ]
})

export default router
