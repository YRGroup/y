<template>
  <div class="hello">

    <group title="发布新的班级动态" labelWidth="6em">
      <x-input title="作者：" placeholder="just for demo" v-model="auther" novalidate show-clear placeholder-align="right"></x-input>
      <selector title="类别：" placeholder="请选择类别" direction="right" v-model="postClass"  :options="postClassList"></selector>
      <x-textarea title="内容" v-model="postContent" placeholder="请输入内容" autosize></x-textarea>
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
      postClassList: [{key: 'activity', value: '活动发布'}, {key: 'news', value: '班级新闻'},{key: 'studywork', value: '班级作业'}]
    }
  },
  methods:{
    fun(val){

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
