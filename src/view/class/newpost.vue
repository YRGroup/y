<template>
  <div class="hello">
    <group title="发布动态" labelWidth="6em">
      <!-- <selector title="类别：" placeholder="请选择类别" direction="right" v-model="data.type" :options="categoryList"></selector> -->

      <x-textarea v-model="data.content" placeholder="请输入班级动态" autosize></x-textarea>

      <div class="file" style="text-align:center">
        <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/*" multiple="multiple" id="imgFiles" @change="addImg"> 上传图片
        </a>
          <transition-group name="list" tag="ul" class="imgPreviewContainer">
            <div class="imgPreview" v-for="(i,index) in imgUrls" :key="i.src">
              <div class="deleteImg">
                <span @click="deleteImg(index)">
                  <span class="iconfont">&#xe630;</span>
                </span>
              </div>
              <img :src="i.src" class="preview-img" @click="$preview.open(null,index, imgUrls)">
            </div>
          </transition-group>
      </div>
      <div class="selectStu"></div>

    </group>
    <group>
      <x-switch title="是否@某学生" v-model="showstudent"></x-switch>
      <!-- <selector v-show="showstudent" placeholder="请选择" multiple="multiple" v-model="data.at_meid" title="省份" name="district" :options="studentList"></selector> -->
    </group>
    <div is-transparent>
      <popup v-model="showstudent" position="bottom" max-height="50%" >
          <group>
            <checklist ref="demoObject" title="选择学生" 
            label-position="left" :options="studentList" v-model="data.at_meid"></checklist>
          </group>
      </popup>
    </div>

    <div style="padding:2rem;">
      <x-button @click.native="addNewPost" type="primary">确认发布</x-button>
    </div>

  </div>
</template>

<script>
import {
  XInput,
  Group,
  XButton,
  Cell,
  Selector,
  XTextarea,
  XSwitch,
  Popup,
  Checklist
} from "vux";
import lrz from "lrz";
export default {
  name: "hello",
  components: {
    XInput,
    Group,
    XButton,
    Cell,
    Selector,
    XTextarea,
    XSwitch,
    Popup,
    Checklist
  },
  data() {
    return {
      data: {
        type: 1,
        content: "",
        img_url_list: "",
        img_base64_list: "",
        at_meid:[]
      },
      imgUrls: [],
      fileList: [],
      showstudent: false,
      categoryList: [
        { key: "1", value: "班级动态" },
        { key: "2", value: "班级新闻" },
        { key: "3", value: "班级通知" },
        { key: "4", value: "班级作业" }
      ],
      studentList:[]
    };
  },
  computed: {
    imgBaseList() {
      let arr = [];
      console.log(this.imgUrls);
      this.imgUrls.forEach((n, i) => {
        arr.push(n.src);
      });
      return arr;
    }
  },
  methods: {
    addImg(e) {
      if (this.fileList.length < 9) {
        let imgFiles = document.getElementById("imgFiles").files;
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        console.log(files[0]);
        this.createImage(files, e);
        this.$vux.loading.show({
          text: "上传中..."
        });
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "最多上传9张图片",
          width: "20em"
        });
      }
    },
    deleteImg(val) {
      for (let i = 0; i < this.imgUrls.length; i++) {
        if (i == val) {
          this.imgUrls.splice(i, 1);
        }
      }
    },
    getData() {
      let classId = this.$store.state.currentClassId;
      this.$API.getStudentList(classId).then(res => {
        res.forEach(element => {
          let list = {}
          list.key = element.Meid
          list.value = element.NickName
          this.studentList.push(list)
        })
      });
      console.log(this.studentList)
    },
    createImage: function(file, e) {
      let vm = this;
      console.log(this);
      lrz(file[0], { quality :file[0].size>1024*200?0.7:1  })
        .then(rst => {
          vm.$vux.loading.hide();

          let img = new Image();
          img.src = rst.base64;
          img.onload = () => {
            vm.imgUrls.push({
              src: rst.base64,
              w: img.width,
              h: img.height
            });
          };
          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          e.target.value = null;
        });
    },
    addimgList() {},
    addNewPost() {
      if (
        this.$store.state.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        this.data.student_meid = this.$store.state.currentStudentId;
      }
      this.data.cid = this.$store.state.currentClassId;

      this.data["img_base64_list"] = this.imgBaseList.join("|");
      if (this.data.type != null && this.data.content != "") {
        this.$API.postNewClassDynamic(this.data).then(res => {
          this.$vux.toast.show({
            type: "success",
            text: "发布成功"
          });
          
          this.$router.push("/class");
        });
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "请输入内容",
          width: "20em"
        });
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css";
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
    cursor: pointer;
  }
  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none;
  }
}

.imgPreviewContainer {
  width: 100%;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*justify-content: center;*/
  margin: 0;
  padding: 0;
  overflow: hidden;
  .imgPreview {
    position: relative;
    border: 1px solid @border;
    width: 30%;
    margin: 0 1%;
    height: 130px;
    float: left;
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
      padding: 0 0 1em 1em;
    }
  }
}

.popup {
  background: #fff;
  padding: 1rem;
  max-height: 90vh;
  span {
    margin: 0 3px;
  }
}
</style>
