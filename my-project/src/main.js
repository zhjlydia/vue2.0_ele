// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'

Vue.config.productionTip = false

const routes=[
  {path:'./goods',component:goods},
  {path:'./seller',component:seller},
  {path:'./ratings',component:ratings}
  ]
var router=new VueRouter({
  routes:routes
});
Vue.use(VueRouter);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  template: '<App/>',
  components: { App }
});
