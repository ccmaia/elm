<template>
  <div class="layout">
    <div class="head">
      <div class="title">
        <router-link class="back" to="/city"><Icon type="md-navigate" /><span>{{city}}</span><Icon type="md-arrow-dropdown" /></router-link>
        <router-link to="/login">登录|注册</router-link>
      </div>
      <div class="search">
        <Icon class="icon-search" size="30" type="ios-search" />
        <input type="text" placeholder="搜索饿了吗商家，商品名称">
      </div>
    </div>  
    <!-- <Tabs value="name1">
        <TabPane icon="md-radio-button-off" name="name1">标签一的内容</TabPane>
        <TabPane icon="md-radio-button-off" name="name2">标签二的内容</TabPane>
    </Tabs> -->
    <div class="imgs">
      <img src="../../static/list.jpg" alt="">
    </div>
    <div class="lbt">
      <Carousel autoplay v-model="value2" loop>
        <CarouselItem>
            <div class="demo-carousel"><img src="static/loop1.webp" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="static/loop2.webp" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="static/loop3.webp" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="static/loop4.webp" alt=""></div>
        </CarouselItem>
    </Carousel>
    </div>
    <p class="tuijian">——  推荐商家  ——</p>
    <div class="list">
      <button-view></button-view>
      <foodList-view></foodList-view>
    </div>
  </div>
</template>

<script>
import button from './button.vue'
import foodList from './foodList.vue'
export default {
  components:{
    'button-view':button,
    'foodList-view':foodList
    },
  data(){
    return{
      city:'',
      classification:[],
      value2:0
    }
  },
  created(){
    let latitude = this.$route.query.geohash.split(',')[0];
    let longitude = this.$route.query.geohash.split(',')[1];
    this.city = this.$route.query.city;
    
    // 请求附近的商品limit=10  请求10条
    this.$ajax.ajax({
      url:'/Food/shopping/v3/restaurants?latitude='+ latitude +'&longitude='+ longitude+'&limit=10'
    }).then( data => {
      // console.log(data)
    })
  },
  methods:{

  }
};
</script>
<style scoped>
.layout {
  position: relative;
  /* background-color: #eee; */
}
.head{
  padding: 10px;
  background-color: #3091e8;
  margin-bottom: 10px;
  color: white;
  font-size: 1.1rem;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center; 
}
.search{
  position: relative;
}
.search input{
  width: 95%;
  display: block;
  margin: 10px auto 5px;
  height: 40px;
  text-align: center
}
a {
  color: white;
}
.back{
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-search{
  color: #888;
  position: absolute;
  top: 3px;
  left: 10px;
}
.ivu-tabs-ink-bar,.ivu-tabs-ink-bar-animated{
  height: 0;
}
.imgs,.imgs img{
  width: 100%;
}
.lbt{
  padding: 0 7px;
}
.ivu-carousel-list{
  height: 100px;
}
.ivu-carousel-track,.higher,.ivu-carousel-item,.demo-carousel,.ivu-carousel-track,.ivu-carousel-list img{
  height: 100px;
}
.tuijian{
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #888;
  font-size: 1.1rem;
}


</style>
