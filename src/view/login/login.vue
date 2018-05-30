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
      <x-input title="手机号：" placeholder="学号/手机号" keyboard="number" v-model="data.uid" @on-change="preVerify" @on-blur="preVerify">
        <span slot="label" class="loginIcon">
          <i class="iconfont">&#xe618;</i>
        </span>
      </x-input>
      <x-input title="密码：" placeholder="密码" type="password" v-model="data.pwd" @keyup.native.enter="login" v-show="step==1">
        <span slot="label" class="loginIcon">
          <i class="iconfont">&#xe6ec;</i>
        </span>
      </x-input>
      <x-input title="短信验证码：" placeholder="短信验证码" type="text" v-model="sms" @keyup.native.enter="login" v-show="step>=2">
        <span slot="label" class="loginIcon">
          <i class="iconfont">&#xe6ec;</i>
        </span>
        <x-button slot="right" type="primary" mini @click.native="getSms" v-show="step>=2" :disabled="getsmsCount!=0">
          <span v-show="step==2">获取验证码</span>
          <span v-show="step==3">{{getsmsCount!=0?(getsmsCount+'s后重新获取'):'重新获取'}}</span>
        </x-button>
      </x-input>
      <div v-show="unActived" class="borderline">
        <x-input title="密码：" placeholder="请设置初始密码" type="text" v-model="newPWd">
          <span slot="label" class="loginIcon">
            <i class="iconfont">&#xe6ec;</i>
          </span>
        </x-input>
        <div v-show="parent_unActived" class="borderline">
          <x-input title="家长姓名：" placeholder="请输入家长姓名" type="text" v-model="parentName">
            <span slot="label" class="loginIcon">
              <i class="iconfont">&#xe678;</i>
            </span>
          </x-input>
          <checker class="checker" v-model="parentType" default-item-class="checker-item" selected-item-class="checker-item-selected">
            <div class="title">身份</div>
            <checker-item value="1">爸爸</checker-item>
            <checker-item value="2">妈妈</checker-item>
            <checker-item value="3">爷爷</checker-item>
            <checker-item value="4">奶奶</checker-item>
          </checker>
        </div>
      </div>
    </group>
    </br>
    <div style="padding:0 20px" class="loginBtn">
      <div class="item" v-show="step==1">
        <div @click="step=2">忘记密码？使用短信验证码登陆</div>
      </div>
      <x-button type="primary" @click.native="preVerify" v-show="step==0">下一步</x-button>
      <x-button type="primary" @click.native="login" v-show="step==1 || step==3">登录</x-button>

      <!-- <div class="regBtn" @click="$router.push('/reg')">我是家长，还没有帐号？点击注册</div> -->
    </div>

  </div>
</template>

