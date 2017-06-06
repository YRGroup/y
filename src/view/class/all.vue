<template>
  <div>

<!--班级通知
教师端显示
-->
    <div class="notice" >
      <div class="icon">
        <span>通知</span>
      </div>
      <div class="title">周三开家长会，请全体家长按时参加</div>
      <div class="info">
        <span class="auther">班主任</span>
        <span class="time">5-11 14:00</span>
      </div>
    </div>

<!--教师列表
教师端不显示
家长端显示
-->
    <scroller lock-y scrollbar-x >
      <div class="box" :style="{ width: boxwid}">
        <div class="box-item" v-for="item in teachers" @click="$router.push('/teacher/'+item.Meid)">
          <img :src="item.Headimgurl">
          <span>{{ item.TrueName }}</span>
        </div>
      </div>
    </scroller>

<!--班级作业
教师端不显示
家长端显示
-->
    <div class="classWork"  @click="$router.push('/class/'+$store.state.classId+'/work')" >
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

<!--动态卡片
教师端显示
家长端显示
-->
    <card v-for="(item,index) in list" :key="index">
      <div slot="header" class="header">
        <img :src="item.userImg" @click="$router.push('/teacher/'+item.auther_meid)">
        <span class="usename">{{ item.auther }}</span>
        <span class="time">{{ item.date }}</span>
        <span class="tips">{{ item.category }}</span>
      </div> 
      <div slot="content" class="content">
        <p @click="$router.push('/class/msg')">{{ item.content }}</p>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <!--<i class="iconfont view" @click="$router.push('/class/msg')">&#xe60f;  </i>-->
          <i class="iconfont lick" @click="doLike(item.id),item.like++">&#xe646; {{ item.like }}</i>
          <i class="iconfont combtn">&#xe6c3; {{ item.read }}</i>
        </div>  
        <div class="comment">
          <li v-for="(comment,index) in item.comment" v-if="index<3" :key="index">
            <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.userName }}：</span>
            <span>{{ comment.content }}</span>
          </li>
          <div class="hasNoComment" v-show="item.comment.length===0">还没有评论</div>
          <div class="more" @click="$router.push('/class/'+$store.state.classId+'/msg/'+item.id)">
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
      boxwid:'500px',
      teachers:[],
      notice:[
        {
          "class":'语文',
          'msg':'唐诗三百首读后感一篇',
          'date':'4.26'
        },
        {
          "class":'数学',
          'msg':'二次幂和公式的推倒过程',
          'date':'4.25'
        }
      ],
      list:[]
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
        console.log('获取到的班级动态：')
        console.log(res)
        this.list = res
      }).catch(err=>{
        console.log(err)
      })
    },
    getTeacherList(){
      this.$API.getTeacherList(this.$store.state.classId).then(res=>{
        console.log('获取到的教师列表：')
        console.log(res)
        this.teachers = res
        this.boxwid = res.length * 100 +'px'
      }).catch(err=>{
        console.log(err)
      })
    },
    doLike(id){
      this.$API.doLikeThisPost(id).then(res=>{
        this.$vux.toast.show({
          type:"success",
          text: '点赞成功'
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
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
    font-size: 1.1em;
    line-height: 1.4em;
  }
  div:nth-child(2):before{
    content:"";
    display:block;
    width:1px;
    height:4em;
    background:@c2;
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
    background:@c2;
    position:absolute;
    right:4em;
    top:.5em;
  }
  div:nth-child(3){
    color:@c4;
    width:1em;
    position:absolute;
    right:1.6em;
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
