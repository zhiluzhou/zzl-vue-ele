<template>
    <div>
      <section class="main">
        <div class="menu_wrap" ref="menuWrapper">
          <ul class="menu_list">
            <li class="menu" v-for="m,index in menu" @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
              <!--<img  src="" alt="">-->
              <span>{{m.name}}</span>
            </li>
          </ul>
        </div>
        <div class="goods_wrap" ref="foodsWrapper">
          <ul class="goods_lsit">
            <li class="goods food-list-hook" v-for="m in menu">
              <div class="goods_title_container">
                <div class="goods_title">
                  <strong>{{m.name}}</strong>
                  <span v-if="m.description!=''">{{m.description}}</span>
                </div>
              </div>
              <div class="goods_content" v-for="g in m.foods">
                <!--<li>-->
                  <span>
                    <img :src="getPath(g.image_path)+'?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'" alt="">
                  </span>
                  <section class="goods_detail">
                    <p class="good_detail_name">
                      {{g.name}}
                    </p>
                    <p v-if="g.description!=''" class="goods_detail_desc">
                      {{g.description}}
                    </p>
                    <p class="goods_detail_sales">
                      <span>月售{{g.month_sales}}份</span>
                      <span v-if="g.satisfy_rate!=0">好评率{{g.satisfy_rate}}%</span>
                    </p>
                    <div class="goods_detail_act">
                      <span class="goods_common_act" v-if="g.activity!=null">
                        <span class="mini_tag">
                          {{getZhe(g.specfoods[0].original_price,g.activity.fixed_price)}}折
                          <span class="mini_zhe mini_shu">
                            {{getZhe(g.specfoods[0].original_price,g.activity.fixed_price)}}折
                          </span>
                        </span>
                        <span class="mini_tag">
                          每单{{g.activity.image_text}}优惠
                          <span class="mini_hui mini_zhe">每单{{g.activity.image_text}}优惠</span>
                        </span>
                      </span>
                      <span class="goods_stockTip">剩2份</span>
                    </div>
                    <strong class="sales_price">
                      <span v-if="g.activity!=null" style="margin-right: 1.066667vw;">{{g.activity.fixed_price}}</span>
                      <span v-if="g.activity==null&&g.specfoods[0]" style="margin-right: 1.066667vw;">{{g.specfoods[0].price}}</span>
                      <del v-if="g.activity!=null">¥{{g.specfoods[0].original_price}}</del>
                      <span v-if="g.activity==null" class="qi">起</span>
                    </strong>
                    <div class="goods_detail_btn">
                      <a href=""><i class="el-icon-plus" style="font-weight: 700;"></i></a>
                    </div>
                  </section>
                <!--</li>-->
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
</template>
<script>
  import BScroll from 'better-scroll'
    export default {
      data() {
        return {
          menu:[],
          listHeight: [],
          foodsScrollY: 0,
          selectedFood: ''
        }
      },
      mounted(){
        this.getMenu();
        console.log($('#nav').height())
        console.log($('#tab').height())
        console.log($(document).height())
        $('.main').height($(document).height()-$('#tab').height()-$('#nav').height())
      },
      computed:{
        menuCurrentIndex() {
          for (let i = 0, l = this.listHeight.length; i < l; i++) {
            let topHeight = this.listHeight[i]
            let bottomHeight = this.listHeight[i + 1]
            if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
              return i
            }
          }
          return 0
        },
      },
      methods:{
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
        getZhe(original,fixed){
          if (original&&fixed){
            let count = ((fixed/original)*10).toFixed(1);
            return count;
          }
        },
        getMenu(){
          this.$http.get('/api/shopping/v2/menu?restaurant_id='+this.$route.params.id)
            .then((data)=>{
              console.log(data.body);
              this.menu = data.body;
              this.$nextTick(() => {
                this._initScroll(); // 初始化scroll
                this._calculateHeight(); // 初始化列表高度列表
              })
            })
        },
        _initScroll() {
          this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
            click: true,
          });
          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          });
          // 监控滚动事件
          this.foodsScroll.on('scroll', (pos) => {
            this.foodsScrollY = Math.abs(Math.round(pos.y))
          })
        },
        _calculateHeight() {
          let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
          let height = 0
          this.listHeight.push(height)
          for (let i = 0, l = foodList.length; i < l; i++) {
            let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
          }
        },
        menuClick(index, event) {
          if (!event._constructed) {
            return
          }
          this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
        },
      },
    }
