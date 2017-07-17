<template>
  <div class="hello">
  
    <group title="发布新的班级作业" labelWidth="6em">
      <x-input title="科目："  v-model="course" :disabled="true"></x-input>
      <x-input title="标题：" placeholder="请输入标题" v-model="newHomeworkData.title" show-clear></x-input>
      
      <vue-html5-editor class="needsclick" :content="newHomeworkData.content" @change="updateData" :auto-height="true" :height="300"></vue-html5-editor>
  
      <!--<div class="file" style="text-align:center">
        <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/jpeg,image/png" multiple="multiple" id="imgFiles" @change="addImg"> 点击这里上传图片
        </a>
        <div class="imgPreviewContainer">
          <div class="imgPreview" v-for="(i,index) in fileList" :key="index">
            <div class="deleteImg">
              <span @click="deleteImg(index)">X</span>
            </div>
            <img :src="i">
          </div>
        </div>
      </div>-->
  
    </group>
  
    <div style="padding:2rem;">
      <x-button @click.native="addHomework" type="primary">确认发布</x-button>
    </div>
  
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Selector, XTextarea } from 'vux'
export default {
  name: 'hello',
  components: {
    XInput, Group, XButton, Cell, Selector, XTextarea
  },
  data() {
    return {
      newHomeworkData: { },
      fileList: [],
      courseList: [
        {key:'语文',value:'语文'},
        {key:'数学',value:'数学'},
        {key:'英语',value:'英语'},
        {key:'物理',value:'物理'},
        {key:'化学',value:'化学'},
        {key:'历史',value:'历史'},
        {key:'政治',value:'政治'},
        {key:'地理',value:'地理'},
        {key:'音乐',value:'音乐'},
        {key:'美术',value:'美术'},
        {key:'体育',value:'体育'}
      ],
    }
  },
  computed:{
    course:function(){
      if(this.$store.state.currentUser.ExtendInfo.Course){
        return this.$store.state.currentUser.ExtendInfo.Course
      }
    }
  },
  methods: {
    updateData: function (data) {
      this.newHomeworkData.content = data
    },
    addImg() {
      if (this.fileList.length < 9) {
        let imgFiles = document.getElementById('imgFiles').files
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.$API.uploadImg(imgFiles).then((res) => {
          res.forEach((val) => {
            this.fileList.push(val)
            this.newHomeworkData.content += '<img style="max-width:100%;" src='+ val +'>'
          })
          this.$vux.loading.hide()
        }).catch((err) => {
          this.$vux.loading.hide()
        })
      }else{
        this.$vux.toast.show({
          type:'warn',
          text: '最多上传9张图片',
          width:'20em'
        })
      }
    },
    deleteImg(val) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (i == val) {
          this.fileList.splice(i, 1)
        }
      }
    },
    addHomework(){
      this.newHomeworkData.course_name = this.course
      if(this.newHomeworkData.course_name&&this.newHomeworkData.content){
        this.newHomeworkData.class_id = this.$route.params.classId
        this.$API.addHomework(this.newHomeworkData).then(res=>{
          this.$vux.toast.show({
            type:"success",
            text: "发布成功"
          })
          this.$router.push('/class/'+this.$route.params.classId)
        }).catch(err=>{
          this.$vux.toast.show({
            type:"warn",
            text: err.msg
          })
        })
      }else{
        this.$vux.toast.show({
          type:"warn",
          text: "数据不完整"
        })
      }
    }
  },
  created() {
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.contentImg{
  
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

.imgPreviewContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 0;
  .imgPreview {
    position: relative;
    border-top: 1px solid @cc4;
    width: 33.33%;
    height: 150px;
    &:hover .deleteImg {
      display: block;
    }
    .deleteImg {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      line-height: 10rem;
      font-size: 50px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      span {
        cursor: pointer;
      }
    }
    .imgName {
      color: @cc4;
    }
    img {
      max-height: 100%;
      max-width: 100%;
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
