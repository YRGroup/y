<template>
  <div class="liveTabContainer">
    <div>
      <tab>
        <tab-item  v-model="tabIndex" :selected="tabIndex == 0 ? true :false" @on-item-click="onItemClick">互动</tab-item>
        <tab-item  v-model="tabIndex" :selected="tabIndex == 1 ? true :false" @on-item-click="onItemClick">精彩瞬间</tab-item>
        <tab-item v-if="livePlayer.isVote" v-model="tabIndex" :selected="tabIndex == 2 ? true :false" @on-item-click="onItemClick">节目投票</tab-item>
      </tab>
    </div>
    <div>  
      <swiper v-model="tabIndex" class="swiper" height="100%"  :show-dots="false" :threshold="200" :min-moving-distance="20">

        <swiper-item class="swiperComment">
          <i class="iconfont refresh" @click="$router.push('/')">&#xe666;</i>
          <scroll-view class="content" ref="scroll">
          <div class="tab-swiper vux-center  commentsBox">
              <div v-for="(item,index) in showCommentList" :key="index" class="commentItem clearfix">
                <div class="commentUser">
                  <img class="headImg" :src="item.headimgurl" alt="">
                </div>
                <div class="commentInfo">    
                  <span v-text="item.nickname"></span>          
                  <span class="time" v-text="formatTime(item.addtime)"></span>
                  <span class="deleteBtn"><i class="iconfont" v-if="item.openid==admin" @click="delComment(item.ID)">&#xe630;</i></span>
                  <p class="commentContent" v-text="item.content"></p>
                </div>
              </div>
            </div>
          </scroll-view>
        </swiper-item>

        <swiper-item style="background-color:#fff;">
          <scroll-view class="content noBottom" ref="introScroll">
            <div class="tab-swiper vux-center liveInfo" v-html="livePlayer.introduction"> </div>
          </scroll-view>
        </swiper-item>
        
        <swiper-item>
          <scroll-view class="content votelist" >
            <x-table v-if="livePlayer.programList"  :cell-bordered="false"  style="background-color:#fff;">
              <thead>
                <tr>
                  <th>节目名称</th>
                  <th>表演者</th>
                  <th>投票</th>
                </tr>
              </thead>
              <tbody class="votetable">
              <tr v-for="(i,index) in livePlayer.programList" :key="index">
                <!-- <td>{{index+1}}</td> -->
                <td>{{i.ProgramName}}</td>
                <td>{{i.Actor}}</td>
                <td>
                  <x-button type="primary" mini :disabled="isVoted(i.ID)" @click.native="programvote(i.ID,i.ProgramName)">
                    {{isVoted(i.ID)?'已投票':'投票'}}{{i.VoteCount}}
                  </x-button>
                </td>
              </tr>
            </tbody>
            </x-table>
          </scroll-view>
        </swiper-item>
        
      </swiper>
    </div>
    <div class="sendComment" v-show="showSendComment">
      <group class="weui-cells_form">
        <x-input title="" class="weui-vcode" :show-clear="false"  v-model="content" placeholder="说点什么">
          <x-button slot="right" type="primary" @click.native="sendComment" mini>发送</x-button>
        </x-input>
      </group>
  </div>
  </div>
</template>
<script>
import {
  XInput,
  Tab,
  Group,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem,
  XDialog,
  XImg,
  XTable
} from "vux";
import scrollView from "@/components/scroll-view";
import { getCookie } from "@/assets/js/util";

const MAXLENGTH = 20;

