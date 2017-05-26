<template>
  <div class="hello">

    <div class="class-header">
      <img :src="classlogo" @click="$router.push('/class')">
      <span>{{$store.state.classInfo.name}}</span>
      <span>班主任：{{ $store.state.classInfo.teacher.TrueName }}</span>
      <span>班级人数：{{ $store.state.classInfo.student_count }}人</span>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
export default {
  data () {
    return {
      classlogo:require('@/assets/face/c.jpeg')
    }
  },
  methods:{
    
  },
  created(){
    this.$store.state.isNav = true
    this.$store.state.title = '我的班级'
    console.log(this.$route.params.id)
    this.$API.getAllClassinfo(this.$route.params.id).then(res=>{
      this.$store.state.classInfo = res.data.ClassInfo
      // console.log(res.data.ClassInfo)
    })
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.class-header{
  height:8.5em;
  width:100%;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position:relative;
  img{
    width:4rem;
    border-radius:10px;
    position:absolute;
    top:1rem;
    left:1rem;
    border: 4px solid rgba(255,255,255,0.3);
  }
  span:nth-child(2){
    position:absolute;
    top:2rem;
    left:7rem;
    font-size:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:4rem;
    left:7rem;
  }
  span:nth-child(4){
    position:absolute;
    top:4rem;
    left:14rem;
  }
}

</style>
