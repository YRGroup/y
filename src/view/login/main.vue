<template>
  <div class="login">

    </br></br>
    <q-step :step='stepnum'>    
    <span slot="step1">验证手机</span>
    <span slot="step2">绑定学生</span>
    <span slot="step3">设置密码</span>
    </q-step>

    <router-view class="step"></router-view>    

  </div>
</template>

<script>
import qStep from '@/components/q-step.vue'
import { XButton,XInput,Group } from 'vux'

export default {
  components: {
    qStep,XButton,XInput,Group
  },
  data () {
    return {
      stepnum:1,
      value:'',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun(val){

    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.login{
  text-align: center;
  height:85vh;
  background: linear-gradient( top,#ecf0f1,#bdc3c7);
}
.step{
  margin:4em;
}
</style>
