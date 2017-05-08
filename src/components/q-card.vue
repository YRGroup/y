<template>
  <card>
    <div slot="header" class="header">
      <img :src="item.img" @click="fun('打开 '+item.name+' 的个人页面')">
      <span>{{ item.name }}</span>
      <span>{{ item.date }}</span>
      <span>{{ item.class }}</span>
    </div> 
    <div slot="content" class="content">
      <p @click="$router.push('/news')">{{ item.content }}</p>
    </div>
    <div slot="footer" class="footer">
      <div class="footer-btn">
        <i class="iconfont" @click="$router.push('/news')">&#xe60f;  </i>
        <i class="iconfont" @click="fun(item.liked++)">&#xe646; {{ item.liked }}</i>
        <i class="iconfont">&#xe6c3; {{ item.read }}</i>
      </div>  
      <div class="comment">
        <li v-for="comment in item.comment" :key="comment.name">
          <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.name }}：</span>
          <span>{{ comment.content }}</span>
        </li>
        <div @click="$router.push('/news')">
          查看更多
        </div>
      </div>
    </div> 
  </card>
</template>

<script>
import { Card } from 'vux'

export default {
  name: 'qCard',
  components: {
    Card
  },
  props:{

  }
}
</script>

<style scoped>
.weui-panel{
  position:relative;
  margin-top:0;
  margin-bottom:1em;
  .header{
    width:100%;
    padding:1em 1em 0.5em 1em;
    font-size:1.2em;
    img{
      width:3.5em;
      margin-right:1em;
    }
    span:nth-child(2){ 
      position:absolute;
      top:1em;
      color:@c6;
    }
    span:nth-child(3){
      position:absolute;
      top:2.5em;
      color:@c4;
    }
    span:nth-child(4){
      position:absolute;
      top:1.3rem;
      right:0;
      border-radius:10px 0 0 10px;
      padding:0 1rem;
      background:#d3d3d3;
      color:#fff;
    }
  }
  .content{
    padding-left:1em;
    padding-right:1em;
    line-height:1.5em;
    margin-bottom:.5rem;
    font-size:1.2em;
  }
  .footer{
    padding-left:1em;
    padding-right:1em;
    .footer-btn{
      color:@c4;
      font-size:1rem;
      i:nth-child(1){
        float:right;
        padding-right:2em;
      }
      i:nth-child(2){
        float:right;
        padding-right:2em;
      }
      i:nth-child(3){
        float:right;
        padding-right:2em;
      }
    }
    .footer-btn:after{
      content:"";
      display:block;
      width:100%;
      height:1px;
      background:transition;
      position:relative;
      bottom:-1.3em;
    }
    .comment{
      margin-top:2em;
      margin-bottom:1em;
      padding:1em;
      background:@c1;
      border-radius:10px;
      li{
        width:100%;
        span:nth-child(1){
          color:@c6;
        }
        span:nth-child(2){
          width:100%;
        }
      }
      div{
        text-align:center;
        border-top:1px solid #CCC;
        margin-top:0.5em;
        padding-top:0.5em;
      }
    }
  }
}
</style>