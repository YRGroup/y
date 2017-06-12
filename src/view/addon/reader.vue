<template>
  <div> 
    <img class="headerImg" :src="headerImg">
    <panel header="育人朗读者：" :list="list" type="1"></panel>
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
          title: '一棵开花的树',
          desc: '这一期，我们带来的是席慕蓉诗集《七里香》中的一首《一棵开花的树》。席慕蓉的诗，澄明热烈，真挚动人。她多写爱情、人生、乡愁，饱含着对生命的挚爱真情，充满着对人情、爱情、乡情的领悟。',
          url: 'http://mp.weixin.qq.com/s/UijCZdZRafVFRiMy_Y6oZg'
        }, 
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvcadwIjiczAe84JQq154OIVibIafh3gUiaUXePfp9Uplydn6OJY3ficMicNrkGPw99PBdSGsZjjGskZHuw/0?wx_fmt=jpeg',
          title: 'On Children 论孩子',
          desc: '这一期，我们带来的是黎巴嫩诗人纪伯伦的一首诗歌《论孩子》。这首诗歌收录于纪伯伦诗集《先知》中。纪伯伦的《先知》是一本以爱与美为主题的散文诗集，其《论孩子》一章以诗意的语言道出父母与孩子的关系，语言优美，寓意深刻，值得每一个爱自己孩子的人认真品读和反思。',
          url: 'http://mp.weixin.qq.com/s/liQn9j7Bw1N6TcnjStPTrQ'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvfb52GgrwPzJ2Zq7VnYft9mYJo7BVOtdr6siaTKMQGiaIwdA4wtkBjVp6fk54yvzYwUHicNiaS7jybM4A/0?wx_fmt=jpeg',
          title: '祖国啊，我亲爱的祖国',
          desc: '这一期，来自郑州航空港区育人高级中学的祁宏伟校长，为我们大家带来朦胧诗派代表作家舒婷的爱国诗歌《祖国啊，我亲爱的祖国》。诗中交融着深沉的历史感与强烈的时代感，涌动着摆脱贫困、挣脱束缚、走向新生的激情，读来令人荡气回肠。',
          url: 'http://mp.weixin.qq.com/s/C_2EEx0zRAka1xPFfMZRHQ'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_png/ibkZt7wwTGvcTmDrZTq6j5SvlPnmtPd1ibNB6W1KSbicHpbFgRE6XUWkKWLeeb6q1mIibKeiaLRNOicvNDYIFiatzMgQA/0?wx_fmt=png',
          title: '人间喜剧',
          desc: '这一期，我们大家带来的这本书是来自法国小说家奥诺雷·德·巴尔扎克(Honoré·de Balzac)的《人间喜剧》。作品展示了法国社会的整个面貌，被誉为“资本主义社会的百科全书”。预计阅读时间5分钟。',
          url: 'http://mp.weixin.qq.com/s/gzycTKEoCf15cWBsMJVD2A'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvfqAvN1BDohsABLQv9zNQgYpe0h72pA2TJZe6fxSCaPj3AWRyoiaqnWnibmYthhuhj23s6K0pnp4x8Q/0?wx_fmt=jpeg',
          title: '数±学=(女×孩)',
          desc: '这一期，我们大家带来的这本书是来自日本作家结城浩的《数学女孩》。作者笔下的XYZ以及那一道道数学题不再枯燥乏味，它们变成了跳动的音符，奏响青春之歌。让不喜欢数学的你从此爱上数学！预计阅读时间25分钟。',
          url: 'http://mp.weixin.qq.com/s/N4NhidM3EIHhmuvVxKUEXQ'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvfchg9yeIZg6uUo3NquN7O7xWPPaQLUx4Ft80euBtYLrzfMmcbs7UzJH01vV1sXSiamOicjJeZ5KRlA/0?wx_fmt=jpeg',
          title: '追风筝的人',
          desc: '这一期，我们为大家带来的这本书是来自美籍阿富汗裔作家卡勒德·胡赛尼（Khaled Hosseini）的第一部小说《追风筝的人》，小说讲述了两个阿富汗少年关于友谊、亲情、背叛、救赎的故事，小说不仅表达了对战争的控诉、还对阿富汗种族问题和宗教问题有深刻的反映。预计阅读时间30分钟。',
          url: 'https://mp.weixin.qq.com/s/IDQ5awumC2vNq3Sne4nU4A'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvfmNY1uyHoicYnEz65hGXuBQHbDEicRsBUQ6rbOWiaDTyhnHicxKXPjEjFQ7EpCcrsV6ibdiaDESxOrpEtw/0?wx_fmt=jpeg',
          title: '你不知道的宇宙',
          desc: '这一期，我们大家带来的这本书是来自刘慈欣的科幻小说《三体》，为大家朗读的选段是第二部《黑暗森林》中关于宇宙社会学和黑暗森林理论的一段对话。预计阅读时间20分钟。',
          url: 'http://mp.weixin.qq.com/s/lhiUXYXqu_HmXKrJqFlehw'
        },
        {
          src: 'http://mmbiz.qpic.cn/mmbiz_jpg/ibkZt7wwTGvd5Vy9Qb2FlsVQgFoP1dEeBljjZ3HIL6TpaYcoUs7lzq661OJnZlGUdMmh8ThMwHdMF2hN8jqvrgQ/0?wx_fmt=jpeg',
          title: '成长比分数重要',
          desc: '通过以上的故事，我们做父母的应该懂得，我们要以人为本，不要以分为本，成长永远比分数重要。',
          url: 'http://mp.weixin.qq.com/s/1rSis8pBXtJlA-u5MOKBSw'
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
