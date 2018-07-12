<template>
  <div class="wrapper">
    <div class="item">
      <transition-group tag="ul" class="userlist">
          <li v-for="(item,index) in SignInList" class="user" :key="index">
            <img :src="item.img" alt="">
            <p>{{item.name}}</p>
          </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      liveId: 0,
      curid: 0,
      count: 2,
      SignInList: []
    };
  },

  components: {},
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
        this.SignInList = res.signInList.slice(0, 24);
      });
    }
  },
  created() {
    this.getSignInList();
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  padding: 240px 200px 0;
  box-sizing: border-box;
  background: url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  background-size: cover;
  color: #fff;
}
.item {
}
.userlist {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  .user {
    text-align: center;
    font-size: 16px;
    width: 12.5%;
    margin-bottom: 50px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    }
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
