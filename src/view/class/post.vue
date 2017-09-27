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
        <pre>{{data.content}}</pre>
        <div class="img" v-if="data.albums.length!=0">
          <img @click="imgPopup(imgurl)" :src="imgurl" v-for="(imgurl,index) in data.albums" :key="index">
        </div>
      </div>
    </card>

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
import { Card, Popup, Group, XInput, XButton } from 'vux'
import wx from 'weixin-js-sdk'

export default {
  components: {
    Card, Popup, Group, XInput, XButton
  },
  data() {
    return {
      showpopup: false,
      replymsg: '',
      showImgPopup: false,
      popupImgUrl: '',
      commentId: '',
      content: '',
      fakeUserImg: 'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
      data: {
        albums: [],
        comment: [],
      },
      classHeader: false,
      wxData: {
        debug: false,
        appId: '',
        timestamp: null,
        noncestr: '',
        signature: '',
        url: '',
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      },
      wxShareData: {
        title: '',
        desc: '',
        link: '',
        imgUrl: 'http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg'
      }
    }
  },
  methods: {
    imgPopup(val) {
      this.popupImgUrl = val
      this.showImgPopup = true
    },
    getData() {
      if (this.$route.name === 'post') {
        this.userGetData()
      }
      if (this.$route.name === 'anonymousPost') {
        this.anonymousGetData()
      }
    },
    anonymousGetData() {
      this.$API.getPostAnonymouse(this.$route.params.postId).then(res => {
        this.data = res
        this.commentId = res.ID
        this.wxShareData = {
          title: res.auther + '分享的班级动态',
          desc: res.content.slice(0, 30) + '...',
          link: 'http://jkyr.yearnedu.com/redirect.html?pid=' + res.EncryptID,
          imgUrl: res.albums[0] || 'http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg'
        }
        // this.getWxData()
      })
    },
    userGetData() {
      this.$API.getClassDynamic(this.$store.state.currentClassId, this.$route.params.postId).then(res => {
        this.data = res
        this.commentId = res.ID
        this.wxShareData = {
          title: res.auther + '分享的班级动态',
          desc: res.content.slice(0, 30) + '...',
          link: 'http://jkyr.yearnedu.com/redirect.html?pid=' + res.EncryptID,
          imgUrl: res.albums[0] || 'http://pic.yearnedu.com/UploadFiles/images/2017/09/13/636409320424412976.jpg'
        }
        this.getWxData()
      })
    },
    openreply() {
      this.showpopup = true
    },
    addreply() {
      let replyData = {}
      replyData.did = this.commentId
      replyData.content = this.replymsg
      if (this.$store.state.role == '家长' && this.$store.state.currentStudentId != null) {
        replyData.student_meid = this.$store.state.currentStudentId
      }
      if (replyData.content != '') {
        this.$API.postNewComment(replyData).then(res => {
          this.getData()
          this.replymsg = ''
          this.showpopup = false
        })
      } else {
        this.$vux.toast.show({
          type: "text",
          width: "20em",
          text: '评论内容不能为空！'
        })
      }
    },
    getWxData(val) {
      wx.onMenuShareTimeline(this.wxShareData)
      wx.onMenuShareAppMessage(this.wxShareData)
      wx.onMenuShareQQ(this.wxShareData)
      wx.onMenuShareWeibo(this.wxShareData)
      wx.onMenuShareQZone(this.wxShareData)
    },
  },
  created() {
    this.$store.commit('changeTitle', '动态详情')
    this.getData()
    this.$API.getWxData().then(res => {
      this.wxData.appId = res.AppId
      this.wxData.timestamp = res.Timestamp
      this.wxData.nonceStr = res.NonceStr
      this.wxData.signature = res.Signature
      wx.config(this.wxData)
    })
  },
  mounted() {

  }
}
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
    margin: 0 auto;
    img {
      max-width: 100%;
    }
  }
}
</style>
