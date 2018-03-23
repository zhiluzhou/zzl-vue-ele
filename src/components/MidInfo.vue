<template>
    <div>
      <section class="container">
        <div class="rush" v-if="show">
          <h3 class="title">{{midinfo[1].entries[0].name || ''}}</h3>
          <div class="content">{{midinfo[1].entries[0].description||''}}</div>
          <div class="count">
            <span>{{(midinfo[1].entries[0].more&&JSON.parse(midinfo[1].entries[0].more).population)||''}}人</span>正在抢 >
          </div>
          <img src="//fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png" alt="">
        </div>
        <div ref="combo" class="combo">
          <h3 class="title">品质套餐</h3>
          <div class="content">搭配齐全吃得好</div>
          <div class="count">
            立即抢购 >
          </div>
          <img src="//fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png" alt="">
        </div>
      </section>
    </div>
</template>
<script>
    export default {
      props: ['midinfo'],
      data() {
          return {
            show: false,
          }
      },
      mounted () {

      },
      methods : {

      },
      watch : {
        midinfo : function () {
          if(this.midinfo.length == 2) {
            this.show = true;
//            console.log(this.midinfo)
            this.$refs.combo.classList.remove("combo1");
//              console.log(this.$refs.combo)

          }else {
            this.show = false;
//            console.log(this.show)
            this.$refs.combo.classList.add("combo1");
          }
        }
      }
    }
</script>
<style scoped>
  .container {
    display: flex;
    text-align: left;
  }
  .rush,.combo {
    flex: 1;
    padding: 3.2vw 0 0 4vw;
    height: 37.333333vw;
    position: relative;
    background: linear-gradient(0deg,#f4f4f4 5%,#fafafa 95%);
    box-sizing: border-box;
  }
  .rush {
    margin-right: .8vw;
  }
  .rush img,.combo img {
    position: absolute;
    right: 0;
    bottom: -2vw;
    width: 32vw;
    height: 21.333333vw;
  }
  .combo1 {
    height: 29.333333vw;
  }
  .container .combo1 img {
    top: 2.4vw;
    right: 3.733333vw;
    width: 37.6vw;
    height: 25.066667vw;
  }
  .title {
    font-size: 0.34rem;color: #e81919;font-weight: 700;margin-bottom: 1.333333vw;
  }
  .content {
    font-size: .26rem;
    color: #777;
    margin-bottom: 2.4vw;
  }
  .count {
    font-size: 0.24rem;
    color: #333;
    font-weight: 700;
  }
  .count span {
    color: #e81919;
  }
  .combo .title {
    color: #333;
  }
  .combo .count {
    color: #af8260;
  }
</style>

