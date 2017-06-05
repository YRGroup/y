<template>
  <div class="hello">
    
    <div class="teacher-header">
      <img :src="data.Headimgurl" >
      <p>
        <span>{{ data.TrueName }}</span>
        <span>{{ data.Course }}</span>
      </p>
      <p>
        <span>辛勤园丁</span>
        <span>教学奉献奖</span>
      </p> 
    </div>
    <tab>
      <tab-item selected @on-item-click="$router.push('/teacher/'+$route.params.teacherId+'/profile')">主页</tab-item>
      <tab-item @on-item-click="$router.push('/teacher/'+$route.params.teacherId+'/feed')">动态</tab-item>
      <tab-item @on-item-click="$router.push('/teacher/'+$route.params.teacherId+'/work')">作业</tab-item>
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
      data:{},
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getData(){
      this.$API.getTeacherInfo($route.params.teacherId).then(res=>{
        console.log('获取教师信息：')
        console.log(res)
        this.data=res
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','教师主页')
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.teacher-header{
  height:13em;
  width:100%;
  background:linear-gradient(right top,#00c0a1, #00c06f);
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
