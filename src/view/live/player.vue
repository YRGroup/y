<template>
  <div class="wrapper">
    <div class="video">
      <div v-show="!showError" class="prism-player" id="J_prismPlayer">
      </div>
      <div class="modal" v-show="showError">
        <p>{{playerErrMsg}}</p>
        <x-button type="primary" class="retryBtn" @click.native="reLoad">刷新</x-button>
      </div>
      <div class="modal coverImg"
        :style="{backgroundImage:`url(${livePlayer.coverImg})`}" 
        v-show="showCover">
        <i class="iconfont play" @click="playLive">&#xe63c;</i>
      </div>
    </div>
    <live-tab id="comments" v-show="showComments"  :livePlayer="livePlayer"></live-tab>
  </div>
</template>

<script>
import liveTab from "@/components/liveTab";
import { Toast, XButton } from "vux";
import wx from "weixin-js-sdk";
import { getCookie, isWeiXin } from "@/assets/js/util";
import { LivePlayer } from "@/assets/js/class";

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
      showCover: true,
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
      playerErrMsg: "",
      livePlayer: {}
    };
  },
  components: {
    liveTab,
    Toast,
    XButton
  },
  computed: {},
  methods: {
    reLoad() {
      window.location.reload();
    },
    initWX() {
      this.$API.getWxData().then(res => {
        console.log(res);
        let _this = this;
        this.wxData.appId = res.AppId;
        this.wxData.timestamp = res.Timestamp;
        this.wxData.nonceStr = res.NonceStr;
        this.wxData.signature = res.Signature;
        wx.config(this.wxData);
        this.wxShareData = {
          title: this.livePlayer.title,
          desc: this.livePlayer.wxShareContent,

          link: encodeURIComponent(location.href.split("#")[0]),
          imgUrl: this.livePlayer.wxSharePic
        };

        wx.ready(() => {
          wx.onMenuShareTimeline(_this.wxShareData);
          wx.onMenuShareAppMessage(_this.wxShareData);
          wx.onMenuShareQQ(_this.wxShareData);
          wx.onMenuShareWeibo(_this.wxShareData);
          wx.onMenuShareQZone(_this.wxShareData);
        });
      });
    },
    initPlayer() {
      // if (this.player) {
      //   this.player = null;
      // }
      this.player = new Aliplayer({
        id: "J_prismPlayer",
        autoplay: false,
        isLive: true,
        playsinline: true,
        width: "100%",
        height: "100%",
        useH5Prism: true,
        source: this.livePlayer.playerUrl,
        cover: this.livePlayer.coverImg,
        x5_video_position: "top",
        x5_type: "h5", //声明启用同层H5播放器，支持的值：h5
        showBarTime: "2000",
        controlBarVisibility: "hover",
        preload: true
      });
      this.player.on("onM3u8Retry", ev => {
        this.showErrorMsg("直播还没开始...");
      });
      this.player.on("play", ev => {
        console.log("开始播放");
        this.showCover = false;
      });
      this.player.on("ready", ev => {
        console.log("ready");
        this.showCover = false;
      });
      this.player.on("liveStreamStop", ev => {
        this.showErrorMsg("直播还没开始...");
      });
      this.player.on("requestFullScreen", ev => {
        console.log("全屏");
      });
      this.player.on("cancelFullScreen", ev => {
        console.log("取消全屏");
      });
    },
    playLive() {
      if (this.player) {
        this.player.play();
        this.showCover = false;
      }
    },
    showErrorMsg(errMsg) {
      this.showError = true;
      this.playerErrMsg = errMsg;
    },
    getOneLiveRoom() {
      let para = {
        id: this.liveId
      };
      this.$API.getOneLiveRoom(para).then(res => {
        let liveInfoData = {
          id: res.Content.ID,
          createTime: res.Content.CreateTime,
          introduction: res.Content.Introduction,
          isVote: res.Content.IsVote,
          playerUrl: res.Content.PlayUrl,
          pushUrl: res.Content.PushUrl,
          title: res.Content.Title,
          wxShareContent: res.Content.WXShareContent,
          wxSharePic: res.Content.WXSharePic,
          coverImg: res.Content.CoverImg
        };
        this.livePlayer = new LivePlayer(liveInfoData);
        this.liveInfoReady();
      });
    },
    liveInfoReady() {
      this.$store.commit("changeTitle", this.livePlayer.title);
      this.initWX();
      this.initPlayer();
    }
  },
  created() {
    this.isWeiXin = isWeiXin();
    this.liveId = this.$route.params.liveId;
    let href = encodeURIComponent(
      "http://" + window.location.host + "/m/#/live/" + this.liveId
    );
    if (this.isWeiXin && !getCookie("openid")) {
      window.location.href = "/api/LiveVideoWeiXinOAuth/index?refUrl=" + href;
    }
  },
  mounted() {
    setTimeout(() => {
      this.getOneLiveRoom();
    }, 1000);
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
    padding: 60px 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #000;
    color: #fff;
    font-size: 20px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .retryBtn {
      width: 100px;
      margin: 20px auto;
    }
  }
  .coverImg {
    background-size: cover;
    background-position-x: 50%;
    .play {
      color: #fff;
      font-size: 80px;
      opacity: 0.8;
      cursor: pointer;
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
