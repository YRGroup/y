<template>
  <div>

    <card>
      <div slot="header" class="header cardcont">
        <img :src="data.userImg">
        <span class="usename">{{ data.auther }}</span>
        <span class="time">{{ data.date }}</span>
        <span class="tips">{{ data.category }}</span>
      </div>
      <div slot="content" class="content">
        <pre>{{data.content}} <span class="atuser" v-for="list in data.AtUser">@{{list.TrueName}}</span></pre>
        <div class="video" v-if="data.Video">
          <div class="prism-player" id="J_prismPlayer"></div>
        </div>
        <div class="img" v-if="data.albums.length!=0">
          <img @click="imgPopup(imgurl)" :src="imgurl" v-for="(imgurl,index) in data.albums" :key="index">
        </div>
        <div class="liked">
          <div class="iszan"><i class="iconfont">&#xe611;</i></div>
          <div class="item">
            <span v-for="(i,index) in data.zans">{{i.TrueName||'user'}} , </span>
          </div>
          <div class="zanNum">{{data.like}}人觉得很赞</div> 
        </div>
      </div>
    </card>
    <div slot="content" class="look">
      <div class="lookNum">已读：{{data.LookCount}}人</div>
      <div class="lookuser">
        <div class="item" v-for="(i,index) in data.LookUser">
          <img :src="i.Headimgurl">
          <span class="name">{{i.TrueName}}</span>
        </div>
      </div>
    </div>

    <div class="comment-header">
      <span>全部评论（{{data.comment.length }}）</span>
      <span class="addbtn" @click="openreply" v-show="$route.name !== 'anonymousPost'">回复</span>
    </div>
    <card class="comment cardcont" v-for="comment in data.comment" :key="comment.name">
      <div slot="header" class="header">
        <img :src="comment.Headimgurl">
        <span class="usename">{{ comment.TrueName }}</span>
        <span class="time">{{ comment.addTime }}</span>
      </div>
      <div slot="content" class="content">
        <p>{{comment.content }}</p>
      </div>
    </card>

    <popup v-model="showpopup" height="180px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:160px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group :title="'回复 '+data.auther">
          <x-input v-model="replymsg" placeholder="在此输入内容内容" @keyup.enter.native="addreply"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addreply">发表</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="showImgPopup" is-transparent>
      <div class="popup" @click="showImgPopup=false">
        <img :src="popupImgUrl">
      </div>
    </popup>

  </div>
</template>

<script>
import { Card, Popup, Group, XInput, XButton } from "vux";
import wx from "weixin-js-sdk";

