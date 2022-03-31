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
      component: () => import('~/views/ExpertDedailPage.vue')
    },

    {
      path: '/news',
      alias: '/news/:id',
      name: 'news',
      component: () => import('~/views/NewsPage.vue'),
      props: route => ({
        what: route.query.what,
        where: route.query.where,
        page: route.query.page ? parseInt(route.query.page as string) : 1,
        tag: route.query.tag?.toString()
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
        page: route.query.page ? parseInt(route.query.page as string) : 1,
        types: route.query.types,
        tags: route.query.tags
      })
    },
    {
      path: '/events/:id',
      name: 'eventDetail',
      component: () => import('~/views/EventDetail.vue'),
      props: route => ({
        id: route.params.id
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
      path: '/fields/:name',
      name: 'fieldname',
      component: () => import('~/views/Fields.vue'),
      props: route => ({
        field: route.query.field,
        limit: route.query.limit ? parseInt(route.query.limit as string) : 20,
        skip: route.query.skip ? parseInt(route.query.skip as string) : 0

      })
    },

    {
      path: '/fields',
      name: 'fieldfilter',
      component: () => import('~/views/Fields.vue'),
      props: route => ({
        field: route.query.field,
        limit: route.query.limit ? parseInt(route.query.limit as string) : 20,
        skip: route.query.skip ? parseInt(route.query.skip as string) : 0

      })
    },

    {
      path: '/allexperts',
      name: 'allexperts',
      component: () => import('~/views/ExpertPage.vue'),
      props: route => ({
        what: route.query.what,
        where: route.query.where,
        page: route.query.page ? parseInt(route.query.page as string) : 1
      })
    },
    {
      path: '/expertfields',
      name: 'expertfields',
      component: () => import('~/views/ExpertsField.vue'),
      props: route => ({
        what: route.query.what,
        where: route.query.where,
        page: route.query.page ? parseInt(route.query.page as string) : 1
      })
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('~/views/Admin.vue')
    },
    {
      path: '/questionSheet',
      name: 'questionSheet',
      component: () => import('~/views/QuestionSheet.vue')
    },
    {
      path: '/FQAs',
      name: 'FQAs',
      component: () => import('~/views/FQAs.vue')
    },
    {
      path: '/FQAs/:id',
      name: 'FQAanswer',
      component: () => import('~/views/FQAanswer.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('~/views/NotFound.vue') }
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  //   if (from.path === '/events' && to.path === '/events') {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve({ el: '#map', top: 200, behavior: 'smooth' })
  //       }, 400)
  //     })

  //   return { top: 0 }
  // }

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ el: '#map', top: 200, behavior: 'smooth' })
          }, 400)
        })

        return { top: 0 }
      }
    }
  }
})
export default router