export default {
  data() {
    return {
      tabIndex: 0,
      content: "",
      showWX: true,
      QRcodeIMG: "",
      admin: "",
      curid: -1,
      timer: 0,
      hasVoteList: []
    };
  },
  props: {
    livePlayer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    XInput,
    Group,
    XDialog,
    XImg,
    scrollView,
    XTable
  },
  computed: {
    showSendComment() {
      return this.tabIndex == 0 ? true : false;
    },
    showCommentList() {
      let list = this.livePlayer.commentList;
      if (list) {
        return list.length > MAXLENGTH
          ? list.slice(list.length - MAXLENGTH, list.length)
          : list;
      } else {
        return new Array();
      }
    }
  },
  methods: {
    scrollToBottom() {
      this.$refs.scroll.scrollTo(0, this.$refs.scroll.maxY(), 0);
    },
    onItemClick(index) {
      this.tabIndex = index;
    },
    setTimer() {
      this.getCommentsList(true);
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    getCommentsList(timer) {
      let para = {
        lid: this.livePlayer.id,
        curid: this.curid
      };
      this.$API.getCommentsList(para).then(res => {
        if (res.length) {
          this.livePlayer.setCommentList(
            this.livePlayer.commentList.concat(res)
          );
          this.$nextTick(() => {
            this.$refs.scroll.refresh();
            this.scrollToBottom();
          }, 20);
          this.curid = res[res.length - 1].ID;
        }
        if (timer) {
          this.timer = setTimeout(() => {
            this.getCommentsList(true);
          }, 5000);
        }
      });
    },
    sendComment() {
      if (!getCookie("openid")) {
        this.$vux.toast.text("只能在微信中评论！~");
        return;
      }

      if (this.content) {
        let options = {
          content: this.content,
          lid: this.livePlayer.id
        };
        this.$API
          .sendComment(options)
          .then(res => {
            this.getCommentsList();
            this.content = "";
          })
          .catch();
      } else {
        this.$vux.toast.text("说点什么吧~", "middle");
      }
    },

    programvote(id, programName) {
      let para = {
        pid: id,
        lid: this.livePlayer.id
      };
      const This = this;
      this.$vux.confirm.show({
        title: "提示",
        content: `要给 ${programName} 投票吗？`,
        onConfirm() {
          This.$vux.loading.show();
          This.$API
            .programvote(para)
            .then(res => {
              This.$vux.loading.hide();
              This.livePlayer.setProgramList(JSON.parse(res.Content));
              This.hasVoteList.push(id);
              This.$nextTick(() => {
                This.$refs.scroll.refresh();
              }, 20);
            })
            .catch(err => {
              This.$vux.loading.hide();
              This.$vux.toast.text(err.msg, "middle");
            });
        }
      });
    },
    formatTime(val) {
      return val.slice(5, val.indexOf(".")).replace("T", " ");
    },
    getProgramList() {
      let para = {
        lid: this.livePlayer.id
      };
      this.$API.getProgramList(para).then(res => {
        this.livePlayer.setProgramList(res.Content);
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        }, 20);
      });
    },
    isVoted(id) {
      if (this.hasVoteList.length) {
        return this.hasVoteList.some(el => Number(el) == id);
      } else {
        return false;
      }
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.$refs.introScroll.refresh();
    // }, 20);
  },
  mounted() {
    setTimeout(() => {
      this.$refs.introScroll.refresh();
    }, 20);
  },
  destroyed() {
    this.clearTimer();
  },
  watch: {
    livePlayer() {
      this.getProgramList();
      if (this.timer) {
        this.clearTimer();
      }
      this.setTimer();
    }
  }
};
</script>
<style lang="less" >
@import "../style/theme.less";
@import "../style/iconfont.less";

.liveTabContainer {
  color: @black;
  position: relative;
  font-size: 1.1em;
  line-height: 1.8em;
  .sendComment {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  .refresh {
    position: absolute;
    right: 1em;
    top: 1em;
    background: rgba(31, 156, 133, 0.2);
    width: 2em;
    height: 2em;
    text-align: center;
    line-height: 2em;
    font-size: 1.5em;
    border-radius: 50%;
    color: @main;
    z-index: 2;
  }
  .swiper {
    position: relative;
    height: calc(~"60vh - 44px"); //100vh  屏幕的100%
    overflow: hidden;
  }
  .swiperComment {   
    padding-bottom: 49px;
    box-sizing: border-box;
  }
  .content {
    position: absolute;
    top: 0;
    bottom: 10px;
    width: 100%;
    overflow: auto;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
    img {
      width: 100%;
      display: block;
    }
    .commentsBox {
      box-sizing: border-box;
      padding-bottom: 50px;
    }
    .yrInfo {
      width: 95vw;
      margin: 0 auto 1em auto;
      padding: 1em;
      box-sizing: border-box;
      background: #fff;
      color: @grey;
    }
  }
  .votelist {
    padding: 0;
  }
  .noBottom {
    bottom: 0;
  }
  .commentItem {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 0.6em;
    .commentContent {
      word-break: break-word;
    }
    .commentUser {
      width: 4em;
      text-align: center;
      margin-right: 0.6em;
      .headImg {
        border-radius: 50%;
        width: 3em;
        height: 3em;
      }
      p {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        color: @grey;
      }
    }
    .commentInfo {
      width: calc(~"100vw - 4em");
    }
  }
  .time {
    color: @grey;
  }
  .liveInfo {
    text-align: center;
    overflow: hidden;

  }
}

.left {
  float: left;
}
.right {
  float: right;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.wxDialog {
  position: relative;
  .close {
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .main {
    color: @main;
    font-size: 1.5rem;
    line-height: 2.4rem;
  }
}
.deleteBtn {
  float: right;
}
.votetable tr td {
  padding: 8px 0;
}
.votetable tr:nth-child(2n + 1) {
  background: #f6f6f6;
}
.vux-center img {
  max-width: 100%;
}
</style>


