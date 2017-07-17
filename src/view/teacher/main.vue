<template>
  <div class="hello">
    
    <div class="teacher-header">
      <img :src="data.Headimgurl" >
      <div class="nameInfo">
        <div class="name">{{ data.TrueName }}</div>
        <div>{{ data.Course }}</div>
      </div>
      <div class="msgbtn" @click="$router.push('/msg/'+data.Meid)">发消息</div>
    </div>
    <tab class="tabmeun">
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
        this.data=res
      })
    }
  },
  created(){
    this.$store.commit('changeTitle','教师主页')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.teacher-header{
  color:#fff;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  padding:10px 50px;
  img{
    width:4rem;
    border-radius:50%;
    border:3px solid rgba(255,255,255,0.3);
  }
  .nameInfo{
    font-size: 1.2em;
    display:inline-block;
    vertical-align: top;
    padding:1rem;
    .name{
      font-size: 1.3rem;
    }
  }
  .tabmeun{
    margin-bottom: 100px;
  }
  .tipInfo{
    margin:1rem 0;
    span{
      border: 1px solid #fff;
      padding:.3rem 1em;
      border-radius: 25px;
    }
  }
  .msgbtn{
    position: absolute;
    right:5px;
    top:1rem;
    padding:5px 1rem;
    border-radius: 10px;
    background: rgba(255,255,255,0.3);
  }
}
</style>
