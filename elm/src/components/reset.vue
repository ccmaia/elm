<template>
  <div class="wrap">
    <div class="title">
      <img src="../../static/back.png" alt="">
      <p>重置密码</p>
    </div>
    <div class="content">
      <input type="text" placeholder="账号" ref="user">
      <input type="password" placeholder="旧密码" ref="oldPass" @blur.prevent="blur">
      <input type="password" placeholder="请输入新密码" ref="newPass">
      <input type="password" placeholder="请确认密码" ref="surePass">
      <div class="code">
          <input type="text" placeholder="验证码" ref="yzm">
          <img :src="imgSrc" alt="">
          <div @click="lastYzm"><p>看不清</p><p>换一张</p></div>    
      </div>
    </div>
    <input class="btn" type="submit" value="确认修改" @click="sureModify">
  </div>
</template>

<script>
export default {
  data(){
      return{
          imgSrc:''
      }
  },
  created(){
      this.$ajax.ajax({
          type: 'POST',
          url:'https://elm.cangdu.org/v1/captchas'
      }).then( data => {
            this.imgSrc = data.code
      })
  },
  methods:{
    lastYzm(){
      this.$ajax.ajax({
        type: 'POST',
        url:'https://elm.cangdu.org/v1/captchas'
        }).then( data => {
          console.log(data);
          this.imgSrc = data.code
      })
    },
    // blur(){
    //   let user = this.$refs.user.value;
    //   let oldPass = this.$refs.oldPass.value;
    //   if(!user||!oldPass){
    //     this.$ajax.ajax({
    //           type:'POST',
    //           url:'/Api/elm/jiekou',
    //           data:{
    //               type:'login',
    //               user:user,
    //               pass:oldPass
    //           },
    //       }).then( (data) => {
    //         console.log('密码错误！！！')
    //         data = JSON.parse(data)
    //         if(!data.err){
    //           console.log('密码错误！！！')
    //         }
    //       })
    //   }
    // },
    // 修改密码
    sureModify(){
      let user = this.$refs.user.value;
      let oldPass = this.$refs.oldPass.value;
      let newPass = this.$refs.newPass.value;
      let surePass = this.$refs.surePass.value;
      console.log(user,oldPass,newPass,surePass)
      let yzm = this.$refs.yzm.value;
      if(!user||!oldPass||!newPass||!surePass){
        this.$Message.info('不能为空')
      }else if(newPass !== surePass){
        this.$Message.info('请确认密码')
      }else if(oldPass === newPass){
        this.$Message.info('新密码与旧密码重复')
      }else{
        this.$ajax.ajax({
            type:'POST',
            url:'/Api/elm/jiekou',
            data:{
                type:'reset',
                user:user,
                pass:oldPass,
                newPass:newPass
            },
        }).then( (data) => {
            console.log(data)
        })
      }
    
    }
  }
}
</script>

<style>
  .wrap{
    background-color: #eee;
    position: relative;
    text-align: center;
  }
  .title{
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
  .code{
    position: relative;
  }
  .code img{
    position: absolute;
    right: 50px;
    top: 10px;
  }
  .code div{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .code div p:nth-child(2){
    color: red;
  }
  .content input{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #eee;
      color: #888;
      padding-left: 10px;
      font-size: 1.2rem;
  }
  .btn{
      width: 95%;
      height: 50px;
      border-radius: 5px;
      font-size: 1.1rem;
      margin-top: 10px;
      background-color: rgb(75,217,100);
      color: white;
  }
</style>
