<template>
  <div class="hello">

    <group title="当前的班级信息">
      <cell title="班级ID" v-model="$route.params.classId" text-align="right"></cell>
      <!--<x-input title="所在学校" v-model="data.name" text-align="right"></x-input>      -->
      <x-input title="班级名" v-model="data.name" text-align="right"></x-input>
      <cell title="班主任" v-model="data.teacher.TrueName" text-align="right"></cell>
      <cell title="班级logo" value="暂无" text-align="right"></cell>
    </group>
    <group title="班级成员管理">
      <cell title="添加老师" is-link @click.native="showAddTeacher=true"></cell>
      <cell title="添加学生" is-link @click.native="showAddStudent=true"></cell>
    </group>
    
    </br>

    <popup v-model="showAddTeacher" is-transparent>
      <div class="popup">
        <group title="添加班级教师" >
          <x-input title="教师ID" v-model="newClassTeacherID" placeholder="在此输入ID"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addClassTeacher">发布</x-button>
          <x-button type="warn" @click.native="showAddTeacher=false">取消</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="showAddStudent" is-transparent>
      <div class="popup">
        <group title="添加班级教师" >
          <x-input title="教师ID" v-model="newClassStudentID" placeholder="在此输入ID"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addClassStudent">发布</x-button>
          <x-button type="warn" @click.native="showAddStudent=false">取消</x-button>
        </div>
      </div>
    </popup>

  </div>
</template>

<script>
import { Group,Cell,XInput,XButton,Popup } from 'vux'

export default {
  name: 'hello',
  components:{
    Group,Cell,XInput,XButton,Popup
  },
  data () {
    return {
      showAddTeacher:false,
      newClassTeacherID:'',
      showAddStudent:false,
      newClassStudentID:'',
      data:{}
    }
  },
  methods:{
    getData(){
      this.$API.getClassInfo(this.$route.params.classId).then((res)=>{
        this.data=res
      })
    },
    addClassTeacher(){
      let data ={}
      data.cid=this.$route.params.classId
      data.meid=this.newClassTeacherID
      this.$API.addClassTeacher(data).then((res)=>{
        this.showAddTeacher=false
        this.$vux.toast.show({
          type:'success',
          width:'20em',
          text:'添加成功'
        })
      }).catch((err)=>{
        this.$vux.toast.show({
          type:'warn',
          width:'20em',
          text:'添加失败,'+err
        })
      })
    },
    addClassStudent(){
      let data ={}
      data.cid=this.$route.params.classId
      data.meid=this.newClassStudentID
      this.$API.addClassStudent(data).then((res)=>{
        this.showAddStudent=false
        this.$vux.toast.show({
          type:'success',
          width:'20em',
          text:'添加成功'
        })
      }).catch((err)=>{
        this.$vux.toast.show({
          type:'warn',
          width:'20em',
          text:'添加失败,'+err
        })
      })
    }
  },
  created(){
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.popup{
  width: 95%;
  background-color:#fff;
  margin:0 auto;
  border-radius:5px;
  padding-top:10px;
  margin-bottom:1rem;
}
</style>
