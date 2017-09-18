<template>
  <div class="classMain">

    <!--班级通知
    教师端显示
    -->
    <div class="notice" v-if="notice.length!=0">
      <div class="icon" @click="$router.push('/class/notice')">
        <span>通知</span>
      </div>
      <div class="title">{{notice.content}}</div>
      <div class="info">
        <span class="auther">{{notice.auther}}</span>
        <span class="time">{{notice.date}}</span>
      </div>
    </div>

    <!-- <card style="padding:0" :header="{title:'班级管理菜单'}" v-show="$store.state.role=='老师'">
        <div slot="content">
          <cell title="考试列表" is-link @click.native="$router.push('/class/exam')"></cell>
        </div>
      </card> -->

    <div class="teacherListBox" v-show="this.teachers.length">
      <div class="box-item" v-for="(item,index) in teachers" :key="index" @click="$router.push('/teacher/'+item.Meid)">
        <img :src="item.Headimgurl">
        <div class="name">{{ item.TrueName ||'&nbsp;' }}</div>
        <div class="job">{{ item.Course ||'&nbsp;' }}</div>
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
      <div class="content" v-if="homework.length">
        <li v-for="(i,index) in homework" :key="index" @click="$router.push('/class/work')">
          <div class="msg">
            【 {{ i.CourseName }}】：{{ i.Title || '班级作业' }}
          </div>
          <div class="date">{{ i.CreateTime }}</div>
        </li>
      </div>
      <div class="content" v-else>
        <li>
          <div class="msg">
            班级暂时没有作业
          </div>
        </li>
      </div>
      <div class="link" @click="$router.push('/class/work')">
        <span>更多</span>
      </div>
    </div>

    <!--动态卡片
    教师端显示
    家长端显示
    -->
    <card v-for="(item,index) in list" :key="index">
      <div slot="header" class="header">
        <!-- <img :src="item.userImg" @click="$router.push('/teacher/'+item.auther_meid)"> -->
        <img :src="item.userImg">
        <span class="usename">{{ item.auther }}</span>
        <span class="time">{{ item.date }}</span>
        <span class="tips">{{ item.category }}</span>
      </div>
      <div slot="content" class="content">

        <div @click="$router.push('/post/'+item.ID)">{{item.content}}</div>

        <div class="img" v-if="item.albums.length!=0">
          <div class="imgCon" :style="{backgroundImage: 'url\('+imgurl+'\)'}" v-for="(imgurl,index) in item.albums" :key="index" @click="imgPopup(imgurl)">
          </div>
        </div>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <!--<i class="iconfont view" @click="$router.push('/post')">&#xe60f;  </i>-->
          <i class="iconfont lick" @click="doLike(item.ID),item.like++">&#xe646; {{ item.like }}</i>
          <i class="iconfont combtn">&#xe6c3; {{ item.read }}</i>
        </div>
        <div class="comment" v-if="item.comment.length !== 0">
          <li v-for="(comment,index) in item.comment" v-if="item.comment.length!=0&&index<3" :key="index">
            <span @click="fun('打开 '+comment.TrueName+' 的个人页面')">{{ comment.TrueName }}：</span>
            <span>{{ comment.content }}</span>
          </li>
          <!--<div class="hasNoComment" v-show="item.comment.length===0">还没有评论</div>-->

          <div class="more" @click="$router.push('/post/'+item.ID)">
            查看详情
          </div>
        </div>
      </div>
    </card>

    <divider @click.native="loadMore" v-show="!noMoreData">点击加载更多</divider>
    <divider v-show="noMoreData" class="noMoreData">没有更多数据</divider>

    <popup v-model="showImgPopup" is-transparent>
      <div class="popup" @click="showImgPopup=false">
        <img :src="popupImgUrl">
      </div>
    </popup>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Card, Popup, Tab, TabItem, Divider, Cell } from 'vux'

