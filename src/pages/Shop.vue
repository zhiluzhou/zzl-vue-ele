<template>
    <div class="app_container">
      <shop-detail :detail="detail"></shop-detail>
      <Food></Food>
    </div>
</template>
<script>
  import ShopDetail from '../components/ShopDetail.vue'
  import Food from '../components/Food.vue'
    export default {
      data() {
          return {
            detail:{},
          }
      },
      components: {
        ShopDetail,
        Food,
      },
      mounted(){
        this.getShopInfo();
      },
      methods: {
        getShopInfo(){
          this.$http.get('/api/shopping/restaurant/'+this.$route.params.id+'?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=31.23037&longitude=121.473701')
            .then((data)=>{
//              console.log(data.body)
              this.detail = data.body;
            })
        },
      }
    }
</script>
<style scoped>

</style>

