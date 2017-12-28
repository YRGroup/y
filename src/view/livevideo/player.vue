<template>
  <div>
    <div class="video">
      <div class="prism-player" id="J_prismPlayer">
      </div>
    </div>
    <live-tab id="comments" v-show="showbottom"></live-tab>
  </div>
</template>

<script>

import liveTab from "@//components/liveTab"
import wx from "weixin-js-sdk";

export default {
  name: 'hello',
  data() {
    return {
      player: null,
      videoId: '',
      videoAuth: '',
      videoinfo:this.$store.state.currentVideoInfo,
      videoCover: "http://pic.yearnedu.com/2018livecover.jpg",
      showbottom: true,
      wxData: {
        debug: false,
        appId: "",
        timestamp: null,
        noncestr: "",
        signature: "",
        url: "",
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ]
      },
      wxShareData: {
        title: "",
        desc: "",
        link: "",
        imgUrl:""
      }
    }
  },
  components:{
    liveTab
  },
  methods: {
    initWX() {
      this.$API.getWxData().then(res => {
        let _this = this
        this.wxData.appId = res.AppId;
        this.wxData.timestamp = res.Timestamp;
        this.wxData.nonceStr = res.NonceStr;
        this.wxData.signature = res.Signature;
        wx.config(this.wxData);

        this.wxShareData = {
          title: "春满育人 梦筑未来",
          desc: "郑州市经开区育人学校2018年元旦文艺汇演现场直播，育人智慧校园经开校区系统入口",
          link: "http://jkyr.yearnedu.com/m/#/live",
          imgUrl: "http://pic.yearnedu.com/2018livevideowxshare.jpg"
        };

        wx.ready(function(){
          wx.onMenuShareTimeline(_this.wxShareData);
          wx.onMenuShareAppMessage(_this.wxShareData);
          wx.onMenuShareQQ(_this.wxShareData);
          wx.onMenuShareWeibo(_this.wxShareData);
          wx.onMenuShareQZone(_this.wxShareData);
        });
      });

    },
    initPlayer() {
      if (this.player) {
        this.player = null
      }
      this.player = new Aliplayer({
        id: 'J_prismPlayer',
        autoplay: false,
        isLive:true,
        playsinline:true,
        width:"100%",
        height:"100%",
        controlBarVisibility:"always",
        useH5Prism:true,
        useFlashPrism:false,
        source:"http://live.yearnedu.com/1/1.m3u8",
        // source:"//player.alicdn.com/video/aliyunmedia.mp4",
        cover: this.videoCover,
        x5_video_position:'top',
        x5_type:'h5', //声明启用同层H5播放器，支持的值：h5
      });
    },
  },

  created() {
    this.$store.commit("changeTitle", "春满育人 梦筑未来");
    this.initWX()
  },
  mounted() {
    let _this = this
    this.initPlayer()
    // this.player.on('requestFullScreen',(e)=>{
    //   _this.showbottom = false
    // });

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

video::-webkit-media-controls {
  display:none !important;
}

.live-video
{ 
  
   position:relative;
   left:0%;
}

.prism-progress-cursor 
{
  margin-left:0px !important;
}

video.center
{
    object-position:50% 50% !important;
}

</style>
