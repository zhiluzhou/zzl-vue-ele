<template>
    <div>
      <tab :line-width="2" v-model="index" :animate="false"
           active-color="#2395ff"
           id="tab" >
        <tab-item v-for="item,index in list" @on-item-click="onItemClick" :key="index" :selected="demo === item">{{item}}</tab-item>
      </tab>
      <div>
        <order-food v-show="index==0"></order-food>
        <div v-show="index==1">222</div>
        <div v-show="index==2">333</div>
      </div>
    </div>
</template>
<script>
  import {Tab,TabItem} from 'vux';
  import OrderFood from '../components/OrderFood.vue'
    export default {
      data() {
          return {
            index:0,
            list:['点餐','评价','商家'],
            demo:'点餐',
          }
      },
      components:{
        Tab,
        TabItem,
        OrderFood,
      },
      methods:{
        onItemClick(index){
          this.index = index
        },
        btn(e){
          console.log(e.target.dataset.index)
        }
      }
    }
</script>
<style scoped>

</style>

