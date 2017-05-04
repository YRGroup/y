<template>
  <div>

    <scroller lock-y scrollbar-x>
      <div class="box" :style="{ width: boxwid}">
        <div class="box-item" v-for="item in teachers" @click="$router.push('/teacher/'+item.name)">
          <img :src="item.img">
          <span>{{ item.name }}</span>
          <span>{{ item.job }}</span>
        </div>
      </div>
    </scroller>

    </br>

    <div class="notice"  @click="$router.push('/class/work')">
      <div>
        <span>班级作业</span>
      </div>
      <div>
        <li v-for="i in notice">
          <span>【{{ i.class }}】：{{ i.msg }}</span>
          <span>{{ i.date }}</span>
        </li>
      </div>
      <div>
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
          <div @click="$router.push('/class/msg')">
            查看更多
          </div>
        </div>
      </div> 
    </card>

  </div>
</template>

<script>
import { Scroller,Flexbox,FlexboxItem,Card,Tab,TabItem   } from 'vux'

export default {
  components: {
    Scroller,Flexbox,FlexboxItem,Card,Tab,TabItem
  },
  data () {
    return {
      boxwid:'500px',
      teachers:[
        {
          'img':'http://i.gtimg.cn/qqlive/images/namelib/v688/8/6/8/72868.jpg',
          'name':'周老师',
          'job':'班主任'
        },
        {
          'img':'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1161924124,2585264186&fm=117&gp=0.jpg',
          'name':'迪老师',
          'job':'数学'
        },
        {
          'img':'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=598802529,3360058666&fm=117&gp=0.jpg',
          'name':'张老师',
          'job':'语文'
        },
        {
          'img':'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1897825579,158590078&fm=117&gp=0.jpg',
          'name':'鹿老师',
          'job':'英语'
        },
        {
          'img':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3733621530,612408558&fm=117&gp=0.jpg',
          'name':'张老师',
          'job':'体育'
        },
        {
          'img':'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2423306135,382863587&fm=117&gp=0.jpg',
          'name':'李老师',
          'job':'科学'
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
    this.boxwid = this.teachers.length * 200 +'px'
    this.$store.state.isNav = true
    this.$store.state.title = '班级动态'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.box {
  height: 100px;
  position: relative;
  background:transparent;
}
.box-item {
  width: 180px;
  height: 100px;
  background-color:#fff;
  border-radius:15px;
  display:inline-block;
  margin-left: 15px;
  img{
    width:4rem;
    margin-top:1rem;
    margin-left:1rem;
    border-radius:50%;
  }
  span:nth-child(2){
    color:@c5;
    font-size:1.5rem;
    position:absolute;
    top:2rem;
    margin-left:.5rem;
  }
  span:nth-child(3){
    color:@c3;
    position:absolute;
    top:5rem;
    margin-left:1.5rem;
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
    color:@c5;
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
    background:@c6;
    position:absolute;
    left:4em;
    top:1em;
  }
  div:nth-child(2){
    margin-left:4em;
    margin-top:1em;
    color:@c3;
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
    background:@c6;
    position:absolute;
    right:4em;
    top:1em;
  }
  div:nth-child(3){
    color:@c5;
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
      color:@c4;
    }
    span:nth-child(4){
      position:absolute;
      top:2rem;
      right:1.5rem;
      border:1px solid @c5;
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
      color:@c5;
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
      background-color:transition;
      position:relative;
      bottom:-1.3em;
    }
    .comment{
      margin-top:2em;
      margin-bottom:1em;
      padding:1em .5em .5em .5em;
      background:@c1;
      border-radius:10px;
      li{
        width:100%;
        span:nth-child(1){
          color:@c5;
        }
        span:nth-child(2){
          width:100%;
        }
      }
      div{
        text-align:center;
        border-top:1px solid @c5;
        margin-top:0.5em;
        padding-top:0.5em;
      }
    }
  }

}
</style>
