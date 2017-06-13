<template>
  <div class="hello">
    
    <div class="user-header">
      <img :src="headimgurl" >
      <p class="usename">{{trueName}}</p>
      <p @click="fun('打开学校主页')">{{schoolName}}</p>
      <p class="bottomnav">
        <span @click="fun('打开班级主页')">{{className}}</span>
        <span>学号：{{studentId}}</span>
      </p>
    </div>

    <group>
      <cell title="我的孩子" :value="studentName" is-link @click.native="myStudentPopup=true">
        <i slot="icon" class="iconfont">&#xe719;</i>
      </cell>
      <cell title="我的账号" :value="mobilePhone" >
        <i slot="icon" class="iconfont">&#xe693;</i>
      </cell>
      <cell title="完善资料"  is-link @click.native="$router.push('/edit')">
        <i slot="icon" class="iconfont">&#xe60b;</i>
      </cell>
      <cell title="修改密码"  is-link @click.native="fun('修改密码')">
        <i slot="icon" class="iconfont">&#xe692;</i>
      </cell>
    </group>
    <br>
    <div class="exitbtn">
      <a class="btn" @click="logout">退出登录</a>
    </div>

    <popup v-model="myStudentPopup" is-transparent>
      <div class="popup">
        <group title="切换孩子">
          <cell title="李晓明" is-link @click.native="fun('切换学生'),myStudentPopup=false">
            <i slot="icon" class="iconfont">&#xe719;</i>
          </cell>
          <cell title="李大明" is-link @click.native="fun('切换学生'),myStudentPopup=false">
            <i slot="icon" class="iconfont">&#xe719;</i>
          </cell>
        </group>
        <group style="padding:0 20px">
          <x-button type="primary">添加孩子</x-button>
        </group>
      </div>
    </popup>

    <popup v-model="myProfilePopup" height="270px" is-transparent>
      <div class="popup">
        <group title="我的账号">
          <cell title="账号名/手机号" value="000000">
            <i slot="icon" class="iconfont">&#xe719;</i>
          </cell>
          <cell title="李大明" is-link @click.native="fun('切换学生'),myProfilePopup=false">
            <i slot="icon" class="iconfont">&#xe719;</i>
          </cell>
        </group>
      </div>
    </popup>

  </div>
</template>

<script>
import { Group,Cell,XButton,Popup } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell,XButton,Popup
  },
  data () {
    return {
      data:{},
      headimgurl:'null',
      trueName:'null',
      schoolName:'null',
      className:'null',      
      studentId:'null',
      studentName:'null',
      mobilePhone:null,
      mystudents:null,
      myStudentPopup:false,
      myProfilePopup:false,
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
        this.headimgurl = res.Headimgurl
        this.trueName = res.TrueName
        // this.schoolName = res.Sex
        // this.className = res.Sex        
        // this.studentId = res.Sex
        
        if(res.ExtendInfo.Students.length==0){
          this.studentName = '当前未绑定学生'
        }else{
          let currentStudent = res.ExtendInfo.Students[0]
          this.studentName = currentStudent.TrueName
        }
        this.mobilePhone = res.Mobilephone
      }).catch(err=>{
        console.log(err)
        this.$vux.toast.show({
          type:"cancel",
          text: "当前未登录"
        })
        this.$router.push('/login')
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','个人中心')
    this.getData()
  },
  mounted(){
    if(this.$store.state.hasLogin===false){
      this.$vux.toast.show({
        type:"cancel",
        text: "当前未登录"
      })
      // this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.user-header{
  text-align: center;
  height:16em;
  width:100%;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position: relative;
  padding-top:1rem;
  img{
    width:5rem;
    border-radius:50%;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .usename{
    font-size: 1.2rem;
  }
  .bottomnav{
    position: absolute;
    bottom:0;
    width:100%;
    border-top:1px solid rgba(255, 255, 255, .3);;
    vertical-align: bottom;
    height:2.2rem;
    line-height: 2.2rem;
    font-size: 1.1em;
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
