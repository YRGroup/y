<template>
  <div class="step1">
    <group >
      <x-input placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="tel"></x-input>
    </group>
    <group>
      <x-input placeholder="请输入右侧数字" v-model="imgcheck">
        <img slot="right" :src="'http://192.168.3.142:3000/captcha.png?n='+checkc" @click="newimg">
      </x-input>
    </group>
    <group>
      <x-input placeholder="请输入短信验证码" v-model="smscheck" @keyup.native.enter="next">
        <x-button slot="right" type="primary" @click.native="sms" mini>发送验证码</x-button>
      </x-input>
    </group>
    </br>
    <x-button type="primary" @click.native="next">下一步</x-button>
  </div>
</template>

<script>
import API from '@/server/API'
import { XButton,Flexbox,FlexboxItem,XInput,Group  } from 'vux'

export default {
  components: {
    XButton,Flexbox,FlexboxItem,XInput,Group
  },
  data () {
    return {
      tel:'',
      imgcheck:'',
      smscheck:'',
      checknum:'',
      checkc:''
    }
  },
  methods:{
    next(){
      if(this.smscheck == this.checknum && this.smscheck!=''){
        this.$store.state.reginfo.tel=this.tel
        this.$store.state.reginfo.name=this.tel
        this.$router.push('/reg/step2')
        this.$parent.stepnum = 2
      }else{
        console.log('enter: '+this.smscheck)
        console.log('source: '+this.checknum)
        this.fun('短信验证码错误')
      }
    },
    sms(){
      if(this.checkc == this.imgcheck && this.tel != ''){
        this.$http.get('http://192.168.3.142:3000/sms?tel='+this.tel).then((response) => {
          this.fun('获取短信验证码成功')
          this.checknum = response.data.num
          console.log('checknum: '+this.checknum)   
        }).catch((error) => {
          console.log(error)
          console.log('error')
        })
      }else{
        this.fun('图片验证码输入错误')
      }
    },
    newimg(){
      this.checkc = Math.floor(Math.random()*9000)+1000
    },
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    }
  },
  created(){
    this.$parent.stepnum = 1
    this.checkc = Math.floor(Math.random()*9000)+1000
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>

</style>
