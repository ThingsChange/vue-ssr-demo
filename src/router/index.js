import Vue from 'vue'
import Router from 'vue-router'
import indexSSR from './../views/indexSSR.vue'

Vue.use(Router)

// const indexSSR = () => import('./../views/indexSSR.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', name: 'home', component: indexSSR },
      // { path: '/', redirect: '/testSSR' },
      { path: '/about',
        name: '关于',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  })
}