export default {
  components: {
    Card,
    Popup,
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      videoAuth: "",
      showpopup: false,
      replymsg: "",
      showImgPopup: false,
      popupImgUrl: "",
      commentId: "",
      content: "",
      data: {
        albums: [],
        comment: []
      },
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
        imgUrl:
          "http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg"
      }
    };
  },
  methods: {
    imgPopup(val) {
      this.popupImgUrl = val;
      this.showImgPopup = true;
    },
    getData() {
      if (this.$route.name === "post") {
        this.userGetData();
      }
      if (this.$route.name === "anonymousPost") {
        this.anonymousGetData();
      }
    },
    anonymousGetData() {
      this.$API.getPostAnonymouse(this.$route.params.postId).then(res => {
        this.data = res;
        this.commentId = res.ID;
        if (this.data.Video) {
            this.$API.getVideoAuth({ videoid: this.data.Video.VideoId })
              .then(auth => {
                this.videoAuth = auth.toString();
                this.initPlayer();
              });
          }
      });
    },
    userGetData() {
      this.$API.getWxData().then(res => {
        this.wxData.appId = res.AppId;
        this.wxData.timestamp = res.Timestamp;
        this.wxData.nonceStr = res.NonceStr;
        this.wxData.signature = res.Signature;
        wx.config(this.wxData);
      });
      this.$API
        .getClassDynamic(
          this.$store.state.currentClassId,
          this.$route.params.postId
        )
        .then(res => {
          this.data = res;
          if (this.data.Video) {
            this.$API.getVideoAuth({ videoid: this.data.Video.VideoId })
              .then(auth => {
                this.videoAuth = auth.toString();
                this.initPlayer();
                // this.player.play()
              });
          }
          this.commentId = res.ID;
          this.wxShareData = {
            title: res.auther + "分享的班级动态",
            desc: res.content.slice(0, 30) + "...",
            link: "http://jkyr.yearnedu.com/redirect.html?type=d&pid=" + res.EncryptID,
            imgUrl:
              res.albums[0] ||
              "http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg"
          };
          this.getWxData();
        });
    },
    initPlayer() {
      if (this.player) {
        this.player = null;
      }
      this.player = new Aliplayer({
        id: "J_prismPlayer",
        // width: "100%",
        // height: "300px",
        autoplay: true,
        useH5Prism: true,
        hideBar: true,
        playsinline:true,
        x5_video_position:'top',
        x5_type:'h5',
        vid: this.data.Video.VideoId,
        playauth: this.videoAuth,
        cover: this.data.Video.CoverUrl,
        skinLayout:
              [{"name":"bigPlayButton","align":"ll"},
                {"name":"H5Loading","align":"cc"},
                {"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"fullScreenButton","align":"tr","x":20,"y":25},
                {"name":"playButton","align":"tl","x":15,"y":26},
                {"name":"timeDisplay","align":"tl","x":10,"y":24}]}]
      });
      this._firstFullscreen = true;
      let that = this;
      this.player.on('requestFullScreen',(e)=>{
        if(that._firstFullscreen)
        {
            that.player.cancelFullScreen();
            that._firstFullscreen = false;
        }
        else
        {
            let video=$(that.player.el()).find('video');
            video.addClass('center');
        }
      });
      this.player.on('requestFullScreen',(e)=>{
          that.adjustLayout(true);
          that.player.cancelFullScreen();
      });
      this.player.tag.addEventListener("x5videoexitfullscreen",()=>{
          if(WeixinJSBridge)
              WeixinJSBridge.call('closeWindow');
      });
        
    },
    openreply() {
      this.showpopup = true;
    },
    addreply() {
      let replyData = {};
      replyData.did = this.commentId;
      replyData.content = this.replymsg;
      if (
        this.$store.state.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        replyData.student_meid = this.$store.state.currentStudentId;
      }
      if (replyData.content != "") {
        this.$API.postNewComment(replyData).then(res => {
          this.getData();
          this.replymsg = "";
          this.showpopup = false;
        });
      } else {
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: "评论内容不能为空！"
        });
      }
    },
    getWxData(val) {
      wx.onMenuShareTimeline(this.wxShareData);
      wx.onMenuShareAppMessage(this.wxShareData);
      wx.onMenuShareQQ(this.wxShareData);
      wx.onMenuShareWeibo(this.wxShareData);
      wx.onMenuShareQZone(this.wxShareData);
    }
  },
  created() {
    this.$store.commit("changeTitle", "动态详情");
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.cardcont {
  img {
    width: 3.2em;
    margin-right: 0.6em;
  }
  .usename {
    font-size: 1.1em;
    top: 1em;
  }
  .reply {
    position: absolute;
    top: 2rem;
    right: 0;
    border: none;
    color: @main;
    padding: 0 1em;
  }
}

.comment {
  position: relative;
  margin: 0;
}

.comment-header {
  position: relative;
  height: 2.6em;
  line-height: 2.6em;
  font-size: 1.2em;
  background: #fff;
  padding-left: 2em;
  margin-top: 20px;
  color: @grey;
  :after {
    content: "";
    position: absolute;
    width: 3px;
    height: 1em;
    top: 10px;
    left: 1em;
    background: @main;
  }
  .addbtn {
    float: right;
    padding: 0 1rem;
    color: @main; // background: #03a9f4;
    cursor: pointer; // border-top-left-radius: 15px;
    // border-bottom-left-radius: 15px;
  }
}

.content {
  .img {
    display: inline-block;
    text-align: center;
    margin: 20px auto;
    img {
      max-width: 100%;
    }
  }
}
.atuser {
  color: #0c92f3;
  margin-right: 8px;
}
.liked {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid @border;
  .iszan {
    display: inline-block;
    position: relative;
    top: 5px;
    .iconfont {
      font-size: 24px;
      color: @main;
    }
  }
  .zanNum {
    display: inline-block;
  }
  .item {
    display: inline-block;
  }
}
.look {
  background: #fff;
  padding: 10px;
  margin-top: 20px;
  .lookNum {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .lookuser {
    .item {
      display: inline-block;
      margin: 0 10px 10px 0;
      text-align: center;
      border-radius: 8px;
      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: block;
      }
    }
  }
}
 video {
    object-fit: contain !important;
    }
</style>