</script>
<style scoped>
  .main{
    display: flex;
    font-size: 0.24rem;
    height: calc(100% - 1rem);
  }
  .menu_wrap{
    position: relative;
    height: 100%;
    padding-bottom: 10.666667vw;
    overflow-y: auto;
  }
  .menu_list {
    padding: 0 0 10.666667vw;
    flex: none;
    background-color: #f8f8f8;
    width: 1.54rem;
  }
  .menu{
    position: relative;
    padding: 4.666667vw 2vw;
    border-bottom: 1px solid #e8e8e8;
    font-size: .24rem;
    color: #666;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .menu img{
    max-width: 100%;
    width: 3.466667vw;
    height: 3.466667vw;
    vertical-align: top;
    margin-right: .8vw;
  }
  .goods_wrap {
    position: relative;
    height: 100%;
    width: 79.466667vw;
    padding-bottom: 10.666667vw;
    overflow-y: auto;
  }
  .goods_title_container{
    position: relative;
    margin-left: 2.666667vw;
    padding: 2vw 8vw 2vw 0;
    border-bottom: 1px solid #eee;
  }
  .goods_title{
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .goods_title> strong{
    margin-right: 1.333333vw;
    font-weight: 700;
    font-size: .32rem;
    color: #666;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
  }
  .goods_title >span{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #999;
    font-size: .266667rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .goods_content{
    position: relative;
    margin: 0;
    padding: 2.666667vw 2.666667vw 2.666667vw 2.666667vw;
    margin-bottom: 1px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    min-height: 30.666667vw;
  }
  .goods_content>span{
    width: 20.266667vw;
    height: 20.266667vw;
    vertical-align: top;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    margin-right: 2.666667vw;
    position: relative;
  }
  .goods_content>span>img{
    width: 100%;
    border-radius: .533333vw;
    max-width: 100%;
  }
  .goods_detail{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    padding-bottom: 6.666667vw;
    text-align: left;
  }
  .good_detail_name{
    font-size: .3rem;
    font-weight: 700;
    line-height: 1.2;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -webkit-align-items: start;
    -ms-flex-align: start;
    align-items: start;
    padding-right: 5.333333vw;
    word-break: break-word;
  }
  .goods_detail_desc{
    margin: 1.333333vw -0.14rem!important;
    font-size: .24rem;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 48vw;
    transform: scale(0.9);
  }
  .goods_detail_sales{
    margin: 1.733333vw 0!important;
    color: #666;
    font-size: .22rem;
    line-height: 1;
  }
  .goods_detail_sales span{
    vertical-align: middle;
  }
  .goods_detail_sales span:not(:first-child){
    margin-left: 1.066667vw;
  }
  .goods_detail_act{
    display: flex;
  }
  .goods_common_act{
    display: flex;
  }
  .goods_common_act>span{
    height: 3.466667vw;
    padding: 0 .8vw;
  }
  .mini_tag{
    position: relative;
    font-size: .266667rem;
    color: transparent;
    white-space: nowrap;
  }
  .mini_zhe{
    position: absolute;
    left: 0;
    top: 0;
    right: -100%;
    bottom: -100%;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: .4rem;
  }
  .mini_shu{
    background-image: -webkit-gradient(linear,left top,right top,from(#ff7416),color-stop(98%,#ff3c15));
    background-image: -webkit-linear-gradient(left,#ff7416,#ff3c15 98%);
    background-image: linear-gradient(90deg,#ff7416,#ff3c15 98%);
    border-top-left-radius: .133333vw;
    border-top-right-radius: .133333vw;
    color: #fff;
  }
  .goods_stockTip{
    background-color: rgba(255,76,13,.15);
    border-radius: .266667vw;
    font-size: .24rem;
    color: #ff4c0d;
    height: 3.466667vw;
    line-height: 3.466667vw;
    padding: 0 .666667vw;
    vertical-align: middle;
    margin-left: .8vw;
    transform: scale(0.87);
  }
  .mini_tag .mini_hui{
    color: #f07373;
    border: 2px solid #ff3c15;
    border-left: none;
  }
  .sales_price{
    font-weight: 700;
    font-size: .32rem;
    line-height: 4.266667vw;
    color: #f60;
    padding-bottom: .933333vw;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
    -webkit-align-items: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    position: absolute;
    bottom: 0;
  }
  .sales_price:before{
    font-weight: 400;
    content: "\A5";
    font-size: .32rem;
    margin-right: .533333vw;
    display: inline-block;
  }
  .sales_price>del{
    font-size: .24rem;
    color: #666;
    font-weight: 400;
    vertical-align: top;
  }
  .goods_detail_btn{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .goods_detail_btn>a{
    display: inline-block;
    vertical-align: middle;
    text-decoration: none;
    font-size: .26rem;
    white-space: nowrap;
    background-color: #2395ff;
    color: #fff;
    font-weight: bold!important;
    border-radius: 50%;
    width: 0.4rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
  }
  .qi{
    font-weight: 500;
    font-size: .24rem;
    color: #ff5339;
  }
  .menu-item-selected{
    background-color: #fff;
  }
  .menu-item{
    background-color: #f8f8f8;
  }
</style>

