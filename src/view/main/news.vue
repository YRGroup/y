<template>
  <div class="newsPage">
    <card>
      <div slot="header" class="header">
        <div class="newtitle">{{ data.Title }}</div>
        <div class="time">{{ data.AddTime }}</div>
      </div>
      <div slot="content" class="content">
        <pre v-html="data.content"></pre>
      </div>
    </card>

    <div class="comment-header">
      <span>全部评论（{{data.Comments.length }}）</span>
      <span class="addbtn" @click="openreply">回复</span>
    </div>
    <card class="comment" v-for="(i,index) in data.Comments" :key="index">
      <div slot="header" class="header">
        <span class="headTextImg">{{i.UserName.substr(0,1)}}</span>
        <!-- <img :src="i.Headimgurl" @click="fun('打开 '+i.UserName+' 的个人页面')">  -->
        <span class="usename">{{ i.UserName }}</span>
        <span class="time">{{ i.AddTime }}</span>
      </div>
      <div slot="content" class="content">
        <p>{{i.Content }}</p>
      </div>
    </card>

    <popup v-model="showpopup" height="180px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:160px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group :title="'回复 '">
          <x-input v-model="commentData.Content" placeholder="请添加评论" @keyup.enter.native="addreply"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addComment">发表</x-button>
        </div>
      </div>
    </popup>

  </div>
</template>

<script>
import { Card, Popup, Group, XInput, XButton } from 'vux'

export default {
  components: {
    Card, Popup, Group, XInput, XButton
  },
  data() {
    return {
      showpopup: false,
      replymsg: '',
      commentId: '',
      content: '',
      fakeUserImg: 'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
      data: {},
      classHeader: false,
      data: {
        Title: '',
        content: '',
        AddTime: '',
        Comments: []
      },
      commentData: {},
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    getData() {
      let para = {
        articleid: this.$route.query.id
      }
      this.$API.getNewsInfo(para).then(res => {
        this.data = res
      })
    },
    openreply() {
      this.showpopup = true
    },
    addComment() {
      this.commentData.ArticleID = this.$route.query.id
      this.$API.addNewsComment(this.commentData).then(res => {
        this.$vux.toast.show({
          type: "success",
          text: "发布成功"
        })
        this.showpopup = false
        this.commentData.Content = ''
        this.getData()
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '校园新闻')
    this.getData()
  },
  mounted() {

  }
}
</script>

<style lang="less">
.newsPage {
  img {
    max-width: 100%;
  }

  .header {
    margin-bottom: 20px;
    .newtitle {
      font-size: 1.2em;
      text-align: center;
    }
    .time {
      position: static;
      text-align: center;
    }
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
  .comment {
    position: relative;
    margin: 0;
    .vux-card-content {
      padding-left: 120px;
      margin-left: 120px;
    }
  }
}
</style>
