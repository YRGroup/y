<template>
  <div class="box">
    <div class="wrapper ">
      <!-- <div class="people">
        <img :src="logo" alt="西斯达大树幼儿园">
      </div> -->
      <p class="name" v-show="luckyMan.name">
        <span> {{luckyMan.name}}</span>
        <span class=classname>({{luckyMan.classname}})</span>
      </p>
      <div v-if="control" class="btn" @click="lottery">开始</div>
      <div v-else class="btn" @click="stop">停！</div>
      <div class="bottomList">
        <p class="text" v-if="luckList.length">中奖名单：</p>
        <ul class="luckyList">
          <li v-for="(item , index) in luckList" :key="index">
            {{item.name}}
            <!-- ({{item.classname}}) -->
          </li>
        </ul>
      </div>
    </div>
    <div class="session session-bg">
      <i class="fw" :class="{test: piao}"></i>
    </div>
    <div class="bg" 
    :style="{backgroundImage:`url(${bgImg})`}" ></div>
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
      piao: false,
      bgImg: ""
    };
  },
  created() {
    this.lid = this.$route.params.liveId;
    let para = {
      id: this.lid
    };
    this.$API.getOneLiveRoom(para).then(res => {
      this.bgImg = res.Content.CoverImg;
    });
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
      }, 100);
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
  position: relative;
  // width: 920px;
  // height: 550px;
  // z-index: -100;
}
.bg {
  // background: url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -100;
}
.wrapper {
  width: 100%;

  // box-sizing: border-box;
  padding-top: 500px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  .people {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 20px;
    left: 20px;
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
    margin-top: 50px;
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
.bottomList {
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 20px;
  margin-top: 50px;
  margin-bottom: 20px;
  .text {
    color: #ffcc1d;
    flex: 0 0 150px;
  }
  .luckyList {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    // position: fixed;
    // left: 50px;
    // top: 200px;
    li {
      margin-right: 20px;
    }
  }
}
</style>
