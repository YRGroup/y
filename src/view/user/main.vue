<template>
  <div class="hello">
    
    <div class="user-header" >
      <img :src="data.Headimgurl" >
      <p class="usename">{{data.TrueName}}
        <small v-if="$store.state.role=='家长'">{{$store.state.currentStudent.TrueName}}的家长</small>
        <small v-if="$store.state.role=='老师'">{{data.ExtendInfo.Course}}</small>        
      </p>
      <p>{{$store.state.currentStudent.SchoolName||'郑州航空港区育人国际学校'}}</p>
      <p class="bottomnav" v-if="$store.state.role=='家长'">
        <span>{{$store.state.currentStudent.ClassName}}</span>
        <span>学号：{{$store.state.currentStudent.StudentID}}</span>
      </p>
      <p class="bottomnav" v-if="$store.state.role=='老师'">
        <span @click="$router.push('/teacher/'+$store.state.currentUserId)">我的主页</span>
        <span @click="$router.push('/class/'+data.ExtendInfo.Classes[0].ClassID)">我的班级</span>
      </p>
    </div>

    <group>
      <cell title="绑定孩子"  is-link @click.native="addStudentPopup=true"
      v-if="$store.state.role=='家长'">
        <i slot="icon" class="iconfont">&#xe719;</i>
      </cell>
      <cell title="切换孩子" :value="$store.state.currentStudent.TrueName" v-show="$store.state.Nickname != null" 
      is-link @click.native="myStudentPopup=true" v-if="$store.state.role=='家长'">
        <i slot="icon" class="iconfont">&#xe719;</i>
      </cell>
      <cell title="我的账号" :value="data.Mobilephone">
        <i slot="icon" class="iconfont">&#xe693;</i>
      </cell>
      <cell title="完善资料"  is-link @click.native="$router.push('/edit')">
        <i slot="icon" class="iconfont">&#xe60b;</i>
      </cell>
      <cell title="修改密码"  is-link @click.native="$router.push('/user/editcode')">
        <i slot="icon" class="iconfont">&#xe692;</i>
      </cell>
    </group>
    <br>
    <div class="exitbtn">
      <a class="btn" @click="logout">退出登录</a>
    </div>

    </br>

    <popup v-model="myStudentPopup" is-transparent>
      <div class="popup">
        <group title="切换孩子">
          <cell :title="i.TrueName" is-link v-for="i in allStudentData" :key="i.StudentID"
          @click.native="$store.commit('changeCurrentStudent',i),myStudentPopup=false">
            <i slot="icon" class="iconfont">&#xe719;</i>
          </cell>
        </group>
      </div>
    </popup>

    <popup v-model="addStudentPopup" is-transparent>
      <div class="popup">
        <group title="绑定孩子">
          <x-input title="孩子ID" v-model="addStudentData.student_meid" 
          text-align="right" placeholder="请在此填上孩子ID"></x-input>
          <selector title="关系" :options="parentTypeList" v-model="addStudentData.type"></selector>
        </group>
        <group class="btn" style="margin:0 20px">
          <x-button type="primary" @click.native="addStudent">确定绑定</x-button>
        </group>
      </div>
    </popup>

    <popup v-model="changePasswordPopup" is-transparent>
      <div class="popup">
        <group title="修改密码">
          <x-input title="以前的密码" v-model="changePasswordData.oldpwd" text-align="right" placeholder="请在此填上以前的密码"></x-input>
          <x-input title="新密码" v-model="changePasswordData.newpwd" text-align="right" placeholder="请在此填上新密码"></x-input>
          <x-input title="重复新密码" v-model="changePasswordData.newpwd2" text-align="right" placeholder="重复新密码"></x-input>
        </group>
        <group class="btn">
          <x-button type="primary" @click.native="changePassword">提交修改</x-button>
        </group>
      </div>
    </popup>

  </div>
</template>

