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
      props: route => ({
        what: route.query.what,
        where: route.query.where,
        page: route.query.page ? parseInt(route.query.page as string) : 1
      })
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('~/views/SignInForm.vue')
    },
    {
      path: '/register',
      component: () => import('~/views/SignUpForm.vue')
    },
    {
      path: '/ExpertOrCustomerStatus',
      name: 'ExpertOrCustomerStatus',
      component: () => import('~/views/ExpertOrCustomerStatus.vue')
    },

    {
      path: '/fields',
      name: 'fields',
      component: () => import('~/views/Fields.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('~/views/Admin.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('~/views/NotFound.vue') }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (from.path === '/events' && to.path === '/events') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ el: '#map', top: 200, behavior: 'smooth' })
        }, 400)
      })

    
    

    return { top: 0 }
  }
}}
)

export default router
