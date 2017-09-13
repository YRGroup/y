<template>
  <div class="work">

    <div class="addbtn" v-show="$store.state.role == '老师'">
      <x-button class="" mini @click.native="$router.push('/class/newhomework')" type="primary" plain>发布新作业</x-button>
    </div>

    <popup v-model="newHomework" height="310px" is-transparent>
      <div class="popup">
        <group>
          <selector title="学科" :options="course_list" v-model="newHomeworkData.course_id"></selector>
          <x-textarea title="作业" placeholder="请输入作业内容" v-model="newHomeworkData.content"></x-textarea>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addHomework">发布</x-button>
          <x-button @click.native="newHomework = false">取消</x-button>
        </div>
      </div>
    </popup>
    <group v-if="nodataImg">
      <no-data></no-data>
    </group>
    <div v-else>
      <div class="workcard" v-for="(i,index) in homework" :key="index">
        <div class="header">
          <span class="auther">{{ i.AutherName }}</span>
          <span class="time">{{ i.CreateTime }}</span>
          <span class="category" :style="{background:colors['语文']}">{{ i.CourseName }}</span>
        </div>
        <div class="title" @click="$router.push('/class/homework/'+i.HID)">{{i.Title}}</div>
        <div class="content">
          <div @click="$router.push('/class/homework/'+i.HID)">{{i.Content}}</div>
          <div class="img" v-if="i.Albums">
            <img :src="imgurl" v-for="(imgurl,index) in i.Albums" :key="index" @click="imgPopup(imgurl)">
          </div>
        </div>
        <!-- <div class="footer">{{ i.CreateTime }}</div> -->
      </div>
      <divider @click.native="loadMore" v-show="!noMoreData">点击加载更多</divider>
      <divider v-show="noMoreData" class="noMoreData">没有更多数据</divider>
      <popup v-model="showImgPopup" is-transparent>
        <div class="popup" @click="showImgPopup=false">
          <img :src="popupImgUrl">
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import noData from '@/components/noData'
import { Popup, Group, XTextarea, XButton, Selector, Divider } from 'vux'

export default {
  components: {
    Popup,
    Group,
    XTextarea,
    Selector,
    XButton, Divider, noData
  },
  data() {
    return {
      showImgPopup: false,
      nodataImg: false,
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
      homework: [],
      pageSize: 10,
      currentPage: 1,
      noMoreData: false,
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
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.pagesize = this.pageSize
      para.currentPage = this.currentPage
      this.$API.getHomeworkList(para).then(res => {
        if (res.length) {
          res.forEach((element) => {
            this.homework.push(element)
          })
        } else if (!res.length && this.currentPage == 1) {
          this.nodataImg = true
        } else if (!res.length && this.currentPage != 1) {
          this.noMoreData = true
        }
        this.boxwid = res.length * 100 + 'px'
      })
    },
    loadMore() {
      this.currentPage++
      this.getHomeWork()
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
  padding: 0.8rem;
  margin: 0 auto;
  text-align: center;
}

.workcard {
  background: #fff;
  padding: 1rem;
  margin: .6rem;
  .header {
    height: 2rem;
    .category {
      float: right;
      padding: .3rem 1rem;
      color: #fff;
      border-radius: 5px;
    }
    .auther {
      // float:right;
      padding-right: 1rem; // color: @grey;
      font-size: 1.2em; // margin: 3px 0 0 10px;
    }
    .time {
      // float: right;
      color: @grey;
    }
  }
  .title {
    // text-align: center;
    font-size: 1rem;
  }
  .content {
    margin: 0.5rem 0;
    .img {
      // width: 100%;
      // height:100px;
      img {
        margin: 10px;
        max-height: 80px;
        max-width: 80px;
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
