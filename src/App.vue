<template>
  <div :style="{'height':mainHeight+'px'}" style="overflow: scroll">

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
  data() {
    return {

    }
  },
  methods: {

  },
  watch: {
    web_title: (val) => {
      document.title = val + ' - 育人教育'
    },
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
    },
    mainHeight(){
        return window.innerHeight
    }
  },
  created() {
    if (!this.$store.state.hasLogin && !this.$route.meta.anonymous) {
      this.$store.dispatch('getCurrentUser')
    }
    if (localStorage.user && !this.$store.state.hasLogin) {
      this.$store.commit('login', JSON.parse(localStorage.user))
    }
  },
  mounted() {

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
  background: @bg;
  overflow-x: hidden;
  color: @black;
}

html {
  padding: 0;
  margin: 0;
}

#app {
  padding: 0;
}

.vux-popup-mask {
  cursor: default;
}

pre {
  font-family: -apple-system-font, "Helvetica Neue", sans-serif;
}

::-webkit-input-placeholder {
  color: @border;
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
.scrollerX {
  position: absolute;
  z-index: 1;
  left: 0;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  -o-text-size-adjust: none;
  text-size-adjust: none;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
  /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
//基本信息里的头像
.headImg {
  height: 2.4rem;
  border-radius: 50%;
}

@font-face {
  font-family: 'iconfont';
  /* project id 291668 */
  src: url('//at.alicdn.com/t/font_291668_rhnwcmwdqme7b9.eot');
  src: url('//at.alicdn.com/t/font_291668_rhnwcmwdqme7b9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_291668_rhnwcmwdqme7b9.woff') format('woff'),
  url('//at.alicdn.com/t/font_291668_rhnwcmwdqme7b9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_291668_rhnwcmwdqme7b9.svg#iconfont') format('svg');
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
      color: @grey;
      li {
        span {
          position: relative;
          margin-right: 10px;
          &:before {
            content: "";
            width: 4px;
            height: 4px;
            background: @main;
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
