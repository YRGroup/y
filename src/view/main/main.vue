<template>
  <div class="content">
  
    <div class="follow" v-if="followWeixin">
      <span class="tips">
        <i class="iconfont">&#xe620;</i>
      </span>
      <!--<span class="text">您还没有关注公共账号！</span>-->
      <marquee class="text" direction="left" scrollamount="5">您还没有关注公共账号,关注后可收到学生在校动态！</marquee>
      <!--<x-button class="right" mini type="primary" @click.native="fun('关注跳转')"></x-button>-->
      <div class="followbtn" @click="fun('关注跳转')">
        <i class="iconfont">&#xe61f;</i>关注</div>
    </div>
  
    <!--轮播图-->
    <swiper loop auto :list="swiperdate"></swiper>
  
    <!--功能导航-->
    <flexbox wrap="wrap" :gutter="0">
      <!--<flexbox-item :span="4">
                          <router-link :to="'/class/'+$store.state.classId+'/notice'">
                            <div style="background:#fe970f"><i class="iconfont">&#xe649;</i></div>
                            <span>通知</span>
                          </router-link>
                        </flexbox-item>
                        <flexbox-item :span="4">
                          <router-link :to="'/class/'+$store.state.classId">
                            <div style="background:#8f59ff"><i class="iconfont">&#xe672;</i></div>
                            <span>班级</span>
                          </router-link>
                        </flexbox-item>-->
      <flexbox-item :span="3">
        <router-link :to="'/class/'+$store.state.currentClassId+'/work'">
          <div style="background:#28cb60">
            <i class="iconfont">&#xe668;</i>
          </div>
          <span>作业</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link :to="'/student/'+$store.state.currentStudentId+'/score/1'">
          <div style="background:#0ab9f7">
            <i class="iconfont">&#xe601;</i>
          </div>
          <span>成绩报告</span>
        </router-link>
      </flexbox-item>
      <!--<flexbox-item :span="4">
                          <router-link to="/contact">
                            <div style="background:#ff5251"><i class="iconfont">&#xe629;</i></div>
                            <span>消息</span>
                          </router-link>
                        </flexbox-item>-->
      <flexbox-item :span="3">
        <router-link :to="'/addon/schoolcard'">
          <div style="background:#fbc700">
            <i class="iconfont">&#xe602;</i>
          </div>
          <span>一卡通</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link to="/main">
          <div style="background:#ff5498">
            <i class="iconfont">&#xe604;</i>
          </div>
          <span>资料库</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link to="/school">
          <div style="background:#8dc62c">
            <i class="iconfont">&#xe737;</i>
          </div>
          <span>校园新闻</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link to="/addon/reader">
          <div style="background:#fe970f">
            <i class="iconfont">&#xe737;</i>
          </div>
          <span>朗读者</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link to="/addon/idol">
          <div style="background:#8f59ff">
            <i class="iconfont">&#xe737;</i>
          </div>
          <span>iDOL</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link to="/addon/interview">
          <div style="background:#28cb60">
            <i class="iconfont">&#xe737;</i>
          </div>
          <span>谈话录</span>
        </router-link>
      </flexbox-item>
    </flexbox>
  
    <div class="newsCard">
      <tab :line-width="2">
        <!-- <tab-item selected @on-item-click="$router.push('/mainschool')">校园动态</tab-item> -->
        <tab-item selected @on-item-click="handleSwitchTab">校园动态</tab-item>
        <tab-item @on-item-click="handleSwitchTab">资料库</tab-item>
        <!-- <tab-item @on-item-click="$router.push('/maindocument')">资料库</tab-item> -->
      </tab>
      <div v-if="tabindex == '1'">
        <div class="card" v-for="(i,index) in data" :key="index"  @click="$router.push('/mainnew?id='+i.ID)">
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
            <!-- <div class="content">{{i.Describtion}}</div> -->
            <div class="cardfooter">
              <span class="time"><i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tabindex == '2'">
        <div class="card" v-for="(i,index) in data" :key="index">
          <div class="img" v-if="i.ImgUrl">
            <img :src="i.ImgUrl">
          </div>
          <div class="img" v-else>
            <img :src="publicImg">
          </div>
          <div class="cardCon">
            <div class="cardtitle">
              <a @click="$router.push('/news?id='+i.ID)">{{i.Title}}</a>
            </div>
            <!-- <div class="content">{{i.Describtion}}</div> -->
            <div class="cardfooter">
              <span class="time"><i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- <transition name="slide-fade">
                    <router-view></router-view>
                  </transition> -->
    </div>
  
  </div>
</template>

<script>
import { Swiper, Flexbox, FlexboxItem, XButton, Popup, Tab, TabItem } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper, Flexbox, FlexboxItem, XButton, Popup, Tab, TabItem
  },
  data() {
    return {
      followWeixin: true,
      swiperdate: [
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
      tabindex: '1'
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg,
        show: true,
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
    changeNum1() {
      this.tabindex = '1'
    },
    changeNum2() {
      this.activeName = '2'
      this.tabindex = '2'
    }
  },
  created() {
    this.$store.commit('changeTitle', '校园动态')
    this.getData()
  },
  mounted() {
    if (this.$store.getters.isWeixin) {
      this.followWeixin = true
    } else {
      this.followWeixin = false
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  // background: #fff;
}

.vux-flexbox {
  text-align: center; // padding:1em 0;
  background-color: white;
  height: 100%;
  padding-bottom: 0.5em;
  .vux-flexbox-item {
    cursor: pointer;
    // margin: 0.5em 0;
    div {
      border-radius: 50%;
      margin: 1em auto 0 auto;
      width: 4.6em;
      height: 4.6em;
      line-height: 4.6em;
      color: white;
      svg {
        margin-top: .2em;
      }
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
    margin:0 10px;
    padding:15px 15px 15px 130px;;
    border-bottom: 1px dashed @cc4;
    overflow: hidden;
    position: relative;
    height: 72px;
    // min-height: 80px;
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
</style>
