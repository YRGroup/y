<template>
  <div class="hello">

    <group title="发布新的班级动态" labelWidth="6em">
      <!--<x-input title="作者：" placeholder="just for demo" v-model="data.auther" novalidate show-clear placeholder-align="right"></x-input>-->
      <selector title="类别：" placeholder="请选择类别" direction="right" v-model="data.type"  :options="categoryList"></selector>
      
    <vue-html5-editor :content="data.content" @change="updateData" :auto-height="true" :height="500"></vue-html5-editor>
      
      <div class="file" style="text-align:center">
        <a href="javascript:;" class="a-upload">
          <input type="file" accept="image/jpeg,image/png,image/gif" multiple="multiple" id="imgFiles" @change="addImg">
          点击这里上传图片
        </a>
        <div class="imgPreview" v-for="(i,index) in fileList">
          <div class="deleteImg">
            <span @click="deleteImg(index)">X</span>
          </div>
          <img :src="'http://api.test.com'+i">
          <div class="imgName">{{i}}</div>          
        </div>
      </div>
      
    </group>
    
    <div style="padding:2rem;"><x-button @click.native="addNewPost" type="primary">确认发布</x-button></div>

  </div>
</template>

<script>
import { XInput, Group, XButton, Cell,Selector,XTextarea } from 'vux'
export default {
  name: 'hello',
  components: {
    XInput, Group, XButton, Cell,Selector,XTextarea
  },
  data () {
    return {
      data:{
        type:1,
        content:'',
        'img_url_list':''
      },
      fileList:[],
      categoryList: [{key: '1', value: '班级动态'}, {key: '2', value: '班级新闻'},{key: '3', value: '班级通知'},{key: '4', value: '班级作业'}]
    }
  },
  methods:{
    updateData: function (data) {
      this.data.content = data
    },
    addImg(){
      this.$vux.loading.show({
        text: 'Loading'
      })
      let imgFiles=document.getElementById('imgFiles').files
      this.$API.uploadImg(imgFiles).then((res)=>{
        this.fileList=res
        this.$vux.loading.hide()
      }).catch((err)=>{
        console.log('err:')
        console.log(err)
        this.$vux.loading.hide()
        
      })
    },
    deleteImg(val){
      for(let i=0;i<this.fileList.length;i++){
        if(i==val){
          this.fileList.splice(i,1)
        }
      }
    },
    addNewPost(){
      this.data.cid = this.$route.params.classId
      this.data['img_url_list'] = this.fileList.join(',')
      if(this.data.type!=null&&this.data.content!=undefined){
        console.log('本地的数据：')
        console.log(this.data)
        this.$API.postNewClassDynamic(this.data).then(res=>{
          console.log('发布成功！')
          console.log(res)
          this.$router.push('/main')
        }).catch((err)=>{
          console.log(err)
        })
      }else{
        this.$vux.toast.show({
          type:"warn",
          text: "数据不完整"
        })
      }
    }
  },
  created(){
    this.$API.test()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.file{
  text-align: center;
  border-top:1px solid @cc4;
  padding-top:5px;
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
  .a-upload  input {
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
.imgPreview{
  position: relative;
  border-top:1px solid @cc4;
  padding: 1rem;
  &:hover .deleteImg{
    display: block;
  }
  .deleteImg{
    display:none;
    position: absolute;
    left:0;
    right:0;
    top :0;
    bottom:0;
    line-height: 10rem;  
    font-size:50px;
    color:#fff;
    background: rgba(0,0,0,0.3);  
    span{
      cursor: pointer;
    }
  }
  .imgName{
    color:@cc4;
  }
  img{
    height:10rem;
    width:10rem;
  }
}
.popup{
  background: #fff;
  padding:1rem;
  span{
    margin:0 3px;
  }
}
</style>
