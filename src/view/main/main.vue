<template>
  <div class="content">
    
    <!--轮播图-->
    <swiper loop auto :list="swiperdate"></swiper>

    <!--功能导航-->
    <!--<flexbox wrap="wrap" :gutter="0">
      <flexbox-item :span="4" v-for="i in icon_nav" :key="i">
        <router-link :to="i.link">
          <div :style="{background:i.color}"><:name="i.icon" scale="4"></icon></div>
          <span>{{i.title}}</span>
        </router-link>
      </flexbox-item>
    </flexbox>-->

    <flexbox wrap="wrap" :gutter="0">
      <flexbox-item :span="4">
        <router-link to="/main">
          <div style="background:#fe970f"><i class="iconfont">&#xe649;</i></div>
          <span>通知</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/class">
          <div style="background:#8f59ff"><i class="iconfont">&#xe672;</i></div>
          <span>班级</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/main">
          <div style="background:#28cb60"><i class="iconfont">&#xe668;</i></div>
          <span>作业</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/user">
          <div style="background:#0ab9f7"><i class="iconfont">&#xe601;</i></div>
          <span>成绩报告</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/main">
          <div style="background:#ff5251"><i class="iconfont">&#xe629;</i></div>
          <span>消息</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/main">
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
        <router-link to="/main">
          <div style="background:#8dc62c"><i class="iconfont">&#xe737;</i></div>
          <span>校园新闻</span>
        </router-link>
      </flexbox-item>
      
    </flexbox>
    <br />

    <!--集团动态-->
    <!--</br>
      <tab>
        <tab-item selected @on-item-click="fun('显示集团动态')">集团动态</tab-item>
        <tab-item @on-item-click="getnews">校园动态</tab-item>
      </tab>

    <card v-for="item in list" :key="item.date">
      <div slot="header" class="header">
        <img :src="item.img" @click="fun('打开 '+item.name+' 的个人页面')">
        <span>{{ item.name }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.category }}</span>
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
    </card>-->

  </div>
</template>

<script>
import { Swiper,Flexbox,FlexboxItem,Card,Tab, TabItem  } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper,Flexbox,FlexboxItem,Card,Tab, TabItem
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
      ],
      icon_nav:[
        {
          link:'/main',
          title:'通知',
          icon:'聊天',
          color:'#fe970f'
        },
        {
          link:'/class',
          title:'班级',
          icon:'班级',
          color:'#8f59ff'
        },
        {
          link:'/main',
          title:'作业',
          icon:'笔记',
          color:'#28cb60'
        },
        {
          link:'/user',
          title:'成绩报告',
          icon:'资料',
          color:'#0ab9f7'
        },
        {
          link:'/main',
          title:'消息',
          icon:'评论',
          color:'#ff5251'
        },
        {
          link:'/main',
          title:'一卡通',
          icon:'student',
          color:'#fbc700'
        },
        {
          link:'/main',
          title:'校园新闻',
          icon:'浏览',
          color:'#ff5498'
        },
        {
          link:'/main',
          title:'校园新闻',
          icon:'student',
          color:'#4ea7e4'
        }
      ],
      list:[
        {
          'img':require('@/assets/logo/nz.jpg'),
          'name':'外国语女子中学',
          'date':'2017-4-25',
          'category':'新闻动态',
          'content':'郑州外国语女子中学2017届毕业生在中招理化生实验考试中表现优异，再创新高，满分率达到75%，优秀率达到95%，平均分29.4分。一份付出就有一份收获，郑外女中九年级全体理化生老师做到：静心训练，精心操作，耐心指导，从严从实，培优补差，实现了“实验满分，志在必得”的目标。',
          'read':'40',
          'liked':'3',
          'comment':[
            {
              'name':'热心的同学家长',
              'content':'祝愿女中姑娘们再接再厉，在接下来的中招考试中再创辉煌！'
            },
            {
              'name':'小李',
              'content':'再一次，让你泪流满面。'
            }
          ]
        },
        {
          'img':require('@/assets/logo/gz.jpg'),
          'name':'育人高级中学',
          'date':'2017-5-4',
          'category':'校园活动',
          'content':'2017年4月23日是第12个“世界读书日”，这是书的节日，也是读书人的节日。人类的阅读史几乎就是人类文明的发展史，书是人类精神财富的载体，人类的点滴进步和成果都在书籍里记录、传承并发扬光大。',
          'read':'40',
          'liked':'3',
          'comment':[
            {
              'name':'爱读书的同学',
              'content':'让我们伴随着书，在蓝天下张开搏击的翅膀，在大海上扬起远航的风帆，让这回声，历久弥新，在我们心中永远激荡！'
            },
            {
              'name':'郑州育人高级中学',
              'content':'如果你想聆听更多我们的声音，就请关注我们吧！'
            }
          ]
        },
        {
          'img':require('@/assets/logo/gj.png'),
          'name':'育人国际学校',
          'date':'2016-11-23',
          'category':'校园活动',
          'content':'2016年11月23日，在教务处的精心安排和数学组老师们的积极配合下，郑州航空港育人国际学校成功地举办了第一届口算比赛。为培养学生娴熟的口算技巧，本次比赛以年级为单位，五百多学生参加了这次活动。比赛试题形式灵活多样，题量适中，难易程度层次分明，让参与的学生在轻松的氛围中完成了比赛项目。',
          'read':'400',
          'liked':'30',
          'comment':[
            {
              'name':'激动的家长',
              'content':'我家的小宝得了二等奖！感谢老师们的辛勤教诲！祝育人越来越好！'
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
    },
    getnews(){
      this.$http.get('http://192.168.3.195:3000/school/post').then((res)=>{
        this.list = res.data
        console.log(this.list)
      })
    }
  },
  created(){
    this.$store.state.isNav = true
    this.$store.state.title = '校园动态'
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


</style>
