<template>
    <div class="wrap">
        <!-- {{$store.state.shopCar}} -->
        <div class="left">
            <ul class="aside">
                <li v-for="(item,index) in $store.state.shopcar" :key="index">
                    <p style="padding: 2px 0 2px 5px;font-size: .9rem;font-weight: 500;margin-bottom: 5px;">{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="right">
            <Scroll>
                <div v-for="(items,index) in $store.state.shopcar" :key="index">
                    <p style="font-size: 1.1rem;font-weight: 700;margin-bottom: 5px;">{{items.name}}</p>
                    <div v-for="(item,index) in items.foods" :key="index">
                        <div>{{item.name}}</div>
                    </div>
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
export default {
  created(){    
    this.$router.push({
    path:'/shopCar'
    })
    this.$store.dispatch('shopCar')
  }
};
</script>

<style>
.wrap{
    overflow: hidden;
    width: 100%;
}
.left{
  float: left;
  width: 23%;
}
.right{
  float: right;
  width: 77%;
  height: 100%;
  
}
</style>
