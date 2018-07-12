<template>
  <div class="wrapper">
    <div class="people">
      <img :src="logo" alt="西斯达大树幼儿园">
      <p>{{name}}</p> 
    </div>
    <div v-if="control" class="btn" @click="lottery">开始</div>
    <div v-else class="btn" @click="stop">停！</div>
  </div>
</template>

<script>
export default {
  name: "lottery",
  data() {
    return {
      logo: require("@/assets/xsdlogo.jpg"),
      control: true,
      liveId: 3,
      SignInList: [],
      activeIndex: null,
      timer: null,
      name: "",
      userlist: [
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦1"
        },
        {
          img: require("@/assets/face/jobs.jpg"),
          name: "周杰伦2"
        },
        {
          img: require("@/assets/face/lh.jpg"),
          name: "周杰伦3"
        },
        {
          img: require("@/assets/face/tc.png"),
          name: "周杰伦4"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        }
      ]
    };
  },

  created() {
    this.getSignInList();
  },
  mounted() {
    clearInterval(this.timer);
  },
  distroyed: function() {
    clearInterval(this.timer);
  },
  methods: {
    lottery() {
      this.control = !this.control;
      this.getlottery();
      this.lotteryInterval();
    },
    stop() {
      this.control = !this.control;
      clearInterval(this.timer);
    },
    getSignInList() {
      let para = {
        lid: this.liveId,
        lottery: 0
      };
      this.$API.getSignInList(para).then(res => {
        console.log(res);
        this.SignInList = res.Content;
      });
    },
    lotteryInterval() {
      this.timer = setInterval(() => {
        this.getlottery();
      }, 100);
    },
    getlottery() {
      // this.activeIndex = this.getRandom(0, this.SignInList.length - 1);

      this.activeIndex = this.getRandom(0, this.SignInList.length - 1);
      this.logo = this.SignInList[this.activeIndex].imgUrl;
      this.name = this.SignInList[this.activeIndex].name;
      console.log(this.activeIndex);
    },
    getRandom(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return Min + Math.round(Rand * Range);
    }
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  .people {
    width: 320px;
    height: 320px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .btn {
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
    &:active {
      background: #ffcc1d;
      box-shadow: 0 6px 0 #c87100;
    }
  }
}
</style>
