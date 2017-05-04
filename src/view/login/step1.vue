<template>
  <div class="step1">

    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入手机号码" v-model="tel"></input>
    </flexbox-item>
    </br>
    <flexbox>
      <flexbox-item :span="7">
        <input class="sma" placeholder="请输入图形验证码" v-model="radnumber"></input>
      </flexbox-item>
      <flexbox-item>
        <img src="http://192.168.3.142:3000/captcha.png">
      </flexbox-item>
    </flexbox>
    </br>
    <flexbox>
      <flexbox-item :span="7">
        <input class="sma" placeholder="短信验证码" v-model="checkvalue"></input>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary" @click.native="sms" mini>获取验证码</x-button>
      </flexbox-item>
    </flexbox>

    </br>
    <x-button type="primary" @click.native="next">下一步</x-button>

  </div>
</template>

<script>
import API from '@/server/API'
import { XButton,Flexbox,FlexboxItem  } from 'vux'

export default {
  components: {
    XButton,Flexbox,FlexboxItem
  },
  data () {
    return {
      tel:'',
      radnumber:'',
      checkvalue:'',
      checknum:''
    }
  },
  methods:{
    next(){
      if(this.checkvalue == this.checknum){
        this.$store.state.reginfo.tel=this.tel
        this.$store.state.reginfo.name=this.tel
        this.$router.push('/login/step2')
        this.$parent.stepnum = 2
      }else{
        this.fun('短信验证码错误')
      }
    },
    sms(){
      this.$http.post('http://192.168.3.142:3000/u',{
        'tel': this.tel,
        'radnumber': this.radnumber
      }).then((response) => {
          this.checknum = response.data.num
          console.log(response.data.num)
          console.log('success')
      }).catch((error) => {
          console.log(error)
          console.log('error')
      });
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
    console.log(document.session)
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
input{
  border-radius:5px;
  border:none;
  padding:1em;
}
img{
  height:3.5em;
}
.wid{
  width:90%;
}
.sma{
  width:80%;
}
.weui-btn_mini{
  height:3em;
}
</style>
