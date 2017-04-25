<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  max-width: 600px;
  margin:0 auto;
  position: relative;
  background-color: #fbf9fe;
}
</style>
