<template>
  <div class="hello hasClassShow">

    <has-no-student v-if="$store.state.hasNoStudent">
    </has-no-student>

    <div v-else>
      <div class="class-header">
        <div><img :src="classPic"></div>
        <!-- <img :src="classInfo.classlogo||'/static/img/c.b22e462.jpeg'"> -->
        <span class="name">{{ classInfo.name }}</span>
        <span class="teacher">班主任：{{ classInfo.teacherName||'未指定' }}</span>
        <span class="count">人数：{{ classInfo.student_count }}</span>
        <div class="addbtn1" @click="$router.push('/new')"><i class="iconfont">&#xe606;</i>发动态</div>
        <!-- <div class="addbtn2" @click="$router.push('/class/manage')"><i class="iconfont">&#xe832;</i>管理</div> -->
      </div>

      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
import { Popup, Group, XTextarea , XButton } from 'vux'
import hasNoStudent from '@/components/hasNoStudent'

export default {
  components: {
    Popup,Group,XTextarea,XButton,
    hasNoStudent,
  },
  data () {
    return {
      classInfo:{},
      showAddStudent:false,
      classPic: require('@/assets/class.png'),
    }
  },
  computed:{
    data:function(){
      return this.$store.state.classInfo
    }
  },
  methods:{
    getClassInfo(){
      this.$API.getClassInfo(this.$store.state.currentClassId).then(res=>{
        this.classInfo = res
        if(res.teacher){
          this.classInfo.teacherName = res.teacher.TrueName
        }else{
          this.classInfo.teacherName = '未指定'
        }
        this.classInfo.classlogo = require('@/assets/face/c.jpeg')
      })
    }
  },
  created(){
    this.$store.commit('changeTitle','我的班级')
    this.getClassInfo()
  },
  mounted(){
    if(this.$store.state.hasLogin && this.$store.state.hasNoStudent && this.$store.state.role =='家长'){
      this.showAddStudent=true
    }else{
      this.showAddStudent=false
    }
  }
}
</script>

<style lang="less" scoped>
.class-header{
  padding: 1em 0;
  height:160px;
  width:100%;
  // background:linear-gradient(right top,#00c0a1, #00c06f);
  background: url(../../assets/class_topbg.png) center;
  background-size:cover;
  color:#fff;
  text-align: center;
  position:relative;
  z-index: 100;
  img{
    width:3.2rem;
    height:3.2rem;
    border-radius:50%;
    // position:absolute;
    // top:1.1rem;
    // left:1rem;
    border: 3px solid rgba(255,255,255,0.3);
  }
  .name{
    // position:absolute;
    // top:1.3rem;
    // left:6rem;
    font-size:1.2em;
    display: block;
  }
  .teacher{
    margin-right: 10px;
  //   position:absolute;
  //   top:3.3rem;
  //   left:6rem;
  }
  // .count{
  //   position:absolute;
  //   top:3.3rem;
  //   left:13rem;
  // }
  .addbtn1{
    background:#ffb260;
    border-radius: 20px;
    width: 80px;
    margin:8px auto;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    .iconfont{
      font-size: 1.2em;
      margin-right: 5px;
    }
  }
  .addbtn2{
    position: absolute;
    top:3.4rem;
    right:0;
    background:#ffb260;
    // background: rgba(255,255,255,0.3);
    padding:0 .2em;
    border-radius: 20px 0 0 20px;
    cursor: pointer;
    .iconfont{
      font-size: 1.3em;
      margin:0 5px 0 5px;
      position: relative;
    }
  }
}
.popup{
  width: 95%;
  background-color:#fff;
  height:250px;
  margin:0 auto;
  border-radius:5px;
  padding-top:10px;
}
</style>
