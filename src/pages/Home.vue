<template lang="html">
  <div class="container" ref="container">
    <el-header class="header" style="height: 0.89rem;">
      <div style="display: flex;align-items: center;font-size: 0.34rem;height: 9.2vw;font-weight: 700;">
        <div style="width: 60%;display: flex;align-items: center;">
          <i class="el-icon-location-outline" style=""></i>
          <span style="max-width: 80%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">上海市人民政府上海市人民政府上海市人民政府上海市人民政府</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
    </el-header>   <!--  展示引入的header组件 -->
    <div class="search-wrapper" style="background-image: linear-gradient(90deg,#0af,#0085ff);">
      <div class="search" style="">
        <a class="content">
          <i class="el-icon-search" style="margin-right: 1.333333vw;"></i>
          <span>搜索商家、商品名称</span>
        </a>
      </div>
    </div>
    <section class="toptoon" style="margin-top: -.133333vw;">
      <img style="width: 100%;max-width: 100%;"
           src="https://fuss10.elemecdn.com/d/aa/ebe05497ef475686970bd31467d8apng.png?imageMogr/format/webp/thumbnail/!750x210r/gravity/Center/crop/750x210/">
    </section>
    <div>
      <mt-swipe :auto="0" class="foodentry">
        <mt-swipe-item>
          <a href="javascript:" v-for="entry in entries">
            <div class="container">
              <img :src=getPath(entry.image_hash) />
            </div>
            <span class="title">{{entry.name}}</span>
          </a>
        </mt-swipe-item>
        <mt-swipe-item>
          <a href="javascript:" v-for="entryF in entriesF">
            <div class="container">
              <img :src=getPath(entryF.image_hash) />
            </div>
            <span class="title">{{entryF.name}}</span>
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div style="padding: 0 2.666667vw;">
      <section class="" >
        <img style="width: 100%;max-width: 100%;"
             src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/">
      </section>
      <mid-info :midinfo="midinfo"></mid-info>
    </div>
    <div id="shoplist-title" class="shoplist-title">推荐商家</div>
    <div style="margin-bottom: 13.333333vw;">
      <shop-list v-for="list,i in shopList" :list="list" :rank_id="rank_id"  :key="i" ></shop-list>
      <mt-spinner style="display: flex;align-items: center;justify-content: center;padding: 0.3rem 0 0.4rem;" v-if="isLoading=='loading'" type="snake" color="#1CA2FF" :size="14">加载中</mt-spinner>
    </div>
  </div>
