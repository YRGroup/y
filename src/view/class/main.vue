<template>
  <div class="hello">

    <div class="class-header">
      <img :src="classlogo" @click="$router.push('/class')">
      <span>{{ data.name }}</span>
      <span>班主任：{{ data.teacher }}</span>
      <span>班级人数：{{ data.student_count }}人</span>
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
      classlogo:require('@/assets/face/c.jpeg'),
    }
  },
  computed:{
    data:function(){
      return this.$store.state.classInfo
    }
  },
  methods:{
    
  },
  created(){
    this.$store.state.isNav = true
    this.$store.state.title = '我的班级'
    if(this.$store.state.classInfo.null){
      console.log('获取班级数据')
      console.log(this.$API)
      this.$serverAPI.getAllClassinfo(this.$store.state.classId).then(res=>{
        this.$store.state.classInfo = res.data.ClassInfo
        // console.log(res.data.ClassInfo)
      }).catch(err=>{
        console.log('获取数据失败，显示默认数据')
        this.$store.state.classInfo = {"name":"初一一班","student_count":3,"teacher":"李老师","dynamic":[{"auther":"王老师","userImg":"http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg","date":"2017-05-26","category":"作业","content":"作业1","like":12,"comment":[]},{"auther":"王老师","userImg":"http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg","date":"2017-05-26","category":"动态","content":"动态1","like":43,"comment":[{"addTime":"2017-05-26","content":"好","userName":"王家长"},{"addTime":"2017-05-26","content":"好好好好","userName":"王家长"}]}]}
      })
    }
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
    top:1.4rem;
    left:7rem;
    font-size:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:3.6rem;
    left:7rem;
  }
  span:nth-child(4){
    position:absolute;
    top:3.6rem;
    left:14rem;
  }
}

</style>
