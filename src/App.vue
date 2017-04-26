<template>
  <div id="app">

    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</x-header>

    <router-view></router-view>

    <tabbar>
      <tabbar-item selected link="/main">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/classmain">
        <i slot="icon" class="fa fa-users"></i>
        <span slot="label">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/component/demo">
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
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  max-width: 600px;
  height:100%;
  margin:0 auto;
  // position: relative;
  background-color: #fbf9fe;
}
.weui-tabbar{
  max-width: 600px;
}
</style>
