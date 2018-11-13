<template>
  <div class="wrap">
    <div class="title">
      <img src="../../static/back.png" alt="">
      <p>密码登录</p>
    </div>
    <div class="content">
      <input type="text" placeholder="账号" ref="user">
      <div class="pass">
        <input :type="type" placeholder="密码" ref="pass">
        <i-switch v-model="switch1" @on-change="change" />
      </div>
      <div class="yzm">
        <input type="text" placeholder="验证码" ref="yzm">
        <img :src="imgSrc" alt="">
        <div @click="lastYzm"><p>看不清</p><p>换一张</p></div>
      </div>
      <div class="txt">
          <p>温馨提示：未注册过的账号，登录时将自动注册</p>
          <p>注册过的用户可凭账户密码登录</p>
      </div>
      <input class="login" type="submit" value="登录" @click="upMsg">
    </div>
    <div class="chongzhi">
        <router-link to='/reset'>重置密码？</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "password",
      switch1: false,
      imgSrc: ""
    };
  },
  created() {
    this.$ajax
      .ajax({
        type: "POST",
        url: "https://elm.cangdu.org/v1/captchas"
      })
      .then(data => {
        this.imgSrc = data.code;
      });
  },
  methods: {
    change(status) {
      // console.log(status);
      if (status) {
        this.type = "text";
      } else {
        this.type = "password";
      }
      //   this.$Message.info('开关状态：' + status);
    },
    upMsg() {
      let user = this.$refs.user.value;
      let pass = this.$refs.pass.value;
      if (!user || !pass) {
        this.$Message.info("账户或密码为空");
      } else if (
        !/^[\u4e00-\u9fa5]{1,5}$/.test(user) ||
        !/^\w{3,6}$/.test(pass)
      ) {
        this.$Message.info("账户或密码错误");
      } else if (/['|"]$/.test(user) || /['|"]$/.test(pass)) {
        this.$Message.info("账户或密码不符");
      } else {
        this.$ajax
          .ajax({
            type: "POST",
            // http://localhost:8090/login/elm/jiekou
            url: "/Api/elm/jiekou",
            data: {
              type: "login",
              user: user,
              pass: pass
            }
          })
          .then(data => {
            console.log(JSON.parse(data));
            data = JSON.parse(data);
            if (data.err) {
              this.$Message.info("登录成功哦！！！");
            } else {
              this.$Message.info("出错了，再试试哦！！");
            }
          });
      }
    },
    lastYzm() {
      this.$ajax
        .ajax({
          type: "POST",
          url: "https://elm.cangdu.org/v1/captchas"
        })
        .then(data => {
          this.imgSrc = data.code;
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
.content {
  width: 100%;
}
.content input {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  color: #888;
  padding-left: 10px;
  font-size: 1.2rem;
}
.pass {
  position: relative;
}
.ivu-switch,
.ivu-switch-default {
  position: absolute;
  right: 10px;
  top: 25%;
}
.yzm {
  position: relative;
}
.yzm img {
  position: absolute;
  right: 50px;
  top: 10px;
}
.yzm div {
  position: absolute;
  right: 10px;
  top: 10px;
}
.yzm div p:nth-child(2) {
  color: red;
}
.txt {
  color: red;
  line-height: 30px;
  padding: 5px 10px;
}
.login {
  background-color: rgb(75, 217, 100);
  color: white;
}
.chongzhi {
  text-align: right;
  padding: 10px;
  color: #3091e8;
  font-size: 1.1rem;
}
</style>
