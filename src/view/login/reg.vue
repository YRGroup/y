<template>
  <div class="register">
  
    <div class="space">
      <img :src="logo">
    </div>
  
    <div class="roleChoice" v-show="step==1&&step<5">
      <p class="title">老师向左、家长向右</p>
      <div class="checker">
        <div class="check">
          <img :src="check1" @click="data.role='3'" :class="(data.role=='3')?'active':null">
        </div>
        <div class="check">
          <img :src="check2" @click="data.role='2'" :class="(data.role=='2')?'active':null">
        </div>
      </div>
      <group class="regBtn" :class="(!data.role)?'hidden':null">
        <x-button type="primary" @click.native="step=2" :disabled="data.role==''" :text="(!data.role)?'请先选择身份':'下一步'"></x-button>
      </group>
    </div>
  
    <div v-show="step>=2&&step<5">
      <group class="item">
        <x-input class="itemList" title="手机号" placeholder="请输入手机号" :show-clear="true" required is-type="china-mobile" ref="mobilephone" keyboard="number" v-model="data.phone" @on-change="verifyTel">
        </x-input>
      </group>
      <div style="padding:2rem;" v-show="!hasGetSms">
        <x-button type="primary" @click.native="getSms">获取验证码</x-button>
      </div>
    </div>

    <div v-show="step>=3&&step<5">
      <group class="item">
        <x-input class="itemList" title="验证码" placeholder="请输入短信验证码" :show-clear="false" required keyboard="number" v-model="data.code" >
        </x-input>
        <x-input class="itemList" title="密码" placeholder="请设置密码（6-16位字符）" :show-clear="false" required type="password" keyboard="number" v-model="data.password" @keyup.enter.native="submit">
        </x-input>
      </group>
      <div style="padding:2rem;">
        <x-button type="primary" @click.native="submit">注册</x-button>
      </div>
    </div>
  
    <group v-show="step>=4&&step<5" class="regBtn" :class="(!data.phone|!data.password)?'hidden':null">
      <x-button type="primary" @click.native="submit">注册</x-button>
    </group>
  
    <div class="endReg" v-show="step==5">
      <div class="successInfo">
        <p class="title">您的登陆账号：</p>
        <p class="content">{{data.phone}}</p>
      </div>
      <div class="btn">
        <x-button type="primary" @click.native="enter">进入主页</x-button>
        <x-button type="warn" @click.native="editMore">完善资料</x-button>
      </div>
    </div>
  
    <div class="moreReg" v-show="step==6">
      <group>
        <x-input title="姓名" placeholder="请输入您的真实姓名" v-model="moreData.TrueName"></x-input>
        <div class="face">
          <div class="headImg">
            <a href="javascript:;" class="a-upload">
              <input type="file" ref="headImg" accept="image/jpeg,image/png" @change="addImg">
              <span v-show="!headImg">选择头像</span>
              <span v-show="headImg">修改头像</span>
            </a>
          </div>
          <div class="preview">
            <img :src="headImg">
          </div>
        </div>
      </group>
  
      <group title="添加学生" titleColor="#fff">
        <x-input title="姓名" v-model="addStudentData.truename" placeholder="学生姓名"></x-input>
        <x-input title="学号" v-model="addStudentData.student_id" placeholder="学生学号"></x-input>
        <div class="checker">
          <checker v-model="addStudentData.type" default-item-class="checker-item" selected-item-class="checker-selected">
            <checker-item v-for="(i,index) in parentType" :key="index" :value="i.key">{{i.value}}</checker-item>
          </checker>
        </div>
      </group>
  
      <group>
        <x-button type="primary" @click.native="submitMore">提交</x-button>
      </group>
    </div>
  
  </div>
</template>

<script>
import { XButton, XInput, Group, Radio, Checker, CheckerItem } from 'vux'

