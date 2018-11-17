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
    <!-- 轮播图 -->
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
      <button-view id="searchBar"></button-view>
      <foodList-view :number='number'></foodList-view>
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
      value2:0,
      offsetTop:0,
      str:'',
      number:5
    }
  },
  created(){
    this.str = this.$route.query.geohash
    this.city = this.$route.query.city;
    // 通过vuex获取数据
    this.$store.dispatch('foodList',this.str)
  },
  // 生命周期   挂载
  mounted(){
    var _this = this;
    // 注册并监听scroll事件
    this.offsetTop = document.querySelector('#searchBar').offsetTop;
    window.addEventListener('scroll',() => {
      // 调用滑动固定元素方法
      // console.log(this.$route)
      if(!this.$route.name || this.$route.name !== 'footPage'){
        return
      }
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop   
      this.handleScroll(this.offsetTop,scrollTop);
      // 下滑加载更多
      // console.log(window.screen.height , scrollTop , document.body.clientHeight)
      if(window.screen.height + scrollTop >= document.body.clientHeight-100){
        // this.$store.dispatch('foodList',this.str)
        _this.number += 5;
      }
    })
  },
  methods:{
    handleScroll (domTop,scrollTop) {
      
      // var top = document.querySelector('.search').offsetHeight;
      // console.log(domTop,scrollTop)
      if(scrollTop>=55){
        document.querySelector('.search').style.position = 'fixed';
        document.querySelector('.search').style.top = 0;
        document.querySelector('.search').style.left = 0;
        // console.log(scrollTop,domTop)
        if(scrollTop >= 500){
          document.querySelector('#searchBar').style.position = 'fixed';
          let top = document.querySelector('.search').offsetHeight;
          document.querySelector('#searchBar').style.top = top+'px';
        }else{ 
          document.querySelector('#searchBar').style.position = '';
          document.querySelector('#searchBar').style.top = '';
        }
      }else{
        document.querySelector('.search').style.position = 'relative';
        document.querySelector('.search').style.top = '';
        document.querySelector('.search').style.left = '';
      }
      

    },
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
  width: 100%;
  background-color: #3091e8;
  z-index: 100;
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
  top: 5px;
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