<script>
import { Group,Cell,XButton,Popup,Selector,XInput } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell,XButton,Popup,Selector,XInput
  },
  data () {
    return {
      data:{},
      changePasswordData:{},
      myStudentPopup:false,
      addStudentPopup:false,
      changePasswordPopup:false,
      parentTypeList:[
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
        { key: 3, value: '爷爷' },
        { key: 4, value: '奶奶' }
      ],
      addStudentData:{},
      allStudentData:[],
      userface: require('@/assets/face/bw.jpg')
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    changePassword(){
      if(!this.changePasswordData.oldpwd|!this.changePasswordData.newpwd|!this.changePasswordData.newpwd2){
        this.$vux.toast.show({
          type:"text",
          width:"20em",
          text: '数据不完整'
        })
      }else if(this.changePasswordData.newpwd!=this.changePasswordData.newpwd2){
        this.$vux.toast.show({
          type:"text",
          width:"20em",
          text: '两次输入的新密码不一致'
        })
      }else{
        this.$API.changePassword(this.changePasswordData).then((res)=>{
          this.$vux.toast.show({
            type:"success",
            width:"20em",
            text: '修改成功,请重新登录'
          })
          this.$store.commit('logout')
          this.$router.push('/login')
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    logout(){
      this.$store.commit('logout')
      this.$vux.toast.show({
        type:"text",
        text: '退出成功'
      })
      this.$router.push('/main')
    },
    getData(){
      this.$API.getCurrentUser().then(res=>{
        console.log('获取到的用户信息：')
        console.log(res)
        this.data = res   
        if(res.ExtendInfo.Students!=null){
          if(res.ExtendInfo.Students.length==0){
            let noStudentDate = {
              TrueName:'null',
              SchoolName:'null',
              ClassName:'null',
              StudentID:'null'
            }
            this.allStudentData.push(noStudentDate)
          }else{
            let num = res.ExtendInfo.Students.length
            for(let i=0;i<num;i++){
              this.allStudentData.push(res.ExtendInfo.Students[i])
            }
            this.$store.commit('changeCurrentStudent',this.allStudentData[0])
          }
        }
        this.mobilePhone = res.Mobilephone
      }).catch(err=>{
        console.log(err)
        this.$vux.toast.show({
          type:"text",
          text: "您还未登录",
          width:"20em"
        })
        this.$router.push('/login')
      })
    },
    addStudent(){
      this.$API.addStudent(this.addStudentData).then((res)=>{
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: '修改成功'
        })
        this.addStudentPopup=false
      }).catch((err)=>{
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: '修改失败'
        })
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','个人中心')
    this.getData()
  },
  mounted(){
    // if(this.$store.state.hasLogin===false){
    //   this.$vux.toast.show({
    //     type:"cancel",
    //     text: "当前未登录"
    //   })
    //   // this.$router.push('/login')
    // }
  }
}
</script>

<style lang="less" scoped>
.user-header{
  text-align: center;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  // position: relative;
  padding:10px 0;
  img{
    width:4rem;
    border-radius:50%;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .usename{
    font-size: 1.2rem;
  }
  .bottomnav{
    // position: absolute;
    // bottom:0;
    // width:100%;
    border-top:1px solid rgba(255, 255, 255, .3);
    margin-top:10px;
    // vertical-align: bottom;
    height:24px;
    line-height: 32px;
    span:nth-child(1){
      float:left;
      width:50%;
    }
    span:nth-child(2){
      float:right;
      width:50%;
    }
  }
  .bottomnav:after{
    content: '';
    display:block;
    position: relative;
    width:1px;
    height:2.2rem;
    background:rgba(255, 255, 255, .3);
    top:0;
    left:50%;
  }
}
.exitbtn{
  .btn{
    display: block;
    text-align: center;
    background: #fff;
    padding: 0.5em;
    color: @cc6;
    font-size: 1.2em;
    border-top: 1px solid @cc4;
    border-bottom: 1px solid @cc4;
  }
}
.iconfont{
  color:@cc6;
  margin-right:.5em;
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
