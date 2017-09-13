<template>
  <div>
    <div class="video">
      <div class="prism-player" id="J_prismPlayer">
      </div>
    </div>
    <div class="card introduce">
      <div class="title">课程介绍</div>
      <div class="content">
        "text"
      </div>
    </div>
    <div class="card">
      <div class="title">主讲老师</div>
      <div class="techerInfo">
        <span class="headerImg"></span>
        <span class="name">王老师</span>
        <span class="banji">三年二班</span>
        <span class="course">语文</span>
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
      videoSrc: '//common.qupai.me/player/qupai.mp4',
      videoId: '7f6a4afc988a48b78eb1481ca78174bc',
      videoAuth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU3VBSjFxNkZ0NUIyeWZTaklxdktIR3YzZ2hhVm03cnU0VEV6cnZtUmdldUVlM2FMUHBqejJJSHBLZVhkdUFlQVhzL28wbW1oWjcvWVlsck1xRzhVZkdCMlpNWmNxczgwTm9WcitKcExGc3QySjZyOEpqc1Y2anZ4WWhGMnBzdlhKYXNEVkVmbkFHSjcwR1VpbSt3WjN4YnpsRHh2QU8zV3VMWnlPajdOK2M5MFRSWFBXUkRGYUJkQlFWRTBBenNvR0xpbnBNZis4UHdURG4zYlFiaTV0cGhFdXNXZDIrSVc1ek1yK2pCL0Nsdy9XeCtRUHRwenRBWlcxRmI0T1dxMXlTTkNveHVkN1c3UGMyU3BMa1hodytieHhrYlpQOUVXczNMamZJU0VJczByZGJiV0VyNFV4ZFZVbFB2VmxJY01lOHFpZ3o4OGZrL2ZJaW9INnh5eEtPZXhvU0NuRlRPaWl1cENlUnI3M2FJNXBKT3VsWUNxVmc0bmZiSU9KbWdjbGNHOGRDZ1JHUU5Nb01VUnNFaVlyVGp6SzJ3RlFQcVFob0d3YWdBR1QraU54eC9GZi9JUElBRHd6RnZJc29QeHFFckZoZkVNazdRanRVM0VuckdCSmU0TitybnJVV0F3NVNGRnJSN1NKcG5xM25WWGhTTlBQT0xiN20ybmN2dXFmbDg0MWtNeGIyQzdodlNnSkMrSXZ5QTJYWXN0cHFiUXFWQ3RORjFvN0VyMk80bXkrQWRtRk0vN3ZiZjF4VCt2RVF5aEp0Y0YzRHAvRnh5SWJtdz09IiwiQXV0aEluZm8iOiJ7XCJFeHBpcmVUaW1lXCI6XCIyMDE3LTA5LTEyVDA0OjEyOjMwWlwiLFwiTWVkaWFJZFwiOlwiN2Y2YTRhZmM5ODhhNDhiNzhlYjE0ODFjYTc4MTc0YmNcIixcIlNpZ25hdHVyZVwiOlwiTHNQR0IwS2lPRmJaVlJBU1pLRkZybUErLzNzPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiN2Y2YTRhZmM5ODhhNDhiNzhlYjE0ODFjYTc4MTc0YmMiLCJUaXRsZSI6IuWwj+iOieW4ruW/mV94MjY0Lm1wNCIsIkNvdmVyVVJMIjoiaHR0cDovL3ZpZGVvLnllYXJuZWR1LmNvbS9zbmFwc2hvdC83ZjZhNGFmYzk4OGE0OGI3OGViMTQ4MWNhNzgxNzRiYzAwMDAxLmpwZyIsIkR1cmF0aW9uIjozNjEuMjh9LCJBY2Nlc3NLZXlJZCI6IlNUUy5LMTJRR1RoekdZeVNOalpaZDV2bjIyZ2REIiwiUGxheURvbWFpbiI6InZpZGVvLnllYXJuZWR1LmNvbSIsIkFjY2Vzc0tleVNlY3JldCI6IjRvWkw5SjNWYmJDYllCSGYyTjg1eUpiN044UU5IWWJNaGMzaWVSRVlRRkFhIiwiUmVnaW9uIjoiY24tc2hhbmdoYWkiLCJDdXN0b21lcklkIjoxODIyNTk1NDQyNTEyODE3fQ==',
      videoCover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
    }
  },
  methods: {
    getVideoInfo() {
      let para = {
        videoId: "7f6a4afc988a48b78eb1481ca78174bc"
      }
      this.$API.getVideoAuth(para).then(res => {
      })
      this.initPlayer()
    },
    initPlayer() {
      this.player = null
      this.player = new prismplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '300px',
        autoplay: false,
        source: this.videoSrc,
        vid: this.videoId,
        playauth: this.videoAuth,
        cover: this.videoCover,
      })
      this.player.play()
    }
  },
  created() {

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
    border-bottom: 1px solid @cc4;
    font-size: 16px;
    padding: 0 20px;
    line-height: 52px;
    color: @cc6;
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
      border-bottom: 1px solid @cc4;
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
      background: red;
    }
    .name {
      font-size: 16px;
      display: block;
      margin: 5px 0;
    }
    .banji {
      color: @cc2;
      margin-right: 10px;
    }
    .course {
      color: @cc2;
    }
  }
}
</style>
