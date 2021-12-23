import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/HomeView.vue'
import CharacterListView from '../views/CharacterListView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    // name: 'Home',
    // component: Home,
    redirect: '/characters',
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
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
