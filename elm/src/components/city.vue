<template>
  <div class="wrap">
    <div class="title">
      <div><router-link to="/"><img src="../../static/back.png" alt=""></router-link></div>
      <p>{{city}}</p>
      <p class="switch">切换城市</p>
    </div>
    <div class="content">
      <input @blur.prevent="select" type="text" ref="search" placeholder="输入学校，商务楼，地址">
      <input type="submit" value="提交">
      <div style="text-align: left;">搜索历史</div>
      <div class="select">
        <div v-if="searchAll.length" v-for="(item,index) in searchAll" :key="index" @click="thePlace(item.name,item.latitude,item.longitude)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      city: "",
      search:'',
      searchAll:[],
    };
  },
  // 获取传值
  created() {
    this.id = this.$route.query.id;
    this.city = this.$route.query.city;
  },
  methods: {
    select(){
      let keyword = this.$refs.search.value;
      this.$ajax.ajax({
        url:'https://elm.cangdu.org/v1/pois?city_id='+this.id+'&keyword='+keyword
      }).then( data => {
        this.searchAll = data
        // console.log(this.searchAll)
      })
    },
    thePlace(city,latitude,longitude){
      // 路由跳转
      this.$router.push({
        path: "/foodPage",
        query: {
          geohash: latitude + ',' + longitude,
          city:city
        }
      })
    }
  }
};
</script>

<style scoped>
.wrap {
  position: relative;
  background-color: #eee;
}
.title {
  height: 50px;
  color: white;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #3091e8;
  margin-bottom: 10px;
}
.title .switch {
  font-size: 1rem;
}
.content {
  width: 100%;
  background-color: #fff;
  padding: 10px;
}
.content input {
  width: 95%;
  height: 35px;
  display: block;
  margin: 0 auto;
  padding-left: 10px;
  border: 1px solid #ccc;
  font-size: 1.1rem;
  margin-bottom: 10px;
}
.content input:nth-child(2){
  background-color: #3091e8;
  color: #fff;
}
.content> div{
  width: 95%;
  margin: 0 auto;
}
.select>div{
  padding: 10px 0;
  border-bottom: 1px solid #eee
}
.select p:nth-child(1){
  font-size: 1.1rem;
}
.select p:nth-child(2){
  font-size: .8rem;
  color: #888;
}
</style>
