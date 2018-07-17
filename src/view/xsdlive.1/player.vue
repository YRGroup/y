<template>
  <div class="wrapper">
    <div  class="video">
      <div v-show="!showError" class="prism-player" id="J_prismPlayer">
      </div>
      <div class="modal" v-show="showError">
        {{playerErrMsg}}
        <x-button type="primary" class="retryBtn" @click.native="reLoad">刷新</x-button>
      </div>
    </div>
    <live-tab id="comments" v-show="showComments"></live-tab>
  </div>
</template>

<script>
import liveTab from "@/components/xsdLiveTab";
import { Toast,XButton } from "vux";
import wx from "weixin-js-sdk";
const PLAYER_ERR_CODE = {
  4001: "参数不合理",
  4006: "开始下载元数据数据错误",
  4008: "请求超时",
  4009: "请求错误"
};
export default {
  name: "hello",
  data() {
    return {
      liveId: null,
      player: null,
      videoId: "",
      videoAuth: "",
      videoinfo: this.$store.state.currentVideoInfo,
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
        imgUrl: ""
      },
      showComments: true,
      logo: require("@/assets/xsdlogo.jpg"),
      showError: false,
      playerErrMsg: ""
    };
  },
  components: {
    liveTab,
    Toast,
    XButton
  },
  computed: {
    // videoCover() {
    //   if (this.liveId == 3) {
    //     return require("@/assets/sxdLive.jpg");
    //   } else if (this.liveId == 4) {
    //     return require("@/assets/cover2.jpg");
    //   }
    // },
    liveInfo() {
      if (this.liveId == 3) {
        return {
          title: "Happy Cstar happy baby tree",
          desc: "2018年大树幼儿园英语汇演",
          videoCover: require("@/assets/sxdLive.jpg")
        };
      } else if (this.liveId == 4) {
        return {
          title: "新郑市西斯达幼儿园",
          desc: "新郑市西斯达幼儿园启智 • 明德 • 梦想起航毕业典礼",
          videoCover: require("@/assets/cover2.jpg")
        };
      }
    }
  },
  methods: {
    reLoad(){
      window.location.reload();
    },
    initWX() {
      this.$API.getWxData().then(res => {
        let _this = this;
        this.wxData.appId = res.AppId;
        this.wxData.timestamp = res.Timestamp;
        this.wxData.nonceStr = res.NonceStr;
        this.wxData.signature = res.Signature;
        wx.config(this.wxData);
        this.wxShareData = {
          title: this.liveInfo.title,
          desc: this.liveInfo.desc,
          // link: `http://cstar.yearn.com/m/#/xsdLive/${this.liveId}`,
          link: window.location.href,
          imgUrl: "http://pic.yearnedu.com/YRImges/cstar/xsdlogo.jpg"
          // imgUrl: this.logo
        };

        wx.ready(function() {
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
        this.player = null;
      }
      this.player = new Aliplayer({
        id: "J_prismPlayer",
        autoplay: false,
        isLive: true,
        playsinline: true,
        width: "100%",
        height: "100%",
        controlBarVisibility: "always",
        useH5Prism: true,
        useFlashPrism: false,
        source: `http://testlive.yearn.com/1/${this.liveId}.m3u8`,
        cover: this.liveInfo.videoCover,
        x5_video_position: "top",
        x5_type: "h5", //声明启用同层H5播放器，支持的值：h5
        showBarTime: "2000",
        controlBarVisibility: "click"
      });
      // this.player.on("error", e => {
      //   let errorCode = e.paramData.display_msg;
      //   console.log(e.paramData.display_msg);
      //   // this.$vux.toast.text(e.paramData.display_msg, "middle");
      //   this.showError = true;
      //   // this.playerErrMsg = e.paramData.display_msg;
      //   this.playerErrMsg = "开始下载元数据数据错误";
      //   // switch(e){
      //   //   case 4006:

      //   //   break;

      //   //   default:

      //   // }
      // });
      this.player.on("onM3u8Retry", ev => {
        console.log(this);
        this.showErrorMsg("直播还没开始，请稍后......");
      });
      this.player.on("requestFullScreen", ev => {
        console.log("全屏");
      });
      this.player.on("cancelFullScreen", ev => {
        console.log("取消全屏");
      });
    },
    showErrorMsg(errMsg) {
      this.showError = true;
      this.playerErrMsg = errMsg;
    }
  },

  created() {
    this.liveId = this.$route.params.liveId;
  },
  mounted() {
    this.$store.commit("changeTitle", this.liveInfo.title);
    // this.initWX();
    this.initPlayer();
  },
  hiddeComments() {
    this.showComments = false;
  },
  showComments() {
    this.showComments = true;
  }
};
</script>

<style lang="less" scoped>
.video {
  height: 40vh;
  position: relative;
  .modal {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #000;
    color: #fff;
    text-align: center;
    font-size: 20px;
    padding-top: 25%;
    z-index: 99;
    .retryBtn{
      width: 100px;
      margin: 20px auto;
    }
  }
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
      margin: 0.5em;
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
      img {
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
.videoTitle {
  line-height: 2em;
}
#comments {
  height: 60%;
}

video::-webkit-media-controls {
  display: none !important;
}

.live-video {
  position: relative;
  left: 0%;
}

.prism-progress-cursor {
  margin-left: 0px !important;
}

video.center {
  object-position: 50% 50% !important;
}
</style>
