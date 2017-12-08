<template>
  <div class="hello">
    <group title="" labelWidth="6em">
      <!-- <selector title="类别：" placeholder="请选择类别" direction="right" v-model="data.type" :options="categoryList"></selector> -->

      <x-textarea v-model="data.content" placeholder="请输入班级动态" autosize></x-textarea>

      <div class="file" style="text-align:center">
        <!-- <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/*" multiple="multiple" id="imgFiles" @change="addImg"> 上传图片
        </a> -->
        <ul class="imgPreviewContainer" v-if="showupDataImg">
          <li class="imgPreview" v-for="(i,index) in imgUrls" :key="i.src">
            <div class="deleteImg" @click="deleteImg(index)">
                <span class="iconfont">&#xe630;</span>
            </div>
            <img :src="i.src" class="preview-img" @click="$preview.open(null,index, imgUrls)">
          </li>
          <li class="updataImg a-upload">
            <i class="iconfont">&#xe623;</i>
            <input type="file" accept="image/*" multiple="multiple" id="imgFiles" @change="addImg">
          </li>
        </ul>
        <a href="javascript:;" class="a-upload uploadVideo">
           <input type="file" accept="video/*" capture="camcorder" multiple="multiple" id="videoFile" @change="addVideo"> 上传视频
        </a>
      </div>
      <div class="selectStu"></div>

    </group>
    <group>
      <x-switch title="是否@某学生" v-model="showStudent"  @on-change="selectStudent"></x-switch>
      <!-- <selector v-show="showstudent" placeholder="请选择" multiple="multiple" v-model="data.at_meid" title="省份" name="district" :options="studentList"></selector> -->
    </group>
    <div>
      <popup v-model="choiceStudent" position="bottom" max-height="50%" >
          <group>
            <checklist title="选择学生" 
            label-position="left" :options="studentList" v-model="data.at_meid"></checklist>
            <!-- <div style="padding:20px">
              <x-button @click.native="choiceStudent = false" type="primary">确定</x-button>
              <x-button @click.native="choiceStudent = false,data.at_meid = [],showStudent = false">取消</x-button>
            </div> -->
          </group>
      </popup>
    </div>

    <div style="padding:2rem;">
      <x-button @click.native="addNewPost" type="primary">确认发布</x-button>
    </div>

  </div>
</template>

<script>
require("@/js/aliyun-sdk.min.js");
require("@/js/vod-sdk-upload-1.1.0.min.js");
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
        at_meid: [],
        videoid: ""
      },
      imgUrls: [],
      fileList: [],
      showStudent: false,
      choiceStudent: false,
      categoryList: [
        { key: "1", value: "班级动态" },
        { key: "2", value: "班级新闻" },
        { key: "3", value: "班级通知" },
        { key: "4", value: "班级作业" }
      ],
      studentList: [],
      showupDataImg:true
    };
  },
  computed: {
    imgBaseList() {
      let arr = [];
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
        this.createImage(files, e);
        this.$vux.loading.show({
          width: "20em",
          text: "发送中..."
        });
      } else {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: "最多上传9张图片"
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
    selectStudent() {
      if (this.showStudent) {
        this.choiceStudent = true;
      } else {
        this.data.at_meid = [];
        this.choiceStudent = false;
      }
    },
    getData() {
      let classId = this.$store.state.currentClassId;
      this.$API.getStudentList(classId).then(res => {
        res.forEach(element => {
          let list = {};
          list.key = element.Meid;
          list.value = element.NickName;
          this.studentList.push(list);
        });
      });
    },
    createImage: function(file, e) {
      let vm = this;
      lrz(file[0], { quality: file[0].size > 1024 * 200 ? 0.7 : 1 })
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
        this.$vux.loading.show({
          text: "上传中~",
          width: "20em"
        });
        if(this.data.videoid) {
          this.data.img_base64_list = ''
        }
        console.log(this.data)
        this.$API.postNewClassDynamic(this.data).then(res => {
          this.$vux.loading.hide();
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
    },
    addVideo(e) {
      let imgFiles = document.getElementById("videoFile").files;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let vue_this = this;
      let file = files[0];
      let params = {
        FileName: file.name,
        Title: file.name,
        FileSize: file.size,
        Description: "Description",
        Coverurl: "",
        CateId: 16,
        CourseId: 0,
        Grade: 0,
        Tags: ""
      };
      this.$API.getVideoUploadAuth(params).then(res => {
        this.data.videoid = res.VideoID; //保存视频ID
        //this.log(res);
        var uploader;
        uploader = new VODUpload({
          // 文件上传失败
          onUploadFailed: function(uploadInfo, code, message) {
            vue_this.log(
              "onUploadFailed: file:" +
                uploadInfo.file.name +
                ",code:" +
                code +
                ", message:" +
                message
            );
          },
          // 文件上传完成
          onUploadSucceed: function(uploadInfo) {
            vue_this.log(
              "onUploadSucceed: " +
                uploadInfo.file.name +
                ", endpoint:" +
                uploadInfo.endpoint +
                ", bucket:" +
                uploadInfo.bucket +
                ", object:" +
                uploadInfo.object
            );
            vue_this.$vux.loading.hide();
            vue_this.$vux.toast.show({
              type: "success",
              text: "上传完成"
            });
          },
          // 文件上传进度
          // 'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
          //     vue_this.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
          // },
          onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
            vue_this.log(Math.ceil(uploadedSize * 100 / totalSize));
          },
          // STS临时账号会过期，过期时触发函数
          onUploadTokenExpired: function() {
            vue_this.log("onUploadTokenExpired");
          },
          // 开始上传
          onUploadstarted: function(uploadInfo) {
            var uploadAuth = res.UploadAuth;
            var uploadAddress = res.UploadAddress;
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress
            );

            vue_this.log(
              "onUploadStarted:" +
                uploadInfo.file.name +
                ", endpoint:" +
                uploadInfo.endpoint +
                ", bucket:" +
                uploadInfo.bucket +
                ", object:" +
                uploadInfo.object
            );
          }
        });
        // 点播上传。每次上传都是独立的鉴权，所以初始化时，不需要设置鉴权
        uploader.init();
        var userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
        uploader.addFile(file, null, null, null, userData);
        uploader.startUpload();
      });
      this.$vux.loading.show({text: "上传中..."});
      this.showupDataImg = false
    },
    log(content) {
      if (!isNaN(content)) {
        this.$vux.loading.show({
          text: content + "%"
        });
      }
    }
  },
  created() {
    this.$store.commit("changeTitle", "发布动态");
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.file {
  text-align: center;
  border-top: 1px solid @border;
  padding: 10px 0;
  .uploadVideo{
    margin-top: 20px;
    padding: 5px 20px;
    background: #ddd;
  }
  .a-upload {
    // padding: 4px 10px;
    // height: 20px;
    // line-height: 20px;
    position: relative;
    // cursor: pointer;
    // color: #888;
    // background: #fafafa;
    // border: 1px solid #ddd;
    // border-radius: 4px;
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
  display: flex;
  flex-flow:wrap;
  .updataImg{
    border:1px dashed #c8c8c8;
    flex-basis:23%;
    // height: 96px;
    min-height: 80px;
    // line-height: 96px;
    margin:.4%;
    border-radius: 6px;
    position: relative;
    .iconfont{
      position: absolute;
      font-size: 28px;
      opacity: .4;
      top: 50%;
      left:50%;
      margin-left: -14px;
      margin-top: -24px;
    }
  }
  .imgPreview {
    position: relative;
    border: 1px solid @border;
    flex-basis:23%;
    max-height: 100px;
    margin:.4%;
    float: left;
    border-radius: 6px;
    overflow: hidden;
    .deleteImg {
      width: 34px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      position: absolute;
      background: #000;
      opacity: .4;
      border-radius: 0 0.35em;
      right: 0;
      top: 0;
      font-size: 16px;
      color: #fff;
      span {

      }
    }
    .imgName {
      color: @border;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit:cover;
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
