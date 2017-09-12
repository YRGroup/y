<template>
  <div class="content">

    <div class="follow" v-if="followWeixin">
      <span class="tips">
        <i class="iconfont">&#xe620;</i>
      </span>
      <marquee class="text" direction="left" scrollamount="5">您还没有关注公共账号,关注后可收到学生在校动态！</marquee>
      <div class="followbtn" @click="showWX=true">
        <i class="iconfont">&#xe61f;</i>关注</div>
    </div>

    <!--轮播图-->
    <swiper loop auto :list="swiperdate" class="bannerPic"></swiper>

    <!--功能导航-->
    <flexbox wrap="wrap" :gutter="0">
      <flexbox-item :span="4">
        <router-link :to="'/class/work'">
          <div style="background:#28cb60">
            <i class="iconfont">&#xe668;</i>
          </div>
          <span>作业</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4" v-show="$store.state.role != '老师'">
        <router-link :to="'/student/'+$store.state.currentStudentId+'/score/0'">
          <div style="background:#fbc700">
            <i class="iconfont">&#xe601;</i>
          </div>
          <span>成绩报告</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4" v-show="$store.state.role=='老师'">
        <router-link :to="'/class/exam'">
          <div style="background:#fbc700">
            <i class="iconfont">&#xe601;</i>
          </div>
          <span>班级成绩</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link :to="'/schoolcard'">
          <div style="background:#0ab9f7">
            <i class="iconfont">&#xe602;</i>
          </div>
          <span>一卡通</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/video">
          <div style="background:#ff5498">
            <i class="iconfont">&#xe617;</i>
          </div>
          <span>在线视频</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4">
        <router-link to="/video">
          <div style="background:#ab79d9">
            <i class="iconfont">&#xe63c;</i>
          </div>
          <span>视频课程</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="4" @click.native="fun('开发中，敬请期待~')">
        <div style="background:#ff5498">
          <i class="iconfont">&#xe617;</i>
        </div>
        <span>课程表</span>
      </flexbox-item>
      <!-- <flexbox-item :span="4" @click.native="fun('开发中，敬请期待~')">
        <div style="background:#ab79d9">
          <i class="iconfont">&#xe604;</i>
        </div>
        <span>更多</span>
      </flexbox-item> -->
    </flexbox>

    <div class="newsCard">
      <tab :line-width="2">
        <tab-item selected @on-item-click="handleSwitchTab">校园新闻</tab-item>
        <tab-item @on-item-click="handleSwitchTab">资料库</tab-item>
      </tab>
      <div v-if="tabindex == '1'">
        <no-data v-if="!data.length"></no-data>
        <div v-else class="card" v-for="(i,index) in data" :key="index" @click="$router.push('/news?id='+i.ID)">
          <div class="img" v-if="i.ImgUrl">
            <img :src="i.ImgUrl">
          </div>
          <div class="img" v-else>
            <img :src="publicImg">
          </div>
          <div class="cardCon">
            <div class="cardtitle">
              {{i.Title}}
            </div>
            <div class="cardfooter">
              <span class="time">
                <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tabindex == '2'">
        <no-data v-if="!data.length"></no-data>
        <div v-else class="card" v-for="(i,index) in data" :key="index">
          <div class="img" v-if="i.ImgUrl">
            <img :src="i.ImgUrl">
          </div>
          <div class="img" v-else>
            <img :src="publicImg">
          </div>
          <div class="cardCon">
            <div class="cardtitle">
              <a @click="$router.push('/doc?id='+i.ID)">{{i.Title}}</a>
            </div>
            <div class="cardfooter">
              <span class="time">
                <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <x-dialog v-model="showWX" class="wxDialog">
      <div class="close" @click="showWX=false">
        <span>
          <i class="iconfont">&#xe641;</i>
        </span>
      </div>
      <div>
        <p class="main">长按识别二维码</p>
        <p>关注公众号，获取更多信息</p>
      </div>
      <div class="img-box">
        <img :src="QRcodeIMG" style="max-width:100%">
      </div>
    </x-dialog>
  </div>
</template>

