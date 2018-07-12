<template>
  <div>签到列表</div>
</template>
<script>
export default {
  data() {
    return {
      liveId: 0,
      curid: 0,
      count: 2
    };
  },

  components: {

  },
  methods: {
    getSignInList() {
      let para = {
        name: this.liveId,
        curid: this.curid,  
        count: this.count,
        getlottery: 0
      };

      this.$API.getSignInList().then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.getSignInList();
  }
};
</script>

<style lang="less" scoped>
body {
}
</style>
