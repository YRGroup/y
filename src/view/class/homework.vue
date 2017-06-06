<template>
  <div class="work">
    <br />

      <div class="workcard" v-for="i in data">
        <div class="header">
          <span class="category" :style="{background:colors[i.class]}">{{ i.class }}</span>
          <span class="auther">{{ i.auther }}</span>
        </div>
        <div class="content">{{ i.content }}</div>
        <div class="footer">{{ i.date }}</div>
      </div>
    </div>
    

  </di>
</template>

<script>
export default {
  data () {
    return {
      colors:{
        '语文':'#1abc9c',
        '数学':'#2ecc71',
        '英语':'#3498db',
        '物理':'#9b59b6',
        '历史':'#f1c40f',
        '政治':'#e67e22',
        '化学':'#e74c3c',
        '代数':'#34495e',
        '几何':'#95a5a6'
      },
      homework:[],
      data:[
        {
          date:'4月25日 18:00',
          'img':'https://modao.cc/uploads3/images/900/9007938/raw_1493017174.jpeg',
          'title':'课堂实践活动',
          auther:'刘老师',
          'class':'语文',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },
        {
          date:'4月26日 18:00',
          'img':'https://modao.cc/uploads3/images/900/9007935/raw_1493017169.jpeg',
          'title':'课堂实践活动',
          auther:'刘老师',
          'class':'数学',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },
        {
          date:'4月27日 18:00',
          'img':'https://modao.cc/uploads3/images/907/9074115/raw_1493192640.png',
          'title':'抄写300遍字母表',
          auther:'刘老师',
          'class':'英语',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },
        {
          date:'4月28日 18:00',
          'img':'https://modao.cc/uploads3/images/900/9007938/raw_1493017174.jpeg',
          'title':'课堂实践活动',
          auther:'刘老师',
          'class':'语文',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },

      ]
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    getHomeWork(){
      this.$API.getAllClassDynamic(this.$store.state.classId,4,0).then(res=>{
        console.log('获取班级作业列表：')
        console.log(res)
        this.homework = res
        this.boxwid = res.length * 100 +'px'
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','班级作业')
    this.getHomeWork()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.workcard{
  background: #fff;
  padding:1rem;
  margin: .6rem;
  .header{
    height:2rem;
    .category{
      float: left;
      padding:.3rem 1rem;
      color:#fff;
      border-radius: 5px;
    }
    .auther{
      float:right;
      padding-right:1rem;
      color:@cc2;
    }
  }
  .footer{
    color:@cc3;
    text-align: right;
  }
}
</style>
