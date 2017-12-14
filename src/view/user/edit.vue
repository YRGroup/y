<template>
  <div class="hello">

    <group>
      <cell title="手机号" v-model="data.Mobilephone" text-align="right" placeholder="请在此填上新内容"></cell>
      <x-input title="姓名" v-model="data.TrueName" text-align="right" placeholder="请输入姓名"></x-input>
      <checker class="checker" v-model="data.Sex" default-item-class="checker-item" selected-item-class="checker-item-selected">
        <div class="title">性别</div>
        <div style="text-align:right">
          <checker-item value="男">男</checker-item>
          <checker-item value="女">女</checker-item>
        </div>
      </checker>
      <cell title="头像" class="greatPic">
        <img :src="data.Headimgurl">
      </cell>
      <div class="file" style="text-align:center">
        <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/*" ref="headImg" @change="addHeadImg"> 上传头像
        </a>
      </div>
    </group>

    <div v-if="$store.getters.isTeacher">
      <group title="教师资料：">
        <x-input title="身份证" v-model="data.IDCard" text-align="right" placeholder="请输入身份证"></x-input>
        <selector title="民族" :options="$store.state.nationList" v-model="data.Volk" text-align="right"></selector>
        <selector title="政治面貌" :options="$store.state.politicalList" v-model="data.PoliticalStatus"></selector>
        <x-input title="教龄" v-model="data.SchoolAge" text-align="right"></x-input>
        <x-input title="职称" v-model="data.Title" text-align="right"></x-input>
        <cell title="当前学科" v-model="data.Course"></cell>
      </group>

      <group :title="'教学经历'+(index+1)+'：'" v-for="(i,index) in data.TeachExperience" :key="index">
        <x-input title="任职学校" v-model="i.SchoolName" text-align="right"></x-input>
        <cell title="执教时间">{{i.StartTime}} - {{i.EndTime}}</cell>
        <datetime v-model="i.StartTime" title="选择开始时间"></datetime>
        <datetime v-model="i.EndTime" title="选择结束时间"></datetime>
        <!-- <checker class="checker" v-model="i.IsVisible" default-item-class="checker-item" selected-item-class="checker-item-selected">
          <div class="title">权限</div>
          <div style="text-align:right">
            <checker-item value="false">公开</checker-item>
            <checker-item value="true">不公开</checker-item>
          </div>
        </checker> -->
        <cell text-alien="center" title="删除此条教学经历" is-link @click.native="data.TeachExperience.splice(index,1)"></cell>
      </group>

      <group :title="'个人荣誉'+(index+1)+'：'" v-for="(i,index) in data.PersonalHonor" :key="index">
        <cell title="图片" class="greatPic">
          <img :src="i.ImgPath" style="width:100px;">
        </cell>
        <div class="file" style="text-align:center">
          <a href="javascript:;" class="a-upload">
            <input type="file" accept="image/*" :ref="'honor'+index" @change="addImg(index)"> 选择图片
          </a>
        </div>
        <x-input title="描述" v-model="i.Description" text-align="right"></x-input>
        <!-- <checker class="checker" v-model="i.IsVisible" default-item-class="checker-item" selected-item-class="checker-item-selected">
          <div class="title">权限</div>
          <div style="text-align: right;">
            <checker-item value="false">公开</checker-item>
            <checker-item value="true">不公开</checker-item>
          </div>
        </checker> -->
        <cell title="删除此条个人荣誉" is-link @click.native="data.PersonalHonor.splice(index,1)"></cell>
      </group>

      <group class="btn">
        <flexbox>
          <flexbox-item>
            <x-button plain type="primary" @click.native="data.PersonalHonor.push({ImgPath:'',Description:'',IsVisible:'true'})">添加个人荣誉</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button plain type="primary" @click.native="data.TeachExperience.push({IsVisible:'true'})">添加教学经历</x-button>
          </flexbox-item>
        </flexbox>
      </group>

    </div>

    <div v-if="$store.getters.isParent && !$store.state.hasNoStudent">
      <group title="学生资料：">
        <selector title="家长身份" :options="parentTypeList" v-model="ParentType"></selector>
        <cell title="姓名" v-model="studentData.TrueName" text-align="right" placeholder="请输入姓名"></cell>
        <cell title="学号" v-model="studentData.StudentID" text-align="right" placeholder="请输入学号"></cell>
        <x-input title="学籍号" v-model="studentData.nationid" text-align="right" placeholder="请输入学籍号"></x-input>
        <x-address title="籍贯" v-model="addr" :list="addrData" @on-hide="updateAddr"></x-address>
        <checker class="checker" v-model="studentData.Sex" default-item-class="checker-item" selected-item-class="checker-item-selected">
          <div class="title">性别</div>
          <div style="text-align:right">
            <checker-item value="男">男</checker-item>
            <checker-item value="女">女</checker-item>
          </div>
        </checker>
        <selector title="民族" :options="$store.state.nationList" v-model="studentData.Volk"></selector>
      </group>
      <div class="tips">更多资料请用电脑登录修改</div>
    </div>

    <group class="btn">
      <x-button type="primary" @click.native="submitChange">保存</x-button>
    </group>

  </div>
</template>

<script>
import { Group, Cell, XButton, XInput, Selector, Checker, CheckerItem, Datetime, Flexbox, FlexboxItem, XAddress } from 'vux'
import AddressData from '@/assets/address.js'

export default {
  name: 'edit',
  components: {
    Group, Cell, XButton, XInput, Selector, Checker, CheckerItem, Datetime, Flexbox, FlexboxItem, XAddress
  },
  data() {
    return {
      parentTypeList: [
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
        { key: 3, value: '爷爷' },
        { key: 4, value: '奶奶' }
      ],
      addStudentData: {},
      studentData: {},
      courseList: [
        '语文', '数学', '英语', '物理', '化学', '历史', '政治', '地理',
        '音乐', '美术', '体育'
      ],
      ParentType: '1',
      data: {
        Course: '',
        Headimgurl: '',
        Mobilephone: '',
        IDCard: '',
        Sex: '',
      },
      addr: [],
      addrData: AddressData
    }
  },
  methods: {
    getData() {
      if (this.$store.getters.isTeacher) {
        this.$API.getTeacherInfo(this.$store.state.currentUserId).then(res => {
          this.data = res
          if (this.data.PersonalHonor.length) {
            this.data.PersonalHonor.forEach(o => {
              o.IsVisible = 'true'
            })
          }
          if (this.data.TeachExperience.length) {
            this.data.TeachExperience.forEach(o => {
              o.IsVisible = 'true'
            })
          }
        })
      } else {
        this.$API.getCurrentUser().then(res => {
          this.data = res
          console.log(res)
          if (!this.data.ExtendInfo.Students) {
            this.noStudent = true
          } else {
            this.noStudent = false
            this.ParentType = this.data.ExtendInfo.Students[0].ParentType.toString()
            this.$API.getStudentInfo(this.$store.state.currentStudentId).then(res => {
              this.studentData = res.user
            })
          }
        })
      }
    },
    addHeadImg() {
      let files = this.$refs.headImg.files
      this.$API.uploadImg(files).then(res => {
        this.data.Headimgurl = res[0] + '?x-oss-process=style/f300'
      })
    },
    addImg(index) {
      let files = this.$refs['honor' + index][0].files
      this.$API.uploadImg(files).then(res => {
        this.data.PersonalHonor[index].ImgPath = res[0] + '?x-oss-process=style/f300'
      })
    },
    addStudent() {
      this.$API.addStudent(this.addStudentData).then((res) => {
        this.$vux.toast.show({
          type: "success",
          width: "20em",
          text: '添加学生成功'
        })
      }).catch((err) => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: '添加学生失败'
        })
      })
    },
    submitChange() {
      if (this.$store.getters.isParent) {
        let editData = {}
        editData.ParentType = this.ParentType
        editData.meid = this.$store.state.currentUserId
        editData.TrueName = this.data.TrueName
        this.$API.editParentInfo(editData).then(res => {
          this.$API.editStudentInfo(this.studentData).then(res => {
            this.$vux.toast.show({
              type: "success",
              width: "20em",
              text: '修改资料成功'
            })
            this.$router.push('/user')
          }).catch((err) => {
            this.$vux.toast.show({
              type: "warn",
              width: "20em",
              text: err.msg
            })
          })
        }).catch((err) => {
          this.$vux.toast.show({
            type: "warn",
            width: "20em",
            text: err.msg
          })
        })
      } else if (this.$store.getters.isTeacher) {
        this.$API.editTeacherInfo(this.data).then((res) => {
          this.$vux.toast.show({
            type: "success",
            width: "20em",
            text: '修改老师资料成功'
          })
          this.$router.push('/user')
        }).catch((err) => {
          this.$vux.toast.show({
            type: "warn",
            width: "20em",
            text: err.msg
          })
        })
      }
    },
    updateAddr(val) {
      if (val) {
        this.studentData.Province = this.addrData.find(o => { return o.value === this.addr[0] }).name
        this.studentData.City = this.addrData.find(o => { return o.value === this.addr[1] }).name
        this.studentData.County = this.addrData.find(o => { return o.value === this.addr[2] }).name
      }
    }
  },
  created() {
    this.$store.commit('changeTitle', '完善资料')
    this.getData()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.user-header {
  text-align: center;
  height: 8em;
  background: linear-gradient(right top, #00c0a1, #00c06f);
  background-size: 100% 100%;
  color: #fff;
  position: relative;
  padding: 1rem;
  img {
    width: 5rem;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
  }
  .btn {
    position: absolute;
    right: 5px;
    top: 50%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 5px 10px;
  }
}

.btn {
  padding: 10px 20px;
}

.popup {
  width: 95%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  padding: 10px 0;
  margin-bottom: 10px;
}

.checker {
  text-align: center;
  border-top: 1px solid @border;
  margin-left: 1rem;
  padding: 0.8em 0;
  .title {
    float: left;
  }
  .checker-item {
    border: 1px solid @border;
    padding: 0 7px;
    width: 45px;
    border-radius: 15px;
    margin: 0 15px;
    text-align: center;
  }
  .checker-item-selected {
    border: 1px solid @main;
    background: @main;
    color: #fff;
  }
}

.file {
  text-align: center;
  border-top: 1px solid @border;
  padding: 10px 0 5px;
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
  }
  .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }
  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
  }
}

.tips {
  text-align: center;
  line-height: 30px;
  color: @grey;
}
</style>
