import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{
  //     path: '',
  //     component: () => import('pages/Index.vue')
  //   }]
  // },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/home/home.vue'),
      name: 'home'
    }]
  },
  {
    path: '/premeet',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/groupMeet/preMeet/preMeet.vue'),
      name: 'premeet'
    }]
  },
  {
    path: '/:callId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/groupMeet/meet/meet.vue'),
      name: 'meet'
    }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