</template>
<script>
  import HomeHeader from '../components/HomeHeader'
  /* 本页面中用到了HomeHeader组件，所以就需要在这里引入一下 */
  import CommonFooter from '../components/CommonFooter'
  import MidInfo from '../components/MidInfo'
  import List from '../components/List'
  import Foter from '../components/Footer.vue'
  import ShopList from '../components/ShopList.vue'

  export default {
    data() {
      return {
        items: [], /* 定义一个空数组数据items */
        entries: [],
        entriesF: [],
        midinfo:[],
        shopList: [],
        isLoadingMore:false,
        rank_id:'',
        isLoading:''
      }
    },
    components: {
      HomeHeader,
      CommonFooter,
      MidInfo,
      ShopList,
    },
    created() {   /* 这个是vue的钩子函数，当new Vue()实例创建完毕后执行的函数 */
      this.$http.get('/api/goods').then((data) => {   /* 调用vue的ajax来请求数据，promise语法，并用es6的箭头函数 */
        this.items = data.body.data;
      })

    },
    mounted() {

//      console.log(document.documentElement.clientHeight)
      this.getMidInfo();
      this.getShopList();
      window.addEventListener('scroll', this.loadMore);
    },
    methods: {
      getPath(path) {
        let imgPath = '//fuss10.elemecdn.com/' + path[0] + '/' + path[1] + path[2] + '/' + path.split('').splice(3).toString().replace(/,/g, '') + '.' + 'jpeg' || 'png' || 'jpg'
        return imgPath;
      },
      //请求中间信息
      getMidInfo(){
        this.$http.get('/api/shopping/openapi/entries?latitude=31.23037&longitude=121.473701&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template')
          .then((data) => {   /* 调用vue的ajax来请求数据，promise语法，并用es6的箭头函数 */
//        console.log('data', data.body);
          this.midinfo = data.body;
          this.entries = data.body[0].entries.slice(0, 10);
          this.entriesF = data.body[0].entries.slice(10);
        });
      },
      //请求推荐商家信息
      getShopList() {
        this.$http.get('/api/shopping/v3/restaurants?latitude=31.23037&longitude=121.473701&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5')
          .then((data)=>{
            console.log(data.body.items);
            this.shopList = data.body.items;
            this.rank_id = data.body.meta.rank_id
        })
      },
      //下拉加载更多信息
      getMoreInfo(){
        this.$http.get('/api/shopping/v3/restaurants',
          {
            params:{
              latitude:31.23037,
              longitude:121.473701,
              offset: this.shopList.length,
              limit:8,
              'extras[]':'activities',
              'extra_filters':'home',
              'rank_id':this.rank_id,
              terminal: 'h5'
            }
          })
          .then((data) => {
            this.shopList = this.shopList.concat(data.body.items);
            console.log('this.shopList',this.shopList)
            this.isLoadingMore = false;
            this.isLoading = 'loaded';
          });
      },
      //下拉加载更多
      loadMore(){
        let oh = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
        let ch = document.documentElement.clientHeight||document.body.clientHeight;
        let sh = document.documentElement.scrollHeight||document.body.scrollHeight;
//        console.log('oh',oh);
//        console.log('ch',ch);
//        console.log('sh',sh);
        if(oh+ch!=sh&&oh+ch>sh-50){
          if(!this.isLoadingMore){
            this.isLoadingMore=true;
            this.isLoading='loading';
            this.getMoreInfo();
          }
        }
      },

    },
    destroyed(){
      window.addEventListener('scroll',null)
    }
  }
</script>

<style lang="css" scoped>

  .container {
    width: 100%;
    margin: 0 auto;
  }

  .cont-ul {
    padding-top: 0.5rem;
    background-color: #ccc;
  }

  .cont-ul::after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }

  .header {
    background-image: linear-gradient(90deg, #0af, #0085ff);
    color: #fff;
    padding: 2.666667vw 3.733333vw 0;
  }

  .search {
    padding: 2vw 3.733333vw;
    margin: -.133333vw 0;
  }

  .search > .content {
    display: flex;
    width: 100%;
    height: 9.6vw;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: .266667vw;
    background: #fff;
    color: #999;
    font-size: 0.28rem;
  }

  .foodentry {
    overflow: hidden;
    height: 47.2vw;
    background-color: #fff;
    text-align: center;
  }

  .foodentry a {
    position: relative;
    float: left;
    margin-top: 2.933333vw;
    width: 20%;
  }

  .foodentry .container {
    position: relative;
    display: inline-block;
    width: 12vw;
    height: 12vw;
  }

  .foodentry .container img {
    width: 100%;
    height: 100%;
  }

  .foodentry img {
    vertical-align: top;
  }

  .foodentry .title {
    display: block;
    margin-top: -3.333333vw;
    color: #666;
    font-size: 0.12rem;
  }
  .shoplist-title {
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
    height: 9.6vw;
    font-size: .3rem;
    color: #000;
    background-color: #fff;
  }
  .shoplist-title:after,.shoplist-title:before {
    display: block;
    content: "";
    width: 5.333333vw;
    height: .266667vw;
    background-color: #999;
  }
  .shoplist-title:before {
    margin-right: 3.466667vw;
  }
  .shoplist-title:after {
    margin-left: 3.466667vw;
  }
</style>
