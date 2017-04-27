<template>
  <div class="step1">

    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入学生的学号" v-model="value"></input>
    </flexbox-item>
    </br>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入学生的密码" v-model="value"></input>
    </flexbox-item>
    </br>
    <flexbox-item :span="12">
      <input class="wid" placeholder="请输入学生的姓名" v-model="value"></input>
    </flexbox-item>

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
      this.$router.push('/login/step3')
      this.$parent.stepnum = 3
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
