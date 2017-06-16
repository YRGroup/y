<template>
  <div class="classMain">

    <!--班级通知
  教师端显示
  -->
    <div class="notice" v-if="notice.length!=0">
      <div class="icon" @click="$router.push('/class/'+$store.state.classId+'/notice')">
        <span>通知</span>
      </div>
      <div class="title">{{notice.content}}</div>
      <div class="info">
        <span class="auther">{{notice.auther}}</span>
        <span class="time">{{notice.date}}</span>
      </div>
    </div>
  
    <!--教师列表
  教师端不显示
  家长端显示
  -->

      <div class="teacherListBox">
        <div class="box-item" v-for="item in teachers" @click="$router.push('/teacher/'+item.Meid)">
          <img :src="item.Headimgurl">
          <div class="name">{{ item.TrueName }}</div>
          <div class="job">{{ item.Sex }}</div>
        </div>
      </div>

  
    <!--班级作业
  教师端不显示
  家长端显示
  -->
    <div class="classWork" v-if="homework!=[]">
      <div class="icon">
        <span>班级作业</span>
      </div>
      <div class="content">
        <li v-for="i in homework" @click="$router.push('/class/'+$store.state.classId+'/work')">
          <div class="msg">
           【 {{ i.CourseName }}】：{{ i.Content }}
          </div>
          <div class="date">{{ i.CreateTime }}</div>
        </li>
      </div>
      <div class="link" @click="$router.push('/class/'+$store.state.classId+'/work')">
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
        <pre @click="$router.push('/class/'+$store.state.classId+'/msg/'+item.id)">{{ item.content }}</pre>
        <div class="img">
          <img @click="imgPopup(imgurl)" :src="'http://api.test.com'+imgurl" v-if="item.albums.length!=0" v-for="imgurl in item.albums">
        </div>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <!--<i class="iconfont view" @click="$router.push('/class/msg')">&#xe60f;  </i>-->
          <i class="iconfont lick" @click.once="doLike(item.id),item.like++">&#xe646; {{ item.like }}</i>
          <i class="iconfont combtn">&#xe6c3; {{ item.read }}</i>
        </div>
        <div class="comment">
          <li v-for="(comment,index) in item.comment" v-if="item.comment.length!=0&&index<3" :key="index">
            <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.userName }}：</span>
            <span>{{ comment.content }}</span>
          </li>
          <div class="hasNoComment" v-show="item.comment.length===0">还没有评论</div>
          <div class="more" @click="$router.push('/class/'+$store.state.classId+'/msg/'+item.id)">
            查看详情
          </div>
        </div>
      </div>
    </card>

    <popup v-model="showImgPopup" is-transparent>
      <div class="popup" @click="showImgPopup=false">
        <img :src="popupImgUrl" >
      </div>
    </popup>
  
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Card, Popup,Tab, TabItem,WechatEmotion as Emotion } from 'vux'

export default {
  components: {
    Flexbox, FlexboxItem, Card,Popup, Tab, TabItem,Emotion
  },
  data() {
    return {
      boxwid: null||'1500px',
      showImgPopup:false,
      popupImgUrl:'',
      teachers: [],
      notice: [],
      homework: [],
      list: []
    }
  },
  computed: {
    
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    imgPopup(val){
      this.popupImgUrl='http://api.test.com'+val
      this.showImgPopup=true
    },
    getAllClassDynamic() {
      this.$API.getAllClassDynamic(this.$route.params.classId).then((res) => {
        this.list = res
        this.$vux.loading.hide()                
      }).catch(err => {
        console.log(err)
      })
    },
    getTeacherList() {
      this.$API.getTeacherList(this.$route.params.classId).then((res) => {
        this.teachers = res
        this.boxwid = res.length * 100 + 'px'
        console.log(this.boxwid)
      }).catch(err => {
        console.log(err)
      })
    },
    getNotice() {
      this.$API.getAllClassDynamic(this.$route.params.classId, 3, 1).then((res) => {
        console.log('获取到的班级通知第一条：')
        console.log(res)
        this.notice = res[0]
      }).catch(err => {
        console.log(err)
      })
    },
    getHomeWork() {
      this.$API.getHomeworkList(this.$route.params.classId,2).then((res) => {
        console.log('获取班级作业前两条：')
        console.log(res)
        this.homework = res
      }).catch(err => {
        console.log(err)
      })
    },
    doLike(id) {
      this.$API.doLikeThisPost(id).then((res) => {
        this.$vux.toast.show({
          type: "success",
          text: '点赞成功'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.$vux.loading.show({
      text: 'Loading'
    })
    this.$store.commit('showNav', true)
    this.$store.commit('changeTitle', '班级动态')
    this.getAllClassDynamic()
    this.getTeacherList()
    this.getNotice()
    this.getHomeWork()
    this.$store.commit('showclassHeader',true)
  }
}
</script>

<style lang="less" scoped>
.classMain{
  overflow-x: hidden;
}
.teacherListBox {
  position: relative;
  background: transparent;
  background-color: #fff;
  white-space: nowrap;
  overflow-x: scroll;
  min-width: 100vw;
  padding:10px 0;
  box-sizing: border-box;
  .box-item {
    width: 5rem;
    border-radius:15px;
    display:inline-block;
    margin-left: 10px;
    text-align: center;
    img{
      width:3.6rem;
      border-radius:50%;
    }
  }
  .box-item:first-child {
    margin-left: 1rem;
  }
}
.header{
  .tips{
    font-size: 0.8em;
  }
}

.classWork {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  background: #fff;
  height: 4em;
  padding: .5em;
  position: relative;
  .icon {
    color: @cc6;
    width: 2.2em;
    position: absolute;
    left: 1em;
    top: 1em;
    font-size: 1.1em;
    line-height: 1.4em;
  }
  .content:before {
    content: "";
    display: block;
    width: 1px;
    height: 4em;
    background: @cc4;
    position: absolute;
    left: 4em;
    top: .5em;
  }
  .content {
    margin-left: 4em;
    margin-top: .5em;
    li {
      display: block;
      position: relative;
      height:1.5em;
      .msg {
        display: inline-block;
        width:17em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date {
        z-index: 100;
        background: #fff;
        color: @cc3;
        padding-left: 0.5em;
        width: 6em;
        right: 4em;
        top:0;
        position: absolute;
      }
    }
  }
  .content:after {
    content: "";
    display: block;
    width: 1px;
    height: 4em;
    background: @cc4;
    position: absolute;
    right: 4em;
    top: .5em;
  }
  .link {
    color: @cc2;
    width: 1em;
    position: absolute;
    right: 1.6em;
    top: 1em;
  }
}

.notice {
  height: 3rem;
  background: #fff;
  margin-bottom: 1rem;
  padding: .5rem;
  // width: 100%;
  .icon {
    width: 3rem;
    height: 3rem;
    display: inline-block;
    background: #ff8e00;
    color:#fff;
    text-align: center;
    border-radius: 5px;
    span {
      line-height: 3rem;
    }
  }
  .title{
    margin-top:-2.7rem;
    margin-left:4rem;
    font-size: 1rem;
  }
  .info {
    margin-left: 4rem;
    color: #ccc;
  }
}
.popup{
  text-align: center;
  padding:1rem;
}
</style>
