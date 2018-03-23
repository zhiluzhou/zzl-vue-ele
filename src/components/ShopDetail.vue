<template>
  <div id="nav">
    <div class="shop_header">
      <nav class="shop_header_nav"
           :style="{backgroundImage:'url('+getPath(detail.image_path)+'?imageMogr/format/webp/thumbnail/!40p/blur/50x40/)'}">
        <router-link to="/home">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </nav>
      <div class="shop_title_container">
        <img
          :src="getPath(detail.image_path)+'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'"
          alt="">
        <div class="shop_title">
          <h2>
            <span>{{detail.name}}</span>
            <i class="el-icon-caret-right"></i>
          </h2>
          <div class="shop_base_info">
            <span class="base_detail">{{detail.rating}}</span>
            <span class="base_detail">月售{{detail.recent_order_num}}单</span>
            <span class="base_detail">
                蜂鸟专送
                <span>约{{detail.order_lead_time}}分钟</span>
              </span>
            <span class="base_detail">距离{{getDistance(detail.distance)}}</span>
          </div>
          <p>{{detail.promotion_info}}</p>
        </div>
      </div>
      <div class="shop_act_container" @click="showAct">
        <div class="shop_act" v-for="a,i in detail.activities" v-if="i==0">
          <div class="act">
              <span class="activity_icon" :style="{backgroundColor: '#'+a.icon_color}">
                {{a.icon_name}}
              </span>
            <span class="activity_content">{{a.tips}}</span>
          </div>
        </div>
        <div class="shop_act_count">
          {{detail.activities&&detail.activities.length}}个优惠
        </div>
      </div>
      <mt-popup v-model="isShowAct" position="bottom" style="width: 100%;">
        <div class="activity_sheet_container">
          <h2>优惠活动</h2>
          <div class="activity_sheet_content">
            <div class="activity_sheet" v-for="a in detail.activities">
              <span class="activity_icon1" :style="{backgroundColor: '#'+a.icon_color}">
              {{a.icon_name}}
              </span>
              <span>{{a.tips}}</span>
            </div>
          </div>
        </div>
        <div class="activity_close" @click="showAct">
          <i class="el-icon-close"></i>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  export default {
    props:['detail'],
    data() {
      return {
        isShowAct: false,
      }
    },
    methods: {
      showAct() {
        this.isShowAct = !this.isShowAct;
      },
      getPath(path) {
        let str;
        if(path){
          if (path.substring(path.length - 4) == 'jpeg') {
            str = 'jpeg'
          } else if (path.substring(path.length - 3) == 'png') {
            str = 'png'
          } else {
            str = 'jpg'
          }
          let imgPath = '//fuss10.elemecdn.com/' + path[0] + '/' + path[1] + path[2] + '/' + path.split('').splice(3).toString().replace(/,/g, '') + '.' + str;
          return imgPath;
        }
      },
      getDistance(val) {
        if(val>1000){
          return (val / 1000).toFixed(2)+'km'
        }else{
          return val+'m'
        }

      },
    }
  }
</script>
<style scoped>
  #nav {
    position: relative;
    font-size: 0.24rem;
  }

  .shop_header {
    padding-bottom: 2.133333vw;
    color: #333;
    font-size: .24rem;
    background-color: #fff;
  }

  .shop_header_nav {
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    height: 16vw;
    padding: 1.066667vw 2.666667vw;
  }

  .shop_header_nav:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(119, 103, 137, .43);
  }

  .shop_header_nav a i {
    font-size: 0.5rem;
    color: #fff;
    position: absolute;
  }

  .shop_title_container {
    padding: 8vw 4vw 0;
    position: relative;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    text-align: center;
  }

  .shop_title_container img {
    width: 17.333333vw;
    height: 17.333333vw;
    border-radius: .533333vw;
    box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, .2);
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -10vw;
    margin-top: -12vw;
  }

  .shop_title {
    flex: 1;
    width: 72vw;
  }

  .shop_title h2 {
    margin: 0;
    font-size: .416667rem;
    line-height: 1.2em;
    font-weight: 700;
    white-space: nowrap;
    position: relative;
    padding-right: 2.666667vw;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .shop_title h2 span {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .shop_base_info {
    white-space: nowrap;
    height: 3.2vw;
    margin-top: 1.733333vw;
    font-size: .24rem;
    color: #333;
  }

  .base_detail:not(:last-child):after {
    content: " \B7 ";
    opacity: .2;
  }

  .shop_title p {
    width: 58.133333vw;
    font-size: .24rem;
    font-weight: 300;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 2.266667vw auto 2.666667vw;
    padding: 0;
    white-space: nowrap;
  }

  .shop_act_container {
    display: -webkit-flex;
    display: flex;
    border-radius: 1px;
    border: 1px solid #eee;
    padding: 1.333333vw 2.133333vw;
    font-size: .24rem;
    color: #666;
    margin: 0 6.4vw;
    -webkit-align-items: center;
    align-items: center;
  }

  .shop_act {
    flex: 1;
    overflow: hidden;
  }

  .act {
    display: flex;
    font-size: .24rem;
    -webkit-align-items: center;
    align-items: center;
  }

  .activity_icon {
    margin-right: 1.6vw;
    font-size: .24rem;
    padding: 0 1.2vw;
    height: 3.466667vw;
    display: inline-block;
    box-sizing: border-box;
    border-radius: .266667vw;
    position: relative;
    color: #fff;
    white-space: nowrap;
  }

  .activity_content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
    font-size: .24rem;
  }

  .shop_act_count {
    width: 16.266667vw;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    position: relative;
    padding-right: 2.933333vw;
    text-align: right;
  }

  .shop_act_count:after {
    content: "";
    display: block;
    border-style: solid;
    border-width: 1.066667vw .933333vw 0;
    border-color: rgba(0, 0, 0, .57) transparent transparent;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
  }
  .activity_sheet_container{
    background-color: #f5f5f5;
    box-shadow: 0 -1px 5px 0 rgba(0,0,0,.4);
    padding: 5.333333vw 6.933333vw;
    box-sizing: border-box;
    width: 100%;
  }
  .activity_sheet_container h2 {
    text-align: center;
    font-size: .32rem;
    font-weight: 600;
    margin-bottom: 4.133333vw;
  }
  .activity_sheet_content{
    height: 50.8vw;
    overflow-y: scroll;
  }
  .activity_sheet{
    margin-bottom: 3.066667vw;
    display: -webkit-flex;
    display: flex;
    font-size: .3rem;
    -webkit-align-items: center;
    align-items: center;
  }
  .activity_sheet>span{
    font-size: .27rem;
    line-height: 1.38;
    text-align: left;
  }
  .activity_close{
    position: absolute;
    height: 6.4vw;
    width: 6.4vw;
    right: 2.666667vw;
    top: 2.666667vw;
    font-size: 0.5rem;
  }
  .activity_icon1 {
    margin-right: 1.6vw;
    padding: 0 1.2vw;
    height: 4.266667vw;
    display: inline-block;
    box-sizing: border-box;
    border-radius: .266667vw;
    position: relative;
    color: #fff;
    white-space: nowrap;
  }
</style>

