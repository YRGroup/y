<template>
  <div class="hello">

    <div class="user-header">
      <img :src="$store.state.currentUser.Headimgurl">
      <p class="usename">{{$store.state.currentUser.TrueName}}
        <small v-if="$store.getters.isParent">-- {{$store.state.currentStudent.TrueName}}的家长</small>
        <small v-if="$store.getters.isTeacher">{{$store.state.currentUser.ExtendInfo.Course.CourseName}}</small>
      </p>
      <p>{{$store.state.currentStudent.SchoolName||'郑州航空港区育人国际学校'}}</p>
      <p class="bottomnav" v-if="$store.getters.isParent">
        <span>{{$store.state.currentStudent.ClassName}}</span>
        <span>学号：{{$store.state.currentStudent.StudentID}}</span>
      </p>
      <p class="bottomnav" v-if="$store.getters.isTeacher">
        <span @click="skip('/teacher/'+$store.state.currentUserId)">我的主页</span>
        <span @click="skip('/class')">我的班级</span>
      </p>
    </div>
    <!-- <group v-show="$store.getters.isTeacher">
      <cell title="我的动态" is-link @click.native="$router.push('/user/mypost')" >
        <i slot="icon" class="iconfont">&#xe66c;</i>
      </cell>
    </group> -->
    <group v-show="$store.getters.isStudent || $store.getters.isParent">
      <cell title="个人主页" is-link @click.native="skip('/student/' + $store.state.currentStudent.Meid)" >
        <i slot="icon" class="iconfont">&#xe612;</i>
      </cell>
    </group>
    <group>
      <cell title="校园通知"  is-link @click.native="skip('/user/notice')" >
        <i slot="icon" class="iconfont">&#xe629;</i>
      </cell>
      <!-- <cell title="绑定学生" is-link @click.native="addStudentPopup=true" v-if="$store.getters.isParent">
          <i slot="icon" class="iconfont">&#xe719;</i>
        </cell> -->
      <cell title="邀请家长" is-link @click.native="inviteParentPopup=true" v-if="$store.getters.isParent">
        <i slot="icon" class="iconfont">&#xe932;</i>
      </cell>
      <cell title="切换班级" :value="$store.state.currentClassInfo.name" is-link @click.native="classListPopup=true" v-if="$store.getters.isTeacher||$store.getters.isParent">
        <i slot="icon" class="iconfont">&#xe719;</i>
      </cell>
      <!-- <cell title="我的账号" :value="data.Mobilephone">
        <i slot="icon" class="iconfont">&#xe693;</i>
      </cell> -->
      <cell title="完善资料" is-link @click.native="skip('/edit')">
        <i slot="icon" class="iconfont">&#xe60b;</i>
      </cell>
      <cell title="修改密码" is-link @click.native="skip('/user/editcode')">
        <i slot="icon" class="iconfont">&#xe692;</i>
      </cell>
    </group>
    <br>
    <div class="exitbtn">
      <a class="btn" @click="logout">退出登录</a>
    </div>

    </br>
    <!-- 切换班级 -->
    <popup v-model="classListPopup" is-transparent>
      <div class="popup">
        <group title="切换班级">
          <changeClass @success="classListPopup=false"></changeClass>
        </group>
      </div>
    </popup>

    <!-- 邀请家长 -->
    <popup v-model="inviteParentPopup" is-transparent>
      <div class="popup">
        <group title="邀请家长">
          <x-input title="手机号" v-model="Invitedata.MobilePhone" text-align="right" placeholder="手机号"></x-input>
          <x-input title="姓名" v-model="Invitedata.truename" text-align="right" placeholder="真实姓名"></x-input>
          <selector title="关系" :options="parentTypeList" v-model="Invitedata.type"></selector>
        </group>
        <group class="btn" style="margin:0 20px">
          <x-button type="primary" @click.native="inviteParent">确定绑定</x-button>
        </group>
      </div>
    </popup>

    <!-- 添加学生 -->
    <popup v-model="addStudentPopup" is-transparent>
      <div class="popup">
        <group title="绑定学生">
          <x-input title="姓名" v-model="addStudentData.truename" text-align="right" placeholder="请在此填上学生的真实姓名"></x-input>
          <x-input title="学号" v-model="addStudentData.student_id" text-align="right" placeholder="请在此填上学生的学号"></x-input>
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
import { Group, Cell, XButton, Popup, Selector, XInput } from "vux";
import hasNoStudent from "@/components/hasNoStudent";
import changeClass from "@/components/changeClass";

