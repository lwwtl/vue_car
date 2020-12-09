import Vue from 'vue'
import VueRouter from 'vue-router'
import About from "../views/About";
import Home from "../views/Home";
import Login from '../views/Login.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    { path: '/',
      name:'Home',
      component:Home
    }, { path: '/about',
      name:'About',
      component:About
    }, { path: '/login',
      name:'Login',
      component:Login
    },
  ]
})

export default router
