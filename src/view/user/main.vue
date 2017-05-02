<template>
  <div class="hello">
    
    <div class="user-header">
      <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg" >
      <span>李晓明的家长</span>
      <span @click="fun('打开学校主页')">郑州航空港育人国际学校</span>
      <span @click="fun('打开班级主页')">三年级二班</span>
      <span>学号：46565686</span>
    </div>
    </br>

    <group>
      <cell title="我的孩子" value="李晓明" is-link @click.native="fun('打开学生主页')"></cell>
      <cell title="我的账号" value="15838150666" is-link></cell>
      <cell title="完善资料"  is-link @click.native="fun('修改资料')"></cell>
      <cell title="修改密码"  is-link @click.native="fun('修改密码')"></cell>
    </group>
    <br>
    <x-button @click.native="fun('登出')">退出登陆</x-button>

  </div>
</template>

<script>
import { Group,Cell,XButton } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell,XButton
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    }
  },
  created(){
    this.$store.state.isNav = true
    this.$store.state.title = '个人中心'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.user-header{
  height:10em;
  width:100%;
  background:#fff url('https://modao.cc/uploads3/images/900/9006918/raw_1493015913.png');
  background-size:100% 100%;
  color:#fff;
  position:relative;
  img{
    width:5rem;
    border-radius:50%;
    position:absolute;
    top:1rem;
    left:2rem;
  }
  span:nth-child(2){
    position:absolute;
    top:1.2rem;
    left:8rem;
    font-size:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:3rem;
    left:8rem;
    font-size:1.1em;
  }
  span:nth-child(4){
    position:absolute;
    top:4.5rem;
    left:8rem;
  }
  span:nth-child(5){
    position:absolute;
    top:4.5rem;
    left:15rem;
  }
}
</style>
