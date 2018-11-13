import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Reset from '@/components/reset'
import City from '@/components/city'
import FoodPage from '@/components/foodPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Index
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/reset',
      component:Reset
    },
    {
      path:'/city',
      component:City
    },
    {
      path:'/foodPage/',
      name:'footPage',
      component:FoodPage
    }
  ]
})
