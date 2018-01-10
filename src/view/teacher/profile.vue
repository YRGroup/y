<template>
  <div class="profile">
    <group label-width="13em" label-align="left" class="itemlist">
      <cell title="手机号：" :value="data.Mobilephone" value-align="right"></cell>
      <cell title="姓名：" :value="data.TrueName" value-align="right"></cell>
      <cell title="职称：" :value="data.Title" value-align="right" v-show="$store.getters.isTeacher"></cell>
      <cell title="性别：" :value="data.Sex" value-align="right"></cell>
      <cell title="教龄：" :value="data.SchoolAge||0 + ' 年'" value-align="right" v-show="$store.getters.isTeacher"></cell>
      <!-- <cell title="身份证：" :value="data.IDCard" value-align="right"></cell> -->
      <cell title="学科：" :value="data.Course" value-align="right"></cell>
      <!-- <div class="more" @click="$router.push('/teacher/'+$route.params.teacherId+'/information')">更多基本资料</div> -->
    </group>
    <group label-width="13em" label-align="left" class="itemlist">
      <cell title="授课班级" class="title">
        <i class="iconfont" slot="icon">&#xe614;</i>
      </cell>
      <cell :title="i.ClassName" :value="i.CourseName" value-align="right" v-for="(i,index) in data.Classes" :key="index"></cell>
    </group>
    <group label-width="13em" label-align="left" class="itemlist">
      <cell title="教学经历" class="title">
        <i class="iconfont" slot="icon">&#xe603;</i>
      </cell>
      <cell :title="i.SchoolName" :value="i.StartTime" value-align="right" v-for="(i,index) in data.TeachExperience" :key="index"></cell>
    </group>

    <group label-width="13em" label-align="left" class="itemlist">
      <cell title="个人荣誉" class="title">
        <i class="iconfont" slot="icon">&#xe671;</i>
      </cell>
      <scroller lock-y scrollbar-x>
      <div class="box" :style="{ width: boxwid}">
        <div class="box-item" v-for="(i,index) in data.PersonalHonor" :key="index">
          <img :src="i.ImgPath" @click="showimg(i.ImgPath)" >
        </div>
      </div>
    </scroller>
    </group>

    <x-dialog v-model="showdialog" hide-on-blur>
      <div>
        <img :src="showimgurl" style="max-width:100%">
      </div>
    </x-dialog>


  </div>
</template>

<script>
import { Cell, Scroller, Group,XDialog  } from 'vux'

export default {
  components: {
    Cell, Scroller, Group,XDialog
  },
  data () {
    return {
      showdialog:false,
      showimgurl:'',
      data:{},
    }
  },
  computed:{
    boxwid(){

      if(this.data.PersonalHonor&&this.data.PersonalHonor.length){
        return this.data.PersonalHonor.length * 100 +'px'
      }else{
        return '100%'
      }
    },
  },
  methods:{
    showimg(val){
      this.showimgurl = val
      this.showdialog = true
    },
    getData(){
      this.$API.getTeacherInfo(this.$route.params.teacherId).then(res=>{
        this.data = res
      })
    },
  },
  created(){
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.profile{
  margin-top:0;
}
.box {
  height: 4em;
  position: relative;
  background:transparent;
  padding-top:1em;
  padding-bottom:1em;
}
.box-item {
  width: 80px;
  background-color:#fff;
  border-radius:15px;
  display:inline-block;
  margin-left: 1em;
  img{
    vertical-align: top;
    width:4em;
    margin:0 1em;
    // border-radius:50%;
  }
}
.itemlist{
  margin-top:-10px;
  .title{
    border-bottom: 1px solid @border;
    margin-bottom: -1px;
    font-size:1.1em;
    line-height: 1.4em;
    color: @main;
    .iconfont{
      margin-right:5px;
      font-size:1.2em;
    }
  }
  .more{
    border-top:1px solid @border;
    color: @main;
    text-align: center;
    line-height: 3em;
  }
}

// .dialog-demo {
//   .weui-dialog{
//     border-radius: 10px;
//     padding-bottom: 8px;
//   }
//   .dialog-title {
//     line-height: 30px;
//     color: #666;
//   }
//   .img-box {
//     overflow: hidden;
//   }
//   .vux-close {
//     margin-top: 8px;
//     margin-bottom: 8px;
//   }
// }
</style>
