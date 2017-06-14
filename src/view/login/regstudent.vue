<template>
  <div class="register">
    <div class="header">
      <span class="left" @click="$router.go(-1)">
        <i class="iconfont">&#xe600;</i>
      </span>
      <span>学生注册 - 智慧校园</span>
    </div>
    <group class="item">
      <x-input class="itemList" placeholder="请输入手机号" :show-clear="false"  
      required is-type="china-mobile" ref="mobilephone" keyboard="number" v-model="data.phone"
      >
      </x-input>
    </group>
    <group class="item">
      <x-input class="itemList" placeholder="请输入验证码" :show-clear="false" 
      required v-model="imgcheck" 
      >
        <img slot="right" :src="imgCheckUrl" @click="newimg">
      </x-input>
    </group>

    <group class="item">
      <x-input class="itemList" placeholder="请输入短信验证码" :show-clear="false" 
      required v-model="smscheck" 
      >
        <x-button slot="right" type="primary" @click.native="sms" mini 
        :disabled="disabled || countdown > 0">{{ smsbtntext }}</x-button>
      </x-input>
    </group>

    <group class="item">
      <x-input class="itemList" placeholder="请设置密码（8-20位字符）" :show-clear="false" 
      required type="password" keyboard="number" v-model="data.password"
      >
      </x-input>
    </group>

    <group class="item">
      <x-input class="itemList" placeholder="请重复输入密码" :show-clear="false" 
      required type="password" keyboard="number" v-model="password2"
      >
      </x-input>
    </group>

    <group class="regBtn" :class="(!data.phone|!imgcheck|!smscheck|!data.password|!password2)?'hidden':null">
      <x-button type="primary" @click.native="submit">注册</x-button>
    </group>
  </div>
</template>

<script>
import { XButton, XInput, Group, Cell } from 'vux'

import md5 from 'js-md5'

export default {
  components: {
    XButton, XInput, Group, Cell
  },
  data() {
    return {
      data:{},
      password2:'',
      smscheck: '',
      imgcheck: '',
      imgCheckUrl:'http://api.test.com/api/auth/Captcha',
      checknum: '',
      disabled: '',
      countdown: 0,
      index:0
    }
  },
  computed: {
    smsbtntext: function () {
      return this.countdown > 0 ? this.countdown + 's 后重新获取' : '获取验证码';
    }
  },
  methods: {
    newimg() {
      this.imgCheckUrl = null      
      this.$http.get('http://api.test.com/api/auth/Captcha').then((res)=>{
        this.imgCheckUrl='http://api.test.com/api/auth/Captcha'
      })
    },
    sms() {
      if (this.tel == "" || this.$refs.mobilephone.valid == false) {
        this.$vux.toast.show(
          {
          type: "cancel",
          text: '请输入正确手机号'
        })
      } else if (this.imgcheck==''){
        this.$vux.toast.show(
          {
          type: "cancel",
          text: '请输入图片验证码'
        })
      } else {
        // this.$vux.toast.show(
        //   {
        //   type: "success",
        //   text: '获取手机验证码成功，请注意查收短信'
        // })
        this.$http.get('http://api.test.com/api/auth/CheckCaptcha?captcha='+this.imgcheck).then((res)=>{
          // console.log(res)
          if(res.data.Status==1){
            this.$vux.toast.show({
              type: "success",
              text: '获取手机验证码成功，请注意查收短信'
            })
            this.countdown = 60
            this.timer()
          }else{
            this.$vux.toast.show({
              type: "cancel",
              text: '图片验证码错误'
            })
          }
        })    
      } 
    },
    timer: function () {
      if (this.countdown > 0) {
        this.countdown--;
        setTimeout(this.timer, 1000);
      }
    },
    submit() {
      let vm = this
      this.data.role=1
      this.data.TrueName=this.data.phone
      console.log(this.data)
      if(!this.$refs.mobilephone.valid|!this.imgcheck|!this.smscheck){
        vm.$vux.toast.show({
          type: "cancel",
          text: '表单信息不完整',
          width:'20em'
        })
      }else if (this.data.password!= this.password2) {
        this.$vux.toast.show({
          type: "cancel",
          text: '两次输入的密码不一致',
          width:'20em'
        })
      }else if (this.data.password.length<6) {
        this.$vux.toast.show({
          type: "cancel",
          text: '密码太短了',
          width:'20em'
        })
      }else if(this.smscheck.length<5){
        this.$vux.toast.show({
          type: "cancel",
          text: '短信验证码错误,测试使用大于5位数就行了',
          width:'20em'
        })
      }else{
        this.$API.parentReg(this.data).then(res=>{
          this.$vux.toast.show({
            type: "success",
            text: '提交成功，跳转到主页',
            width:'20em'
          })
        })
        this.$router.push('/main')
      }
    }
  },
  created() {
    this.$store.commit('showNav', false)
    this.$store.commit('changeTitle', '注册')
    // this.newimg()
    console.log(md5(String(1)))
    console.log(md5('1'))
    console.log(md5(1))
  }
}
</script>

<style lang="less" scoped>
.register {
  padding-top: 5em;
  ;
  margin-top: -10em;
  .item {
    padding: 0 20px;
    margin-top: -0.6em;
    .weui-cells {
      margin-top: 0;
    }
    .itemList {
      border: 1px solid @cc4;
      border-radius: 5px;
      img {
        vertical-align: middle;
      }
    }
    .active {
      border: 1px solid red;
    }
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: @appwidth;
    height: 3.8em;
    line-height: 3.8em;
    display: block;
    background: @cc6;
    text-align: center;
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
}

.loginIcon {
  margin-right: 8px;
  color: @cc3;
}
.regBtn{
  padding:0 20px;
  .weui-btn{
    background: linear-gradient(right top, #00c0a1, #00c06f);
  }
}
.hidden{
  opacity: 0.5;
}
</style>
