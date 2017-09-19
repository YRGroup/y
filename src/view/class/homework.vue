<template>
  <div class="work">

    <div class="workcard">
      <div class="header">
        <span class="auther">{{ homework.AutherName }}</span>
        <span class="time">{{ homework.CreateTime }}</span>
        <span class="category" :style="{background:colors[homework.CourseName]}">{{ homework.CourseName }}</span>
      </div>
      <div class="title">{{homework.Title}}</div>
      <div class="content">
        <div>{{homework.Content}}</div>
        <div class="img" v-if="homework.Albums">
          <div class="imgCon" :style="{backgroundImage: 'url\('+imgurl+'\)'}" v-for="(imgurl,index) in homework.Albums" :key="index" @click="imgPopup(imgurl)">
          </div>
        </div>
      </div>
    </div>

    <popup v-model="showImgPopup" is-transparent>
      <div class="popup" @click="showImgPopup=false">
        <img :src="popupImgUrl">
      </div>
    </popup>

  </div>
</template>

<script>
import { Popup, Group, XTextarea, XButton, Selector } from 'vux'

export default {
  components: {
    Popup,
    Group,
    XTextarea,
    Selector,
    XButton
  },
  data() {
    return {
      newHomework: false,
      newHomeworkData: {},
      course_list: [
        { key: '1', value: '语文' },
        { key: '2', value: '数学' },
        { key: '3', value: '英语' },
        { key: '4', value: '物理' },
        { key: '5', value: '化学' },
        { key: '6', value: '历史' },
        { key: '7', value: '政治' },
        { key: '8', value: '地理' },
        { key: '9', value: '音乐' },
        { key: '10', value: '美术' },
        { key: '11', value: '体育' }
      ],
      colors: {
        '语文': '#fe6867',
        '数学': '#ffce31',
        '英语': '#8b8efb',
        '物理': '#ff80c0',
        '化学': '#50c7ee',
        '历史': '#ff9f22',
        '政治': '#01c19e',
        '地理': '#34495e',
        '音乐': '#95a5a6',
        '美术': '#1abc9c',
        '体育': '#2ecc71'
      },
      homework: {},
      showImgPopup: false,
      popupImgUrl: ''
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
    getHomeWork() {
      this.$API.getHomework(this.$route.params.homeworkId).then(res => {
        this.homework = res
      })
    },
    addHomework() {
      if (this.newHomeworkData.course_name && this.newHomeworkData.content) {
        this.newHomeworkData.class_id = this.$store.state.currentClassId
        this.newHomeworkData.title = ''
        this.$API.addHomework(this.newHomeworkData).then(res => {
          this.$vux.toast.show({
            type: "success",
            text: "发布成功"
          })
          this.newHomework = false
          this.getHomeWork()
        })
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "数据不完整"
        })
      }
    }
  },
  created() {
    this.$store.commit('changeTitle', '班级作业')
    this.getHomeWork()
  }
}
</script>

<style lang="less" scoped>
.addbtn {
  padding: 1rem;
}

.workcard {
  background: #fff;
  padding: 1rem 0;
  margin: .6rem;
  .header {
    padding: 0 1rem;
    height: 2rem;
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid @border;
    .category {
      float: right;
      color: #fff;
      width: 2.4em;
      font-size: 1.2em;
      line-height: 2em;
      text-align: center;
      border-radius: 6px;
      margin-top: -0.1em;
      padding:0 10px;
    }
    .auther {
      font-size: 1.2em;
    }
    .time {
      // float: right;
      color: @grey;
    }
  }
  .title {
    text-align: center;
    font-size: 1.2rem;
  }
  .content {
    padding:0 1rem;
    margin: 0.5rem 0 1rem 0;
    line-height: 1.8em;
    .img {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .imgCon {
        width: calc(~"(100% - 30px) / 3");
        height: 100px;
        background-position: center;
        background-size: cover;
        margin: 5px;
      }
    }
  }
  .footer {
    color: @grey;
    text-align: right;
  }
}

.popup {
  width: 95%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  padding-top: 10px;
  text-align: center;
}
</style>
