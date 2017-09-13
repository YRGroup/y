<template>
  <div>
    <div class="card" v-for="(i,index) in data" :key="index" @click="openVideo(i)">
      <div class="img">
        <img :src="i.CoverUrl||'http://img.mukewang.com/576b7afb00019e4906000338-240-135.jpg'">
      </div>
      <div class="content">
        <div class="title">{{i.Title}}</div>
        <div class="footer">
          <div class="auther">{{i.TrueName}}</div>
          <div class="category">{{i.Tags.replace(/,/g,' ')}}</div>
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
  computed: {
  },
  methods: {
    getData() {
      let para = this.filter
      this.$API.getVideoList(para).then(res => {
        this.data = res
      })
    },
    openVideo(val){
      this.$router.push('/player?id='+val.VideoId)
      this.$store.commit('setCurrentVideoInfo',val)
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
  margin: 0 10px;
  padding: 15px 15px 15px 130px;
  ;
  border-bottom: 1px dashed @border;
  overflow: hidden;
  position: relative;
  height: 72px; // min-height: 80px;
  .img {
    position: absolute;
    top: 15px;
    left: 0;
    width: 120px;
    height: 72px;
    display: inline-block;
    img {
      width: 100%;
    }
  }
  .content {
    width: 100%;
    display: inline-block;
    .title {
      font-size: 14px;
      padding:.5em 0;
      overflow: hidden;
      cursor: pointer;
    }
    .content {
      margin-top: 5px;
      height: 1.4em;
      line-height: 1.4em;
      color: #666;
      overflow: hidden;
      margin-bottom: 5px;
      a {
        color: red;
        margin-left: 5px;
      }
    }
    .footer {
      margin-top: 10px;
      color: @grey;
      font-size: 12px;
      .auther{
        display: inline-block;
        padding-right:1rem;
      }
      .iconfont {
        font-size: 14px;
        margin-right: 5px;
      }
      .category{
        display: inline-block;
        padding-right:1rem;
      }
    }
  }
}
</style>
