<template>
  <div class="hello">
    
    <div class="teacher-header">
      <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg" >
      <p>
        <span>{{ $route.params.id }}</span>
        <span>（语文）</span>
      </p>
      <p>
        <span>辛勤园丁</span>
        <span>教学奉献奖</span>
      </p> 
    </div>
    <tab>
      <tab-item selected @on-item-click="$router.push('/teacher/'+$route.params.id+'/profile')">主页</tab-item>
      <tab-item @on-item-click="$router.push('/teacher/'+$route.params.id+'/feed')">动态</tab-item>
      <tab-item @on-item-click="$router.push('/teacher/'+$route.params.id+'/work')">作业</tab-item>
    </tab>
    </br>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  components: {
    Tab,TabItem
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun(val){

    }
  },
  created(){
    this.$store.state.isNav = true
    this.$store.state.title = '教师主页'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.teacher-header{
  height:13em;
  width:100%;
  background:#fff url('https://modao.cc/uploads3/images/900/9006918/raw_1493015913.png');
  background-size:100% 100%;
  color:#fff;
  text-align: center;
  padding-top:2em;
  img{
    width:5rem;
    border-radius:50%;
  }
  p:nth-child(2){
    span:nth-child(1){
      font-size: 1.4em;
    }
    
  }
  p:nth-child(3){
    margin-top:1em;
    span{
      border: 1px solid #fff;
      padding:.3em 1em;
      border-radius: 25px;
    }
  }
}
</style>
