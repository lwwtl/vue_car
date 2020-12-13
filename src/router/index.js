import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from "../views/Main";

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
      component:Main
    }
  ]
})

export default router
