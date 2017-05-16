<template>
  <div id="app">

    <x-header id="nav-top" :left-options="{backText: ''}">
      {{$store.state.title}}
      <i class="fa fa-bars" slot="right" @click="$router.push('/')"></i>
    </x-header>

    <transition name='slide-fade'>
      <router-view id="inview"></router-view>
    </transition>

    <tabbar id="nav-bottom" v-show="$store.state.isNav">
      <tabbar-item selected link="/main">
        <i slot="icon" class="iconfont nav_icon">&#xe666;</i>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/class">
        <i slot="icon" class="iconfont nav_icon">&#xe672;</i>
        <span slot="label">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/msg">
        <i slot="icon" class="iconfont nav_icon">&#xe629;</i>
        <span slot="label" class="fff">沟通</span>
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
  methods:{

  },
  created(){

  },
  computed:{

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/card.less';

// @appwidth:475px;
@appwidth:100%;

body {
  max-width: @appwidth;
  margin:0 auto;
  font-size:12px;
  background:@c1;
  overflow-x: hidden;
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
  src: url('//at.alicdn.com/t/font_tmsva20orum1jor.eot');
  src: url('//at.alicdn.com/t/font_tmsva20orum1jor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_tmsva20orum1jor.woff') format('woff'),
  url('//at.alicdn.com/t/font_tmsva20orum1jor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_tmsva20orum1jor.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  // font-size:16px;
  font-style:normal;
  // -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  // -moz-osx-font-smoothing: grayscale;
}
.nav_icon{
  line-height: 27px;
}
</style>
