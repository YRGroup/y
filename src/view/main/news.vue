<template>
  <div>

    <card>
      <div slot="header" class="header">
        <img :src="data.img" @click="fun('打开 '+data.name+' 的个人页面')">
        <span class="name">{{ data.name }}</span>
        <span class="date">{{ data.date }}</span>
      </div> 
      <div slot="content" class="content">
        <p>{{ data.content }}</p>
      </div>
    </card>

    <div class="comment-header">
      <span>全部评论（{{data.comment.length }}）</span>
    </div>
    <card class="comment" v-for="comment in data.comment" :key="comment.name">
      <div slot="header" class="header">
        <img :src="comment.img" @click="fun('打开 '+comment.name+' 的个人页面')">
        <span  @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.name }}</span>
        <span>{{ comment.date }}</span>
        <span  @click="reply(comment.name)"> 回复 </span>
      </div> 
      <div slot="content" class="content">
        <div>{{comment.content }}</div>
      </div>
    </card> 

    <popup v-model="showpopup" height="270px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group>
          <x-input v-model="replymsg" :placeholder="'回复 '+commentid+' 的内容'"></x-input>
        </group>
        <div style="padding:20px 15px;">
        <x-button type="primary">发表回复</x-button>
        <x-button @click.native="showpopup = false">取消回复</x-button>
        <x-button @click.native="showemotion = true">表情</x-button>
        </div>
      </div>
    </popup>    

  </div>
</template>

<script>
import { Card,Popup,Group,XInput,XButton } from 'vux'

export default {
  name: 'hello',
  components: {
    Card,Popup,Group,XInput,XButton
  },
  data () {
    return {
      showpopup:false,
      commentid:'0',
      replymsg:'',
      data:{
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'name':'张丽丽的家长',
          'date':'2017-4-25',
          'content':'『育人朗读者』是由育人教育集团宣传部推出，每周为大家推选出一本书，并择选出书中的优秀章节，由朗读者为大家领读。。。',
          'read':'40',
          'liked':'3',
          'comment':[
            {
              'name':'李大明的家长',
              'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
              'date':'2017-4-25',
              'content':"祝育人教育集团越来越好!"
            },
            {
              'name':'小李',
              'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
              'date':'2017-4-25',
              'content':'这一期，我们大家带来的这是《人间喜剧》。'
            }
          ]
        },
      msg: 'Welcome to Your Vue.js App'
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
.weui-panel{
  position:relative;
  margin-top:0;
  margin-bottom:1em;
  .header{
    width:100%;
    padding:1em;
    font-size:1.2em;
    img{
      width:4em;
      margin-right:1em;
    }
    span:nth-child(2){ 
      position:absolute;
      top:1.5em;
    }
    span:nth-child(3){
      position:absolute;
      top:3.5em;
      color:@c4;
    }
  }
  .content{
    padding-left:2em;
    padding-right:2em;
    line-height:2em;
    margin-bottom:1em;
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
    img{
      width:4em;
      margin-right:1em;
      border-radius: 50%;
    }
    span:nth-child(2){ 
      position:absolute;
      color:@c5;
      top:1.5em;
    }
    span:nth-child(3){
      position:absolute;
      top:3.5em;
      color:@c4;
    }
    span:nth-child(4){
      position:absolute;
      top:2rem;
      right:1.5rem;
      border:none;
      color:@c5;
      padding:0 1em;
    }
  }
  .content{
    padding-left:2em;
    padding-right:2em;
    line-height:2em;
    margin-bottom:1em;
    font-size:1.2em;
  }
}
.comment-header{
  height:3em;
  font-size: 1.3em;
  background: #fff;
  line-height: 3em;
  padding-left:2em;
}
</style>
