<template>
  <section class="list_container">
    <router-link  :to="'/shop/geohash=wtw3sjq6n6um&id='+list.restaurant.id+'&s_type=0&rank_id='+rank_id">
      <div class="shop_info">
        <div>
          <img :src=getPath(list.restaurant.image_path) alt="">
        </div>
        <div class="shop_main">
          <section class="shop_line">
            <h3 class="shop_name">
              <i v-if="list.restaurant.is_premium" class="shop_premium" content="品牌">品牌</i>
              <span>{{list.restaurant.name}}</span>
            </h3>
            <ul class="support_wrap">
              <li class="shop_ad" v-if="list.restaurant.recommend.is_ad" content="广告"></li>
              <li v-for="support in list.restaurant.supports" :content="support.icon_name"></li>
            </ul>
          </section>
          <section class="shop_line">
            <div class="shop_rater">
              <Rater v-model="list.restaurant.rating" :font-size="12" :margin="0"></Rater>
              <span style="margin: 0 1.066667vw;">{{list.restaurant.rating}}</span>
              <span>月售{{list.restaurant.recent_order_num}}单</span>
            </div>
            <div v-if="list.restaurant.delivery_mode" :content="list.restaurant.delivery_mode.text" alt="蜂鸟专送"
                 class="delivery_icon">{{list.restaurant.delivery_mode.text}}
            </div>
          </section>
          <section class="shop_line">
            <div class="money_limit">
              <span>¥{{list.restaurant.float_minimum_order_amount}}起送</span>
              <span>配送费¥{{list.restaurant.float_delivery_fee}}</span>
            </div>
            <div class="time_distance">
              <span>{{getDistance(list.restaurant.distance)}}km</span>
              <span>{{list.restaurant.order_lead_time}}分钟</span>
            </div>
          </section>
        </div>
      </div>
    </router-link>
    <div class="shop_active" v-if="list.restaurant.activities&&list.restaurant.activities.length!=0">
      <section class="activities">
        <div class="activity_list">
          <div class="act_row" v-for="act1,i in list.restaurant.activities" v-if="i<2">
                  <span class="icon_wrap">
                    <span class="icon" :style="{backgroundColor: '#'+act1.icon_color}">{{act1.icon_name}}</span>
                  </span>
            <span class="desc">{{act1.tips}}</span>
          </div>
          <div ref="act_row" class="act_row" v-for="act2,i in list.restaurant.activities.slice(2)" v-show="showAct">
                <span class="icon_wrap">
                  <span class="icon" :style="{backgroundColor: '#'+act2.icon_color}">{{act2.icon_name}}</span>
                </span>
            <span class="desc">{{act2.tips}}</span>
          </div>
        </div>
        <div class="active_btn" @click="toggle" v-if="list.restaurant.activities&&list.restaurant.activities.length>2">
          {{list.restaurant.activities&&list.restaurant.activities.length}}个活动
          <i class="el-icon-caret-bottom"></i>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
  import {Rater} from 'vux'

  export default {
    data() {
      return {
        showAct: false,
        showBtn: false,
        active: [],
        active1: [],
        active2: [],
      }
    },
    props: ['list','rank_id'],
    components: {
      Rater
    },
    mounted() {
//        console.log(this.active)
//      console.log(this.$refs.act_row)

    },
    methods: {
      getPath(path) {
        let str;
        if (path.substring(path.length - 4) == 'jpeg') {
          str = 'jpeg'
        } else if (path.substring(path.length - 3) == 'png') {
          str = 'png'
        } else {
          str = 'jpg'
        }
        let imgPath = '//fuss10.elemecdn.com/' + path[0] + '/' + path[1] + path[2] + '/' + path.split('').splice(3).toString().replace(/,/g, '') + '.' + str;
        return imgPath;
      },
      getDistance(val) {
        return (val / 1000).toFixed(2)
      },
      toggle() {
        for (let i = 0; i < this.$refs.act_row.length; i++) {
          if(this.$refs.act_row[i].style.display == 'none') {
            this.$refs.act_row[i].style.display='';
          }else {
            this.$refs.act_row[i].style.display='none';
          }
        }
      }
    },
    watch: {
      list: function () {

      }
    }
  }
