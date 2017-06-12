<template>
  <div> 
    <img class="headerImg" :src="headerImg">
    <panel header="育人谈话录：" :list="list" type="1"></panel>
  </div>
</template>

<script>
import { Panel } from 'vux'

export default {
  name: 'hello',
  components: {
    Panel
  },
  data () {
    return {
      headerImg:require('@/assets/img/reader.jpg'),
      list: [
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvc6jz3bJXBLxzYqyw5RFbDmmzOmibicmQjyBicZn0OuaPp72kwXBj9UjH9BUgJWLdl8kTtHzvKIQ1kdw/0?wx_fmt=jpeg',
          title: '动作100分',
          desc: '我们就 “网球运动的影响力、网球运动对身体的好处、网球特长生及网球运动进校园”四方面，为同学们带来的变化和对于实现培养目标的意义采访了网球教练朱铁军老师。',
          url: 'http://mp.weixin.qq.com/s/jmEg1608hu3TWyhiix2WJg'
        }, 
      ]
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
.headerImg{
  width:100%;
}
</style>
