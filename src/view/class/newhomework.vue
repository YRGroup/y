<template>
  <div class="hello">

    <group title="发布新的班级作业" labelWidth="4em">
      <cell title="学科：" v-model="course" v-show="notClassAdmin"></cell>
      <selector title="学科：" :options="courseList" v-model="newHomeworkData.course_name" v-show="isClassAdmin"></selector>
      <x-input title="标题：" placeholder="请输入标题" v-model="newHomeworkData.title" show-clear></x-input>
      <!-- <selector v-show='isClassAdmin' title="学科：" :options="courseList" v-model="newHomeworkData.title"></selector> -->
      <!-- <vue-html5-editor class="needsclick" :content="newHomeworkData.content" @change="updateData" :auto-height="true" :height="300"></vue-html5-editor> -->
      <x-textarea title="" v-model="newHomeworkData.content" placeholder="请在此输入内容" autosize></x-textarea>

      <div class="file" style="text-align:center">
        <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/*" multiple="multiple" id="imgFiles" @change="addImg">上传图片
        </a>
        <transition-group name="list" tag="ul" class="imgPreviewContainer">
          <div class="imgPreview" v-for="(i,index) in imgUrls" :key="i.src">
            <div class="deleteImg">
                <span @click="deleteImg(index)">
                  <span class="iconfont">&#xe630;</span>
                </span>
            </div>
            <img :src="i.src" class="preview-img" @click="$preview.open(index, imgUrls)">
          </div>
        </transition-group>
      </div>

    </group>

    <div style="padding:2rem;">
      <x-button @click.native="addHomework" type="primary">发布</x-button>
    </div>

  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Selector, XTextarea } from 'vux'
import lrz from 'lrz'
export default {
  name: 'hello',
  components: {
    XInput, Group, XButton, Cell, Selector, XTextarea
  },
  data() {
    return {
      newHomeworkData: {},
      fileList: [],
      imgUrls: [],
      ClassInfo: {},
      courseList: [],
      notClassAdmin: false
    }
  },
  computed: {
    course: function() {
      if (this.$store.state.currentUser.ExtendInfo.Course.CourseName) {
        return this.$store.state.currentUser.ExtendInfo.Course.CourseName
      }
    },
    isClassAdmin(){
      if(this.$store.state.role=='老师'){
        if(this.ClassInfo.teacher && this.$store.state.currentUser.Meid == this.ClassInfo.teacher.Meid){
          this.notClassAdmin = false
          return true
        }else{
          this.notClassAdmin = true
          return false
        }
      }
    },
    imgBaseList(){
      let arr=[];
      console.log(this.imgUrls)
      this.imgUrls.forEach((n,i)=>{
        arr.push(n.src)
      })
      return arr;
    }
  },
  methods: {
    // 获取班级信息
    getClassInfo () {
        this.$API.getClassInfo(this.$store.state.currentClassId).then(res => {
          this.ClassInfo = res
        })
    },
    // 获取班级信息
    getCourseList () {
        this.$API.getCourseList().then(res => {

          this.courseList = res.map(o => {
            return {
              key: o.CourseName,
              value: o.CourseName
            }
          })
        })
    },
    updateData: function(data) {
      this.newHomeworkData.content = data
    },
    addImg(e) {
      if (this.fileList.length < 9) {
        let imgFiles = document.getElementById('imgFiles').files
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files, e)
        this.$vux.loading.show({
          text: '上传中...'
        })
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '最多上传9张图片',
          width: '20em'
        })
      }
    },
    createImage: function(file, e) {
      let vm = this
      lrz(file[0], { width: 480 }).then(function(rst) {
        let img = new Image();
        img.src = rst.base64;
        img.onload=()=>{
          vm.imgUrls.push({
            src:rst.base64,
            w:img.width,
            h:img.height
          });
        }
        vm.$vux.loading.hide()
        return rst;
      }).always(function() {
        // 清空文件上传控件的值
        e.target.value = null;
      });
    },
    deleteImg(val) {
      for (let i = 0; i < this.imgUrls.length; i++) {
        if (i == val) {
          this.imgUrls.splice(i, 1)
        }
      }
    },
    addHomework() {
      // this.newHomeworkData.course_name = this.course
      if (this.notClassAdmin == true) {
        this.newHomeworkData['course_name'] = this.course
      }
      // this.newHomeworkData['img_url_list'] = this.fileList.join(',')
      this.newHomeworkData['img_base64_list'] = this.imgBaseList.join('|')

      if (!this.newHomeworkData.title) {
        this.$vux.toast.show({
          type: "warn",
          width: '20em',
          text: "请输入标题"
        })
      } else if (!this.newHomeworkData.content) {
        this.$vux.toast.show({
          type: "warn",
          width: '20em',
          text: "请输入内容"
        })
      } else {
        this.newHomeworkData.class_id = this.$store.state.currentClassId
        this.$API.addHomework(this.newHomeworkData).then(res => {
          this.$vux.toast.show({
            type: "success",
            width: '20em',
            text: "发布成功"
          })
          this.$router.push('/class')
        }).catch(err => {
          this.$vux.toast.show({
            type: "warn",
            width: '20em',
            text: err.msg
          })
        })
      }

    }
  },
  created() {
    this.getClassInfo()
    this.getCourseList()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.file {
  text-align: center;
  border-top: 1px solid @border;
  padding: 10px 0;
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

.imgPreviewContainer {
  width: 100%;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*justify-content: center;*/
  margin: 0;
  padding: 0;
  .imgPreview {
    position: relative;
    border: 1px solid @border;
    width: 30%;
    margin: 0 1%;
    float: left;
    height: 130px;
    .deleteImg {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      color: red;
      span {
        cursor: pointer;
      }
    }
    .imgName {
      color: @border;
    }
    img {
      height: 100%;
      width: 100%;
    }
    .iconfont {
      padding:0 0 1em 1em;
    }
  }
}


.popup {
  background: #fff;
  padding: 1rem;
  span {
    margin: 0 3px;
  }
}
</style>
