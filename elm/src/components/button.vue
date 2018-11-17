<template>
  <div id="wrap" style="">

    <Dropdown trigger="click" placement="bottom">
        <a href="javascript:void(0)" @click="stop">
            综合排序
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" id="list" :style="{'width':width,'height':Height}" >
          <div class="mb" :style="{'height':height}">
            <li id="listLi" v-for="(item,index) in list" :key="index" @click="sort(item.val)">
              {{item.title}}
            </li>
          </div>
        </DropdownMenu>
    </Dropdown>
    <Dropdown >
      <a href="javascript:void(0)" @click="sort('distance')">
        距离最近
      </a>    
    </Dropdown>
    <Dropdown >
      <a href="javascript:void(0)" @click="scroll">
        品质联盟
      </a>    
    </Dropdown>
    <Dropdown trigger="click" placement="bottom" >
        <a href="javascript:void(0)" @click="stop">
            筛选
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" id="list2" :style="{'width':width,'height':Height}" >
          <div class="mb" :style="{'height':height}">
            <div class="spans">
              <p>商家服务（可多选）</p>
              <span id="listLi" v-for="(item,index) in sellerSrver" :key="index" @click="sort(item.val)">
                {{item.title}}
              </span>
            </div>
          </div>
        </DropdownMenu>
    </Dropdown>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[
        {'title':'综合排序','val':'support_tags'},
        {'title':'好评优先','val':'support_tags'},
        {'title':'销量最高','val':'recent_order_num'},
        {'title':'起送价最低','val':'price'},
        {'title':'配送最快','val':'order_lead_time'},
        {'title':'配送费最低','val':'fee'},
        {'title':'人均从低到高','val':'rating'},
        {'title':'人均从高到低','val':'rating'}
        ],
      
      sellerSrver:[
        {'title':'蜂鸟专送','val':'delivery_mode.text'},
        {'title':'品牌商家','val':'support_tags[1].text'},
        {'title':'食安保','val':'supports[0].id'},
        {'title':'开发票','val':'supports[0].id'},
        {'title':'新店','val':'rating'}
      ],
      visible: false,
      width:'',
      Height:'',
      height:'',
      isMb:0
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
    setWidth(){
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.width = width+'px';
      this.Height = (height-95)+'px';
      this.height = (height*0.6)+'px';
      // console.log(this.width)
      // document.querySelector('#list').style.width = width + "px";
    },
    //滑动限制
      stop(){
        this.isMb = !this.isMb;
        if(this.isMb){
          var mo=function(e){e.preventDefault();};
          document.body.style.overflow='hidden';
          document.addEventListener("touchmove",mo,false);//禁止页面滑动
        }else{
          // 取消滑动限制
          var mo=function(e){e.preventDefault();};
          document.body.style.overflow='';//出现滚动条
          document.removeEventListener("touchmove",mo,false);
        }  
      },
      // 点击排序
      sort(val){
        // console.log(val)
        this.$store.dispatch('sortList',val)
      },
      scroll(){
        window.scrollTo(0,600)
        console.log(1)
      }
  },
  mounted(){
    // 调用获取高度的方法
    this.setWidth();
  }
};
</script>

<style scoped>
#searchBar{
  width: 100%;
  z-index: 100;
  background-color: #fff;
  color: #666;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 40px;
  border-bottom: 1px solid #eee
}
a{
  color: #666;
  font-size: 1rem;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;  
}
.ivu-select-dropdown{
  top: 35px;
  left: 0px;
}
.ivu-dropdown-item{
  width: 100%;
}
#list{
  position: absolute;
  top: 0;
  left: -50px;
  z-index: 1000;
  color: #333;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
}
#list2{
  position: absolute;
  top: 0;
  right: -50px;
  z-index: 1000;
  color: #333;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
}
.spans{
  height: 80%;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  overflow: hidden;
}
#list2 span{
  width: 28%;
  margin:2%;
  text-align: center;
  float: left;
  display: block;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #eee;
  font-size: .8rem;
  color: #333;
  font-weight: lighter;
  white-space: nowrap;

}
#list #listLi{
  font-size: 1rem;
  padding: 10px 15px;
  background-color: #fff;
}
</style>