<script>
import { XButton, XInput, Group, Checker, CheckerItem } from 'vux'
export default {
  components: {
    XButton, XInput, Group, Checker, CheckerItem
  },
  data() {
    return {
      data: {
        uid: '',
        pwd: ''
      },
      sms: '',
      parentName: '',
      parentType: '',
      unActived: false,
      parent_unActived: false,
      newPWd: '',
      getsmsCount: 0,
      step: 0
    }
  },
  methods: {
    getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return false;
    },
    count() {
      if (this.getsmsCount > 0) {
        this.getsmsCount--
      }
    },
    startCount() {
      setInterval(
        this.count
        , 1000)
    },
    getSms() {
      if (this.data.uid == '' || this.data.uid.length != 11) {
        this.$vux.toast.show({
          type: "warn",
          text: '请输入正确手机号',
          width: "20em"
        })
      } else {
        this.$API.getLoginSms(this.data.uid).then(() => {
          this.getsmsCount = 180
          this.step = 3
          this.startCount()
        }).catch(err => {
          this.$vux.toast.show({
            type: "warn",
            text: err.msg,
            width: "20em"
          })
        })
      }
    },
    preVerify() {
      if (this.data.uid == '') {
        this.$vux.toast.show({
          type: "warn",
          text: '请输入正确的手机号/学号',
          width: "20em"
        })
      } else if (this.data.uid.slice(0, 1) == 1 && this.data.uid.length === 11) {
        this.verifyAccount()
      } else {
        this.step = 1
      }
    },
    verifyAccount() {
      let para = { phone: this.data.uid }
      this.$API.verifyAccount(para).then(res => {
        if (res.Msg == "normal") {
          this.step = 1
        } else if (res.Msg == "unActived") {
          this.step = 2
          this.unActived = true
        } else if (res.Msg == "parent_unActived") {
          this.step = 2
          this.unActived = true
          this.parent_unActived = true
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: '手机号未注册',
            width: "20em"
          })
          // this.$router.push('/reg?tel=' + this.tel)
        }
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          text: err.msg,
          width: "20em"
        })
      })
    },
    uniLogin() {
      this.$API.uniLogin(this.data).then(res => this.loginOK(res)).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          text: err.msg,
          width: "20em"
        })
      })
    },
    smsLogin() {
      let loginData = {
        phone: this.data.uid,
        code: this.sms
      }
      if (this.unActived && this.newPWd.length < 6) {
        this.$vux.toast.show({
          type: "warn",
          text: '密码不能小于6位',
          width: "20em"
        })
      } else if (this.parent_unActived) {
        if (this.parentName == '' ) {
          this.$vux.toast.show({type: "warn",text: '家长姓名不能为空',width: "20em"})
        }else if (this.parentType == '') {
          this.$vux.toast.show({type: "warn",text: '请选择与孩子的关系',width: "20em"})
        } else {
          loginData.parent_truename = this.parentName
          loginData.parent_type = this.parentType
          this.$API.loginBySms(loginData).then(res => this.loginOK(res)).catch(err => {
            this.$vux.toast.show({
              type: "warn",
              text: err.msg,
              width: "20em"
            })
          })
        }
      } else {
        this.$API.loginBySms(loginData).then(res => this.loginOK(res)).catch(err => {
          this.$vux.toast.show({
            type: "warn",
            text: err.msg,
            width: "20em"
          })
        })
      }
    },
    loginOK(val) {
      this.$store.commit('login', val)
      this.$store.commit('setToken', val.Token)
      if (!this.getCookie("WeixinOpenid") && this.$store.getters.isWeixin) {
        window.location.href = this.$store.state.ApiUrl + '/api/OAuth2Redirect/index?refUrl=' + window.location.host + '/%23/main'
      } else {
        if (this.$store.getters.hasFullInfo === 'teacher') {
          this.$vux.toast.show({
            type: "text",
            text: '资料不完整，请先补齐资料',
            width: "20em"
          })
          this.$router.push('/edit')
        } else if (this.$store.getters.hasFullInfo === 'parent') {
          this.$vux.toast.show({
            type: "text",
            text: '资料不完整，请先补齐资料',
            width: "20em"
          })
          this.$router.push('/edit')
        } else {
          this.$vux.toast.show({
            type: "text",
            text: '登录成功',
            width: "20em"
          })
          this.$router.push('/')
        }
      }
    },
    login() {
      if (this.data.uid.slice(0, 1) == 1 && this.step >= 2) {
        this.smsLogin()
      } else {
        this.uniLogin()
      }
    },
  },
  created() {
    this.$store.commit('changeTitle', '登录智慧校园')
  },
  mounted() {
    // this.$store.dispatch('getCurrentUser').then(() => {
    //   this.$router.push('/')
    // })
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
    background: @main;
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

.checker {
  text-align: center;
  border-top: 1px solid @border;
  margin-left: 1rem;
  padding: 1rem 0;
  .title {
    float: left;
  }
  .checker-item {
    border: 1px solid @border;
    padding: 0 7px;
    border-radius: 15px;
    margin: 0 14px;
  }
  .checker-item-selected {
    border: 1px solid @main;
    background: @main;
    color: #fff;
  }
}

.loginIcon {
  margin-right: 8px;
  color: @grey;
}

.regBtn {
  line-height: 30px;
  color: @grey;
}

.borderline {
  position: relative;
}

.borderline {
  &:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    border-top: 1px solid #D9D9D9;
    opacity: 0.5;
    width: 100%;
    margin-left: 15px;
  }
}
</style>
