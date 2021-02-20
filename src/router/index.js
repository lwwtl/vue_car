import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from "../views/Main";
import Employee from "../views/system/Employee";
import Store from "../views/system/Store";
import OrderDetail from "../views/rent/OrderDetail";
import Car from "../views/car/Car";
import UserInfo from "../views/user/UserInfo";
import StoreOut from "../views/rent/StoreOut";
import StoreIn from "../views/rent/StoreIn";
import Repair from "../views/carService/Repair";
import Violations from "../views/carService/Violations";
import Index from "../views/Index";

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    { path: '/login',
      name:'Login',
      component:Login
    },
    { path: '/main',
      name:'Main',
      meta: {
        requireAuth: true
      },
      component:Main,
      children:[
        {
          path:'/employee',
          name:'Employee',
          meta: {
            requireAuth: true
          },
          component:Employee
        },{
          path:'/store',
          name:'Store',
          meta: {
            requireAuth: true
          },
          component:Store
        },{
          path:'/orderDetail',
          name:'OrderDetail',
          meta: {
            requireAuth: true
          },
          component:OrderDetail
        },{
          path:'/car',
          name:'Car',
          meta: {
            requireAuth: true
          },
          component:Car
        },{
          path:'/userInfo',
          name:'UserInfo',
          meta: {
            requireAuth: true
          },
          component:UserInfo
        },{
          path: '/storeOut',
          name: 'StoreOut',
          meta: {
            requireAuth: true
          },
          component: StoreOut
        },{
          path: '/storeIn',
          name: 'StoreIn',
          meta: {
            requireAuth: true
          },
          component: StoreIn
        },{
          path: '/repair',
          name: 'Repair',
          meta: {
            requireAuth: true
          },
          component: Repair
        },{
          path: '/violations',
          name: 'Violations',
          meta: {
            requireAuth: true
          },
          component: Violations
        },{
          path: '/index',
          name: 'Index',
          meta: {
            requireAuth: true
          },
          component: Index
        },
      ]
    }
  ]
})

export default router