export default {
  components: {
    Flexbox, FlexboxItem, Card, Popup, Tab, TabItem, Divider, Cell
  },
  data() {
    return {
      boxwid: null || '1500px',
      showImgPopup: false,
      popupImgUrl: '',
      teachers: [],
      notice: [],
      homework: [],
      list: [],
      pageSize: 10,
      currentPage: 1,
      noMoreData: false,
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    imgPopup(val) {
      this.popupImgUrl = val
      this.showImgPopup = true
    },
    getAllClassDynamic() {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.type = 1
      para.pagesize = this.pageSize
      para.currentPage = this.currentPage
      this.$API.getAllClassDynamic(para).then((res) => {
        if (res.length) {
          res.forEach((element) => {
            this.list.push(element)
          })
        } else {
          this.noMoreData = true
        }
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
      })
    },
    loadMore() {
      this.currentPage++
      this.getAllClassDynamic()
    },
    getTeacherList() {
      this.$API.getTeacherList(this.$store.state.currentClassId).then((res) => {
        this.teachers = res
        this.boxwid = res.length * 100 + 'px'
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
      })
    },
    getNotice() {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.type = 3
      para.pagesize = 1
      para.currentPage = 1
      this.$API.getAllClassDynamic(para).then((res) => {
        this.notice = res[0]
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
      })
    },
    getHomeWork() {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.pagesize = 2
      para.currentPage = 1
      this.$API.getHomeworkList(para).then((res) => {
        this.homework = res
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
      })
    },
    doLike(id) {
      this.$API.doLikeThisPost(id).then(() => {
        this.$vux.toast.show({
          type: "success",
          width: "20em",
          text: '点赞成功'
        })
      }).catch(err => {
        this.$vux.toast.show({
          type: "success",
          width: "20em",
          text: err.msg
        })
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '班级动态')
    this.getAllClassDynamic()
    if (!this.teachers.length) {
      this.getTeacherList()
    }
    // if(!this.notice.length){
    //   this.getNotice()
    // }
    if (!this.homework.length) {
      this.getHomeWork()
    }
  }
}
</script>

<style lang="less" scoped>
.classMain {
  overflow-x: hidden;
}

.teacherListBox {
  position: relative;
  background: transparent;
  background-color: #fff;
  white-space: nowrap;
  overflow-x: scroll;
  min-width: 100vw;
  padding: 10px 0;
  box-sizing: border-box;
  .box-item {
    width: 5rem;
    border-radius: 15px;
    display: inline-block;
    margin-left: 10px;
    text-align: center;
    img {
      width: 3.6rem;
      border-radius: 50%;
    }
  }
}

.header {
  .tips {
    font-size: 0.8em;
  }
}

.classWork {
  margin: @length 0;
  background: #fff;
  height: 4em;
  padding: .5em;
  position: relative;
  .icon {
    color: @main;
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
    background: @border;
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
      height: 1.5em;
      .msg {
        display: inline-block;
        width: 17em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date {
        z-index: 100;
        background: #fff;
        color: @grey;
        padding-left: 0.5em;
        width: 6em;
        right: 4em;
        top: 0;
        position: absolute;
      }
    }
  }
  .content:after {
    content: "";
    display: block;
    width: 1px;
    height: 4em;
    background: @border;
    position: absolute;
    right: 4em;
    top: .5em;
  }
  .link {
    color: @grey;
    width: 1em;
    position: absolute;
    right: 1.6em;
    top: 1em;
  }
}

.notice {
  height: 3rem;
  background: #fff;
  margin-bottom: @length;
  padding: .5rem; // width: 100%;
  .icon {
    width: 3rem;
    height: 3rem;
    display: inline-block;
    background: #ff8e00;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    span {
      line-height: 3rem;
    }
  }
  .title {
    margin-top: -2.7rem;
    margin-left: 4rem;
    font-size: 1rem;
  }
  .info {
    margin-left: 4rem;
    color: #ccc;
  }
}

.popup {
  text-align: center;
  padding: 1rem;
}
</style>
