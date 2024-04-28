import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')

  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue')
  },
  {
    path: '/home',
    name: 'newhome',
    component: () => import('../views/NewHomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/solicitar-serviço',
    name: 'solicitar-serviço',
    component: () => import('../views/SolicitarServicoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editar-serviços',
    name: 'editar-serviços',
    component: () => import('../views/EditarServicoView.vue'),
    meta: { requiresAuth: true }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isUserLogged = store.getters['auth/isLoggedIn']

  if (to.matched.some(record => record.meta.requiresAuth) && !isUserLogged) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isUserLogged) {
    next({ name: 'newhome' })
  } else {
    next()
  }
})

export default router
