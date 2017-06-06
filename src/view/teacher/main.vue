<template>
  <div class="hello">
    
    <div class="teacher-header">
      <img :src="data.Headimgurl" >
      <div class="nameInfo">
        <span>{{ data.TrueName }}</span>
        <span>{{ data.Course }}</span>
      </div>
    </div>
    <tab>
      <tab-item selected @on-item-click="$router.push('/teacher/'+$route.params.teacherId+'/profile')">主页</tab-item>
      <tab-item @on-item-click="$router.push('/teacher/'+$route.params.teacherId+'/feed')">动态</tab-item>
      <tab-item @on-item-click="$router.push('/teacher/'+$route.params.teacherId+'/work')">作业</tab-item>
    </tab>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { Tab, TabItem,Blur  } from 'vux'

export default {
  components: {
    Tab,TabItem,Blur 
  },
  data () {
    return {
      data:{},
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getData(){
      this.$API.getTeacherInfo(this.$route.params.teacherId).then(res=>{
        console.log('获取到的教师信息：')
        console.log(res)
        this.data=res
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','教师主页')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.teacher-header{
  width:100%;
  color:#fff;
  text-align: center;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  padding:1rem 0;
  img{
    width:5rem;
    border-radius:50%;
    border:3px solid rgba(255,255,255,0.3);
  }
  .nameInfo{
    font-size: 1.4em;
  }
  .tipInfo{
    margin:1rem 0;
    span{
      border: 1px solid #fff;
      padding:.3rem 1em;
      border-radius: 25px;
    }
  }
}
</style>
