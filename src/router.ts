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
      path: '/expert/:id',
      name: 'expert',
      component: () => import('~/views/ExpertDedailPage.vue'),
      props: route => ({
        what: route.query.what,
        where: route.query.where,
        page: route.query.page ? parseInt(route.query.page as string) : 1
      })
   
    },

    {
      path: '/news',
      alias: '/news/:id',
      name: 'news',
      component: () => import('~/views/NewsPage.vue'),
      props: route => ({
        what: route.query.what,
        where: route.query.where,
        page: route.query.page ? parseInt(route.query.page as string) : 1
      })
    },

    // {
    //   path: '/news/:id',
    //   name: 'news',
    //   component: () => import('~/views/NewsPage.vue'),
    // },

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
      path: '/allexperts',
      name: 'allexperts',
      component: () => import('~/views/ExpertPage.vue'),
      props: true
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
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  //   if (from.path === '/expert/:id' && to.path === '/expert/:id') {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve({ el: '#map', top: 200, behavior: 'smooth' })
  //       }, 400)
  //     })

    
    

  //   return { top: 0 }
  // }
}}
)

export default router
