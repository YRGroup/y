<template>
  <div class="content">
    <div class="follow">
        <span class="tips"><i class="iconfont">&#xe620;</i></span>
        <!--<span class="text">您还没有关注公共账号！</span>-->
        <marquee class="text" direction="left">您还没有关注公共账号,关注后可收到学生在校动态！</marquee>
        <x-button class="right" mini type="primary" @click.native="fun('关注跳转')"><i class="iconfont">&#xe61f;</i>关注</x-button>
    </div>
    
    <!--轮播图-->
    <swiper loop auto :list="swiperdate"></swiper>

    <!--功能导航-->
    <flexbox wrap="wrap" :gutter="0">
      <!--<flexbox-item :span="4">
        <router-link :to="'/class/'+$store.state.classId+'/notice'">
          <div style="background:#fe970f"><i class="iconfont">&#xe649;</i></div>
          <span>通知</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link :to="'/class/'+$store.state.classId">
          <div style="background:#8f59ff"><i class="iconfont">&#xe672;</i></div>
          <span>班级</span>
        </router-link>
      </flexbox-item>-->
      <flexbox-item :span="4">
        <router-link :to="'/class/'+$store.state.currentClassId+'/work'">
          <div style="background:#28cb60"><i class="iconfont">&#xe668;</i></div>
          <span>作业</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link :to="'/student/'+$store.state.currentStudentId+'/score/1'">
          <div style="background:#0ab9f7"><i class="iconfont">&#xe601;</i></div>
          <span>成绩报告</span>
        </router-link>
      </flexbox-item>
      <!--<flexbox-item :span="4">
        <router-link to="/contact">
          <div style="background:#ff5251"><i class="iconfont">&#xe629;</i></div>
          <span>消息</span>
        </router-link>
      </flexbox-item>-->
      <flexbox-item :span="4">
        <router-link :to="'/student/'+$store.state.currentStudentId+'/schoolcard'">
          <div style="background:#fbc700"><i class="iconfont">&#xe602;</i></div>
          <span>一卡通</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/main">
          <div style="background:#ff5498"><i class="iconfont">&#xe604;</i></div>
          <span>资料库</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/school">
          <div style="background:#8dc62c"><i class="iconfont">&#xe737;</i></div>
          <span>校园新闻</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/addon/reader">
          <div style="background:#fe970f"><i class="iconfont">&#xe737;</i></div>
          <span>朗读者</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/addon/idol">
          <div style="background:#8f59ff"><i class="iconfont">&#xe737;</i></div>
          <span>iDOL</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/addon/interview">
          <div style="background:#28cb60"><i class="iconfont">&#xe737;</i></div>
          <span>谈话录</span>
        </router-link>
      </flexbox-item>
    </flexbox>
    <br />

  </div>
</template>

<script>
import { Swiper,Flexbox,FlexboxItem,XButton  } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper,Flexbox,FlexboxItem,XButton 
  },
  data () {
    return {
      swiperdate:[
        { url: 'http://www.gy720.com/pano/view/6556',
          img: require('@/assets/img/s1.jpg'),
          title: '郑州航空港育人国际学校'
        },
        { url: 'http://www.gy720.com/pano/view/6621',
          img: require('@/assets/img/s2.jpg'),
          title: '郑州航空港区育人高级中学'
        },
        { url: 'http://www.gy720.com/pano/view/6614',
          img: require('@/assets/img/s3.jpg'),
          title: '郑州外国语女子中学'
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
    },
    getnews(){
      this.$http.get('http://192.168.3.195:3000/school/post').then((res)=>{
        this.list = res.data
        console.log(this.list)
      })
    },
    mytest(){
      this.$router.push('/msg')
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','校园动态')
  }
}
</script>

<style lang="less" scoped>
.content{
  background: #fff;
}
.vux-flexbox{
  text-align: center;
  padding:1em 0;
  background-color: white;
  height: 100%;
  .vux-flexbox-item{
    cursor:pointer; 
    margin:0.5em 0;
      div{
        border-radius: 50%;
        margin: 1em auto 0 auto;
        width:6em;
        height:6em;
        line-height:6em;
        color:white;
        svg{
          margin-top:.2em;
        }
        i{
          font-size: 3em;
          text-shadow: 2px 2px 1px rgba(0,0,0,.1);
        }
      }
    span{
      line-height:2em;
    }
  }
}

.follow{
  font-size: 1em;
  height: 3em;
  line-height: 3em;
  padding:0 1em;
  background: #fcefbf;
  color:#666;
  overflow: hidden;
  position: relative;
  .tips{
    color:#f76260;
    font-size: 1.6em;
    margin-right: 5px;
  }
  .text{
    position: absolute;
    left: 3em;
    font-size: 1.2em;
    width: 70%;
  }
  .right{
    position: absolute;
    right:1em;
    top:0.3em;
  }
  .weui-btn{
    padding:0 10px;
    background: @cc7;
    .iconfont{
      margin-right: 5px;
    }
  }
}

</style>
