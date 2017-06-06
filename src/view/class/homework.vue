<template>
  <div>

    <div class="feed" v-for="i in data" @click="fun('打开 '+i.title+' '+i.class+' 的作业页面')">
      <div class="time">{{ i.time }}</div>
      <card class="card">
        <p slot="content">
          <img :src="i.img">
          <span>{{ i.title }}（{{ i.class }}）</span>
          <span>{{ i.content }}</span>
        </p>
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
          'time':'4月25日 18:00',
          'img':'https://modao.cc/uploads3/images/900/9007938/raw_1493017174.jpeg',
          'title':'课堂实践活动',
          'class':'语文',
          'content':'如果你无法简洁的表达你的想法，那只说明你还不够了解它。'
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
    }
  },
  created(){

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
  &:first-child{
    margin-top:10px;
  }
}
.card{
  margin:1em;
  padding:1em;
  box-shadow:0 0 1px #ccc;
  position:relative;
  text-align:left;
  p{
    img{
      width:6em;
      border-radius:5px;
    }
    :nth-child(2){
      position:absolute;
      top:1.5em;
      left:7em;
      font-size:1.3em;
    }
    :nth-child(3){
      position:absolute;
      top:4em;
      left:9em;
      width:17em;
      color:#bababa;
    }
  }
}
</style>
