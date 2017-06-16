<template>
  <div class="login">
    <div class="header">
      <span class="left"  @click="$router.go(-1)"><i class="iconfont">&#xe600;</i></span>
      <span>智慧校园-登录</span>
    </div>
    <div class="logo">
        <img src="../../assets/logo.png">
    </div>
    <group>
      <x-input title="手机号：" placeholder="学号/手机号" keyboard="number" v-model="tel">
        <span slot="label" class="loginIcon"><i class="iconfont" >&#xe618;</i></span>
      </x-input>
      <x-input title="密码：" placeholder="密码" type="password" v-model="pw" @keyup.native.enter="login">
        <span slot="label" class="loginIcon"><i class="iconfont" >&#xe6ec;</i></span>
      </x-input>
    </group>
    </br>
    <div style="padding:0 20px" class="loginBtn">
      <x-button type="primary" @click.native="login">登录</x-button>
    </div>
    
    <div class="parentReg">
      <x-button plain @click.native="$router.push('/main')">进入主页</x-button>      
      <x-button plain @click.native="$router.push('/regparent')">家长注册</x-button>
    </div>
  </div>
</template>

<script>
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
      if(this.tel!=''|this.pw!=''){
        let logData={}
        logData.phone=this.tel
        logData.password=this.pw
        this.$API.login(logData).then(res=>{
          this.$vux.toast.show({
            type:"success",
            text: res.Nickname+'登录成功',
            width:"20em"
          })
          this.$store.commit({
            type:'login',
            id:res.Meid,
            role:res.Role
          })
          if(res.ExtendInfo.Classes[0]){
            this.$store.state.currentClassId=res.ExtendInfo.Classes[0].ClassID
          }
          this.$router.push('/main')
        }).catch(err=>{
          this.$vux.toast.show({
            type:"warn",
            text: err,
            width:"20em"
          })
        })   
      }else{
        this.$vux.toast.show({
          type:"cancel",
          text: '表单信息不完整',
          width:"20em"
        })
      }
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
  position: relative;
  height: 80vh;
  text-align: center;
  margin:0 auto;
  padding-top:8em;
  .logo{
    // margin:10em auto 0 auto;
    img{
      width:12em;
      
    }
  }
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 3.8em;
    line-height: 3.8em;
    display: block;
    background: @cc6;
    max-width: 475px;
    .left{
      position:absolute;
      left: 0;
      display: inline-block;
      width: 2.2em;
    }
    span{
      font-size: 18px;
      color: #fff;
    }
  }
  .loginBtn{
    .weui-btn{
      background: linear-gradient(right top, #00c0a1, #00c06f);
      :after{
        border:none;
      }
    }
  }
}
.loginIcon{
  margin-right:8px;
  color: @cc3;
}
.parentReg{
  position: absolute;
  bottom: 1rem;
  width: 100%;
  margin:0 auto;
  text-align: center;
  .weui-btn{
    display: inline-block;
    // margin:0 auto;
    margin:1em 1em 0;
    width: 40%;
    color: @cc6;
    border:1px solid @cc6;
   }
}
</style>
