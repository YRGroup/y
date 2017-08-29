<template>
  <div class="hello">

    <group>
      <cell title="手机号" v-model="data.Mobilephone" text-align="right" placeholder="请在此填上新内容"></cell>
      <x-input title="姓名" v-model="data.TrueName" text-align="right" placeholder="请输入姓名"></x-input>
      <x-input title="身份证" v-model="data.IDCard" text-align="right" placeholder="请输入身份证"></x-input>
      <checker class="checker" v-model="data.Sex" default-item-class="checker-item" selected-item-class="checker-item-selected">
        <checker-item value="男">男</checker-item>
        <checker-item value="女">女</checker-item>
      </checker>
      <cell title="头像" class="greatPic">
        <img :src="data.Headimgurl">
      </cell>
      <div class="file" style="text-align:center">
        <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/*" ref="headImg" @change="addHeadImg"> 选择新头像
        </a>
      </div>
    </group>

    <div v-if="$store.state.role=='老师'">
      <group title="教师资料：">
        <x-input title="民族" v-model="data.Volk" text-align="right"></x-input>
        <x-input title="政治面貌" v-model="data.PoliticalStatus" text-align="right"></x-input>
        <x-input title="教龄" v-model="data.SchoolAge" text-align="right"></x-input>
        <x-input title="职称" v-model="data.Title" text-align="right"></x-input>
        <cell title="当前学科" v-model="data.Course"></cell>
        <!-- <selector title="修改学科" v-model="data.Course" :options="courseList" text-align="right"></selector> -->
      </group>

      <group :title="'教学经历'+(index+1)+'：'" v-for="(i,index) in data.TeachExperience" :key="index">
        <x-input title="任职学校" v-model="i.SchoolName"></x-input>
        <cell title="执教时间">{{i.StartTime}} - {{i.EndTime}}</cell>
        <datetime v-model="i.StartTime" title="选择开始时间"></datetime>
        <datetime v-model="i.EndTime" title="选择结束时间"></datetime>
        <cell title="删除此条教学经历" is-link @click.native="data.TeachExperience.splice(index,1)"></cell>
      </group>

      

      <group :title="'个人荣誉'+(index+1)+'：'" v-for="(i,index) in data.PersonalHonor" :key="index">
        <cell title="图片">
          <img :src="i.ImgPath">
        </cell>
        <div class="file" style="text-align:center">
          <a href="javascript:;" class="a-upload">
            <input type="file" accept="image/*" :ref="'honor'+index" @change="addImg(index)"> 选择图片
          </a>
        </div>
        <x-input title="描述" v-model="i.Description"></x-input>
        <cell title="删除此条教学经历" is-link @click.native="data.TeachExperience.splice(index,1)"></cell>
      </group>

      <group class="btn">
        <flexbox>
          <flexbox-item>
            <x-button plain type="primary" @click.native="data.PersonalHonor.push({})">添加个人荣誉</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button plain type="primary" @click.native="data.TeachExperience.push({})">添加教学经历</x-button>
          </flexbox-item>
        </flexbox>
      </group>

    </div>

    <div v-if="!$store.state.hasNoStudent">
      <group title="学生资料：" v-for="(i,index) in allStudentData" :key="index">
        <cell title="姓名" v-model="i.TrueName" text-align="right" placeholder="请在此填上新内容"></cell>
        <cell title="性别" v-model="i.Sex" text-align="right" placeholder="请在此填上新内容"></cell>
        <cell title="学号" v-model="i.StudentID" text-align="right" placeholder="请在此填上新内容"></cell>
        <cell title="年龄" v-model="i.Age" text-align="right" placeholder="请在此填上新内容"></cell>
        <cell title="家庭住址" v-model="i.Add" text-align="right" placeholder="请在此填上新内容"></cell>
        <cell title="头像" text-align="right" placeholder="请在此填上新内容">
          <img class="headImg" :src="i.Headimgurl" slot="default">
        </cell>
      </group>
    </div>

    <popup v-model="addStudentPopup" is-transparent>
      <div class="popup">
        <group title="添加学生">
          <x-input title="学生ID" v-model="addStudentData.student_meid" text-align="right" placeholder="请在此填上学生ID"></x-input>
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
import { Group, Cell, XButton, XInput, Popup, Selector, Checker, CheckerItem, Datetime, Flexbox, FlexboxItem } from 'vux'

export default {
  name: 'edit',
  components: {
    Group, Cell, XButton, XInput, Popup, Selector, Checker, CheckerItem, Datetime, Flexbox, FlexboxItem
  },
  data() {
    return {
      addStudentPopup: false,
      parentTypeList: [
        { key: 1, value: '爸爸' },
        { key: 2, value: '妈妈' },
        { key: 3, value: '爷爷' },
        { key: 4, value: '奶奶' }
      ],
      addStudentData: {},
      allStudentData: [],
      courseList: [
        '语文', '数学', '英语', '物理', '化学', '历史', '政治', '地理',
        '音乐', '美术', '体育'
      ],
      data: {
        Course: '',
        Headimgurl: '',
        Mobilephone: '',
        IDCard: '',
        Sex: '',
      },
    }
  },
  methods: {
    getData() {
      if (this.$store.state.role == '老师') {
        this.$API.getTeacherInfo(this.$store.state.currentUserId).then(res => {
          this.data = res
        })
      }
      // this.$API.getCurrentUser().then(res => {
      //   this.data = res
      //   if (this.data.ExtendInfo.Students.length == 0) {
      //     this.noStudent = true
      //   } else {
      //     this.noStudent = false
      //     let num = this.data.ExtendInfo.Students.length
      //     for (let i = 0; i < num; i++) {
      //       this.allStudentData.push(res.ExtendInfo.Students[i])
      //     }
      //   }
      // })
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
      if (this.$store.state.role == '家长') {
        let editData = {}
        editData.meid = this.$store.state.currentUserId
        editData.TrueName = this.data.TrueName
        this.$API.editParentInfo(editData).then((res) => {
          this.$vux.toast.show({
            type: "success",
            width: "20em",
            text: '修改家长资料成功'
          })
          this.$router.push('/user')
        }).catch((err) => {
          this.$vux.toast.show({
            type: "warn",
            width: "20em",
            text: '修改家长资料失败'
          })
        })
      } else if (this.$store.state.role == '老师') {
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
            text: '修改老师资料失败'
          })
        })
      }
    }
  },
  created() {
    this.$store.commit('changeTitle', '完善资料')
    this.getData()
    console.log(this.$refs)
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
  .checker-item {
    border: 1px solid @c2;
    padding: 5px 15px;
    width: 40%;
  }
  .checker-item-selected {
    border: 1px solid @c6;
    background: @c6;
    color: #fff;
  }
}

.file {
  text-align: center;
  border-top: 1px solid @cc4;
  padding-top: 5px;
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
</style>
