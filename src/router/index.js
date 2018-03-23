import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Detail from '../pages/GoodsDetail.vue'
import Msg from '../components/Message.vue'
import Order from '../pages/Order.vue'
import Index from '../pages/Index.vue'
import Home from '../pages/Home.vue'
import Find from '../pages/Find.vue'
import Mine from '../pages/Mine.vue'
import Shop from '../pages/Shop.vue'
Vue.use(Router)

var router = new Router({
  routes: [
    // {
    //   path: '/',
    //   // component: resolve => require(['../pages/Home'],resolve),
    //   component: Home,
    //   meta: {
    //     title:'home'
    //   }
    // },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/order',
      component: Order,
      children: [
        {
          path:'/one',
          component: Msg
        }
      ]
    },
    {
      path : '/mine',
      component: Mine,
    },
    {
      path:'/shop/geohash=wtw3sjq6n6um&id=:id&s_type=0&rank_id=:rank_id',
      name: 'shop',
      component:Shop
    }
  ]
})
// router.push('/home');

export default router;
