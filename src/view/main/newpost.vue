<template>
  <div class="hello">

    <group title="发布新的校园动态" labelWidth="6em">
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
      categoryList: [{key: 'activity', value: '校园活动'}, {key: 'news', value: '校园新闻'},{key: 'message', value: '校长寄语'}]
    }
  },
  methods:{
    newPost(){
      onsole.log('本地数据：')
      console.log(this.data)
      this.$API.newSchoolPost(this.data).then(res=>{
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
