<template>
  <div>
    <div class="video">
      <div class="prism-player" id="J_prismPlayer">
      </div>
    </div>
    <live-tab id="comments"></live-tab>
  </div>
</template>

<script>

import liveTab from "@//components/liveTab"

export default {
  name: 'hello',
  data() {
    return {
      player: null,
      videoId: '',
      videoAuth: '',
      videoinfo:this.$store.state.currentVideoInfo,
      videoCover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
    }
  },
  components:{
    liveTab
  },
  methods: {
    getVideoInfo() {
      let para = {
        videoId: this.$route.query.id
      }
      this.$API.getVideoAuth(para).then(res => {
        this.videoAuth = res.toString()
        this.initPlayer()
        // this.player.play()
      })
    },
    initPlayer() {
      if (this.player) {
        this.player = null
      }
      this.player = new Aliplayer({
        id: 'J_prismPlayer',
        autoplay: true,
        isLive:true,
        playsinline:true,
        width:"100%",
        height:"100%",
        controlBarVisibility:"always",
        useH5Prism:true,
        useFlashPrism:false,
        // source:"http://live.yearnedu.com/1/1.m3u8",
        source:"//player.alicdn.com/video/aliyunmedia.mp4",
        cover: this.videoCover,
      })
    }
  },

  mounted() {
    this.initPlayer()
  }
}
</script>

<style lang="less" scoped> 
.video{
  height: 40vh;
}
.card {
  background: #fff;
  margin-bottom: 1em;
  .title {
    border-bottom: 1px solid @border;
    font-size: 16px;
    padding: 0 20px;
    line-height: 52px;
    color: @main;
    font-weight: 600;
  }
  .content {
    padding: 1.2em;
    button {
      margin: .5em;
    }
    .add {
      margin-bottom: 2em;
      .input {
        display: inline-block;
        width: calc(~"100% - 105px");
      }
      .button {
        width: 100px;
      }
    }
    .item {
      border-bottom: 1px solid @border;
      margin-bottom: 1em;
      padding: 1em;
      .header {
        display: inline-block;
      }
      .item_content {
        display: inline-block;
      }
    }
  }
  .techerInfo {
    padding: 10px;
    overflow: hidden;
    position: relative;
    padding-left: 80px;
    height: 60px;
    .headerImg {
      position: absolute;
      left: 10px;
      display: inline-block;
      width: 60px;
      height: 60px;
      img{
        border-radius: 50%;
        max-width: 100%;
      }
    }
    .name {
      font-size: 16px;
      display: block;
      margin: 5px 0;
    }
    .banji {
      color: @grey;
      margin-right: 10px;
    }
    .course {
      color: @grey;
    }
  }
}
.videoTitle{
  line-height: 2em;
}
#comments{
  height: 60%;
}

</style>
