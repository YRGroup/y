<template>
  <div class="register">
    <group class="item">
<<<<<<< HEAD
      <x-input class="itemList" :class="index===0?'active':null" @click.native="changeIndex(0)" placeholder="请输入手机号" is-type="china-mobile"  keyboard="number" v-model="tel">
=======
      <x-input class="itemList" placeholder="请输入手机号" is-type="china-mobile" keyboard="number" v-model.trim="tel" ref="input">
>>>>>>> 76a3f9cf6370e84c13862a2217f3b57d79138794
      </x-input>
    </group>
    <group class="item">
      <x-input class="itemList" placeholder="请输入验证码" v-model="imgcheck" :class="index===1?'active':null" @click.native="changeIndex(1)">
        <img slot="right" :src="'http://api.zzcowboy.com/ck/captcha.png?n='+checkc" @click="newimg">
      </x-input>
    </group>
    <group class="item">
      <x-input class="itemList" placeholder="请输入短信验证码" v-model="smscheck" @keyup.native.enter="next">
        <x-button slot="right" type="primary" @click.native="sms" mini :disabled="disabled || countdown > 0">{{ smsbtntext }}</x-button>
      </x-input>
    </group>
    <group class="item">
      <x-input class="itemList" placeholder="请设置密码（8-20位字符）" type="password" keyboard="number" v-model="pw">
      </x-input>
    </group>
    <group>
      <x-button type="primary" @click.native="submit">注册</x-button>
    </group>
  </div>
</template>

<script>
import { XButton, XInput, Group,Cell  } from 'vux'
export default {
  components: {
    XButton, XInput, Group,Cell 
  },
  data() {
    return {
<<<<<<< HEAD
      tel:'',
      smscheck:'',
      pw:'',
      imgcheck:'',
      checkc:'',
      disabled:'',
      countdown:0,
      index:0
=======
      tel: '',
      smscheck: '',
      pw: '',
      imgcheck: '',
      checkc: '',
      disabled: '',
      countdown: 0,
      valida:false, 
      currect:'',
      index:''
>>>>>>> 76a3f9cf6370e84c13862a2217f3b57d79138794
    }
  },
  methods: {
    newimg() {
      this.checkc = Math.floor(Math.random() * 9000) + 1000
    },
    sms() {
      console.log(this.$refs.input)
      if(this.tel == "" || this.$refs.input.valid == false){
        this.fun('请输入正确手机号')
      }else if (this.checkc == this.imgcheck) {
        this.$http.get('http://api.zzcowboy.com/sms?tel=' + this.tel).then((response) => {
          this.fun('获取短信验证码成功')
          this.countdown = 60
          this.timer()
        }).catch((error) => {
          console.log(error)
          console.log('error')
        })
      } else {
        this.fun('图片验证码输入错误')
      }
    },
    timer: function () {
      if (this.countdown > 0) {
        this.countdown--;
        setTimeout(this.timer, 1000);
      }
    },
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
<<<<<<< HEAD
    changeIndex(val){
      this.index=val
    }
=======
    submit() {
      let vm = this
      console.log(this.tel)
      if(this.tel !== undefined){
        
      }else{
        vm.$vux.toast.show({
          type: "text",
          width: "20em",
          text: '请输入手机号'
        })
      }
      this.$store.state.reginfo.tel = this.tel
      vm.$vux.toast.show({
        type: "text",
        width: "20em",
        text: '提交成功，跳转到主页'
      })
      vm.$router.push('/main')
    },
>>>>>>> 76a3f9cf6370e84c13862a2217f3b57d79138794
  },
  created() {
    this.$store.commit('showNav', false)
    this.$store.commit('changeTitle', '注册')
    this.checkc = Math.floor(Math.random() * 9000) + 1000
  },
  mounted() {

  },
  computed: {
    smsbtntext: function () {
      return this.countdown > 0 ? this.countdown + 's 后重新获取' : '获取验证码';
    }
  }
}
</script>

<style lang="less" scoped>

.register {
  padding: 0 20px;
  margin-top: -10em;
  .item {
    margin-top: -0.6em;
    .weui-cells {
      margin-top: 0;
    }
    .itemList {
      border:1px solid @cc4;
      border-radius: 5px;
      img {
        height: 1.4em;
      }
    }
    .active{
      border:1px solid red;
    }
  }
}

.loginIcon {
  margin-right: 8px;
  color: @cc3;
}
</style>
