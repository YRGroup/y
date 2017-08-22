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
        <group :title="'添加 '+data.name+' 的教师'" >
          <x-input title="姓名:" v-model="newClassTeacher.TrueName" placeholder="在此输入姓名"></x-input>
          <selector title="科目：" placeholder="请选择科目" direction="right" v-model="newClassTeacher.course_name" :options="courseList"></selector>
          <x-input title="手机号:" v-model="newClassTeacher.phone" placeholder="在此输入手机号"></x-input>
          <x-input title="密码" v-model="newClassTeacher.password" placeholder="在此输入密码"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addClassTeacher">确认添加</x-button>
          <x-button  @click.native="showAddTeacher=false">取消</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="showAddStudent" is-transparent>
      <div class="popup">
        <group title="添加学生" >
          <x-input title="教师ID：" v-model="newClassStudentID" placeholder="在此输入ID"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addClassStudent">发布</x-button>
          <x-button @click.native="showAddStudent=false">取消</x-button>
        </div>
      </div>
    </popup>

  </div>
</template>

<script>
import { Group,Cell,XInput,XButton,Popup,Selector } from 'vux'

export default {
  name: 'hello',
  components:{
    Group,Cell,XInput,XButton,Popup,Selector
  },
  data () {
    return {
      showAddTeacher:false,
      newClassTeacher:{
        TrueName:'',
        phone:'',
        password:'',
        course_name:'',
        role:'3'
      },
      courseList: [
        {key:'语文',value:'语文'},
        {key:'数学',value:'数学'},
        {key:'英语',value:'英语'},
        {key:'物理',value:'物理'},
        {key:'化学',value:'化学'},
        {key:'历史',value:'历史'},
        {key:'政治',value:'政治'},
        {key:'地理',value:'地理'},
        {key:'音乐',value:'音乐'},
        {key:'美术',value:'美术'},
        {key:'体育',value:'体育'}
      ],
      showAddStudent:false,
      newClassStudentID:'',
      data:{}
    }
  },
  methods:{
    getData(){
      this.$API.getClassInfo(this.$store.state.currentClassId).then((res)=>{
        this.data=res
      })
    },
    addClassTeacher(){
      let data ={}
      data.cid=this.$store.state.currentClassId
      this.$API.userReg(this.newClassTeacher).then(res=>{
        data.meid = res.Meid
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
      })

    },
    addClassStudent(){
      let data ={}
      data.cid=this.$store.state.currentClassId
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
