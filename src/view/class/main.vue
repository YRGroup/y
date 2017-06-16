<template>
  <div class="hello">


    <div class="class-header">
      <img :src="classInfo.classlogo||'/static/img/c.b22e462.jpeg'" @click="$router.push('/class/'+$store.state.classId)">
      <span class="name">{{ classInfo.name }}</span>
      <span class="teacher">班主任：{{ classInfo.teacherName||'未指定' }}</span>
      <span class="count">人数：{{ classInfo.student_count }}</span>
      <div class="addbtn1" @click="newPost=true"><i class="iconfont">&#xe606;</i>发布</div>
      <div class="addbtn2" @click="$router.push('/class/'+$route.params.classId+'/manage')"><i class="iconfont">&#xe606;</i>管理</div>
    </div>

    <popup v-model="newPost" height="270px" is-transparent>
      <div class="popup">
        <group>
          <x-textarea title="动态" placeholder="在此输入内容" v-model="newPostData.content"></x-textarea>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addNewPost">发布</x-button>
          <x-button @click.native="newPost = false">取消</x-button>
        </div>
      </div>
    </popup>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { Popup, Group, XTextarea , XButton } from 'vux'

export default {
  components: {
    Popup,
    Group,
    XTextarea ,
    XButton
  },
  data () {
    return {
      newPost:false,
      newPostData:{},
      classInfo:{}
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
        this.classInfo = res
        this.classInfo.teacherName = res.teacher.TrueName    
        this.classInfo.classlogo = require('@/assets/face/c.jpeg')         
      }).catch(err=>{
        console.log(err)
      })
    },
    addNewPost(){
      if(this.newPostData.content){
        this.newPostData.cid=this.$route.params.classId
        this.newPostData.type=1
        console.log(this.newPostData)
        this.$API.postNewClassDynamic(this.newPostData).then(res=>{
          this.$vux.toast.show({
            type:"success",
            text: "发布成功",
            width:"20em"
          })
          this.newPost=false
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$vux.toast.show({
          type:"warn",
          text: "数据不完整",
          width:"20em"
        })
      }
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','我的班级')
    this.getClassInfo()
  }
}
</script>

<style lang="less" scoped>
.class-header{
  height:7.5em;
  width:100%;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position:relative;
  img{
    width:3.4rem;
    border-radius:6px;
    position:absolute;
    top:1rem;
    left:1rem;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .name{
    position:absolute;
    top:1.3rem;
    left:6rem;
    font-size:1.4em;
  }
  .teacher{
    position:absolute;
    top:3.3rem;
    left:6rem;
  }
  .count{
    position:absolute;
    top:3.3rem;
    left:13rem;
  }
  .addbtn1{
    position: absolute;
    top:1rem;
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
  .addbtn2{
    position: absolute;
    top:3rem;
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
.popup{
  width: 95%;
  background-color:#fff;
  height:250px;
  margin:0 auto;
  border-radius:5px;
  padding-top:10px;
}
</style>
