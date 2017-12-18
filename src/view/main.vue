<template>
  <div id="app">

    <x-header id="nav-top" :left-options="{backText: ''}" v-show="!$store.getters.isWeixin">
      {{web_title}}
    </x-header>

    <transition name='slide-fade'>
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
      <tabbar-item :badge="UnReadMsgCount" link="/contact">
        <i slot="icon" class="iconfont nav_icon">&#xe629;</i>
        <span slot="label" class="navtext">通讯录</span>
      </tabbar-item>
      <tabbar-item :link="hasLogin?'/user':'/login'">
        <i slot="icon" class="iconfont nav_icon">&#xe719;</i>
        <span slot="label" class="navtext">{{hasLogin?'我的':'未登录'}}</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader, Loading, XSwitch, XDialog , TransferDomDirective as TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Tabbar, TabbarItem, XHeader, Loading, XSwitch, XDialog 
  },
  directives: {
    TransferDom
  },
  data() {
    return {
    }
  },
  methods: {

  },
  watch: {

  },
  computed: {
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
      return this.$store.state.title
    },
    UnReadMsgCount() {
      if(this.$store.state.UnReadMsgCount == 0){
        return null
      }else{
        return this.$store.state.UnReadMsgCount
      }
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
}

#inview {
  position: relative;
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

</style>
