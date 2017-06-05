<template>
  <div class="hello">

    <group title="发布新的班级动态" labelWidth="6em">
      <!--<x-input title="作者：" placeholder="just for demo" v-model="data.auther" novalidate show-clear placeholder-align="right"></x-input>-->
      <selector title="类别：" placeholder="请选择类别" direction="right" v-model="data.type"  :options="categoryList"></selector>
      <x-textarea title="内容：" v-model="data.content" placeholder="请输入内容" autosize></x-textarea>
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
      data:{},
      categoryList: [{key: '1', value: '班级活动'}, {key: '2', value: '班级新闻'},{key: '3', value: '班级作业'}]
    }
  },
  methods:{
    addNewPost(){
      // this.data.userImg='http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg'
      this.data.cid = this.$store.state.classId
      if(this.data.type!=null&&this.data.content!=undefined){
        console.log('本地的数据：')
        console.log(this.data)
        this.$API.postNewClassDynamic(this.data).then(res=>{
          console.log('发布成功！')
          console.log(res)
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
    
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.hello{
  text-align: center;
}
</style>
