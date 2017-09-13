<template>
  <div>
    <div class="video">
      <div class="prism-player" id="J_prismPlayer">
      </div>
    </div>
    <div class="card">
      <div class="title">主讲老师</div>
      <div class="techerInfo">
        <span class="headerImg">
          <img :src="videoinfo.Headimgurl">
        </span>
        <span class="name">{{videoinfo.TrueName}}</span>
        <span class="course">{{videoinfo.Tags.replace(/,/g,' ')}}</span>
      </div>
    </div>
    <div class="card">
      <div class="title">课程介绍</div>
      <div class="content">
        {{videoinfo.Description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      player: null,
      videoId: '',
      videoAuth: '',
      videoinfo:this.$store.state.currentVideoInfo,
      videoCover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
    }
  },
  methods: {
    getVideoInfo() {
      let para = {
        videoId: this.$route.query.id
      }
      this.$API.getVideoAuth(para).then(res => {
        this.videoAuth = res.toString()
        this.initPlayer()
        this.player.play()
      })
    },
    initPlayer() {
      if (this.player) {
        this.player = null
      }
      this.player = new prismplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '300px',
        autoplay: false,
        useH5Prism: true,
        // useFlashPrism: true,
        vid: this.videoId,
        playauth: this.videoAuth,
        cover: this.videoCover,
      })
    }
  },
  created() {
    if (this.$route.query.id) {
      this.videoId = this.$route.query.id
    }
  },
  mounted() {
    this.getVideoInfo()
  }
}
</script>

<style lang="less" scoped>
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
    padding: 2em;
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
      border-radius: 50%;
      img{
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
</style>
