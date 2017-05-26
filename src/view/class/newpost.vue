<template>
  <div class="hello">

    <group title="发布新的班级动态" labelWidth="6em">
      <x-input title="作者：" placeholder="just for demo" v-model="data.auther" novalidate show-clear placeholder-align="right"></x-input>
      <selector title="类别：" placeholder="请选择类别" direction="right" v-model="data.category"  :options="categoryList"></selector>
      <x-textarea title="内容" v-model="data.content" placeholder="请输入内容" autosize></x-textarea>
    </group>
    <div style="padding:2rem;"><x-button @click.native="newPost" type="primary">确认发布</x-button></div>
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
      categoryList: [{key: '班级活动', value: '班级活动'}, {key: '班级新闻', value: '班级新闻'},{key: '班级作业', value: '班级作业'}]
    }
  },
  methods:{
    newPost(){
      console.log('本地数据：')
      console.log(this.data)
      this.data.userImg='http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg'
      this.$API.newClassPost(this.data).then(res=>{
        console.log('返回的数据：')
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
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
