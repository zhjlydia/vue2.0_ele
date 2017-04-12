// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'
import './common/stylus/index.styl'


const routes=[
  {path: '/',component: goods},
  {path:'/goods',component:goods},
  {path:'/seller',component:seller},
  {path:'/ratings',component:ratings}
  ];
  
const router=new VueRouter({
  linkActiveClass: 'active',
  routes
});
Vue.use(VueRouter);
Vue.use(vueResource);
router.push('./goods');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  template: '<App/>',
  components: { App }
});
