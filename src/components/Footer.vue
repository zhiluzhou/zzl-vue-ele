<template>
    <footer>
      <div class="container">
        <a href="">
          <img src="../assets/logo.png" alt="">
          <span>首页</span>
        </a>
        <a href="">
          <img src="../assets/logo.png" alt="">
          <span>发现</span>
        </a>
        <a href="">
          <img src="../assets/logo.png" alt="">
          <span>订单</span>
        </a>
        <a href="">
          <img src="../assets/logo.png" alt="">
          <span>我的</span>
        </a>
      </div>
    </footer>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style scope>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
  }
  .container a {
    flex: 1;
  }
</style>