<script>
import noData from '@/components/noData'
import { Swiper, Flexbox, FlexboxItem, XButton, Popup, Tab, TabItem, XDialog } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper, Flexbox, FlexboxItem, XButton, Popup, Tab, TabItem, XDialog, noData
  },
  data() {
    return {
      swiperdate: [],
      mockSwiperdate: [
        {
          url: 'http://www.gy720.com/pano/view/6556',
          img: require('@/assets/img/s1.jpg'),
          title: '郑州航空港育人国际学校'
        },
        {
          url: 'http://www.gy720.com/pano/view/6621',
          img: require('@/assets/img/s2.jpg'),
          title: '郑州航空港区育人高级中学'
        },
        {
          url: 'http://www.gy720.com/pano/view/6614',
          img: require('@/assets/img/s3.jpg'),
          title: '郑州外国语女子中学'
        }
      ],
      activeName: '1',
      data: [],
      page: 1,
      publicImg: require('@/assets/publicImg.png'),
      tabindex: '1',
      currentPage: 1,
      QRcodeIMG: '',
      showWX: false
    }
  },
  computed: {
    followWeixin() {
      if (this.$store.getters.isWeixin && this.$store.state.currentUser && !this.$store.state.currentUser.IsSubscribe) {
        return true
      } else if (this.$store.getters.isWeixin && !this.$store.state.currentUser) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    getNewsList() {
      let para = {
        category: 1,
        currentPage: this.currentPage,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => {
        this.data = res
      })
    },
    getSwiper() {
      let para = {
        category: 3,
        currentPage: 1,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => {
        this.swiperdate = this.mockSwiperdate
        // if (res.length) {
        //   this.swiperdate = res.map(o => {
        //     let r = {
        //       url: '',
        //       img: o.Albums[0].Thumbpath,
        //       title: o.Title
        //     }
        //     return r
        //   })
        // } else {
        //   this.swiperdate = this.mockSwiperdate
        // }
      })
    },
    handleSwitchTab() {
      if (this.tabindex == "1") {
        this.tabindex = '2'
      } else {
        this.tabindex = '1'
      }
      this.getData()
    },
    getData() {
      let para = {
        category: this.tabindex,
        currentPage: this.page,
        pagesize: 10,
        showDelete: false,
      }
      this.$API.getNewsList(para).then(res => {
        this.data = res
      })
    },
    getWXQRcode() {
      this.QRcodeIMG = this.$API.getWXQRcode()
    },
    changeNum1() {
      this.tabindex = '1'
    },
    changeNum2() {
      this.activeName = '2'
      this.tabindex = '2'
    }
  },
  created() {
    this.$store.commit('changeTitle', '智慧校园')
    this.getSwiper()
    this.getNewsList()
    this.getData()
    this.getWXQRcode()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.vux-flexbox {
  text-align: center;
  padding: 1em 0;
  background-color: white;
  height: 100%;
  .vux-flexbox-item {
    cursor: pointer; // margin: 0.5em 0;
    div {
      border-radius: 50%;
      margin: 1em auto 0 auto;
      width: 4.6em;
      height: 4.6em;
      line-height: 4.6em;
      color: white;
      i {
        font-size: 2.4em;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, .1);
      }
    }
    span {
      line-height: 2em;
    }

    .vux-flexbox {
      text-align: center;
      background-color: white;
      height: 100%;
      padding-bottom: 0.5em;
      .vux-flexbox-item {
        cursor: pointer;
        div {
          border-radius: 50%;
          margin: 1em auto 0 auto;
          width: 4.6em;
          height: 4.6em;
          line-height: 4.6em;
          color: white;
          i {
            font-size: 2.4em;
            text-shadow: 2px 2px 1px rgba(0, 0, 0, .1);
          }
        }
        span {
          line-height: 2em;
        }
      }
    }
  }
}

.follow {
  font-size: 1em;
  height: 3em;
  line-height: 3em;
  padding: 0 1em;
  background: #fefcec;
  color: #f76a24;
  overflow: hidden;
  position: relative;
  .tips {
    color: #f76a24;
    font-size: 1.6em;
    margin-right: 5px;
  }
  .text {
    position: absolute;
    left: 3em;
    font-size: 1.2em;
    width: 70%;
  }
  .followbtn {
    position: absolute;
    right: 1em;
    top: 0.3em;
    color: #fff;
    background: #09bb07;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    margin-top: 1px;
    padding: 0 8px;
    .iconfont {
      margin-right: 5px;
    }
  }
  .right {
    position: absolute;
    right: 1em;
    top: 0.3em;
    color: #fff;
  }
  .weui-btn {
    padding: 0 10px;
    background: @cc7;
    .iconfont {
      margin-right: 5px;
    }
  }
}

.newsCard {
  margin-top: 15px;
  background: #fff;
  .card {
    margin: 0 10px;
    padding: 15px 15px 15px 130px;
    ;
    border-bottom: 1px dashed @cc4;
    overflow: hidden;
    position: relative;
    height: 72px; // min-height: 80px;
    .img {
      position: absolute;
      top: 15px;
      left: 0;
      width: 120px;
      height: 72px;
      display: inline-block;
      img {
        width: 100%;
      }
    }
    .cardCon {
      width: 100%;
      display: inline-block;
      .cardtitle {
        font-size: 14px;
        height: 3em;
        overflow: hidden;
        line-height: 20px;
        cursor: pointer;
      }
      .content {
        margin-top: 5px;
        height: 1.4em;
        line-height: 1.4em;
        color: #666;
        overflow: hidden;
        margin-bottom: 5px;
        a {
          color: red;
          margin-left: 5px;
        }
      }
      .cardfooter {
        margin-top: 10px;
        color: @cc3;
        font-size: 12px;
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
    }
  }
}

.wxDialog {
  line-height: 2rem;
  position: relative;
  .close {
    position: absolute;
    right: 1rem;
    top: .5rem;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .main {
    color: @cc7;
    font-size: 1.5rem;
    line-height: 3rem;
  }
}

.bannerPic {
  .vux-swiper {
    img {
      min-width: 50%;
    }
  }
}
</style>
