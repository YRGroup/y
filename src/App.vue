<template>
  <div id="app">

    <x-header id="nav-top" :left-options="{backText: ''}">
      {{$store.state.title}}
      <i class="fa fa-bars" slot="right" @click="$router.push('/')"></i>
    </x-header>

    <transition name="slide-fade">
      <router-view id="inview"></router-view>
    </transition>

    <tabbar id="nav-bottom" v-show="$store.state.isNav">
      <tabbar-item selected link="/main">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/class">
        <i slot="icon" class="fa fa-users"></i>
        <span slot="label">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/msg">
        <i slot="icon" class="fa fa-comments"></i>
        <span slot="label" class="fff">沟通</span>
      </tabbar-item>
      <tabbar-item link="/user">
        <i slot="icon" class="fa fa-user"></i>
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

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

@c1:#E6EFF0;
@c2:#C2DDEA;
@c3:#91C2CD;
@c4:#618CA0;
@c5:#547583;
@c6:#509983;

body {
  max-width: 600px;
  margin:0 auto;
  font-size:12px;
  background:@c1;
}
#inview{
  margin-top:3.8em;
  padding-bottom:4.5em;
  position: relative;
  top:0;
}
#nav-top{
  width:100%;
  max-width: 600px;
  position:fixed;
  top:0;
  z-index:10000;
}
#nav-bottom{
  max-width: 600px;
  position:fixed;
  bottom:0;
}
li{
  list-style:none;
  padding:0;
  margin:0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(100vw);
  opacity: 0;
}
</style>
