<template>
  <div class="login">
    </br>
    <group>
      <x-input title="手机号：" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="tel"></x-input>
      <x-input title="密码：" placeholder="请输入密码" type="password" v-model="pw" @keyup.native.enter="login"></x-input>
    </group>
    </br>
    <x-button type="primary" @click.native="login">登陆</x-button>
    <x-button type="warn" @click.native="$router.push('/reg')">注册</x-button>
  </div>
</template>

<script>
import API from '@/server/API'
import { XButton,XInput,Group  } from 'vux'

export default {
  components: {
    XButton,XInput,Group
  },
  data () {
    return {
      tel:'',
      pw:''
    }
  },
  methods:{
    login(){
      API.login(this.tel,this.pw).then(res=>{
        this.fun('登录成功')
        this.$router.push('/main')
      }).catch(err=>{
        this.$vux.toast.show({
          type:"text",
          width:"20em",
          text: err
        })
      })
      
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
    this.$store.state.title = '注册/登陆'
    this.$store.state.isNav = false
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.login{
  padding:2em;
}
</style>
