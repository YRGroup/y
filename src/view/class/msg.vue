<template>
  <div>

    <card>
      <div slot="header" class="header cardcont">
        <img :src="data.img" @click="fun('打开 '+data.name+' 的个人页面')">
        <span class="usename">{{ data.name }}</span>
        <span class="time">{{ data.date }}</span>
        <span class="tips">{{ data.class }}</span>
      </div> 
      <div slot="content" class="content">
        <p>{{ data.content }}</p>
      </div>
    </card>

    <div class="comment-header">
      <span>全部评论（{{data.comment.length }}）</span>
    </div>
    <card class="comment cardcont" v-for="comment in data.comment" :key="comment.name">
      <div slot="header" class="header">
        <img :src="comment.img" @click="fun('打开 '+comment.name+' 的个人页面')">
        <span class="usename"  @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.name }}</span>
        <span class="time">{{ comment.date }}</span>
        <span class="reply"  @click="reply(comment.name)"> 回复 </span>
      </div> 
      <div slot="content" class="content">
        <p>{{comment.content }}</p>
      </div>
    </card>

    <popup v-model="showpopup" height="270px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group>
          <x-input v-model="value" :placeholder="'回复 '+commentid+' 的内容'"></x-input>
        </group>
        <div style="padding:20px 15px;">
        <x-button type="primary">发表回复</x-button>
        <x-button @click.native="showpopup = false">取消回复</x-button>
        </div>
      </div>
    </popup>

  </div>
</template>

<script>
import { Card,Popup,Group,XInput,XButton } from 'vux'

export default {
  components: {
    Card,Popup,Group,XInput,XButton
  },
  data () {
    return {
      showpopup:false,
      commentid:'0',
      value:'',
      data:{
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'name':'张丽丽的家长',
          'date':'2017-4-25',
          'class':'文章',
          'content':'『育人朗读者』是由育人教育集团宣传部推出，每周为大家推选出一本书，并择选出书中的优秀章节，由朗读者为大家领读。。。',
          'read':'40',
          'liked':'3',
          'comment':[
            {
              'name':'李大明的家长',
              'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
              'date':'2017-4-25',
              'content':'祝育人教育集团越来越好！'
            },
            {
              'name':'小李',
              'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
              'date':'2017-4-25',
              'content':'这一期，我们大家带来的这是来自法《人间喜剧》。'
            },
            {
              'name':'周杰伦',
              'img':'http://i.gtimg.cn/qqlive/images/namelib/v688/8/6/8/72868.jpg',
              'date':'2017-4-25',
              'content':'刘老师的课程讲的很好！'
            }
          ]
        }
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
    reply(id){
      this.commentid = id
      this.showpopup = true
    }
  },
  created(){
    this.$store.state.isNav = false
    this.$store.state.title = '动态详情'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.cardcont{
  img{
      width:3.6em;
      margin-right:0.6em;
    }
    .usename{
      font-size: 1.1em;
      top:1.2em;
    }
    .time{
      top:3.5em;
    }
    .reply{
      position:absolute;
      top:2rem;
      right:0;
      border:none;
      color:@cc6;
      padding:0 1em;
    }
}
.weui-panel{
  position:relative;
  margin-top:0;
  margin-bottom:1em;
  .header{
    width:100%;
    padding:1em;
    font-size:1.2em;
    
    // span:nth-child(2){ 
    //   position:absolute;
    //   top:1.2em;
    // }
    // span:nth-child(3){
    //   position:absolute;
    //   top:3.5em;
    //   color:grey;
    // }
    // span:nth-child(4){
    //   position:absolute;
    //   top:2rem;
    //   right:1.5rem;
    //   border:1px solid #CCC;
    //   padding:0 1em;
    // }
  }
  .content{
    padding-left:0 1em;
    line-height:1.6em;
    margin-bottom:1em;
    margin-top:-1em;
    font-size:1.2em;
  }
}

.comment{
  position:relative;
  margin:0;
  .header{
    width:100%;
    padding:1em;
    font-size:1.2em;
    // img{
    //   width:3.6em;
    //   margin-right:1em;
    //   border-radius: 50%;
    // }
    // span:nth-child(2){ 
    //   position:absolute;
    //   color:@cc6;
    //   top:1.2em;
    // }
    // span:nth-child(3){
    //   position:absolute;
    //   top:3em;
    //   color:@cc3;
    // }
  }
  .content{
    margin-bottom:1em;
    font-size:1.2em;
  }
}
.comment-header{
  position: relative;
  height:2.8em;
  font-size: 1.3em;
  background: #fff;
  line-height: 2.8em;
  padding-left:2em;
  color: @cc2;
  :after{
    content: "";
    position: absolute;
    width: 3px;
    height: 1.2em;
    top:13px;
    left: 1em;
    background: @cc6;

  }
}
</style>
