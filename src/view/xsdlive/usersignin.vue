<template>
  <div class="wrapper">
    <div class="content">
      <img :src="bg" alt="">
      <P class="title">恭喜您,签到成功</P>
      <x-button :gradients="['#FF5E3A', '#FF9500']" class="btn" link="/xsdLive/3">
        进入直播间
      </x-button>
      <p class="tips">不要忘了给喜欢的节目投票~</p>
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

export default {
  data() {
    return {
      bg: require("@/assets/siginIn.gif")
    };
  },
  computed: {
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
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
    XTable
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  },
  created() {

    if (this.isWeiXin && !this.getCookie("openid")) {
      window.location.href =
        this.$store.state.ApiUrl +
        "/api/LiveVideoWeiXinOAuth/index?refUrl=" +
        window.location.host +
        "/m/xsdUserLive";
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .content {
    margin-top: 35%;
    text-align: center;
    .btn {
      width: 80%;
      margin-top: 20px;
    }
    .title {
      font-size: 20px;
      line-height: 60px;
    }
    .tips {
      line-height: 50px;
      color: #aaa;
    }
  }
}
</style>
