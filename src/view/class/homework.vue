<template>
  <div class="work">

    <div class="workcard">
      <div class="header">
        <span class="auther">{{ homework.AutherName }}</span>
        <span class="time">{{ homework.CreateTime }}</span>
        <span class="category" :style="{background:colors[homework.CourseName]}">{{ homework.CourseName }}</span>
      </div>
      <div class="title">{{homework.Title}}</div>
      <div class="content">
        <div>{{homework.Content}}</div>
        <div class="img" v-if="homework.Albums">
          <div class="imgCon" :style="{backgroundImage: 'url\('+imgurl+'\)'}" v-for="(imgurl,index) in homework.Albums" :key="index" @click="imgPopup(imgurl)">
          </div>
        </div>
      </div>
    </div>
    <div slot="content" class="look">
      <div class="lookNum">已读：{{homework.LookCount}}人</div>
      <div class="lookuser">
        <div class="item" v-for="(i,index) in homework.LookUser" :key="index">
          <img :src="i.Headimgurl">
          <span class="name">{{i.TrueName}}</span>
        </div>
      </div>
    </div>

    <popup v-model="showImgPopup" width="100%">
      <div class="popup" @click="showImgPopup=false">
        <img :src="popupImgUrl">
      </div>
    </popup>

  </div>
</template>

<script>
import { Popup, Group, XTextarea, XButton, Selector } from "vux";
import wx from "weixin-js-sdk";

export default {
  components: {
    Popup,
    Group,
    XTextarea,
    Selector,
    XButton
  },
  data() {
    return {
      newHomework: false,
      newHomeworkData: {},
      homework: {},
      showImgPopup: false,
      popupImgUrl: "",
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
      commentId: "",
      wxShareData: {
        title: "",
        desc: "",
        link: "",
        imgUrl:
          "http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg"
      }
    };
  },
  computed: {
    colors() {
      return this.$store.state.colors
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      });
    },
    getData() {
      if (this.$route.name === "homework") {
        this.getHomeWork();
      }
      if (this.$route.name === "anonymousHomework") {
        this.anonymousHomework();
      }
    },
    imgPopup(val) {
      this.popupImgUrl = val;
      this.showImgPopup = true;
    },
    getHomeWork() {
      this.$API.getWxData().then(res => {
        this.wxData.appId = res.AppId;
        this.wxData.timestamp = res.Timestamp;
        this.wxData.nonceStr = res.NonceStr;
        this.wxData.signature = res.Signature;
        wx.config(this.wxData);
      });
      this.$API.getHomework(this.$route.params.homeworkId).then(res => {
        this.homework = res;
  
        this.commentId = res.HID;
        this.wxShareData = {
          title: res.CourseName + " 老师布置的作业 " + res.CreateTime,
          desc: res.Content.slice(0, 30) + "...",
          link: "http://jkyr.yearnedu.com/redirect.html?type=h&pid=" + res.EncryptID,
          imgUrl: res.Albums[0] || "http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg"
        };
        this.getWxData();
      });
    },
    addHomework() {
      if (this.newHomeworkData.course_name && this.newHomeworkData.content) {
        this.newHomeworkData.class_id = this.$store.state.currentClassId;
        this.newHomeworkData.title = "";
        this.$API.addHomework(this.newHomeworkData).then(res => {
          this.$vux.toast.show({
            type: "success",
            text: "发布成功"
          });
          this.newHomework = false;
          this.getHomeWork();
        });
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "数据不完整"
        });
      }
    },
    anonymousHomework() {
      this.$API.getPostHomework(this.$route.params.homeworkId).then(res => {
        this.homework = res;
        this.commentId = res.ID;
      });
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
    this.$store.commit("changeTitle", "班级作业");
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.addbtn {
  padding: 1rem;
}

.workcard {
  background: #fff;
  margin: 1em 0;
  .header {
    padding: 0 1rem;
    height: 2.4rem;
    line-height: 2.4rem;
    border-bottom: 1px solid @border;
    .category {
      float: right;
      color: #fff;
      width: 2.4em;
      line-height: 2em;
      text-align: center;
      border-radius: 0 0 6px 6px;
      padding: 0 10px;
    }
    .auther {
      font-size: 1.2em;
    }
    .time {
      // float: right;
      color: @grey;
    }
  }
  .title {
    text-align: center;
    font-size: 1.2rem;
  }
  .content {
    padding: 0.5rem 1rem;
    line-height: 1.8em;
    .img {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .imgCon {
        width: calc(~"(100% - 30px) / 3");
        height: 100px;
        background-position: center;
        background-size: cover;
        margin: 5px;
      }
    }
  }
  .footer {
    color: @grey;
    text-align: right;
  }
}

.popup {
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  padding-top: 10px;
  text-align: center;
  text-align: center;
  img{
    max-width: 90vw;
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
        border-radius: 8px;
        display: block;
      }
    }
  }
}
</style>
