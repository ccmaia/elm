<template>
  <div class="wrap">
    <Dropdown trigger="click" placement="bottom">
        <a href="javascript:void(0)">
            综合排序
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Dropdown>
      <a href="javascript:void(0)">
        距离最近
      </a>    
    </Dropdown>
    <Dropdown>
      <a href="javascript:void(0)">
        品质联盟
      </a>    
    </Dropdown>
    <Dropdown>
      <a href="javascript:void(0)">
        筛选
        <Icon type="ios-funnel-outline" />
      </a>    
    </Dropdown>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    }
  }
};
</script>

<style>
.wrap{
  color: #666;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
a{
  color: #666;
  font-size: .9rem;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;

}
</style>
