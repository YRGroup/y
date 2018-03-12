<template>
  <div id="app">

    <x-header id="nav-top" :left-options="{showBack:isShowBack,backText: '',preventGoBack:true}" v-if="!this.$store.getters.isWeixin" @on-click-back="pageBack">
      {{web_title}}
    </x-header>

    <transition :name='animate'>
        <router-view id="inview" :style="{marginTop:ptop,marginBottom:pdown}"></router-view>
    </transition>

    <tabbar id="nav-bottom" v-show="$store.state.showBottomNav">
      <tabbar-item selected link="/">
        <i slot="icon" class="iconfont nav_icon">&#xe666;</i>
        <span slot="label" class="navtext">主页</span>
      </tabbar-item>
      <tabbar-item :show-dot="$store.state.hasNewPost" :link="'/class'">
        <i slot="icon" class="iconfont nav_icon">&#xe672;</i>
        <span slot="label" class="navtext">班级</span>
      </tabbar-item>
      <tabbar-item :badge="UnReadMsgCount" link="/video">
        <i slot="icon" class="iconfont nav_icon">&#xe63c;</i>
        <span slot="label" class="navtext">视频</span>
      </tabbar-item>
      <tabbar-item :link="hasLogin?'/user':'/login'">
        <i slot="icon" class="iconfont nav_icon">&#xe719;</i>
        <span slot="label" class="navtext">{{hasLogin?'我的':'未登录'}}</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader, XSwitch, XDialog , TransferDomDirective as TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Tabbar, TabbarItem, XHeader, XSwitch, XDialog 
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      pageTransition:'slide-right', 
      animate:'',
      hideBackPage:['/','/user','/class','/video']    //隐藏返回按钮的页面
    }
  },

  methods: {
    pageBack(){
      this.$router.animate = 2
      history.go(-1)
      // this.pageTransition='slide-left'
      // this.$router.back()
      // setTimeout(()=>{
      //   this.pageTransition='slide-right'
      // },600)
    }
  },
  watch: {
    $route(to, from) {
      /*
                0: 不做动画
                1: 左切换
                2: 右切换
                3: 上切换
                4: 下切换
                 */
      let animate = this.$router.animate || to.meta.slide;
      if (!animate) {
        this.animate = "";
      } else {

        switch (animate) {
          case 1:
            this.animate="slide-left"
            break;
          case 2:
            this.animate="slide-right"
            break;
          case 3:
            this.animate="slide-top"
            break;
          case 4:
            this.animate="slide-bottom"
            break;
          default:
            this.animate=""
            break;
        }
        // this.animate =
        //   animate === 1
        //     ? "slide-left"
        //     : animate === 2
        //       ? "slide-right"
        //       : animate === 3
        //           ? "slide-top"
        //           : animate === 4 
        //             ? "slide-bottom" : "";
      }
      this.$router.animate = 0;
    }
  },
  computed: {
    isShowBack(){
      return !this.hideBackPage.includes(this.$route.path)
    },
    ptop() {
      return this.$store.getters.isWeixin ? '0' : '46px'
    },
    pdown() {
      return this.$store.state.showBottomNav ? '53px' : '0'
    },
    hasLogin() {
      return this.$store.state.hasLogin
    },
    web_title() {
      console.log(this.$store.state.title)
      return this.$store.state.title
    },
    UnReadMsgCount() {
      return null
      // if(this.$store.state.UnReadMsgCount == 0){
      //   return null
      // }else{
      //   return this.$store.state.UnReadMsgCount
      // }
    }
  },
  created() {

  },
  mounted() {

  },
  beforeCreate() {

  }
}
</script>

<style lang="less">

#app {
  padding: 0;
  width: 100%;
  position: relative;
}

#inview {
  position: absolute;
  width: 100%;
  top: 0;
}

#nav-top {
  width: 100%;
  max-width: @appwidth;
  position: fixed;
  background: @main;
  top: 0;
  z-index: 999;
}

#nav-bottom {
  max-width: @appwidth;
  position: fixed;
  bottom: 0;
}

#app .weui-bar__item_on .nav_icon,
#app .weui-bar__item_on .navtext {
  color: @main;
}

#app .weui-btn:after {
  border: none;
}

.slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-100%, 0);
    }



    .slide-top-enter,
    .slide-bottom-leave-active {
        opacity: 0;
        transform: translate(0, 100%);
    }

    .slide-top-leave-active,
    .slide-bottom-enter {
        opacity: 0;
        transform: translate(0, -100%);
    }

</style>