export default {
  name: "hello",
  components: {
    Group,
    Cell,
    XButton,
    Popup,
    Selector,
    XInput,
    hasNoStudent,
    changeClass
  },
  data() {
    return {
      changePasswordData: {},
      myStudentPopup: false,
      addStudentPopup: false,
      inviteParentPopup: false,
      changePasswordPopup: false,
      classListPopup: false,
      parentTypeList: [
        { key: 1, value: "爸爸" },
        { key: 2, value: "妈妈" },
        { key: 3, value: "爷爷" },
        { key: 4, value: "奶奶" },
        { key: 5, value: "家人" }
      ],
      addStudentData: {
        truename: "",
        student_id: "",
        type: 0
      },
      allStudentData: [],
      Invitedata: {},
      userface: require("@/assets/face/bw.jpg")
    };
  },
  computed:{
    data(){
      return this.$store.state.currentUser
    }
  },
  methods: {
    skip(link) {
      if(link){
        this.$router.push(link)
      }
      this.$router.animate = 1
    },
    changePassword() {
      if (
        !this.changePasswordData.oldpwd |
        !this.changePasswordData.newpwd |
        !this.changePasswordData.newpwd2
      ) {
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: "数据不完整"
        });
      } else if (
        this.changePasswordData.newpwd != this.changePasswordData.newpwd2
      ) {
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: "两次输入的新密码不一致"
        });
      } else {
        this.$API.changePassword(this.changePasswordData).then(res => {
          this.$vux.toast.show({
            type: "success",
            width: "20em",
            text: "修改成功,请重新登录"
          });
          this.$store.commit("logout");
          this.$router.push("/login");
        });
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$vux.toast.show({
        type: "text",
        text: "退出成功"
      });
      this.$router.push("/");
    },
    getData(){
      // this.data = this.$store.state.currentUser;
      if (this.data.ExtendInfo.Students != null) {
        if (this.data.ExtendInfo.Students.length == 0) {
          let noStudentDate = {
            TrueName: "null",
            SchoolName: "null",
            ClassName: "null",
            StudentID: "null"
          };
          this.allStudentData.push(noStudentDate);
        } else {
          let num = this.data.ExtendInfo.Students.length;
          this.allStudentData = [];
          for (let i = 0; i < num; i++) {
            this.allStudentData.push(this.data.ExtendInfo.Students[i]);
          }
          this.$store.commit(
            "changeCurrentStudent",
            this.allStudentData[0]
          );
        }
      }
      this.mobilePhone = this.data.Mobilephone;
    },
    // getData() {
    //   this.$API
    //     .getCurrentUser()
    //     .then(res => {
    //       this.data = this.$store.state.currentUser;
    //       if (res.ExtendInfo.Students != null) {
    //         if (res.ExtendInfo.Students.length == 0) {
    //           let noStudentDate = {
    //             TrueName: "null",
    //             SchoolName: "null",
    //             ClassName: "null",
    //             StudentID: "null"
    //           };
    //           this.allStudentData.push(noStudentDate);
    //         } else {
    //           let num = res.ExtendInfo.Students.length;
    //           this.allStudentData = [];
    //           for (let i = 0; i < num; i++) {
    //             this.allStudentData.push(res.ExtendInfo.Students[i]);
    //           }
    //           this.$store.commit(
    //             "changeCurrentStudent",
    //             this.allStudentData[0]
    //           );
    //         }
    //       }
    //       this.mobilePhone = res.Mobilephone;
    //     })
    //     .catch(err => {
    //       this.$vux.toast.show({
    //         type: "text",
    //         text: "您还未登录",
    //         width: "20em"
    //       });
    //       this.$router.push("/login");
    //     });
    // },
    addStudent() {
      if (this.addStudentData.truename && this.addStudentData["student_id"]) {
        this.$API
          .addStudent(this.addStudentData)
          .then(res => {
            this.$vux.toast.show({
              type: "text",
              width: "20em",
              text: "绑定成功"
            });
            this.getData();
            this.addStudentPopup = false;
          })
          .catch(err => {
            this.$vux.toast.show({
              type: "text",
              width: "20em",
              text: "绑定失败"
            });
          });
      } else {
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: "请完善数据"
        });
      }
    },
    inviteParent() {
      if (!this.Invitedata.MobilePhone) {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: "请填写手机号！"
        });
      } else if (!this.Invitedata.truename) {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: "请填写真实姓名！"
        });
      } else if (!this.Invitedata.type) {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: "请选择身份！"
        });
      } else {
        this.Invitedata.student_id = this.$store.state.currentStudent.StudentID;
        this.Invitedata.student_meid = this.$store.state.currentStudent.Meid;
        this.$API
          .inviteParent(this.Invitedata)
          .then(res => {
            this.$vux.toast.show({
              type: "success",
              width: "20em",
              text: "绑定成功~！"
            });
            this.InviteParent = false;
            this.Invitedata = {
              MobilePhone: "",
              truename: "",
              type: ""
            };
          })
          .catch(err => {
            this.$vux.toast.show({
              type: "warn",
              width: "20em",
              text: err.msg
            });
          });
      }
    }
  },
  created() {
    this.$store.dispatch('getCurrentClassInfo')
    this.$store.commit("changeTitle", "个人中心");
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.user-header {
  text-align: center; // background: linear-gradient(right top, #00c0a1, #00c06f);
  background: url(../../assets/home_bg.png) center;
  background-size: 100% 100%;
  color: #fff; // position: relative;
  padding: 10px 0;
  img {
    width: 4rem;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
  }
  .usename {
    font-size: 1.2rem;
  }
  .bottomnav {
    // position: absolute;
    // bottom:0;
    // width:100%;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    margin-top: 10px; // vertical-align: bottom;
    height: 24px;
    line-height: 32px;
    span:nth-child(1) {
      float: left;
      width: 50%;
    }
    span:nth-child(2) {
      float: right;
      width: 50%;
    }
  }
  .bottomnav:after {
    content: "";
    display: block;
    position: relative;
    width: 1px;
    height: 2.2rem;
    background: rgba(255, 255, 255, 0.3);
    top: 0;
    left: 50%;
  }
}

.exitbtn {
  .btn {
    display: block;
    text-align: center;
    background: #fff;
    padding: 0.5em;
    color: @main;
    font-size: 1.2em;
    border-top: 1px solid @border;
    border-bottom: 1px solid @border;
  }
}

.iconfont {
  color: @main;
  font-size: 1.2em;
  margin-right: 0.5em;
}

.popup {
  width: 95%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  padding: 10px 0;
  margin-bottom: 10px;
}

</style>
