<template>
  <div class="hello">

    <div class="class-header">
      <img :src="classlogo" @click="$router.push('/class')">
      <span class="name">{{ data.name }}</span>
      <span class="teacher">班主任：{{ mainTeacherName }}</span>
      <span class="count">人数：{{ data.student_count }}</span>
      <div class="addbtn" @click="$router.push('/class/'+$store.state.classId+'/new')"><i class="iconfont">&#xe606;</i>发布动态</div>
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
      mainTeacherName:''
    }
  },
  computed:{
    data:function(){
      return this.$store.state.classInfo
    }
  },
  methods:{
    getClassInfo(){
      this.$API.getClassInfo(this.$route.params.classId).then(res=>{
        console.log('获取到的班级信息：')
        console.log(res.data.Content)
        this.$store.state.classInfo = res.data.Content
        this.mainTeacherName = res.data.Content.teacher.TrueName
      }).catch(err=>{
        console.log('获取数据失败，显示默认数据')
        console.log(err)
        this.$store.state.classInfo = {"name":"初一一班","student_count":3,"teacher":"李老师","dynamic":[{"auther":"王老师","userImg":"http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg","date":"2017-05-26","category":"作业","content":"作业1","like":12,"comment":[]},{"auther":"王老师","userImg":"http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg","date":"2017-05-26","category":"动态","content":"动态1","like":43,"comment":[{"addTime":"2017-05-26","content":"好","userName":"王家长"},{"addTime":"2017-05-26","content":"好好好好","userName":"王家长"}]}]}
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','我的班级')
    this.getClassInfo()
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
  .name{
    position:absolute;
    top:1.4rem;
    left:6.4rem;
    font-size:1.5em;
  }
  .teacher{
    position:absolute;
    top:3.6rem;
    left:6.4rem;
  }
  .count{
    position:absolute;
    top:3.6rem;
    left:13rem;
  }
  .addbtn{
    position: absolute;
    top:2rem;
    right:0;
    background: rgba(255,255,255,0.3);
    padding:.2em;
    border-radius: 20px 0 0 20px;
    cursor: pointer;
    .iconfont{
      font-size: 1.3em;
      margin:0 5px 0 5px;
      position: relative;
      top: 2px;
    }
  }
}

</style>
