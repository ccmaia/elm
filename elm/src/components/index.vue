<template>
  <div class="wrap">
    <div id="a_z">
      <span>定位热门</span>
      <span v-for="(item,index) in a_z" :key="index" @click="fn('#'+item)" :id="index">
        {{item}}
      </span>
    </div>
    <div class="title">
      <p>ele.me</p>
      <div><router-link to="/login">登录|注册</router-link></div>
    </div>
    <div class="dingwei">
      <p class="p1"><span>当前定位城市：</span><span class="right">定位不准时，请在城市列表中选择</span></p>
      <p class="p2"><span class="city">郑州</span><span class="right">></span></p>
    </div>
    <div class="hot">
      <p>热门城市</p>
      <div class="citys">
        <div v-for="(item,index) in hotCity" :key="index">{{item.name}}</div>
      </div>
    </div>
    <div class="all">
      <div v-for="(items,index) in allCity" :key="index">
        <p :id="index">{{index}}(按字母排序)</p>
        <div class="allcity">
          <div v-for="(item,index) in items" :key="index">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      a_z:['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
      hotCity:[],
      allCity:[],
      
    }
  },
  created(){
    this.$ajax.ajax({
      url:'https://elm.cangdu.org/v1/cities?type=hot'
    }).then( data => {
      this.hotCity = data
    })
  },
  async beforeCreate(){
    let data = await(await fetch('https://elm.cangdu.org/v1/cities?type=group')).json();
    // console.log(data)
    this.allCity = data
  },
  methods:{
    // 锚点定位
    fn(val){
      console.log(val)
      this.$el.querySelector(val).scrollIntoView(true)
    }
  }
}
</script>

<style scoped>
  .wrap{
    background-color: #eee;
    position: relative;
  }
  .wrap>div{
    margin-bottom: 10px;
    background-color: #fff;
  }
  a{
    color: white;
  }
  #a_z{
    position: fixed;
    right: 0;
    top: 185px;
    padding: 20px 0;
    background-color: transparent;
    font-size: .9rem;
    color: #888;
  }
  #a_z span,#a_z a{
    display: block;
    width: 40px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 5px;
  }
  .wrap .title{
    height: 50px;
    color: white;
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #3091e8;
  }
  .dingwei{
    /* padding: 10px; */
    color: #888;
    font-size: 1.1rem;
  }
  .dingwei>p{   
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 1px solid #ccc;
  }
  .dingwei>p>span{
    display: inline-block;
  }
  .dingwei .p1 .right{
    text-align: right;
    font-size: .9rem;
  }
  .dingwei .p2 .city{
    color: #3091e8
  }
  .hot .all{
    width: 90%;
  }
  .hot>p{
    padding: 20px 10px;
    color: #888;
    font-size: 1.3rem;
  }
  .hot{
    color: #888;
  }
  .hot,.all{
    width: 90%;
  }
  .hot .citys{
    color: #3091e8;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }
  .hot .citys>div{
    width: 25%;
    height: 60px;
    line-height: 60px;
    font-size: 1.1rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #ccc;
    border-left-color:transparent; 
  }
  .all p{
    padding: 10px;
    color: #888;
    font-size: 1.3rem;
  }
  .all .allcity{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: center;
    color: #888;
  }
  .all .allcity>div{
    width: 25%;
    height: 60px;
    line-height: 60px;
    font-size: 1.1rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #ccc;
    border-left-color:transparent; 
    /*  */
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

</style>
