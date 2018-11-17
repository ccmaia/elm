<template>
  <div class="wrap">
    <div class="top"> 
        <nav class="nav" >
            <div><img src="../../static/back.png" alt=""></div>
        </nav>
        <div class="logo">
            <img class="logoImg" src="http://fuss10.elemecdn.com/a/8f/0cdefab4556d926f2f05d3b924f9epng.png?imageMogr/format/webp/thumbnail/150x/" alt="">
        </div>
        <div class="title">
            <h2>必胜客宅急送</h2>
            <div class="discounts">
                <p>
                    <span>满减</span>
                    <span>{{topStyle.shop_promotion_cell[0].add_on_pop_up_tip}}</span>
                </p>
            </div>
        </div>
        <Tabs value="name1" id="aaa" >
        <TabPane label="点餐" name="name1">
            <goods-view></goods-view>
        </TabPane>
        <TabPane label="评价" name="name2">
            <ratting-view></ratting-view>
        </TabPane>
        <TabPane label="商家" name="name3">
            <seller-view></seller-view>
        </TabPane>
    </Tabs>
    </div>  
    
    <div class="button">
      <div class="md-cart">
        <div ><Icon color="#ccc" size="30" type="md-cart" /></div>
      </div>
      <div class="right">
          <div>
              <p v-if="!status">未选购商品</p>
              <p v-else>￥</p>
              <p>{{topStyle.cart.agent_fee_tip}}</p>
          </div>
          <div>
              <span v-if="!status">￥0元起送</span>
              <span v-else>去结算</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import goods from "./car/goods.vue";
import ratting from "./car/ratting.vue";
import seller from "./car/seller.vue";
export default {
  components: {
      'goods-view':goods,
      'ratting-view':ratting,
      'seller-view':seller,
  },
  data() {
    return {
      status: 0,
      topStyle: []
    };
  },
  async beforeCreate() {
    let data = await (await fetch("/Shopping/shopping/booking")).json();
    // console.log(data)
    this.topStyle = data;
    // console.log(this.topStyle);
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.wrap {
  position: relative;
}
.nav-text,
.ivu-tabs-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.nav {
  width: 100%;
  height: 80px;
  background-color: rgba(119, 103, 137, 0.43);
}
.logo {
  position: relative;
  width: 100%;
}
.logoImg {
  position: absolute;
  width: 100px;
  top: -50px;
  left: 50%;
  margin-left: -50px;
}
.title {
  clear: both;
  margin-top: 55px;
}
.title h2 {
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}
.discounts p {
  text-align: center;
  font-size: 0.8rem;
}
.discounts p span:nth-child(1) {
  background-color: red;
  color: #fff;
  padding: 3px;
}
/* .nav::after{
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(119,103,137,.43);
} */
.button {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: rgb(80, 80, 82);
}
.md-cart {
  position: relative;
  bottom: 10px;
  left: 15px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgb(60, 60, 60);
  text-align: center;
  line-height: 50px;
}
.md-cart > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgb(50, 50, 50);
}
.right {
  width: 80%;
  height: 100%;
  color: #ccc;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
.right > div:nth-child(2) {
  width: 40%;
  height: 100%;
  text-align: right;
  line-height: 60px;
}
.right > div:nth-child(2) span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  color: #fff;
}
</style>
