<template>
  <div class="step1">
    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入密码" v-model="value1"></input>
    </flexbox-item>
    </br>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请再次输入密码" v-model="value2" @keyup.native.enter="submit"></input>
    </flexbox-item>
    </br>
    <x-button type="primary" @click.native="submit">下一步</x-button>
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
      value1:'',
      value2:'',
    }
  },
  methods:{
    submit(){
      let vm = this
      if(this.value1 == this.value2){
        this.$store.state.reginfo.pw=this.value1
        API.signup(this.$store.state.reginfo).then(res=>{
          console.log(res)
          vm.$vux.toast.show({
            type:"text",
            width:"20em",
            text: '提交成功，跳转到主页'
          })
        this.$router.push('/main')
        }).catch(err=>{
          vm.$vux.toast.show({
            type:"text",
            width:"20em",
            text: err
          })
        })
      }else{
        vm.$vux.toast.show({
          type:"text",
          width:"20em",
          text: '两次输入的密码不一致'
        })
      }
    }
  },
  created(){
    if(this.$store.state.reginfo.child){
      console.log(this.$store.state.reginfo)
    }else{
      this.$router.push('/reg/step2')
    }
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
.wid{
  width:90%;
}
</style>
