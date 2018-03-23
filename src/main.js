// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Mint from 'mint-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import Jquery from "./assets/js/jquery.min.js"
// import common from './assets/js/common.js'
// console.log(common.getPath)
// Vue.use(common);
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Mint);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.filter('dCurrency', function(value) {
  return '￥'+value
})
Vue.filter('dTofixed', function(value) {
  var isNum = parseFloat(value);
  if( !isNum ){
    alert("请输入数字")
    return "请输入数字";
  } else {
    var value = Math.round(isNum*100)/100;
    var item = value.toString().split(".");
    if(item.length == 1){
      value = value.toString()+".00";
      return value;
    }
    if(item.length > 1){
      if(item[1].length < 2){
        value = value.toString()+"0";
      }
      return value;
    }
  }
})
function getPath(path) {
  //fuss10.elemecdn.com/3/9d/fc68cebc503835785136ac84861c7jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/
//          ""39dfc68cebc503835785136ac84861c7jpeg""

  let imgPath = '//fuss10.elemecdn.com/' + path[0] + '/' + path[1] + path[2] + '/' + path.split('').splice(3).toString().replace(/,/g, '') + '.' + 'jpeg' || 'png' || 'jpg'
  return imgPath;
}
