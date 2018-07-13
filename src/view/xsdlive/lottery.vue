<template>
  <div class="box">
    <div class="wrapper">
      <div class="people">
        <img :src="logo" alt="西斯达大树幼儿园">
      </div>
      <p class="name" v-show="luckyMan.name">
        <span> {{luckyMan.name}}</span>
        <span class=classname>({{luckyMan.classname}})</span>
      </p>
      <div v-if="control" class="btn" @click="lottery">开始</div>
      <div v-else class="btn" @click="stop">停！</div>
      <ul class="luckyList">
        <li class="text" v-if="luckList.length">中奖名单：</li>
        <li v-for="(item , index) in luckList" :key="index">
          {{item.name}}
          <!-- ({{item.classname}}) -->
        </li>
      </ul>
    </div>
    <div class="session session-bg">
      <i class="fw" :class="{test: piao}"></i>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>

export default {
  name: "lottery",
  
  data() {
    return {
      logo: require("@/assets/xsdlogo.jpg"),
      control: true,
      lid: 0,
      signInList: [], //所有签到用户
      lotteryList: [], //待抽奖用户
      luckList: [], //已中奖用户
      activeIndex: null,
      timer: null,
      luckyMan: {},
      piao: false
    };
  },
  created() {
    this.lid = this.$route.params.liveId;
    this.$store.commit("changeTitle", "2018年大树幼儿园英语汇演");
    this.getSignInList();
    window.onkeyup = event => {
      if (event.keyCode == 32) {
        if (this.control) {
          this.lottery();
        } else {
          this.stop();
        }
      }
    };
  },
  mounted() {
    clearInterval(this.timer);
  },
  distroyed: function() {
    clearInterval(this.timer);
  },
  methods: {
    lottery() {
      if (this.lotteryList.length) {
        this.control = !this.control;
        this.getlottery();
        this.lotteryInterval();
        this.piao = false;
      } else {
        this.$vux.alert.show({
          title: "提示",
          content: "还没有人参加抽奖！"
        });
      }
    },
    stop() {
      this.piao = true;
      clearInterval(this.timer);
      this.control = !this.control;
      this.luckList.push(this.lotteryList.splice(this.activeIndex, 1)[0]);
    },
    getSignInList() {
      let para = {
        lid: this.lid,
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
  padding: 240px 200px 50px;
  height: calc(~"100vh - 290px");
  // box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  .people {
    width: 240px;
    height: 240px;
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
    .classname {
      font-size: 30px;
    }
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
  z-index: -10;
}
.test {
  background: url(../../assets/fw.png);
  transform-origin: center top;
  animation: b 2.4s 0s ease both;
}
@-webkit-keyframes b {
  from {
    transform: translate3d(0, -2600px, 0);
    opacity: 0;
  }

  to {
    transform: translateZ(1000px);
  }
}

.session-bg canvas {
  position: absolute;
  width: 1920px;
  left: 50%;
  margin-left: -960px;
  top: 0;
  z-index: -10;
}

.luckyList {
  display: flex;
  flex-direction: row;
  // position: fixed;
  // left: 50px;
  // top: 200px;
  font-size: 24px;
  margin-top: 50px;
  .text {
    color: #ffcc1d;
  }
  li {
    margin-right: 20px;
  }
}
</style>
