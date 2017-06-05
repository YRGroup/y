<template>
  <div class="login">
    </br>
    <group>
      <x-input title="手机号：" :is-type="china-mobile" placeholder="填写手机号" keyboard="number" v-model="tel">
        <!--<img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">-->
        <span slot="label" class="loginIcon"><i class="iconfont" >&#xe620;</i></span>
      </x-input>
      <x-input title="密码：" placeholder="请输入密码" type="password" v-model="pw" @keyup.native.enter="login">
        <!--<img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">-->
        <span slot="label" class="loginIcon"><i class="iconfont" >&#xe620;</i></span>
      </x-input>
      <!--<x-input title="手机号：" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="tel"></x-input>-->
      <!--<x-input title="密码：" placeholder="请输入密码" type="password" v-model="pw" @keyup.native.enter="login"></x-input>-->
    </group>
    </br>
    <x-button type="primary" @click.native="login">登录</x-button>
    <!--<x-button type="warn" @click.native="$router.push('/reg')">注册</x-button>-->
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
    this.$store.commit('showNav',false)
    this.$store.commit('changeTitle','登录智慧校园')
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.login{
  padding:2em;
}
.loginIcon{
  margin-right:8px;
  color: #888;
}
</style>
