<template>
  <div>
  
    <card>
      <div slot="header" class="header cardcont">
        <img :src="data.userImg" @click="fun('打开 '+data.auther+' 的个人页面')">
        <span class="usename">{{ data.auther }}</span>
        <span class="time">{{ data.date }}</span>
        <span class="tips">{{ data.category }}</span>
      </div>
      <div slot="content" class="content">
        <pre v-html="data.content"></pre>
      </div>
    </card>
  
    <div class="comment-header">
      <span>全部评论（{{commentLength }}）</span>
      <span class="addbtn" @click="openreply">回复</span>
    </div>
    <card class="comment cardcont" v-for="comment in data.comment" :key="comment.name">
      <div slot="header" class="header">
        <img :src="fakeUserImg" @click="fun('打开 '+comment.userName+' 的个人页面')">
        <span class="usename" @click="fun('打开 '+comment.userName+' 的个人页面')">{{ comment.userName }}</span>
        <span class="time">{{ comment.addTime }}</span>
      </div>
      <div slot="content" class="content">
        <p>{{comment.content }}</p>
      </div>
    </card>
  
    <popup v-model="showpopup" height="180px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:160px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group :title="'回复 '+data.auther+' 的内容'">
          <x-input v-model="replymsg" placeholder="在此输入内容内容" @keyup.enter.native="addreply"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="addreply">发表</x-button>
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
      content:'',
      commentLength: 0,
      fakeUserImg: 'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
      data: {},
      classHeader:false
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
      this.$API.getClassDynamic(this.$route.params.classId, this.$route.params.msgId).then(res => {
        console.log(this.data)
        this.data = res
        this.commentLength = res.comment.length
        this.commentId = res.id
      }).catch(err => {
        console.log(err)
      })
    },
    openreply() {
      this.showpopup = true
    },
    addreply() {
      let replyData = {}
      replyData.did = this.commentId
      replyData.content = this.replymsg
      if (replyData.content != '') {
        this.$API.postNewComment(replyData).then(res => {
          console.log('添加评论成功！')
          console.log(replyData)
          this.getData()
          this.showpopup = false
        }).catch(err => {
          console.log('Add new reply error!')
          console.log(err)
        })
      } else {
        this.fun('评论内容不能为空！')
      }

    }
  },
  created() {
    this.$store.commit('showNav', true)
    this.$store.commit('changeTitle', '动态详情')
    this.getData()
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
  .time {
    top: 3em;
  }
  .reply {
    position: absolute;
    top: 2rem;
    right: 0;
    border: none;
    color: @cc6;
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
  margin-top:20px;
  color: @cc2;
   :after {
    content: "";
    position: absolute;
    width: 3px;
    height: 1em;
    top: 10px;
    left: 1em;
    background: @cc6;
  }
  .addbtn {
    float: right;
    padding: 0 1rem;
    color: @cc6;
    // background: #03a9f4;
    cursor: pointer;
    // border-top-left-radius: 15px;
    // border-bottom-left-radius: 15px;
  }
}
</style>
