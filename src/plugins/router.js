import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/HelpView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/ServicesDashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/UserFormView.vue'),
  },
  {
    path: '/appointments',
    name: 'appointments',
    component: () => import('../views/ListAppointmentsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isUserLogged = store.getters['auth/isLoggedIn']

  if (to.matched.some((record) => record.meta.requiresAuth) && !isUserLogged) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isUserLogged) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
