<template>
  <div class="hello">
  
    <group title="" labelWidth="6em">
      <!-- <selector title="类别：" placeholder="请选择类别" direction="right" v-model="data.type" :options="categoryList"></selector> -->

      <x-textarea v-model="data.content"  placeholder="有什么新鲜事？" autosize></x-textarea>

      <div class="file" style="text-align:center">
        <!-- <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/*" multiple="multiple" id="imgFiles" @change="addImg"> 上传图片
        </a> -->
        <ul class="imgPreviewContainer" v-if="showupDataImg">
          <li class="imgPreview" v-for="(i,index) in upImgUrls" :key="index">
            <div class="deleteImg" @click="deleteImg(index)">
                <span class="iconfont">&#xe630;</span>
            </div>
            <img :src="i.src" class="preview-img" @click="show(index)">
          </li>
          <div>
            <previewer :list="upImgUrls" ref="previewer"></previewer>
          </div>
          <li class="updataImg a-upload">
            <i class="iconfont">&#xe613;</i>
            <input type="file" accept="image/*" multiple="multiple" ref="img" id="imgFiles" @change="addImg">
          </li>
          <li href="javascript:;" class="a-upload updataImg" v-if="showVideoBtn">
            <i class="iconfont">&#xe705;</i>
           <!-- <input type="file" accept="video/*" capture="camcorder" multiple="multiple" id="videoFile" @change="addVideo"> 上传视频 -->
           <input type="file" accept="video/*" multiple="multiple"  ref="video" id="videoFile" @change="addVideo">
        </li>
        </ul>
      </div>
      <div v-if="hasLoadVideo"  id="updataVideo">
        <p>
          <span class="videoName">{{hasLoadVideoName}}  <i class="iconfont" style="height:24px" @click="removeVideo">&#xe641;</i></span>
        </p>
      </div>
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
      <x-button @click.native="addNewPost" :disabled="!canPost" type="primary">确认发布</x-button>
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
  Checklist,
  Previewer,
  TransferDom 
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
    Checklist,
    Previewer,
    TransferDom 
  },
  data() {
    return {
      data: {
        type: 1,
        content: "",
        at_meid: [],
        videoid: "",
        img_url_list:[]
      },
      upImgUrls: [],
      showStudent: false,
      choiceStudent: false,
      categoryList: [
        { key: "1", value: "班级动态" },
        { key: "2", value: "班级新闻" },
        { key: "3", value: "班级通知" },
        { key: "4", value: "班级作业" }
      ],
      showupDataImg: true,
      showVideoBtn: true,
      studentList: [],
      hasLoadVideo:false,
      hasLoadVideoName:''
      
    };
  },
  computed: {
    
    //发布验证
    canPost(){
        if(this.data.content){
        return true;
      }else{
        return false;
      }
    }
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    },
    removeVideo(){
      this.showupDataImg=true;
      this.showVideoBtn=true;
      this.hasLoadVideo=false;
      this.data.videoid='';
      this.hasLoadVideoName='';
    },
    //图片加载前检测
    beforePictureUpload(file) {
      // console.log(file)
      let isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // let isNumOk = filelist.file.length<10?true:false;
      //const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$vux.toast.text("上传图片只能是 JPG或PNG 格式");
      }
      //if (!isLt5M) {
      // this.$vux.toast.text('上传图片大小不能超过 5MB!');
      //}
      return isJPG; //&& isLt5M;
    },
    //视频上传前检测
    beforeVideoUpload(file){
      //限制20m
      let isSizeOk=file.size<20*1024*1024?true:false
      if(!isSizeOk){
        this.$vux.toast.text("视频不能超过20M!");
      }
      //限制视频格式
      let isTypeOk=file.type.indexOf('video');
      
      if(isTypeOk==-1){
        this.$vux.toast.text("视频格式错误!");
        isTypeOk=false;
      }else{
        isTypeOk=true;
      }
      return  isSizeOk&&isTypeOk
    },
 //自动获取图片base64,并上传阿里云
    addImg() {
      let files=this.$refs.img.files
      for(let attr in files){
        if(!isNaN(attr)){
          let file=files[attr]
          if(!this.beforePictureUpload(file)){
          this.$refs.img.value = null;
          return
        }
        this.showVideoBtn=false
        
        //读取base64编码   
        lrz(file, { quality: file.size > 1024 * 200 ? 0.7 : 1 })
          .then(rst => {
            let para = {
              b64str: [{
                Value: rst.base64,
                ID: file.lastModified
              }]
            };
            if(this.upImgUrls.length>=9){
              this.$vux.toast.text("图片数量不能超过9张!");
              return
            }
            this.upImgUrls.push({ src: require('@/assets/img/loading.gif'),state:0 });

            let currentIndex= this.upImgUrls.length-1
            this.$API.postDynamicImg(para).then(res => {
                this.upImgUrls[currentIndex].src=res[file.lastModified] 
                this.upImgUrls[currentIndex].state=1     //1表示此图片上传完成
                this.$refs.img.value = null;    //清空上传控件
              }).catch((error)=>{
                this.upImgUrls.splice(currentIndex,1)
                this.$vux.toast.text(error)
              });
          })
        }
        
      } 
    },
    //自动获取图片base64,并上传阿里云
    // addImg() {
    //   console.log( this.$refs.img.files)
    //   let file = this.$refs.img.files[0];
    //   if(!this.beforePictureUpload(file)){
    //     this.$refs.img.value = null;
    //     return
    //   }
    //   this.showVideoBtn=false
    //   if(this.upImgUrls.length>=9){
    //     this.$vux.toast.text("图片数量不能超过9张!");
    //     return
    //   }
    
    //   //读取base64编码   
    //   lrz(file, { quality: file.size > 1024 * 200 ? 0.7 : 1 })
    //     .then(rst => {
    //       let para = {
    //         b64str: [{
    //           Value: rst.base64,
    //           ID: file.lastModified
    //         }]
    //       };
    //       this.upImgUrls.push({ src: require('@/assets/img/loading.gif'),state:0 });
    //       this.$API.postDynamicImg(para).then(res => {
    //           this.upImgUrls[this.upImgUrls.length-1].src=res[file.lastModified] 
    //           this.upImgUrls[this.upImgUrls.length-1].state=1     //1表示此图片上传完成
    //           this.$refs.img.value = null;    //清空上传控件
    //         }).catch((error)=>{
    //           this.upImgUrls.pop()
    //           this.$vux.toast.text(error)
    //         });
    //     })
    // },
    deleteImg(val) {
      for (let i = 0; i < this.upImgUrls.length; i++) {
        if (i == val) {
          this.upImgUrls.splice(i, 1);
        }
        if(this.upImgUrls.length==0){
          this.showVideoBtn=true;
        }
      }
    },
    // 获取学生列表
    getStudentList() {
      this.$API
        .getStudentList(this.$store.state.currentClassId)
        .then(res => {
          this.studentList = res.map(element => {
            return {
              key: element.Meid,
              value: element.NickName
            };
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    selectStudent() {
      if (this.showStudent) {
        this.choiceStudent = true;
      } else {
        this.data.at_meid = [];
        this.choiceStudent = false;
      }
    },
    
    addNewPost() {
      if(this.upImgUrls.find((el)=>el.state===0)){
        this.$vux.toast.text("正在上传图片,请稍后");
        return
      }
      if (
        this.$store.state.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        this.data.student_meid = this.$store.state.currentStudentId;
      }
      this.data.cid = this.$store.state.currentClassId;
      Array.forEach(this.upImgUrls,el => {
        this.data.img_url_list.push(el.src)
      });
      if (this.data.type != null && this.data.content != "") {
        this.$vux.loading.show({
          text: "上传中~",
          width: "20em"
        });
        if (this.data.videoid) {
          this.data.img_base64_list = "";
        }
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
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let vue_this = this;
      let file = files[0];
      if(!this.beforeVideoUpload(file)){
        this.$refs.video.value = null;    //清空上传控件
        return
      }
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
            vue_this.hasLoadVideoName=uploadInfo.file.name
            vue_this.hasLoadVideo=true;
            vue_this.showVideoBtn = false;
            vue_this.showupDataImg = false;
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
        var userData =
          '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
        uploader.addFile(file, null, null, null, userData);
        uploader.startUpload();
      });
      this.$vux.loading.show({ text: "上传中..." });
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
    this.getStudentList();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.file {
  text-align: center;
  border-top: 1px solid @border;
  padding: 10px 0;
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
#updataVideo{
  text-align:left;
  padding: 0 10px;
  margin-bottom:10px;
  .videoName{
    color: @grey;
    word-break: break-all;
    text-align: left;
  }
  i{
    display: inline-block;
    color:red;
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
  flex-flow: wrap;
  .updataImg {
    border: 1px dashed #c8c8c8;
    flex-basis: 23%;
    // height: 96px;
    min-height: 80px;
    // line-height: 96px;
    margin: 0.4%;
    border-radius: 6px;
    position: relative;
    .iconfont {
      position: absolute;
      font-size: 28px;
      opacity: 0.4;
      top: 50%;
      left: 50%;
      margin-left: -14px;
      margin-top: -24px;
    }
  }
  .imgPreview {
    position: relative;
    border: 1px solid @border;
    flex-basis: 23%;
    max-height: 100px;
    margin: 0.4%;
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
      opacity: 0.4;
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
      object-fit: cover;
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
