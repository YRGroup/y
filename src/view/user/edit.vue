<template>
  <div class="hello">
    
    <!--<div class="user-header">
      <img :src="data.Headimgurl" >
      <div class="btn">修改头像</div>
    </div>-->

    <group>
      <x-input title="姓名" v-model="data.TrueName" 
      text-align="right" placeholder="请在此填上新内容"></x-input>
      <x-input title="身份" v-model="data.Role" 
      text-align="right" placeholder="请在此填上新内容"></x-input>
      <x-input title="联系方式" v-model="data.Mobilephone" 
      text-align="right" placeholder="请在此填上新内容"></x-input>
    </group>

    <group title="学生资料：" v-if="!noStudent" v-for="i in allStudentData"
    :key="i.StudentID">
      <cell title="姓名" v-model="i.TrueName"
      text-align="right" placeholder="请在此填上新内容"></cell>
      <cell title="性别" v-model="i.Sex"
      text-align="right" placeholder="请在此填上新内容"></cell>
      <cell title="学号" v-model="i.StudentID"
      text-align="right" placeholder="请在此填上新内容"></cell>
      <cell title="年龄" v-model="i.Age"
      text-align="right" placeholder="请在此填上新内容"></cell>
      <cell title="家庭住址" v-model="i.Add"
      text-align="right" placeholder="请在此填上新内容"></cell>
      <cell title="头像" v-model="i.Headimgurl"
      text-align="right" placeholder="请在此填上新内容"></cell>
    </group>

    <!--<group title="当前没有学生" class="btn" v-if="noStudent">
    <group class="btn" v-if="noStudent">
      <x-button type="default" @click.native="addStudentPopup=true">添加学生</x-button>
    </group>-->

    <popup v-model="addStudentPopup" is-transparent>
      <div class="popup">
        <group title="添加学生">
          <x-input title="学生ID" v-model="addStudentData.student_meid" 
          text-align="right" placeholder="请在此填上学生ID"></x-input>
          <selector title="title" :options="parentTypeList" v-model="addStudentData.type"></selector>
        </group>
        <group class="btn">
          <x-button type="primary" @click.native="addStudent">提交修改</x-button>
        </group>
      </div>
    </popup>

    <group class="btn">
      <x-button type="primary" @click.native="submitChange">保存</x-button>
    </group>

  </div>
</template>

<script>
import { Group,Cell, XButton,XInput,Popup,Selector  } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell,XButton,XInput,Popup,Selector 
  },
  data () {
    return {
      addStudentPopup:false,
      parentTypeList:[
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
        { key: 3, value: '爷爷' },
        { key: 4, value: '奶奶' }
      ],
      addStudentData:{},
      allStudentData:[],
      noStudent:false,
      data:{}
    }
  },
  methods:{
    getData(){
      this.$API.getCurrentUser().then(res=>{
        console.log('获取到的用户信息：')
        console.log(res)
        this.data = res
       
        if(this.data.ExtendInfo.Students.length==0){
          this.noStudent = true
        }else{
          this.noStudent = false
          let num = this.data.ExtendInfo.Students.length
          for(let i=0;i<num;i++){
            this.allStudentData.push(res.ExtendInfo.Students[i])
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    addStudent(){
      this.$API.addStudent(this.addStudentData).then((res)=>{
        this.$vux.toast.show({
          type: "success",
          width: "20em",
          text: '修改成功'
        })
      }).catch((err)=>{
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: '修改失败'
        })
      })
    }
  },
  created(){
    this.$store.commit('changeTitle','修改资料')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.user-header{
  text-align: center;
  height:8em;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position: relative;
  padding:1rem;
  img{
    width:5rem;
    border-radius:50%;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .btn{
    position: absolute;
    right:5px;
    top:50%;
    background: rgba(255,255,255,0.3);
    border-radius: 15px;
    padding:5px 10px;
  }
}
.btn{
  padding:10px 20px;
}
.popup{
  width: 95%;
  background-color:#fff;
  margin:0 auto;
  border-radius:5px;
  padding:10px 0;
  margin-bottom:10px;
}
</style>
