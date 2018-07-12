<template>
  <div class="container">
    <div>
      <tab>
        <!-- <tab-item v-model="tabIndex" :selected="tabIndex == 0 ? true :false" @on-item-click="onItemClick">互动</tab-item> -->
        <tab-item v-model="tabIndex" :selected="tabIndex == 0 ? true :false" @on-item-click="onItemClick">活动介绍</tab-item>
        <tab-item v-model="tabIndex" :selected="tabIndex == 1 ? true :false" @on-item-click="onItemClick">节目投票</tab-item>
      </tab>
    </div>
    <div>  
      <swiper v-model="tabIndex" class="swiper" height="100%"  :show-dots="false" :threshold="200" :min-moving-distance="20">
        <!-- <swiper-item class="swiperComment">
          <i class="iconfont refresh" @click="$router.push('/')">&#xe666;</i>
          <scroll-view class="content" ref="scroll">
          <div class="tab-swiper vux-center  commentsBox" ref="comment">
              <div v-for="(item,index) in commentsList" :key="index" class="commentItem clearfix">
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
        </swiper-item> -->
        <swiper-item>
          <scroll-view class="content noBottom">
            <div class="tab-swiper vux-center">
              <divider>精彩花絮</divider>
              <img v-for="(item,index) in huaxuImg"  :src="item" :key="index">
            </div> 
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view class="content votelist" ref="scroll">
            <x-table  :cell-bordered="false"  style="background-color:#fff;">
              <thead>
                <tr>
                  <!-- <th>顺序</th> -->
                  <th>节目名称</th>
                  <th>表演者</th>
                  <th>投票</th>
                </tr>
              </thead>
              <tbody class="votetable">
              <tr v-for="(i,index) in programList" :key="index">
                <!-- <td>{{index+1}}</td> -->
                <td>{{i.programName}}</td>
                <td>{{i.actor}}</td>
                <td>
                  <x-button type="primary" mini :disabled="isVoted(i.ID)" @click.native="programvote(i.ID,i.programName)">
                    {{isVoted(i.ID)?'已投票':'投票'}}{{i.voteCount}}
                  </x-button>
                </td>
              </tr>
            </tbody>
            </x-table>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
    <!-- <div class="sendComment" v-show="showSendComment">
      <group class="weui-cells_form">
        <x-input title="" class="weui-vcode" :show-clear="false"  v-model="content" placeholder="说点什么">
          <x-button slot="right" type="primary" @click.native="sendComment" mini>发送</x-button>
        </x-input>
      </group>
  </div> -->
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
import { clearInterval } from "timers";

const MAXLENGTH = 500;
export default {
  data() {
    return {
      tabIndex: 0,
      content: "",
      showWX: true,
      QRcodeIMG: "",
      admin: "",
      huaxuImg: [
        "http://pic.yearnedu.com/YRImges/cstar/1.jpg",
        "http://pic.yearnedu.com/YRImges/cstar/2.jpg",
        "http://pic.yearnedu.com/YRImges/cstar/3.jpg",
        "http://pic.yearnedu.com/YRImges/cstar/4.jpg",
      ],
      lid: 0,
      curid: -1,
      commentsList: [],
      timer: "",
      programList: [],
      hasVoteList: []
    };
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
    // commentsList() {
    //   return this.$store.state.commentsList;
    // },
    showSendComment() {
      return this.tabIndex == 0 ? true : false;
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
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
    getCommentsList() {
      let para = {
        lid: this.lid,
        curid: this.curid
      };
      this.$API.getCommentsList(para).then(res => {
        if (res.length) {
          let list = this.commentsList.concat(res);
          if (list.length > MAXLENGTH) {
            list = list.slice(list.length - MAXLENGTH, list.length);
          }
          this.commentsList = list;
          this.$nextTick(() => {
            this.$refs.scroll.refresh();
            this.scrollToBottom();
          }, 20);
          this.curid = res[res.length - 1].ID;
        }
      });
    },
    setInterval() {
      this.timer = setInterval(this.getCommentsList, 5000);
    },
    clearInterval() {
      clearInterval(this.timer);
    },
    getWXQRcode() {
      this.QRcodeIMG = this.$API.getWXQRcode();
    },
    sendComment() {
      if (!this.getCookie("openid")) {
        this.$vux.toast.text("只能在微信中评论！~");
        return;
      }

      if (this.content) {
        let options = {
          content: this.content,
          lid: this.lid
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
    delComment(id) {
      let options = {
        id: id
      };
      let This = this;
      this.$vux.confirm.show({
        title: "提示",
        content: "确定删除此条评论吗？",
        onConfirm() {
          This.$API
            .delComment(options)
            .then(res => {
              This.getCommentsList();
            })
            .catch();
        }
      });
    },
    programvote(id, programName) {
      let para = {
        pid: id,
        lid: this.lid
      };
      const This = this;
      this.$vux.confirm.show({
        title: "提示",
        content: `要给 ${programName} 投票吗？`,
        onConfirm() {
          This.$vux.loading.show();
          This.$API.programvote(para).then(res => {
            console.log(res);
            if (res.Status == 1) {
              This.$vux.loading.hide();
              This.programList = JSON.parse(res.Content);
              This.hasVoteList.push(id);
              localStorage.setItem("hasVoteList", This.hasVoteList);
            }
          });
        }
      });
    },
    formatTime(val) {
      return val.slice(5, val.indexOf(".")).replace("T", " ");
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    getProgramList() {
      let para = {
        lid: this.lid
      };
      this.$API.getProgramList(para).then(res => {
        console.log(para, res);
        if (res.Status == 1) {
          this.programList = res.Content;
        }
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
    let hasVoteList = localStorage.getItem("hasVoteList");
    if (hasVoteList) {
      this.hasVoteList = hasVoteList.split(",");
    } else {
      localStorage.setItem("hasVoteList", new Array());
    }

    if (this.$route.params.liveId) {
      this.lid = this.$route.params.liveId;
    }
    this.getProgramList();
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
<style lang="less" scoped>
@import "../style/theme.less";
@import "../style/iconfont.less";

.container {
  color: @black;
  position: relative;
  font-size: 1.1em;
  line-height: 1.8em;
  .sendComment {
    position: fixed;
    width: 100%;
    max-width: 475px;
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
      max-width: 100%;
      display: block;
    }
    .commentsBox {
      box-sizing: border-box;
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
.votetable tr td{
  padding: 8px 0;
}
.votetable tr:nth-child(2n + 1){
  background: #f6f6f6;
}
.vux-center  img{
  max-width: 100%;
}
</style>


