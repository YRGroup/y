<template>
  <div class="hello">
    
    <!--<div class="user-header">
      <img :src="data.Headimgurl" >
      <div class="btn">修改头像</div>
    </div>-->

    <group>
        <x-input title="原始密码 " v-model="changePasswordData.oldpwd" text-align="left" placeholder="请在此填上以前的密码" type='password'></x-input>
        <x-input title="新 密 码" v-model="changePasswordData.newpwd" text-align="left" placeholder="请在此填上新密码" type='password'></x-input>
        <x-input title="确认密码 " v-model="changePasswordData.newpwd2" text-align="left" placeholder="重复新密码" type='password'></x-input>
    </group>
    <group class="btn">
      <x-button type="primary" @click.native="changePassword">提交</x-button>
    </group>


  </div>
</template>

<script>
import { Group,Cell, XButton,XInput  } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell,XButton,XInput
  },
  data () {
    return {
      changePasswordData:{},
    }
  },
  methods:{
    changePassword(){
      if(!this.changePasswordData.oldpwd|!this.changePasswordData.newpwd|!this.changePasswordData.newpwd2){
        this.$vux.toast.show({
          type:"text",
          width:"20em",
          text: '数据不完整'
        })
      }else if(this.changePasswordData.newpwd!=this.changePasswordData.newpwd2){
        this.$vux.toast.show({
          type:"text",
          width:"20em",
          text: '两次输入的新密码不一致'
        })
      }else{
        this.$API.changePassword(this.changePasswordData).then((res)=>{
          this.$vux.toast.show({
            type:"success",
            width:"20em",
            text: '修改成功,请重新登录'
          })
          this.$store.commit('logout')
          this.$router.push('/login')
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
  },
  created(){
    this.$store.commit('changeTitle','修改密码')
  },
  mounted(){
    
  }
}
</script>

<style lang="less" scoped>
.user-header{
  text-align: center;
  height:8em;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position: relative;
  padding:1rem;
  img{
    width:5rem;
    border-radius:50%;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .btn{
    position: absolute;
    right:5px;
    top:50%;
    background: rgba(255,255,255,0.3);
    border-radius: 15px;
    padding:5px 10px;
  }
}
.btn{
  padding:10px 20px;
}
.popup{
  width: 95%;
  background-color:#fff;
  margin:0 auto;
  border-radius:5px;
  padding:10px 0;
  margin-bottom:10px;
}
</style>
