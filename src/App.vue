<template>
  <div id="app">
    <x-header id="nav-top" :left-options="{backText: ''}" v-show="$store.state.showTopNav">
      {{web_title}}
      <i class="fa fa-bars" slot="right" @click="$router.push('/')"></i>
    </x-header>

    <transition name='slide-fade'>
      <router-view id="inview" :style="{marginTop:ptop,marginBottom:pdown}"></router-view>
    </transition>

    <tabbar id="nav-bottom" v-show="$store.state.showBottomNav">
      <tabbar-item selected link="/main">
        <i slot="icon" class="iconfont nav_icon">&#xe666;</i>
        <span slot="label" class="navtext">主页</span>
      </tabbar-item>
      <tabbar-item show-dot :link="'/class/'+$store.state.currentClassId">
        <i slot="icon" class="iconfont nav_icon">&#xe672;</i>
        <span slot="label" class="navtext">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/contact">
        <i slot="icon" class="iconfont nav_icon">&#xe629;</i>
        <span slot="label" class="navtext">通讯录</span>
      </tabbar-item>
      <tabbar-item :link="hasLogin?'/user':'/login'">
        <i slot="icon" class="iconfont nav_icon">&#xe719;</i>
        <span slot="label" class="navtext">{{hasLogin?'用户':'未登陆'}}</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader  } from 'vux'

export default {
  name: 'app',
  components: {
    Tabbar, TabbarItem, XHeader 
  },
  data(){
    return{
      test0:'00'
    }
  },
  methods:{
    showRouterInfo(){
      console.log('当前路由信息：')
      console.log(this.$route.params)
      console.log('当前VueX信息：')
      console.log(this.$store.state)
      console.log('当前localStorage信息：')      
      console.log(localStorage)
      console.log('当前cookie信息：')      
      console.log(document.cookie)

      window.scrollTo(0,0);
    }
  },
  created(){
    this.showRouterInfo()
  },
  watch:{
    web_title:(val)=>{
      document.title = val+' - 育人教育'
    },
    "$route": "showRouterInfo"
  },
  computed:{
    web_title () {
      return this.$store.state.title
    },
    shownav(){
      return this.$store.state.isNav
    },
    ptop (){
      return this.$store.state.showTopNav ? '46px' : '0'
    },
    pdown (){
      return this.$store.state.showBottomNav ? '53px' : '0'
    },
    hasLogin(){
      return this.$store.state.hasLogin
    }
  },
  mounted(){
    if(localStorage.hasLogin=='true'){
      this.$store.commit('login',localStorage.id)
      console.log('has login')
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/card.less';

// 界面最大宽度
@appwidth:475px;

body {
  max-width: @appwidth;
  margin:0 auto;
  font-size:12px;
  background:@c1;
  overflow-x: hidden;
  color: @cc1;
}
pre{
  font-family: -apple-system-font, "Helvetica Neue", sans-serif;
}
#inview{
  position: relative;
  top:0;
}
#nav-top{
  width:100%;
  max-width: @appwidth;
  position:fixed;
  top:0;
  z-index:10000;
}
#nav-bottom{
  max-width: @appwidth;
  position:fixed;
  bottom:0;
}

::-webkit-input-placeholder { 
color: @cc4; 
} 
li{
  list-style:none;
  padding:0;
  margin:0;
}
a{
  color:inherit;
}

// 切换动画
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(100vw);
  opacity: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 291668 */
  src: url('//at.alicdn.com/t/font_3yb0hlzfwvfs9k9.eot');
  src: url('//at.alicdn.com/t/font_3yb0hlzfwvfs9k9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_3yb0hlzfwvfs9k9.woff') format('woff'),
  url('//at.alicdn.com/t/font_3yb0hlzfwvfs9k9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_3yb0hlzfwvfs9k9.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont";
  font-style:normal;
  // -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  // -moz-osx-font-smoothing: grayscale;
}
.nav_icon{
  line-height: 27px;
}

#app .weui-bar__item_on .nav_icon,#app .weui-bar__item_on .navtext{
  color: @cc6;
}
.card{
  background: #fff;
  margin-top:10px;
}
#app .weui-btn:after{
  border:none;
}
</style>
