<template>
  <div> 
    <img class="headerImg" :src="headerImg">
    <panel header="育人iDOL：" :list="list" type="1"></panel>
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
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGveoAAHkFAkFicL7byFex1t4pdia2wuIxTdbsL08YtTM1Alv3ic3ghOAeRnSNvvibXVA9kEc3Ykl5KhOsA/0?wx_fmt=jpeg',
          title: '教师篇第三辑',
          desc: '岳密玲 班主任  数学老师 郑州外国语女子中学',
          url: 'http://mp.weixin.qq.com/s/IZB-jsnGlD44ZCaZQV4vuQ'
        }, 
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvcadwIjiczAe84JQq154OIVibIafh3gUiaUXePfp9Uplydn6OJY3ficMicNrkGPw99PBdSGsZjjGskZHuw/0?wx_fmt=jpeg',
          title: '教师篇第二辑',
          desc: '郝素霞 班主任  英语老师 郑州航空港育人国际学校',
          url: 'http://mp.weixin.qq.com/s/ti8ClFAKXiCHgT2EsLK_Rw'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvfb52GgrwPzJ2Zq7VnYft9mYJo7BVOtdr6siaTKMQGiaIwdA4wtkBjVp6fk54yvzYwUHicNiaS7jybM4A/0?wx_fmt=jpeg',
          title: '教师篇第一辑',
          desc: '吴迪  书法老师 郑州经开区外国语女子中学',
          url: 'http://mp.weixin.qq.com/s/scvz3AtxBK-8F_xkRioI0w'
        }
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
