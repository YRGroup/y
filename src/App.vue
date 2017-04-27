<template>
  <div id="app">

    <x-header id="nav-top" :left-options="{backText: ''}">
      育人教育
      <i class="fa fa-bars" slot="right" @click="$router.push('/')"></i>
    </x-header>

      <router-view id="inview"></router-view>

    <tabbar id="nav-bottom">
      <tabbar-item selected link="/main">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/classmain">
        <i slot="icon" class="fa fa-users"></i>
        <span slot="label">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/msg">
        <i slot="icon" class="fa fa-comments"></i>
        <span slot="label">沟通</span>
      </tabbar-item>
      <tabbar-item link="/user">
        <i slot="icon" class="fa fa-user"></i>
        <span slot="label">我的</span>
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

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  max-width: 600px;
  margin:0 auto;
  background-color: #fbf9fe;
  font-size:12px;
}
#inview{
  margin-top:3.8em;
  margin-bottom:4.5em;
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
</style>
