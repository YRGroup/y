<template>
  <div>
    <div class="header">
      <img :src="data.Headimgurl" >
      <div class="nameInfo">
        <span>{{ data.TrueName }}</span>
        <span>{{ data.Course }}</span>
      </div>
      <div class="msgbtn" @click="$router.push('/msg/'+$route.params.studentId)">发消息</div>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { Tab, TabItem  } from 'vux'

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
      this.$API.getStudentInfo(this.$route.params.studentId).then(res=>{
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
.header{
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
  .msgbtn{
    position: absolute;
    right:1rem;
    top:1rem;
    padding:5px 1rem;
    border-radius: 10px;
    background: rgba(255,255,255,0.3);
  }
}
</style>
