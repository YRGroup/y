<template>
  <div class="box">
    <div class="wrapper">
      <div class="people">
        <img :src="logo" alt="西斯达大树幼儿园">
      </div>
      <p class="name">{{luckyMan.name}}</p>
      <div v-if="control" class="btn" @click="lottery">开始</div>
      <div v-else class="btn" @click="stop">停！</div>
      <ul class="luckyList">
      <li v-for="(item , index) in luckList" :key="index">
        {{item.name}}
      </li>
    </ul>
    </div>
    <div class="session session-bg">
      <canvas id="cvs"></canvas>
      <i class="fw"></i>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
require("@/js/canvas.js");
export default {
  name: "lottery",
  data() {
    return {
      logo: require("@/assets/xsdlogo.jpg"),
      control: true,
      liveId: 3,
      signInList: [], //所有签到用户
      lotteryList: [], //待抽奖用户
      luckList: [], //已中奖用户
      activeIndex: null,
      timer: null,
      luckyMan: {}
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
      clearInterval(this.timer);
      this.piao();
      this.control = !this.control;
      this.luckList.push(this.lotteryList.splice(this.activeIndex, 1)[0]);
    },
    getSignInList() {
      let para = {
        lid: this.liveId,
        lottery: 0
      };
      this.$API.getSignInList(para).then(res => {
        console.log(res);
        // this.signInList = res.Content;
        this.lotteryList = res.Content;
      });
    },
    getlottery() {
      this.activeIndex = this.getRandom(0, this.lotteryList.length - 1);
      this.luckyMan = this.lotteryList[this.activeIndex];
    },
    lotteryInterval() {
      this.timer = setInterval(() => {
        this.getlottery();
      }, 300);
    },
    piao() {
      let cvs = document.getElementById("cvs");
      dotsPiao(cvs, {
        width: 1920, //画布宽，默认父元素宽，非必需
        height: 1000, //画布高，默认父元素高，非必需
        colors: [
          "#eed074",
          "#ffffff",
          "#ffc600",
          "#fec501",
          "#df1807",
          "#d78a1a"
        ], //彩带颜色数组，非必需
        fps: 1, //产出速度（个/帧），非必需
        end: 5000 //多少毫秒后停止，默认不停止，非必需
      });
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
.box {
  height: 100vh;
  // background: url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  // background-size: cover;
  position: relative;
  // z-index: -100;
}
.bg {
  background: url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -100;
}
.wrapper {
  padding: 200px 200px 0;
  height: calc(~"100vh - 200px");
  box-sizing: border-box;
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
  .name {
    line-height: 60px;
    font-size: 60px;
    text-align: center;
  }
}

.session-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: -10;
}

.session-bg .fw {
  position: absolute;
  left: 50%;
  margin-left: -915px;
  top: 0;
  width: 1830px;
  height: 2688px;
  background: url(../../assets/fw.png);
  z-index: -10;
}

.session-bg canvas {
  position: absolute;
  width: 1920px;
  left: 50%;
  margin-left: -960px;
  top: 0;
  z-index: -10;
}
.luckyList{
  position: fixed;
  left: 50px;
  top:200px;
  font-size: 30px;
}
</style>
