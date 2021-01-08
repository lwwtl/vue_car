import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from "../views/Main";
import Employee from "../views/system/Employee";
import Store from "../views/system/Store";
import OrderDetail from "../views/rent/OrderDetail";
import Car from "../views/car/Car";
import UserInfo from "../views/user/UserInfo";

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
      component:Main,
      children:[
        {
          path:'/employee',
          name:'Employee',
          component:Employee
        },{
          path:'/store',
          name:'Store',
          component:Store
        },{
          path:'/orderDetail',
          name:'OrderDetail',
          component:OrderDetail
        },{
          path:'/car',
          name:'Car',
          component:Car
        },{
          path:'/userInfo',
          name:'UserInfo',
          component:UserInfo
        }
      ]
    }
  ]
})

export default router
