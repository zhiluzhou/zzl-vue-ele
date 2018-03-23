<template>
  <div id="app">
    <!--<CommonFooter></CommonFooter>-->
    <router-view/>

  </div>
</template>

<script>
  import CommonFooter from './components/CommonFooter.vue'
export default {
  name: 'App',
  components: {
    CommonFooter
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
