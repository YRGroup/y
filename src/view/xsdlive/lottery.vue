<template>
  <div class="wrapper">
    <div class="people">
      <img :src="logo" alt="西斯达大树幼儿园">
    </div>
    <div v-if="control" class="btn" @click="lottery">开始</div>
    <div v-else class="btn" @click="lottery">结束</div>
  </div>
</template>

<script>

export default {
  name: 'lottery',
  data() {
    return {
      logo:require('@/assets/xsdlogo.jpg'),
      control: true
    }
  },

  created() {

  },
  mounted() {
  },
  methods: {
    lottery() {
      this.control = !this.control
    }
  }

}
</script>

<style lang="less" scoped> 
.wrapper{
  height: 100vh;
  padding: 240px 200px 0;
  box-sizing:border-box;
  background:url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  background-size: cover; 
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  .people{
    width: 320px;
    height: 320px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .btn{
    width: 420px;
    height: 68px;
    line-height: 68px;
    font-size: 28px;
    text-align: center;
    background: #fff71d;
    border-radius: 6px;
    color: #940911;
    cursor: pointer;
    box-shadow: 0 6px 0 #eb8602;
    &:active{
      background: #ffcc1d;
      box-shadow: 0 6px 0 #c87100;
    }
  }
}
</style>
