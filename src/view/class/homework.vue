<template>
  <div class="work">

    <div class="workcard">
      <div class="header">
        <span class="category" :style="{background:colors[homework.CourseName]}">{{ homework.CourseName }}</span>
        <span class="auther">{{ homework.AutherName }}</span>
      </div>
      <div class="title">{{homework.Title}}</div>
      <div class="content">
        <div>{{homework.Content}}</div>
        <div class="img" v-if="homework.Albums">
          <img :src="imgurl" v-for="(imgurl,index) in homework.Albums" :key="index" @click="imgPopup(imgurl)">
        </div>
      </div>
      <div class="footer">{{ homework.CreateTime }}</div>
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
        '语文': '#1abc9c',
        '数学': '#2ecc71',
        '英语': '#3498db',
        '物理': '#9b59b6',
        '化学': '#f1c40f',
        '历史': '#e67e22',
        '政治': '#e74c3c',
        '地理': '#34495e',
        '音乐': '#95a5a6',
        '美术': '#1abc9c',
        '体育': '#2ecc71'
      },
      homework: {},
      showImgPopup: false,
      popupImgUrl:''
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
  padding: 1rem;
  margin: .6rem;
  .header {
    height: 2rem;
    .category {
      float: left;
      padding: .3rem 1rem;
      color: #fff;
      border-radius: 5px;
    }
    .auther {
      float: right;
      padding-right: 1rem;
      color: @grey;
    }
  }
  .title {
    text-align: center;
    font-size: 1.5rem;
  }
  .content {
    margin: 1rem 0;
    .img {
      img {
        margin: 5%;
        max-height: 100px;
        max-width: 100px;
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
