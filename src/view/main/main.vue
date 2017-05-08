<template>
  <div class="hello">
    
    <swiper loop auto :list="swiperdate"></swiper>

    <flexbox>
      <flexbox-item>
        <router-link to="/main">
          <div><i class="fa fa-home" style="background:#ff8aad"></i></div>
          <span>校园新闻</span>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/class">
          <div><i class="fa fa-users" style="background:#52cfad"></i></div>
          <span>班级动态</span>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/user">
          <div><i class="fa fa-user-circle" style="background:#f6b63b"></i></div>
          <span>我的孩子</span>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <div @click="fun('建设中...')">
          <div><i class="fa fa-credit-card" style="background:#6ecefa"></i></div>
          <span>一卡通</span>
        </div>
      </flexbox-item>
    </flexbox>

    </br>
      <tab>
        <tab-item selected @on-item-click="fun('显示集团动态')">集团动态</tab-item>
        <tab-item @on-item-click="fun('显示学校动态')">校园动态</tab-item>
      </tab>

    <card v-for="item in list" :key="item.date">
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
      list:[
        {
          'img':require('@/assets/logo/nz.jpg'),
          'name':'外国语女子中学',
          'date':'2017-4-25',
          'class':'新闻动态',
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
          'class':'校园活动',
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
          'class':'校园活动',
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
    }
  },
  created(){
    this.$store.state.isNav = true
    this.$store.state.title = '校园动态'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>


.vux-flexbox{
  text-align: center;
  padding-top:1em;
  padding-bottom:1em;
  background-color: white;
  .vux-flexbox-item{
    cursor:pointer;
    div{
      width:100%;
      i{
        width:2em;
        height:2em;
        line-height:2em;
        border-radius: 2em;
        color:white;
        font-size: 2.3em;
      }
    }
    span{
      width:100%;
    }
  }
}


</style>
