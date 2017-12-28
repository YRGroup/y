<template>
  <div class="container">
    <div>
      <tab>
        <tab-item v-model="tabIndex" :selected="tabIndex == 0 ? true :false" @on-item-click="onItemClick">互动</tab-item>
        <tab-item v-model="tabIndex" :selected="tabIndex == 1 ? true :false" @on-item-click="onItemClick">直播信息</tab-item>
        <tab-item v-model="tabIndex" :selected="tabIndex == 2 ? true :false" @on-item-click="onItemClick">关注我们</tab-item>
      </tab>
    </div>
    <div>  
      <swiper v-model="tabIndex" class="swiper" height="100%"  :show-dots="false">
        <swiper-item class="swiperComment">
          <i class="iconfont refresh" @click="$router.push('/')">&#xe666;</i>
          <div class="content">
            <div  class="tab-swiper vux-center  commentsBox" ref="comment">
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
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center content">
            <divider>节目单</divider>
            <img src="http://pic.yearnedu.com/LiveVideo/playbill.jpg">
            <divider>精彩花絮</divider>
            <img v-for="(item,index) in huaxuImg"  :src="item" :key="index">
          </div> 
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center content">
            <x-dialog v-model="showWX" class="wxDialog" :dialog-style="{'max-width': '50%' }">
              <!-- <div class="close" @click="showWX=false">
                <span>
                  <i class="iconfont">&#xe641;</i>
                </span>
              </div> -->
              <div>
                <p class="main">长按识别二维码</p>
                <p>关注公众号，获取更多信息</p>
              </div>
              <div class="img-box">
                <img :src="QRcodeIMG" style="max-width:100%">
              </div>
            </x-dialog>
          </div>
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
  XImg  
} from "vux";

export default {
  data() {
    return {
      tabIndex: 0,
      content: "",
      showWX: true,
      QRcodeIMG: "",
      admin:'',
      huaxuImg:[
        'http://pic.yearnedu.com/LiveVideo/4.jpg',
        'http://pic.yearnedu.com/LiveVideo/7.jpg',
        'http://pic.yearnedu.com/LiveVideo/2.jpg',
        'http://pic.yearnedu.com/LiveVideo/1.jpg',
        'http://pic.yearnedu.com/LiveVideo/5.jpg',
        'http://pic.yearnedu.com/LiveVideo/6.jpg',
        'http://pic.yearnedu.com/LiveVideo/3.jpg',
        'http://pic.yearnedu.com/LiveVideo/8.jpg',
      ]
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
    XImg
  },
  computed: {
    commentsList() {
      return this.$store.state.commentsList;
    },
    showSendComment() {
      return this.tabIndex == 0 ? true : false;
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        return true; 
      }else{ 
        return false; 
      } 
    }
  },
  methods: {
    onItemClick(index) {
      this.tabIndex = index;
    },
    getCommentsList() {
      this.$API.getCommentsList().then(res => {
        this.$store.commit("setCommentsList", res); 
      });
    },
    getInterval() {
      setInterval(this.getCommentsList, 5000);
    },
    getWXQRcode() {
      this.QRcodeIMG = this.$API.getWXQRcode()
    },
    sendComment() {
      if(!this.getCookie('openid')){
        this.$vux.toast.text("只能在微信中评论！~");
        return
      }

      if (this.content) {
        let options = {
          content: this.content
        };
        this.$API.sendComment(options).then(res => {
          this.getCommentsList();
          this.content='';
        }).catch();
      } else {
        this.$vux.toast.text("说点什么吧~", "middle");
      }
    },
    delComment(id){
      let options={
        id:id
      }
      let This=this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定删除此条评论吗？',
        onConfirm () {
          This.$API.delComment(options).then(res => {
            This.getCommentsList();
          }).catch();
        }
      })
    },
    formatTime(val) {
      return val.slice(5, val.indexOf(".")).replace("T", " ");
    },
    getCookie(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
    }
  },
  created() {
    this.getCommentsList();
    this.getWXQRcode();
    this.getInterval();
    if(this.isWeiXin && !this.getCookie('openid')){
      window.location.href = this.$store.state.ApiUrl + '/api/LiveVideoWeiXinOAuth/index?refUrl=' + window.location.host + '/%23/live'
    } 
  },
  mounted() {
    
  }
};
</script>
<style lang="less" scoped>
@import "../style/theme.less";
@import '../style/iconfont.less';

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
  .refresh{
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
    height: 100%;
    overflow: auto;
    padding: 10px;
    img{
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
  .commentItem {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 0.6em 1.2em;
    .commentContent{
      word-break: break-word;
      
    }
    .commentUser {
      width: 4em;
      text-align: center;
      margin-right: 1em;
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
    top: .5rem;
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
.deleteBtn{
  float: right;
}
</style>


