<template>
  <div class="hello">

    <div class="class-header">
      <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg" @click="fun('打开班级的主页')">
      <span>三年级二班</span>
      <span>班主任：张大丽</span>
      <span>班级人数：40人</span>
    </div>
    </br>

    <scroller lock-y scrollbar-x>
      <div class="box">
        <div class="box-item" v-for="item in teachers" @click="fun('打开 '+item.name+' 的主页')">
          <img :src="item.img">
          <span>{{ item.name }}</span>
          <span>{{ item.job }}</span>
        </div>
      </div>
    </scroller>

    </br>

    <div class="notice">
      <div >
        <span>班级作业</span>
      </div>
      <div>
        <li v-for="i in notice" @click="fun('打开 '+i.class+'作业')">
          <span>【{{ i.class }}】：{{ i.msg }}</span>
          <span>{{ i.date }}</span>
        </li>
      </div>
      <div @click="fun('打开全部作业')">
        <span>更多</span>
      </div>
    </div>

    </br>

    <card v-for="item in list" :key="item.date">
      <div slot="header" class="header">
        <img :src="item.img" @click="fun('打开 '+item.name+' 的个人页面')">
        <span>{{ item.name }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.class }}</span>
      </div> 
      <div slot="content" class="content">
        <p>{{ item.content }}</p>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <i class="fa fa-eye"> {{ item.read }}</i>
          <i class="fa fa-thumbs-up" @click="fun('给 '+item.name+' 点赞成功')"> {{ item.liked }}</i>
        </div>  
        <div class="comment">
          <li v-for="comment in item.comment" :key="comment.name">
            <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.name }}：</span>
            <span>{{ comment.content }}</span>
          </li>
          <div @click="fun('打开动态详情')">
            查看更多
          </div>
        </div>
      </div> 
    </card>

  </div>
</template>

<script>
import { Scroller ,Flexbox,FlexboxItem,Card,Tab, TabItem   } from 'vux'

export default {
  name: 'hello',
  components: {
    Scroller ,Flexbox,FlexboxItem,Card,Tab, TabItem
  },
  data () {
    return {
      teachers:[
        {
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'name':'王老师',
          'job':'班主任'
        },
        {
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'name':'李老师',
          'job':'数学'
        },
      ],
      notice:[
        {
          "class":'语文',
          'msg':'高三复习千头万绪',
          'date':'4.26'
        },
        {
          "class":'数学',
          'msg':'做了很多题，遇到同类的',
          'date':'4.25'
        }
      ],
      list:[
        {
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
              'content':'祝育人教育集团越来越好！'
            },
            {
              'name':'小李',
              'content':'这一期，我们大家带来的这是来自法《人间喜剧》。'
            }
          ]
        }
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
.class-header{
  height:10em;
  width:100%;
  background:#fff url('https://modao.cc/uploads3/images/900/9006918/raw_1493015913.png');
  background-size:100% 100%;
  color:#fff;
  position:relative;
  img{
    width:5rem;
    border-radius:15px;
    position:absolute;
    top:1rem;
    left:2rem;
  }
  span:nth-child(2){
    position:absolute;
    top:2rem;
    left:8rem;
    font-size:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:4rem;
    left:8rem;
  }
  span:nth-child(4){
    position:absolute;
    top:4rem;
    left:15rem;
  }
}

.box {
  height: 100px;
  position: relative;
  width: 1490px;
  background:#fff;
  padding-top:1rem;
  padding-bottom:1rem;
}
.box-item {
  width: 180px;
  height: 100px;
  background-color:#ecf0f1;
  border-radius:15px;
  display:inline-block;
  margin-left: 15px;
  float: left;
  img{
    width:4rem;
    margin-top:1rem;
    margin-left:1rem;
  }
  span:nth-child(2){
    color:red;
    font-size:1.5rem;
    position:absolute;
    top:2rem;
    margin-left:.5rem;
  }
  span:nth-child(3){
    position:absolute;
    top:5rem;
    margin-left:.5rem;
  }
}
.box-item:first-child {
  margin-left: 1rem;
}

.notice{
  background:#fff;
  height:5em;
  padding:.5em;
  position:relative;
  div:nth-child(1){
    color:#7dd6ff;
    width:2em;
    position:absolute;
    left:1em;
    top:1.5em;
  }
  div:nth-child(2):before{
    content:"";
    display:block;
    width:1px;
    height:4em;
    background:#ccc;
    position:absolute;
    left:4em;
    top:1em;
  }
  div:nth-child(2){
    margin-left:4em;
    margin-top:1em;
    color:grey;
    li{
      span:nth-child(1){
        white-space:nowrap;
      }
      span:nth-child(2){
        float:right;
        margin-right:5em;
      }
    }
  }
  div:nth-child(2):after{
    content:"";
    display:block;
    width:1px;
    height:4em;
    background:#ccc;
    position:absolute;
    right:4em;
    top:1em;
  }
  div:nth-child(3){
    color:#ccc;
    width:1em;
    position:absolute;
    right:2em;
    top:1.5em;
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
      color:grey;
    }
    span:nth-child(4){
      position:absolute;
      top:2rem;
      right:1.5rem;
      border:1px solid #CCC;
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
  .footer{
    padding-left:2em;
    padding-right:2em;
    .footer-btn{
      color:grey;
      i:nth-child(1){
        float:left;
        padding-left:1em;
      }
      i:nth-child(2){
        float:right;
        padding-right:2em;
      }
    }
    .footer-btn:after{
      content:"";
      display:block;
      width:100%;
      height:1px;
      background-color:grey;
      position:relative;
      bottom:-1.3em;
    }
    .comment{
      margin-top:2em;
      margin-bottom:1em;
      padding:1em .5em .5em .5em;
      background:#f7f7f7;
      border-radius:10px;
      li{
        width:100%;
        span:nth-child(1){
          color:#03a9f4;
        }
        span:nth-child(2){
          width:100%;
        }
      }
      div{
        text-align:center;
        border-top:1px solid #e0e0e0;
        margin-top:0.5em;
        padding-top:0.5em;
      }
    }
  }

}
</style>
