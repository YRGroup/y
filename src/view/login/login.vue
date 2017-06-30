<template>
  <div class="login">
    <div class="header">
      <span class="left" @click="$router.go(-1)">
        <i class="iconfont">&#xe600;</i>
      </span>
      <span>智慧校园-登录</span>
    </div>
    <div class="logo">
      <img src="../../assets/logo.png">
    </div>
    <group>
      <x-input title="手机号：" placeholder="学号/手机号" keyboard="number" v-model="tel">
        <span slot="label" class="loginIcon">
          <i class="iconfont">&#xe618;</i>
        </span>
      </x-input>
      <x-input title="密码：" placeholder="密码" type="password" v-model="pw" @keyup.native.enter="login">
        <span slot="label" class="loginIcon">
          <i class="iconfont">&#xe6ec;</i>
        </span>
      </x-input>
    </group>
    </br>
    <div style="padding:0 20px" class="loginBtn">
      <x-button type="primary" @click.native="login">登录</x-button>
    </div>
  
    <div class="parentReg">
      <x-button plain @click.native="$router.push('/main')">进入主页</x-button>
      <x-button plain @click.native="$router.push('/reg')">注册</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, XInput, Group } from 'vux'

export default {
  components: {
    XButton, XInput, Group
  },
  data() {
    return {
      tel: '',
      pw: ''
    }
  },
  methods: {
    login() {
      if (this.tel != '' | this.pw != '') {
        let logData = {}
        logData.phone = this.tel
        logData.password = this.pw
        this.$store.dispatch('login', logData).then(res => {
          if (res.ExistWeixinOpenid == 0 && this.$store.getters.isWeixin) {
            this.$vux.toast.show({
              type: "text",
              text: '跳转到微信授权页面',
              width: "20em"
            })
            window.location.href = this.$store.state.ApiUrl + '/api/OAuth2Redirect/index?refUrl=' + window.location.host + '/%23/main'
          } else {
            this.$vux.toast.show({
              type: "text",
              text: '跳转到主页',
              width: "20em"
            })
            this.$router.push('/main')
          }
        })
      } else {
        this.$vux.toast.show({
          type: "text",
          text: '请输入用户名或密码',
          width: "20em"
        })
      }
    },
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    }
  },
  created() {
    this.$store.commit('showNav', false)
    this.$store.commit('changeTitle', '登录智慧校园')
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 80vh;
  text-align: center;
  margin: 0 auto;
  padding-top: 8em;
  .logo {
    // margin:10em auto 0 auto;
    img {
      width: 12em;
    }
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 3.8em;
    line-height: 3.8em;
    display: block;
    background: @cc6;
    max-width: 475px;
    .left {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 2.2em;
    }
    span {
      font-size: 18px;
      color: #fff;
    }
  }
  .loginBtn {
    .weui-btn {
      background: linear-gradient(right top, #00c0a1, #00c06f);
       :after {
        border: none;
      }
    }
  }
}

.loginIcon {
  margin-right: 8px;
  color: @cc3;
}

.parentReg {
  position: absolute;
  bottom: 1rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  .weui-btn {
    display: inline-block; // margin:0 auto;
    margin: 1em 1em 0;
    width: 40%;
    color: @cc6;
    border: 1px solid @cc6;
  }
}
</style>
