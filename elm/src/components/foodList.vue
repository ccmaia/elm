<template>
  <div class="wrap">
      <!-- ``````````````````````````````` wyq
     <hr>
      <template v-for="(item) in $store.getters.sortList">
            {{ item.restaurant.name}}
      </template>
     <hr>
     ``````````````````````````````` wyq -->

    <div class="foodList" v-for="(item,index) in $store.state.foodList" v-if="index<number" :key="index">
      <Row class="row">
        <Col span="6">
          <div class="left logoDiv">
            <img class="logo" :src="'https://fuss10.elemecdn.com/'+imgSrc[index][0]+'/'+imgSrc[index][1]+'/'+imgSrc[index][2]+'.'+imgSrc[index][3]"   alt="">
          </div>
        </Col>
        <Col span="18">
          <div class="maxRight">
            <div class="details">
              <h3 style="font-size:1rem;font-weight:700;color: #333;">{{item.restaurant.name}}</h3>
              <Icon type="md-barcode" />
            </div>
            <div class="details">
              <div class="left">
                <Rate id="xing" allow-half disabled v-model="item.restaurant.rating" />
                <span>{{item.restaurant.rating}}</span>
                <span>月售：{{item.restaurant.recent_order_num}}</span>
              </div>
              <div class="right" v-if="item.restaurant.delivery_mode">
                <span style="background-color: #3091e8;color:white;padding:2px;">{{item.restaurant.delivery_mode.text}}</span>
                <span>准时送达</span>
              </div>  
            </div>
            <div class="details">
              <div class="left">
                <span>￥{{item.restaurant.piecewise_agent_fee.rules[0].price}}元起送</span>
                <span>{{item.restaurant.piecewise_agent_fee.description}}</span>
              </div>
              <div class="right">
                <span>{{item.restaurant.distance}}米</span>
                <span>{{item.restaurant.order_lead_time}}分钟</span>
              </div>
            </div>
            <div class="foods">
              <span v-if="item.restaurant.support_tags[0]">{{item.restaurant.support_tags[0].text}}</span>
              <span v-if="item.restaurant.support_tags[1]">{{item.restaurant.support_tags[1].text}}</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    number:[Number]
  },
  data() {
    return {
      
    };
  },
  
  methods: {
    
  }, 
  computed: {
    // sortList() {
    //   if(this.$store.state.typeList.length){
    //     console.log(this.$store.state.typeList)
    //   } 
    // },
    filSore() {
      return this.$store.getters.sortList;
    },
    foodList() {
      console.log(this.$store.state.foodList)
      return this.$store.state.foodList;
    },
    imgSrc(){
      if(this.$store.state.foodList){

        // 截取图片src
        return this.$store.state.foodList.map( item => {
          let arr = []
          arr.push(item.restaurant.image_path.substr(0,1)) 
          arr.push(item.restaurant.image_path.substr(1,2)) 
          arr.push(item.restaurant.image_path.substr(3)) 
          if(item.restaurant.image_path.substr(item.restaurant.image_path.length-2,1) == 'e'){
            arr.push(item.restaurant.image_path.substr(item.restaurant.image_path.length-4))
          }else{
            arr.push(item.restaurant.image_path.substr(item.restaurant.image_path.length-3))
          } 
          return arr
        })
      }
    }
  }
};
</script>

<style scoped>
.wrap{
  color: #333;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.foodList{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.row{
  width: 100%;
  padding: 10px 0;
}
.logo{
  width: 65px;
  display: block;
}
.ivu-rate{
  width: 65px;
  font-size: 3px;
  letter-spacing: -8px;
}
#xing>div{
  width: 15px;
  font-size: 3px;
}
.ivu-rate-star, .ivu-rate-star-full{
  display: inline-block;
  margin: 0;
  padding: 0;
  margin-right: 0px;
  position: relative;
  font-family: Ionicons;
  transition: all .3s ease;
}
.ivu-rate-star, .ivu-rate-star-full{
  width: 20px;
  height: 20px;
}
.details{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.details .left{
  width: 60%;
}
.details .right{
  color: #888;
  width: 40%;
  text-align: right;
}
.maxRight>div{
  padding: 2px 0;
  font-size: .293333rem;
}
.foods>span{
  border: 1px solid rgb(221, 221, 221);
  color: #888;
  font-size: 0.5rem;
  padding: 2px;
}
</style>
