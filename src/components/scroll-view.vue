<template>
  <div ref="scroll" class="scroll">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.scroll {
  .pullDownWrapper {
    text-align: center;
    line-height: 30px;
  }
  .pullUpWrapper {
    text-align: center;
    line-height: 30px;
  }
}
</style>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    pullDownThreshold: {
      type: Number,
      default: 80
    },
    isPullUpLoading: {
      type: Boolean,
      default: false
    },
    isPullDownLoading: {
      type: Boolean,
      default: false
    },
    noMoreData: {
      type: Boolean,
      default: false
    },
    noDataText: {
      type: String,
      default: "没有更多数据了"
    },
    beforPullDown: {
      type: Boolean,
      default: true
    },
    
  },
  data() {
    return {
      pulldownText: "下拉刷新",
      showPullDownText: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.scroll) {
        return;
      }
      let pullDownData = false;
      if (this.pullDownRefresh) {
        pullDownData = {
          threshold: this.pullDownThreshold,
          stop: 20
        };
      }
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: pullDownData
      });
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          if (pos.y > 30) {
            this.showPullDownText = true;
          }
          if (pos.y > this.pullDownThreshold) {
            this.pulldownText = "松开刷新";
          } else {
            this.pulldownText = "下拉刷新";
          }
          this.$emit("scroll", pos);
        });
      }
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
      if (this.pullDownRefresh) {
        this.scroll.on("pullingDown", () => {
          this.$emit("pullingDown");
        });
      }
    },
    enbale() {
      this.scroll && this.scroll.enbale();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    maxY(){
      return this.scroll.maxScrollY;
    }
  }
};
</script>

