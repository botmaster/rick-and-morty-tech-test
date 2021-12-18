import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/HomeView.vue'
import CharacterListView from '../views/CharacterListView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'

const routes = [
  {
    path: '/',
    // name: 'Home',
    // component: Home,
    redirect: 'characters',
  },
  {
    path: '/characters',
    name: 'characters',
    component: CharacterListView,
  },
  {
    path: '/characters/:id',
    name: 'details',
    component: CharacterDetailView,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
