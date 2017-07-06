<template>
  <div>

    <div class="notice" >
      <div class="icon">
        <span>通知</span>
      </div>
      <div class="title">周三开运动会，请全体师生按时参加</div>
      <div class="info">
        <span class="auther">校长</span>
        <span class="time">5-11 14:00</span>
      </div>
    </div>

    <card v-for="(item,index) in list" :key="index">
      <div slot="header" class="header">
        <img :src="item.userImg" @click="fun('打开 '+item.name+' 的个人页面')">
        <span class="usename">{{ item.auther }}</span>
        <span class="time">{{ item.date }}</span>
        <span class="tips">{{ item.category }}</span>
      </div> 
      <div slot="content" class="content">
        <p @click="$router.push('/news')">{{ item.content }}</p>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <i class="iconfont lick" @click="doLike(item.id),item.like++">&#xe646; {{ item.like }}</i>
          <i class="iconfont combtn">&#xe6c3; {{ item.read }}</i>
        </div>  
        <div class="comment">
          <li v-for="(comment,index) in item.comment" v-if="index<3" :key="index">
            <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.userName }}：</span>
            <span>{{ comment.content }}</span>
          </li>
          <div class="hasNoComment" v-show="item.comment.length===0">还没有评论</div>
          <div class="more" @click="$router.push('/school/news/'+item.id)">
            查看更多
          </div>
        </div>
      </div> 
    </card>

  </div>
</template>

<script>
import { Scroller,Flexbox,FlexboxItem,Card,Tab,TabItem } from 'vux'

export default {
  components: {
    Scroller,Flexbox,FlexboxItem,Card,Tab,TabItem
  },
  data () {
    return {
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
  computed:{

  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    getData(){
      this.$API.getAllClassDynamic(this.$store.state.classId).then(res=>{
        this.list = res
      })
    },
    getTeacherList(){
      this.$API.getTeacherList(this.$store.state.classId).then(res=>{
        this.teachers = res
        this.boxwid = res.length * 100 +'px'
      })
    },
    doLike(id){
      this.$API.doLikeThisPost(id).then(res=>{
        this.$vux.toast.show({
          type:"success",
          text: '点赞成功'
        })
      })
    }
  },
  created(){
    this.$store.commit('changeTitle','班级动态')
    this.getData()
    this.getTeacherList()
  },
  mounted(){
    // this.boxwid = this.teachers.length * 100 +'px'
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 7rem;
  position: relative;
  background:transparent;
  background-color:#fff;
  min-width: 100vw;
}
.box-item {
  width: 5rem;
  height: 6rem;
  border-radius:15px;
  display:inline-block;
  margin-left: 15px;
  img{
    width:4rem;
    margin-top:.5rem;
    margin-left:.5rem;
    border-radius:50%;
  }
  span:nth-child(2){
    color:#000;
    font-size:0.7rem;
    display:block;
    text-align: center;
  }
}
.box-item:first-child {
  margin-left: 1rem;
}

.classWork{
  margin-top:0.8rem;
  margin-bottom:0.8rem;
  background:#fff;
  height:4em;
  padding:.5em;
  position:relative;
  div:nth-child(1){
    color:@c6;
    width:2.2em;
    position:absolute;
    left:1em;
    top:1em;
  }
  div:nth-child(2):before{
    content:"";
    display:block;
    width:1px;
    height:4em;
    background:@c6;
    position:absolute;
    left:4em;
    top:.5em;
  }
  div:nth-child(2){
    margin-left:4em;
    margin-top:.5em;
    color:@c3;
    li{
      span:nth-child(1){
        white-space:nowrap;
      }
      span:nth-child(2){
        position:absolute;
        right:5em;
        z-index:100;
        background: #fff;
        color:@c4;
        padding-left:0.5em;
        // float:right;
        // margin-right:5em;
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
    top:.5em;
  }
  div:nth-child(3){
    color:@c4;
    width:1em;
    position:absolute;
    right:2em;
    top:1em;
  }
}

.notice{
  height:3rem;
  background: #fff;
  margin-bottom:1rem;
  padding:.5rem;
  width: 100%;
  .icon{
    width:3rem;
    height: 3rem;
    display: inline-block;
    background: orangered;
    color:#fff;
    text-align: center;
    border-radius: 5px;
    span{
      line-height:3rem;
    }
  }
  .title{
    margin-top:-2.7rem;
    margin-left:4rem;
  }
  .info{
    margin-left:4rem;
    color:#ccc;
  }
}
</style>
