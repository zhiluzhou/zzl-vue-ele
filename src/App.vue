<template>
  <div id="app">
    <CommonFooter v-if="footerShow"></CommonFooter>
    <router-view/>

  </div>
</template>

<script>
  import CommonFooter from './components/CommonFooter.vue'
export default {
  name: 'App',
  data(){
    return {
      footerShow: true,
    }
  },
  components: {
    CommonFooter
  },
  mounted(){

  },
  watch:{      //监听路由变化

    $route( to , from ){
      if(to.path.split('/')[2]&&to.path.split('/')[1] == 'shop'){
        this.footerShow = false
      }else{
        this.footerShow = true
      }
      console.log( to , from )

      //  to , from 分别表示从哪跳转到哪，都是一个对象

      // to.path   ( 表示的是要跳转到的路由的地址 eg:  /home );

    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
