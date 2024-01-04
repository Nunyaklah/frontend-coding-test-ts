import type { App } from 'vue'
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LayoutMain from '../components/layout/LayoutMain.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Shop from '../views/Shop.vue'
import ItemDetail from '../components/ItemDetail.vue'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/shop/item/:id',
    name: 'ItemDetail',
    component: ItemDetail,
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/error',
    alias: '/:pathMatch(.*)*',
    name: 'Error',
    props: true,
    component: Error,
  },
  {
    path: '/',
    props: true,
    component: LayoutMain,
    children: mainRoutes,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: Signup,
  },
]

export default function initializeRouter(app: App): Router {
  const router: Router = createRouter({
    history: createWebHistory(),
    routes,
  })

  const authStore = useAuthStore()

  // Add a router guard
  router.beforeEach(async (to, from, next) => {
    const publicPages: string[] = ['/login', '/signup', '/']
    const authRequired: boolean = !publicPages.includes(to.path)

    if (authRequired && !authStore.token) {
      // Redirect to the login page if the user is not authenticated
      next({ name: 'Login' })
    } else {
      // Continue to the requested route
      next()
    }
  })

  app.use(router)

  return router
}
