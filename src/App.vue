<template>
  <div>
  
    <loading v-model="isLoading"></loading>
  
    <transition name='slide-fade'>
      <router-view></router-view>
    </transition>
  
  </div>
</template>

<script>
import { Loading } from 'vux'

export default {
  components: {
    Loading
  },
  methods: {
    showRouterInfo() {
      window.scrollTo(0, 0);
    }
  },
  watch: {
    web_title: (val) => {
      document.title = val + ' - 育人教育'
    },
    "$route": "showRouterInfo"
  },
  computed: {
    web_title() {
      return this.$store.state.title
    },
    hasLogin() {
      return this.$store.state.hasLogin
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  created() {
    this.showRouterInfo()
  },
  mounted() {
    if (localStorage.hasLogin && !this.$store.state.hasLogin) {
      let user = JSON.parse(localStorage.user)
      this.$store.commit('login', user)
    }
  },
  beforeCreate() {
    if (this.$store.state.ApiUrl == '') {
      let payload = {
        // id:1
      }
      this.$store.dispatch('setApiUrl', payload)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/card.less';
body {
  max-width: @appwidth;
  margin: 0 auto;
  padding: 0;
  font-size: 12px;
  background: @c1;
  overflow-x: hidden;
  color: @cc1;
}

html {
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  padding: 0;
}
.vux-popup-mask{
  cursor: default;
}

pre {
  font-family: -apple-system-font, "Helvetica Neue", sans-serif;
}

::-webkit-input-placeholder {
  color: @cc4;
}

li {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
}

// 切换动画
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-enter {
  transform: translateX(100vw);
  opacity: 0;
}

//基本信息里的头像
.headImg {
  height: 2.4rem;
  border-radius: 50%;
}

@font-face {
  font-family: 'iconfont';  /* project id 291668 */
  src: url('//at.alicdn.com/t/font_o28nhydk0yynwmi.eot');
  src: url('//at.alicdn.com/t/font_o28nhydk0yynwmi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_o28nhydk0yynwmi.woff') format('woff'),
  url('//at.alicdn.com/t/font_o28nhydk0yynwmi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_o28nhydk0yynwmi.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont";
  font-style: normal; // -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  // -moz-osx-font-smoothing: grayscale;
}

.nav_icon {
  line-height: 27px;
}

.card {
  background: #fff;
  margin-top: 10px;
}

//弹窗样式
.childPopup {
  width: 100%;
  height: 100%;
  background: black;
}

//弹窗样式
.dialog-demo {
  position: relative;
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
    overflow: visible;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    border-radius: 8px 8px 0 0;
    height: 84px;
    overflow: hidden;
    background: #00c06f;
    padding: 10px 0;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .popupText {
    padding: 10px 0;
    h3 {
      font-size: 1.6em;
      line-height: 1.6em;
      font-weight: 400;
    }
    .subcon {
      font-size: 1.2em;
      color: @cc2;
      li {
        span {
          position: relative;
          margin-right: 10px;
          &:before {
            content: "";
            width: 4px;
            height: 4px;
            background: @cc6;
            border-radius: 50%;
            position: absolute;
            top: 8px;
            left: 0;
          }
        }
      }
    }
    .popbtn {
      margin: 10px 2rem;
      padding: 10px 0;
      font-size: 1rem;
      color: #fff;
      border-radius: 50px;
      background: linear-gradient(right top, #00c0a1, #00c06f);
    }
  }
  .popclose {
    position: absolute;
    top: -46px;
    right: 0;
    font-size: 1.6rem;
    color: #fff;
    z-index: 9999;
    opacity: .6;
    span {
      &:before {
        content: "";
        position: absolute;
        width: 1px;
        height: 18px;
        background: #fff;
        right: 12px;
        bottom: -4px;
      }
    }
  } 
}
</style>