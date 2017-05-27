<template>
  <div>

    <card>
      <div slot="header" class="header cardcont">
        <img :src="data.userImg" @click="fun('打开 '+data.auther+' 的个人页面')">
        <span class="usename">{{ data.auther }}</span>
        <span class="time">{{ data.date }}</span>
        <span class="tips">{{ data.category }}</span>
      </div> 
      <div slot="content" class="content">
        <p>{{ data.content }}</p>
      </div>
    </card>

    <div class="comment-header">
      <span>全部评论（{{commentLength }}）</span>
      <span class="addbtn" @click="openreply">添加评论</span>
    </div>
    <card class="comment cardcont" v-for="comment in data.comment" :key="comment.name">
      <div slot="header" class="header">
        <img src="https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png" @click="fun('打开 '+comment.userName+' 的个人页面')">
        <span class="usename" @click="fun('打开 '+comment.userName+' 的个人页面')">{{ comment.userName }}</span>
        <span class="time">{{ comment.addTime }}</span>
      </div> 
      <div slot="content" class="content">
        <p>{{comment.content }}</p>
      </div>
    </card>

    <popup v-model="showpopup" height="270px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group>
          <x-input v-model="replymsg" :placeholder="'回复 '+data.auther+' 的内容'"></x-input>
        </group>
        <div style="padding:20px 15px;">
        <x-button type="primary" @click.native="addreply">发表回复</x-button>
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
      replymsg:'',
      commentId:'',
      commentLength:0,
      data:{}
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
    openreply(){
      this.showpopup = true
    },
    addreply(){
      let replyData ={}
      replyData.did=this.commentId
      replyData.content=this.replymsg
      this.$API.postNewComment(replyData).then(res=>{
        console.log('ok')
      })
    }
  },
  created(){
    // this.$store.state.isNav = false
    this.$store.state.title = '动态详情'
    this.$API.getClassDynamic(this.$route.params.classId,this.$route.params.msgId).then(res=>{
      this.data = res
      this.commentLength = res.comment.length
      this.commentId = res.id
    }).catch(err=>{
      console.log(err)
    })
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
  .addbtn{
    float:right;
    padding:0 2rem;
    color:#fff;
    background: #03a9f4;
    cursor: pointer;
    // border-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}
</style>
