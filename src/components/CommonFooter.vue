<template lang="html">
  <footer>
    <div class="container">
      <router-link to="/home">
        <img src="../assets/logo.png" alt="">
        <span>首页</span>
      </router-link>
      <router-link to="/find">
        <img src="../assets/logo.png" alt="">
        <span>发现</span>
      </router-link>
      <router-link to="/order">
        <img src="../assets/logo.png" alt="">
        <span>订单</span>
      </router-link>
      <router-link to="/mine">
        <img src="../assets/logo.png" alt="">
        <span>我的</span>
      </router-link>
    </div>
  </footer>
</template>
<script>
  export default {
  }
</script>
<style lang="css" scoped>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.2vw;
    background-color: #fff;
    height: 13.333333vw;
    box-shadow: 0 -0.266667vw 0.533333vw rgba(0,0,0,.1);
    font-size: 0.2rem;
  }
  .container a {
    display: block;
    flex: 1;
    text-align: center;
  }
  .container a img {
    width: 5.333333vw;
    height: 5.333333vw;
  }
  .container a span {
    display: block;
  }
</style>
