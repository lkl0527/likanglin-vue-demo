import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/Login'
import Index from '@/Index'
import User from '@/views/user/User'
import Orga from '@/views/org/Orga'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    }, {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/user',
      name: 'User',
      component: User
    }, {
      path: '/orga',
      name: 'Orga',
      component: Orga
    }
  ]
})