</script>
<style scoped>
  .dis {
    display: none!important;
  }
  .support_wrap > li.shop_ad {
    height: 2.933333vw;
    width: 4.8vw;
  }

  .support_wrap > li.shop_ad:after {
    color: #ccc;
    font-size: .3rem;
    width: 9.6vw;
    height: 5.866667vw;
    border: .133333vw solid #eee;
  }

  .list_container {
    position: relative;
    border-bottom: .133333vw solid #eee;
    background-color: #fff;
    color: #666;
    padding: 4vw 0;
    list-style: none;
    font-size: .293333rem;
    line-height: normal;
  }

  .shop_info {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-items: stretch;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    padding: 0 2.666667vw;
  }

  .shop_info > div:nth-child(1) {
    position: relative;
    width: 17.333333vw;
    height: 17.333333vw;
  }

  .shop_info > div:nth-child(1) img {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: .533333vw;
    border: .133333vw solid rgba(0, 0, 0, .08);
  }

  .shop_line {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-between;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    overflow: hidden;
    align-items: center;
    color: #999;
  }

  .shop_name {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: 700;
    font-size: .3rem;
    overflow: hidden;
  }

  .shop_premium {
    position: relative;
    margin-right: 1.333333vw;
    padding: .266667vw .666667vw;
    color: transparent;
    text-align: center;
    white-space: nowrap;
    font-weight: 700;
    font-size: .24rem;
    font-style: normal;
    line-height: 1.5;
  }

  .shop_premium:after {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    content: attr(content);
    padding: .533333vw 1.333333vw;
    color: #6f3f15;
    font-weight: 700;
    font-size: .44rem;
    border-radius: 1.066667vw;
    background-image: -webkit-linear-gradient(229deg, #fff100, #ffe339);
    background-image: linear-gradient(-139deg, #fff100, #ffe339);
    white-space: nowrap;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .shop_name span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .support_wrap {
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    display: flex;
    align-items: center;
    margin-left: 2.666667vw;
  }

  .support_wrap > li {
    position: relative;
    height: 3.466667vw;
    width: 3.466667vw;
    margin-left: .8vw;
  }

  .support_wrap > li:last-child {
    margin-right: .133333vw;
  }

  .support_wrap > li:after {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    font-size: .4rem;
    color: #999;
    content: attr(content);
    border-radius: .266667vw;
    width: 6.933333vw;
    height: 6.933333vw;
    line-height: normal;
    border: .133333vw solid #ddd;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .shop_main {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-between;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    overflow: hidden;
    -webkit-flex-grow: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -webkit-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-left: 2.666667vw;
  }

  .el-rate {
    height: 2.666667vw;
  }

  .shop_rater {
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .delivery_icon {
    width: 0.86rem;
    margin-left: 1.066667vw;
    position: relative;
    color: transparent;
    white-space: nowrap;
    font-size: .266667rem;
    border: .133333vw solid transparent;
    border-radius: .4vw;
    line-height: 1.2;
  }

  .delivery_icon:after {
    color: #fff;
    border: .133333vw solid #0097ff;
    background-image: -webkit-linear-gradient(45deg, #0085ff, #0af);
    background-image: linear-gradient(45deg, #0085ff, #0af);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    white-space: nowrap;
    content: attr(content);
    font-size: .4rem;
    padding: 0 .533333vw;
    border-radius: .8vw;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  .money_limit {
    display: flex;
    align-items: center;
    font-size: 0.24rem;
  }

  .money_limit > span + span:before {
    margin: 0 .8vw;
    color: #ddd;
    content: "|";
  }

  .time_distance {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 0.24rem;
  }

  .time_distance span:first-child:after {
    margin: 0 .8vw;
    color: #ddd;
    content: "|";
  }

  .shop_active {
    padding-left: 22.666667vw;
  }

  .activities {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-content: stretch;
    overflow: hidden;
    font-size: 0.24rem;
    padding-top: 2.666667vw;
    margin-top: 2.666667vw;
    border-top: 0.02rem solid #eee;
  }

  .activity_list {
    flex: 1;
    padding-right: 2.666667vw;
    overflow: hidden;
  }

  .act_row {
    display: flex;
    align-items: center;
    line-height: 4.8vw;
  }

  .activity_list .icon_wrap {
    display: inline-block;
    position: relative;
    margin-right: 1.6vw;
    height: 3.733333vw;
    width: 3.733333vw;
    vertical-align: middle;
  }

  .desc {
    display: inline-block;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    text-align: left;
  }

  .active_btn {
    padding: .8vw 2.666667vw 0 0;
    color: #999;
    text-align: right;
    line-height: 1;
  }

  .icon_wrap .icon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    height: 7.466667vw;
    width: 7.466667vw;
    font-size: .48rem;
    color: #fff;
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 1.066667vw;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
</style>

