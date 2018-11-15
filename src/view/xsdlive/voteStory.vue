<template>
  <div class="box">
    <audio  :src="audioSrc" style="display:none;" ref="audioPlayer"></audio>
    <div class="banner">
      <img src="http://yr-zhxy.oss-cn-beijing.aliyuncs.com/CStar/Image/3.png" alt="">
    </div>
    <div>
      <p class="title">故事列表</p>
    </div>
    <div class="card-wrapper" v-for="(item,index) in storyList" :key="item.id">
      <div class="story-card " >
        <!-- <div class="bg"  :style="{backgroundImage:`url(${item.ImageUrl})`}">
        </div> -->
        <div class="card-left"> 
          {{index+1}}
        </div>
        <div class="card-content">
          <div class="card-img" :style="{backgroundImage:`url(${item.avatar})`}">
            <!-- <img :src="item.ImageUrl" alt=""> -->
            <!-- <i v-if="index==currentIndex" class="iconfont" @click="pauseAudio(index)">
              &#xe61d;
            </i>
            <i  v-else  class="iconfont" @click="playAudio(index)">
              &#xe60d;
            </i> -->
          </div>
          <div class="card-info">
            <p class="p1">{{item.ProgramName}}</p>
            <p class="p2">{{item.Actor}}</p>
            <p class="p3">已获得票数：<span class="num">{{item.VoteCount}}</span></p>
          </div>
        </div>
        <div class="card-right">
          <x-button mini   @click.native="vote(item.ID)">投票</x-button>
        </div>
      </div>
      <div class="info">
        <p>
          <img :src="item.avatar" alt="">
        </p>
        <p style="position:relative;">
          <img :src="item.ImageUrl" alt="">
          <i v-if="index==currentIndex" class="iconfont" @click="pauseAudio(index)">
              &#xe61d;
            </i>
            <i  v-else  class="iconfont" @click="playAudio(index)">
              &#xe60d;
            </i>
        </p>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import { Panel, XButton } from "vux";
import { getCookie, isWeiXin } from "@/assets/js/util";

export default {
  name: "lottery",
  components: {
    Panel,
    XButton
  },
  data() {
    return {
      storyList: [],
      currentIndex: -1,
      paused: false
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
    this.$store.commit("changeTitle", "故事会投票-西斯达教育集团");
    this.isWeiXin = isWeiXin();
    let href = encodeURIComponent(
      "http://" + window.location.host + "/m/#/vote/" + this.id
    );
    if (this.isWeiXin && !getCookie("openid")) {
      window.location.href = "/api/LiveVideoWeiXinOAuth/index?refUrl=" + href;
    }

    this.id = this.$route.params.id;
    this.getProgramList();
  },
  watch: {
    audioSrc() {
      console.log(11);
      this.$refs.audioPlayer.oncanplay = () => {
        this.$refs.audioPlayer.play();
      };
    }
  },
  mounted() {},
  distroyed: function() {},
  methods: {
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
@color: #da5e52;

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
  .banner {
    height: 20vh;
    overflow: hidden;
    line-height: 0;
    font-size: 0;
    // margin-bottom: 30px;
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
.card-wrapper {
  margin-bottom: 20px;
  // background: #fff;
  background: #f1f3f4;
}
.info {
  img {
    width: 100%;
    display: block;
  }
  @size:60px;
  .iconfont {
    text-align: center;
    width: @size;
    height: @size;
    font-size: 40px;
    line-height: @size;
    position: absolute;
    bottom: 30px;
    right: 30px;
    border: 3px solid  @color;
    border-radius: 50%;
    color: @color;
  }
}
.story-card {
  width: 100%;
  display: flex;
  flex-wrap: none;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  height: 100px;
  position: relative;
  overflow: hidden;
  color: #fff;
  // background: #fff;
  .background-cover ();
  .bg {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    filter: blur(30px);
    z-index: 0;
  }
  .card-left {
    flex: 1;
    text-align: center;
    z-index: 1;
    color: @color;
    font-size: 18px;
    font-weight: bold;
  }
  .card-content {
    display: flex;
    flex-wrap: none;
    justify-content: flex-start;
    z-index: 1;
    flex: 6;

    .card-img {
      .background-cover ();
      width: 80px;
      height: 80px;
      overflow: hidden;
      position: relative;
      text-align: center;
      border-radius: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    .card-info {
      padding-left: 15px;
      .p1 {
        font-size: 16px;
        color: @color;
        font-weight: bold;
      }
      .p2 {
        font-size: 12px;
        color: @color;
        line-height: 20px;
      }
      .p3 {
        color: @color;
        .num {
          font-size: 16px;
          line-height: 35px;
        }
      }
    }
  }
  .card-right {
    display: flex;
    justify-content: space-around;
    text-align: center;
    flex: 2;
  }
}
</style>
