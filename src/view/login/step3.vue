<template>
  <div class="step1">

    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入密码" v-model="value"></input>
    </flexbox-item>
    </br>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请再次输入密码" v-model="value"></input>
    </flexbox-item>

    </br>
    <x-button type="primary" @click.native="submit">下一步</x-button>
    

  </div>
</template>

<script>
import { XButton,Flexbox,FlexboxItem  } from 'vux'

export default {
  components: {
    XButton,Flexbox,FlexboxItem
  },
  data () {
    return {
      value:'',
    }
  },
  methods:{
    submit(){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: '提交成功，跳转到主页'
      })
      this.$router.push('/main')
    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.step1{

}
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
