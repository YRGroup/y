<template>
  <div id="app">
    <x-header id="nav-top" :left-options="{backText: ''}" v-show="shownav">
      {{web_title}}
      <i class="fa fa-bars" slot="right" @click="$router.push('/')"></i>
    </x-header>

    <transition name='slide-fade'>
      <router-view id="inview" :style="{marginTop:ptop}"></router-view>
    </transition>

    <tabbar id="nav-bottom" v-show="shownav">
      <tabbar-item selected link="/main">
        <i slot="icon" class="iconfont nav_icon">&#xe666;</i>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item show-dot :link="'/class/'+$store.state.classId">
        <i slot="icon" class="iconfont nav_icon">&#xe672;</i>
        <span slot="label">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/msg">
        <i slot="icon" class="iconfont nav_icon">&#xe629;</i>
        <span slot="label" class="fff">通讯录</span>
      </tabbar-item>
      <tabbar-item link="/user">
        <i slot="icon" class="iconfont nav_icon">&#xe719;</i>
        <span slot="label" class="fff">我的</span>
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
      window.scrollTo(0,0);
    }
  },
  created(){

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
      return this.$store.state.isNav ? '3.8em' : '0'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/card.less';

@appwidth:475px;

body {
  max-width: @appwidth;
  margin:0 auto;
  font-size:12px;
  background:@c1;
  overflow-x: hidden;
  color: @cc1;
}
#inview{
  margin-top:3.8em;
  padding-bottom:4.5em;
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(100vw);
  opacity: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 291668 */
  src: url('//at.alicdn.com/t/font_d12xy3wjgmrc0udi.eot');
  src: url('//at.alicdn.com/t/font_d12xy3wjgmrc0udi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_d12xy3wjgmrc0udi.woff') format('woff'),
  url('//at.alicdn.com/t/font_d12xy3wjgmrc0udi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_d12xy3wjgmrc0udi.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont";
  // font-size:16px;
  font-style:normal;
  // -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  // -moz-osx-font-smoothing: grayscale;
}
.nav_icon{
  line-height: 27px;
}

.card{
  background: #fff;
  margin-top:10px;
}

</style>
