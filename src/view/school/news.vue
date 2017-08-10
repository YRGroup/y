<template>
  <div>
  
    <card>
      <div slot="header" class="header">
        <span class="title">{{ data.Title }}</span>
      </div>
      <div slot="content" class="content">
        <div class="time">{{ data.AddTime }}</div>
        <p v-html="data.content"></p>
      </div>
    </card>
  
    <div class="comment-header">
      <span>全部评论（{{data.Comments.length }}）</span>
      <x-button type="primary" class="btn" @click.native="showpopup=true">回复</x-button>
    </div>
    <div class="comment" v-for="comment in data.Comments" :key="comment.name">
      <div class="name">{{ comment.UserName }}：</div>
      <div class="content">{{comment.Content }}</div>
    </div>
  
    <popup v-model="showpopup" height="220px" is-transparent>
      <div style="width: 95%;background-color:#fff;height:150px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <group>
          <x-input v-model="commentData.Content" :placeholder="'评论的内容'"></x-input>
        </group>
        <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="submitReply">发表评论</x-button>
        </div>
      </div>
    </popup>
  
  </div>
</template>

<script>
import { Card, Popup, Group, XInput, XButton } from 'vux'

export default {
  name: 'hello',
  components: {
    Card, Popup, Group, XInput, XButton
  },
  data() {
    return {
      showpopup: false,
      commentData: {
        Content: ''
      },
      data: {
        Comments: []
      },
    }
  },
  methods: {
    getData() {
      let para = {
        articleid: this.$route.params.newsId
      }
      this.$API.getNewsInfo(para).then(res => {
        this.data = res
      })
    },
    reply() {
      this.showpopup = true
    },
    submitReply() {
      this.commentData.ArticleID = this.data.ID
      if (this.commentData.Content == '') {
        this.$vux.toast.show({
          type: "warn",
          text: '内容不能为空',
          width: "20em"
        })
      } else {
        this.$API.addNewsComment(this.commentData).then(res => {
          this.$vux.toast.show({
            type: "success",
            text: '添加评论成功',
            width: "20em"
          })
          this.commentData.Content = ''
          this.showpopup = false
          this.getData()
        })
      }
    }
  },
  created() {
    this.getData()
    this.$store.commit('changeTitle', '新闻详情')
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.header {
  text-align: center;
  .title {
    font-size: 1.5rem;
    line-height: 50px;
  }
}

.time {
  text-align: right;
  color: @c4;
}

.content {
  line-height: 2em;
  text-indent: 2em;
  text-align: left;
}

.comment-header {
  line-height: 2rem;
  background: #fff;
  padding: 1rem;
  font-size: 1.3rem;
  border-bottom: 1px solid @c2;
  .btn {
    width: 80px;
    float: right;
  }
}

.comment {
  background: #fff;
  padding: .5rem;
  padding-left: 2rem;
  border-bottom: 1px dotted @c2;
  .name,
  .content {
    display: inline-block;
  }
}
</style>
