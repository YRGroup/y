<template>
  <div class="box">
    <audio  :src="audioSrc" style="display:none;" ref="audioPlayer"></audio>
    <div class="banner">
      <img src="./banner.jpg" alt="">
    </div>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/2"   class="card-wrapper" v-for="(item,index) in storyList" :key="item.id">
        <div class="card">
          <div class="index">{{index+1}}</div>
          <div class="card-teacher"  :style="{backgroundImage:`url(${item.avatar})`}">
            <p class="name">{{item.Actor}}</p>
          </div> 
          <div class="info">
            <div class="storyImg" :style="{backgroundImage:`url(${item.ImageUrl})`}">
              <i v-if="index==currentIndex" class="iconfont" @click="pauseAudio(index)">
                  &#xe61d;
                </i>
                <i  v-else  class="iconfont" @click="playAudio(index)">
                  &#xe60d;
                </i>
            </div>
          </div>
          <div class="text">
            <span class="p1">{{item.ProgramName}}</span>
            <span class="p2"><span class="num">{{item.VoteCount}}</span> 票</span>
          </div>
          <div class="card-bottom">
            <div class="voteBtn" @click="vote(item.ID)">
              投票
            </div>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem } from "vux";
import { getCookie, isWeiXin } from "@/assets/js/util";
import wx from "weixin-js-sdk";
export default {
  name: "lottery",
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      storyList: [],
      currentIndex: -1,
      paused: false,
      wxSharePic: require("@/view/xsdlive/banner.jpg")
    };
  },
  computed: {
    audioSrc() {
      if (this.currentIndex != -1) {
        return this.storyList[this.currentIndex].mp3Src;
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getProgramList();
    this.$store.commit("changeTitle", "故事会投票-西斯达教育集团");
    this.isWeiXin = isWeiXin();

    let href = encodeURIComponent(
      "http://" + window.location.host + "/m/#/vote/" + this.id
    );
    if (this.isWeiXin && !getCookie("openid")) {
      window.location.href = "/api/LiveVideoWeiXinOAuth/index?refUrl=" + href;
    }
  },
  watch: {
    audioSrc() {
      this.$refs.audioPlayer.oncanplay = () => {
        this.$refs.audioPlayer.play();
      };
    }
  },
  mounted() {
    this.initWX();
  },
  distroyed: function() {},
  methods: {
    initWX() {
      let link = window.location.href;
      let _this = this;
      this.$API.getWxData().then(res => {
        wx.config({
          // debug: true,
          appId: res.AppId,
          timestamp: res.Timestamp,
          nonceStr: res.NonceStr,
          signature: res.Signature,
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
          ]
        });
        let wxShareData = {
          title: "西斯达教育集团",
          desc: "大树姐姐讲故事投票活动",
          link: link,
          imgUrl: _this.wxSharePic
        };

        wx.ready(() => {
          wx.onMenuShareTimeline(wxShareData);
          wx.onMenuShareAppMessage(wxShareData);
          wx.onMenuShareQQ(wxShareData);
          wx.onMenuShareWeibo(wxShareData);
          wx.onMenuShareQZone(wxShareData);
        });
      });
    },
    getProgramList() {
      let para = {
        lid: this.id
      };
      this.$API.getProgramList(para).then(res => {
        console.log(res);
        this.storyList = this.formatList(res.Content);
      });
    },
    vote(id) {
      if (!getCookie("openid")) {
        this.$vux.toast.text("只能在微信中投票！~");
        return;
      }
      this.$API
        .programvote({
          pid: id,
          lid: this.id
        })
        .then(res => {
          this.$vux.toast.text("投票成功~");
          this.storyList = this.formatList(JSON.parse(res.Content));
        })
        .catch(err => {
          this.$vux.toast.text(err.msg);
        });
    },
    formatList(list) {
      let arr = list.sort((a, b) => {
        return b.VoteCount - a.VoteCount;
      });
      arr.forEach(el => {
        if (el.ImageUrl && el.ImageUrl.indexOf("jpg")) {
          el.avatar = el.ImageUrl.replace("jpg", "png");
          el.mp3Src = el.ImageUrl.replace("jpg", "mp3");
        }
      });
      return arr;
    },
    playAudio(index) {
      this.currentIndex = index;
    },
    pauseAudio(index) {
      this.currentIndex = -1;
      this.$refs.audioPlayer.pause();
      // this.paused = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";
@import "../../style/iconfont.less";
@color: #e84d5b;

.background-cover {
  background-repeat: no-repeat;
  background-position: center center;
  -moz-background-size: cover;
  background-size: cover;
}
.box {
  // background: #f1f3f4;
  background: #fff;
  overflow: auto;
  background: @color;
  .banner {
    overflow: hidden;
    line-height: 0;
    font-size: 0;
    img {
      width: 100%;
      display: block;
    }
  }
  .title {
    text-align: center;
    color: @color;
    font-size: 20px;
    line-height: 50px;
  }
}
.list-wrapper {
  // box-sizing: border-box;
}
.card-wrapper {
  margin-bottom: 20px;
  // background: #f1f3f4;
  padding: 0 5px;
  box-sizing: border-box;
  .card {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    .index {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      z-index: 2;
      background: url("666.png") no-repeat center center;
      color: #fff;
      // text-align: center;
      line-height: 20px;
      text-indent: 0.5em;
      // background-image: url("666.png") no-repeat;
    }
    .card-teacher {
      .background-cover();
      height: 100px;
      position: relative;
      margin-bottom: 10px;
      .name {
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        line-height: 25px;
      }
    }
    .info {
      .storyImg {
        height: 100px;
        position: relative;
        .background-cover();
        .iconfont {
          text-align: center;
          width: @size;
          height: @size;
          font-size: 25px;
          line-height: @size;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -@size / 2;
          margin-top: -@size / 2;
          border: 3px solid @color;
          border-radius: 50%;
          color: @color;
        }
      }
      img {
        width: 100%;
        display: block;
      }
      @size: 50px;
    }
    .text {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 10px 0;
      .p1 {
        font-size: 15px;
      }
      .p2 {
        color: #666;
        .num {
          color: @color;
          font-size: 16px;
        }
      }
    }
    .card-bottom {
      text-align: center;
      .voteBtn {
        width: 80%;
        display: inline-block;
        text-align: center;
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        background: @color;
        border-radius: 5px;
      }
    }
  }
}
</style>