export default {
  components: {
    XButton, XInput, Group, Radio, Checker, CheckerItem
  },
  data() {
    return {
      logo: require('@/assets/logo/logo.png'),
      check1: require("@/assets/face/bw.jpg"),
      check2: require("@/assets/face/tc.png"),
      data: {
        role: '', phone: '', password: ''
      },
      rolecheck: [
        { key: 1, value: '学生' },
        { key: 2, value: '家长' },
        { key: 3, value: '老师' }
      ],
      parentType: [
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
      ],
      step: 1,
      hasGetSms: false,
      moreData: {},
      addStudentData: {},
      headImg: '',
    }
  },
  computed: {

  },
  methods: {
    verifyTel() {
      if (!this.$refs.mobilephone.valid) {
        this.hasGetSms=false
        this.step=2
      }else{
      }
    },
    verifyPw() {
      if (this.data.password.length > 5) {
        if (this.step < 4) {
          this.step = 4
        }
      } else {
        this.step = 3
      }
    },
    getSms() {
      if(this.$refs.mobilephone.valid){
        this.$API.getRegSms(this.data.phone).then(res => {
          this.$vux.toast.show({
            type: "success",
            text: '获取验证码成功，请查收短信',
            width: '20em',
            time: '1000'
          })
          this.step=3
          this.hasGetSms = true
        }).catch(err => {
          this.$vux.toast.show({
            type: "warn",
            text: err.msg,
            width: '20em'
          })
        })
      }else{
        this.$vux.toast.show({
          type: "warn",
          text: '手机号格式不正确',
          width: '20em'
        })
      }
    },
    submit() {
      if (!this.$refs.mobilephone.valid) {
        this.$vux.toast.show({
          type: "warn",
          text: '手机号格式不正确',
          width: '20em'
        })
      } else if (this.data.password.length > 16) {
        this.$vux.toast.show({
          type: "warn",
          text: '密码不能大于16位',
          width: '20em'
        })
      } else {
        this.$API.userReg(this.data).then(res => {
          this.$vux.toast.show({
            type: "success",
            text: '注册成功',
            width: '20em',
            time: '1000'
          })
          this.login()
          this.step = 5
        }).catch(err => {
          this.$vux.toast.show({
            type: "warn",
            text: err.msg,
            width: '20em'
          })
        })
      }
    },
    submitMore() {
      this.moreData.Headimgurl = this.headImg
      if (!this.moreData.TrueName) {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: '姓名不能为空'
        })
      } else {
        if (this.moreData.Role == '家长') {
          this.$API.editParentInfo(this.moreData).then((res) => {
            this.$API.addStudent(this.addStudentData).then(res => {
              this.$vux.toast.show({
                type: "success",
                width: "20em",
                text: '添加资料成功'
              })
              this.$router.push('/main')
            })
          })
        } else if (this.moreData.Role == '老师') {
          this.$API.editTeacherInfo(this.moreData).then((res) => {
            this.$vux.toast.show({
              type: "success",
              width: "20em",
              text: '添加资料成功'
            })
            this.$router.push('/user')
          })
        }
      }
    },
    enter() {
      this.$router.push('/main')
    },
    login() {
      let logData = {}
      logData.phone = this.data.phone
      logData.password = this.data.password
      this.$store.dispatch('login', logData).then(res => {
        this.moreData.Meid = res.Meid
        this.moreData.Sex = res.Sex
        this.moreData.TrueName = res.TrueName
        this.moreData.Headimgurl = res.Headimgurl
        this.moreData.Role = res.Role
      })
    },
    editMore() {
      this.step = 6
    },
    addImg() {
      let imgFile = this.$refs.headImg.files[0]
      this.$vux.loading.show({
        text: 'Loading'
      })
      let imgPostData = []
      imgPostData[0] = imgFile
      this.$API.uploadImg(imgPostData).then((res) => {
        this.headImg = res[0]
        this.$vux.loading.hide()
      }).catch((err) => {
        this.$vux.loading.hide()
      })
    },
  },
  created() {
    this.$store.commit('changeTitle', '注册')
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.register {
  padding: 0 2em;
  height: 100vh; // background-image: url('../../assets/img/bg1.jpg');
  background: @c3;
  background-position: center;
  .space {
    text-align: center;
    padding-top: 20px;
    img {
      height: 150px;
    }
  }
  .item {
    .weui-cells {
      margin-top: 0;
    }
    .itemList {
      border: 1px solid @cc4;
      border-radius: 5px;
      img {
        vertical-align: middle;
      }
    }
    .active {
      border: 1px solid red;
    }
  }
}

.roleChoice {
  width: 100%;
  .title {
    color: @c6;
    font-size: 1.5rem;
    text-align: center;
  }
  .checker {
    text-align: center;
    .check {
      display: inline-block;
      width: 40%;
      img {
        width: 70%;
        max-height: 120px;
        border-radius: 50%;
        margin: 20px;
        border: 3px solid @c4;
      }
      .active {
        border: 3px solid @c6;
      }
    }
  }
}

.endReg {
  .successInfo {
    padding: 2rem;
    background: @c1;
    text-align: center;
    border-radius: 10px;
    .title {
      font-size: 1.5rem;
      line-height: 2.5rem;
    }
    .content {
      margin: 1rem 0;
      line-height: 2rem;
      background: @c2;
    }
  }
}

.btn {
  padding: 2rem;
}

.moreReg {
  .checker {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid @c2;
    border-bottom: 1px solid @c2;
    .checker-item {
      cursor: pointer;
      background: @c4;
      color: #fff;
      margin: 0 1rem;
      padding: 0 1rem;
    }
    .checker-selected {
      background: @c6;
    }
  }
  .face {
    text-align: center;
    border-top: 1px solid @c2;
    .headImg {
      padding: 0px;
      text-align: center;
      width: 40%;
      display: inline-block;
      height: 70px;
      line-height: 90px;
      .a-upload {
        padding: 4px 10px;
        height: 20px;
        line-height: 20px;
        position: relative;
        cursor: pointer;
        color: #888;
        background: #fafafa;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        display: inline-block;
        input {
          position: absolute;
          font-size: 100px;
          right: 0;
          top: 0;
          opacity: 0;
          filter: alpha(opacity=0);
          cursor: pointer
        }
        &:hover {
          color: #444;
          background: #eee;
          border-color: #ccc;
          text-decoration: none
        }
      }
    }
    .preview {
      vertical-align: top;
      display: inline-block;
      text-align: center;
      height: 70px;
      width: 40%;
      img {
        height: 70px;
      }
    }
  }
}

.regBtn {
  padding: 0 20px;
  .weui-btn {
    background: linear-gradient(right top, #00c0a1, #00c06f);
  }
}

.headImg {
  padding: 30px;
  text-align: center;
  .a-upload {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer
    }
    &:hover {
      color: #444;
      background: #eee;
      border-color: #ccc;
      text-decoration: none
    }
  }
}

.preview {
  text-align: center;
  img {
    height: 200px;
  }
}


.dev {
  color: #fff;
}

.hidden {
  opacity: 0.5;
}
</style>
