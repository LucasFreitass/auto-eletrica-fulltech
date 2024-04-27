import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import('../views/DashboardView.vue')
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
    component: () => import('../views/NewHomeView.vue')
  },
  {
    path: '/solicitar-serviço',
    name: 'solicitar-serviço',
    component: () => import('../views/SolicitarServicoView.vue')
  },
  {
    path: '/editar-serviços',
    name: 'editar-serviços',
    component: () => import('../views/EditarServicoView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
