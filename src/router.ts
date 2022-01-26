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
      path: '/news',
      name: 'news',
      component: () => import('~/views/NewsPage.vue')
    },
    {
      path: '/expert/:id',
      name: 'expert',
      component: () => import('~/views/ExpertDedailPage.vue'),
     
   
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

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('~/views/NotFound.vue') },
    {
      path: '/allexperts',
      name: 'allexperts',
      component: () => import('~/views/ExpertPage.vue'),
      props: true
    }

  ]
})

export default router
