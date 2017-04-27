<template>
  <div class="step1">

    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入手机号码" v-model="value"></input>
    </flexbox-item>
    </br>
    <flexbox>
      <flexbox-item :span="7">
        <input class="sma" placeholder="请输入图形验证码" v-model="value"></input>
      </flexbox-item>
      <flexbox-item>
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=496740924,3861938915&fm=23&gp=0.jpg">
      </flexbox-item>
    </flexbox>
    </br>
    <flexbox>
      <flexbox-item :span="7">
        <input class="sma" placeholder="短信验证码" v-model="value"></input>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary" @click.native="null" mini>获取验证码</x-button>
      </flexbox-item>
    </flexbox>

    </br>
    <x-button type="primary" @click.native="next">下一步</x-button>

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
    next(){
      this.$router.push('/login/step2')
      this.$parent.stepnum = 2
    }
  },
  created(){
    this.$parent.stepnum = 1
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
