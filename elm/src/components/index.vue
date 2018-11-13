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
      <p class="p2"><span class="city" >{{city}}</span><span class="right" @click="getDescribe">
        >
        </span></p>
    </div>
    <div class="hot">
      <p>热门城市</p>
      <div class="citys">
        <div v-for="(item,index) in hotCity" :key="index" @click="choiceCity(item.name,item.id)">{{item.name}}</div>
      </div>
    </div>
    <div class="all">
      <div v-for="(items,index) in allCity" :key="index">
        <p :id="index">{{index}}(按字母排序)</p>
        <div class="allcity">
          <div v-for="(item,index) in items" :key="index" @click="choiceCity(item.name,item.id)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a_z: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ],
      hotCity: [],
      allCity: [],
      //经纬度
      WeizhiLng: "",
      WeizhiLat: "",
      // 定位选择的城市
      city: "",
      id: ""
    };
  },
  // 获取热门城市
  created() {
    this.$ajax
      .ajax({
        url: "https://elm.cangdu.org/v1/cities?type=hot"
      })
      .then(data => {
        this.hotCity = data;
      });
    // 获取城市定位
    var _this = this;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          this.WeizhiLng = r.point.lng;
          this.WeizhiLat = r.point.lat;
          _this.$ajax
            .ajax({
              url:
                "https://elm.cangdu.org/v2/pois/" +
                this.WeizhiLat +
                "," +
                this.WeizhiLng
            })
            .then(data => {
              // 获取定位地址并截取
              let str = data.address;
              _this.city = str.split("省")[1].split("市")[0];
              // let reg = /^省[\u4e00-\u9fa5]+市$/img;
            });
        }
      },
      { enableHighAccuracy: true }
    );
  },
  // 获取所有城市
  async beforeCreate() {
    let data = await (await fetch(
      "https://elm.cangdu.org/v1/cities?type=group"
    )).json();
    // console.log(data)
    this.allCity = data;
  },
  methods: {
    // 锚点定位
    fn(val) {
      // console.log(val);
      this.$el.querySelector(val).scrollIntoView(true);
    },
    choiceCity(city, id) {
      console.log(city, id);
      this.city = city;
      this.id = id;
    },
    getDescribe() {
      // 路由跳转，params路由跳转需要配路由，query不需要配路由
      // 获取时用this.$route.query/params.id
      this.$router.push({
        path: "/city",
        query: {
          id: this.id,
          city: this.city
        }
      });
    }
  }
};
</script>

<style scoped>
.wrap {
  background-color: #eee;
  position: relative;
}
.wrap > div {
  margin-bottom: 10px;
  background-color: #fff;
}
a {
  color: white;
}
#lastcity {
  color: #888;
}
#a_z {
  position: fixed;
  right: 0;
  top: 33px;
  padding: 20px 0;
  background-color: transparent;
  font-size: 0.9rem;
  color: #888;
}
#a_z span,
#a_z a {
  display: block;
  width: 40px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 5px;
}
.wrap .title {
  height: 50px;
  color: white;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #3091e8;
}
.dingwei {
  /* padding: 10px; */
  color: #888;
  font-size: 1rem;
  width: 90%;
}
.dingwei > p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid #ccc;
}
.dingwei > p > span {
  display: inline-block;
}
.dingwei .p1 .right {
  text-align: right;
  font-size: 0.8rem;
}
.dingwei .p2 .city {
  color: #3091e8;
}
.dingwei .p2 .right {
  width: 30px;
  height: 100%;
  display: inline-block;
}
.hot .all {
  width: 90%;
}
.hot > p {
  padding: 20px 10px;
  color: #888;
  font-size: 1rem;
}
.hot {
  color: #888;
}
.hot,
.all {
  width: 90%;
}
.hot .citys {
  color: #3091e8;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
}
.hot .citys > div {
  width: 25%;
  height: 60px;
  line-height: 60px;
  font-size: 1rem;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #ccc;
  border-left-color: transparent;
}
.all p {
  padding: 10px;
  color: #888;
  font-size: 1rem;
}
.all .allcity {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: center;
  color: #888;
}
.all .allcity > div {
  width: 25%;
  height: 60px;
  line-height: 60px;
  font-size: 1rem;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #ccc;
  border-left-color: transparent;
  /*  */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
