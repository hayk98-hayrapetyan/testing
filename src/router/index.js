import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueRouteMiddleware from 'vue-route-middleware';
import i18n from '../i18n'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}`
  },
  {
    path: "/:lang",
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          middleware: (to, from, next) => {
            if(store.state.auth.user == null){
                next({ name: 'Login' });
            }
          }
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
        meta: {
          middleware: (to, from, next) => {
            if(store.state.auth.user == null){
                next({ name: 'Login' });
            }
          }
        }
      },
      {
        path: 'article/:id',
        name: 'article',
        component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'),
        meta: {
          middleware: (to, from, next) => {
            if(store.state.auth.user == null){
                next({ name: 'Login' });
            }
          }
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {
          middleware: (to, from, next) => {
            if(store.state.auth.user != null){
                next({name: "Home"});
            }
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

router.beforeEach(VueRouteMiddleware());
export default router
