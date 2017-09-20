<template>
  <div>
    <div class="card" v-for="(i,index) in data" :key="index" @click="openVideo(i)">
      <div class="img">
        <div class="cover">
          <i class="iconfont">&#xe63c;</i>
        </div>
        <img :src="i.CoverUrl||'http://img.mukewang.com/576b7afb00019e4906000338-240-135.jpg'">
      </div>
      <div class="content">
        <div class="title">{{i.Title}}</div>
        <div class="footer">
          <div class="auther">
            <i class="iconfont">&#xe678;</i>{{i.TrueName}}</div>
          <div class="category">
            <i class="iconfont">&#xe621;</i>{{i.Duration | formatTime}}</div>
            <!-- <i class="iconfont">&#xe621;</i>{{i.Tags.replace(/,/g,' ')}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from '@/components/noData'
// import {  } from 'vux'

export default {
  components: {

  },
  data() {
    return {
      filter: {
        key: '',
        cateid: '',
        courseid: '',
        grade: ''
      },
      data: [],
    }
  },
  filters: {
    formatTime(val) {
      if (val) {
        var theTime = parseInt(val)
        var theTime1 = 0
        var theTime2 = 0
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
          result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
          result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result
      } else {
        return '-'
      }
    }
  },
  computed: {
  },
  methods: {
    getData() {
      let para = this.filter
      this.$API.getVideoList(para).then(res => {
        this.data = res
      })
    },
    openVideo(val) {
      this.$router.push('/player?id=' + val.VideoId)
      this.$store.commit('setCurrentVideoInfo', val)
    }
  },
  created() {
    this.$store.commit('changeTitle', '视频课程')
    this.getData()
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.card {
  position: relative;
  margin: 10px 10px;
  padding: 10px;
  height: 80px;
  border-bottom: 1px solid #e5e5e5;
  border-radius: 4px;
  .img {
    position: absolute;
    left: 10px;
    width: 120px;
    height: 80px;
    display: inline-block;
    margin-right: 10px;
    .cover {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 1);
      opacity: .4;
      text-align: center;
      font-size: 2.4em;
      line-height: 80px;
      color: #fff;
    }
    img {
      max-width: 100%;
      width: 120px;
      height: 80px;
      vertical-align: middle;
    }
  }
  .content {
    padding-left: 140px;
    display: inline-block;
    .title {
      overflow: hidden;
      font-size: 1.4em;
      max-height: 2.8em;
      line-height: 1.2em;
      overflow: hidden;
    }
    .footer {
      margin-top: 10px;
      color: @grey;
      .auther {
        display: inline-block;
        padding-right: 1rem;
      }
      .iconfont {
        font-size: 14px;
        margin-right: 5px;
      }
      .category {
        display: inline-block;
        padding-right: 1rem;
      }
    }
  }
}
</style>
