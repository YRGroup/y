<template>
  <div>
    
    </br>
    
    <div class="feed" v-for="i in data" @click="fun('打开 '+i.title+' '+i.class+' 的作业页面')">
      <card class="card">
        <!--<div class="header" slot="header">{{i.Title}}</div>-->
        <div class="content" slot="content">{{ i.Content }}</div>
        <div class="footer" slot="footer">{{ i.CreateTime }}</div>
      </card>
    </div>
    

  </div>
</template>

<script>
import { Card } from 'vux'

export default {
  components: {
    Card
  },
  data () {
    return {
      data:[
        {
          'CreateTime':'4月25日 18:00',
          'AutherUserImg':'https://modao.cc/uploads3/images/900/9007938/raw_1493017174.jpeg',
          'Title':'课堂实践活动',
          'CourseName':'语文',
          'Content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },
        {
          'time':'4月26日 18:00',
          'img':'https://modao.cc/uploads3/images/900/9007935/raw_1493017169.jpeg',
          'title':'课堂实践活动',
          'class':'数学',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },
        {
          'time':'4月27日 18:00',
          'img':'https://modao.cc/uploads3/images/907/9074115/raw_1493192640.png',
          'title':'抄写300遍字母表',
          'class':'英语',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
        },
        {
          'time':'4月28日 18:00',
          'img':'https://modao.cc/uploads3/images/900/9007938/raw_1493017174.jpeg',
          'title':'课堂实践活动',
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
    getHomeworkList(){
      this.$API.getHomeworkList(this.$store.state.classId).then(res=>{
        console.log('获取到的教师发布的作业：')
        console.log(res)
        this.data=res
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.getHomeworkList()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.feed{
  text-align:center;
  .time{
    margin:0 auto;
    background:#e3e3e3;
    padding:0.5em;
    display:inline;
    border-radius:20px;
  }
}
.card{
  margin:1em;
  text-align:left;
  .header{
    border-bottom: 1px solid @cc4;
  }
  .content{
    padding:1em;
    // border-bottom: 1px solid @cc4;
  }
  .footer{
    text-align: right;
    color:@cc2;
  }
}
</style>
