<template>
  <div>
    <div class="content">
  
      <div class="follow" v-if="followWeixin">
        <span class="tips">
          <i class="iconfont">&#xe620;</i>
        </span>
        <marquee class="text" direction="left" scrollamount="5">您还没有关注公共账号,关注后可收到学生在校动态！</marquee>
        <div class="followbtn" @click="fun('关注跳转')">
          <i class="iconfont">&#xe61f;</i>关注</div>
      </div>
  
      <!--轮播图-->
      <swiper loop auto :list="swiperdate"></swiper>
  
      <!--功能导航-->
      <flexbox wrap="wrap" :gutter="0">
        <flexbox-item :span="4">
          <router-link to="/school">
            <div style="background:#fe970f">
              <i class="iconfont">&#xe649;</i>
            </div>
            <span>新闻</span>
          </router-link>
        </flexbox-item>
        <flexbox-item :span="4">
          <router-link :to="'/class/'+$store.state.currentClassId+'/work'">
            <div style="background:#28cb60">
              <i class="iconfont">&#xe668;</i>
            </div>
            <span>作业</span>
          </router-link>
        </flexbox-item>
        <flexbox-item :span="4">
          <router-link :to="'/student/'+$store.state.currentStudentId+'/score/0'">
            <div style="background:#0ab9f7">
              <i class="iconfont">&#xe601;</i>
            </div>
            <span>成绩报告</span>
          </router-link>
        </flexbox-item>
        <flexbox-item :span="4">
          <router-link :to="'/addon/schoolcard'">
            <div style="background:#fbc700">
              <i class="iconfont">&#xe602;</i>
            </div>
            <span>一卡通</span>
          </router-link>
        </flexbox-item>
        <flexbox-item :span="4">
          <router-link to="/main">
            <div style="background:#ff5498">
              <i class="iconfont">&#xe604;</i>
            </div>
            <span>资料库</span>
          </router-link>
        </flexbox-item>
        <flexbox-item :span="4">
          <router-link to="/school">
            <div style="background:#8dc62c">
              <i class="iconfont">&#xe737;</i>
            </div>
            <span>校园新闻</span>
          </router-link>
        </flexbox-item>
      </flexbox>
  
    </div>
    <div class="newsCard" v-for="(i,index) in newsList" :key="index">
      <div class="img" v-if="i.ImgUrl">
        <img :src="i.ImgUrl">
      </div>
      <div class="img" v-else>
        <img :src="publicImg">
      </div>
      <div class="cardCon">
        <div class="cardtitle" @click="$router.push('/news/'+i.ID)">
          {{i.Title}}
        </div>
        <div class="content">{{i.Describtion}}</div>
        <div class="cardfooter">
          <span class="time">
            <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, Flexbox, FlexboxItem, XButton, Popup } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper, Flexbox, FlexboxItem, XButton, Popup
  },
  data() {
    return {
      followWeixin: true,
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
      currentPage: 1,
      newsList: [],
      publicImg: require('@/assets/publicImg.png'),
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg,
        show: true
      })
    },
    getNewsList() {
      let para = {
        category: 1,
        currentPage: this.currentPage,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => {
        this.newsList = res
      })
    },
    getSwiper() {
      let para = {
        category: 3,
        currentPage: 1,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => {
        if (res.length) {
          this.swiperdate = res.map(o => {
            let r = {
              url: '',
              img: o.Albums[0].Thumbpath,
              title: o.Title
            }
            return r
          })
        } else {
          this.swiperdate = this.mockSwiperdate
        }
      })
    },
    mytest() {
      this.$router.push('/msg')
    }
  },
  created() {
    this.$store.commit('changeTitle', '校园动态')
    this.getSwiper()
    this.getNewsList()
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
  background: #fff;
}

.vux-flexbox {
  text-align: center;
  padding: 1em 0;
  background-color: white;
  height: 100%;
  .vux-flexbox-item {
    cursor: pointer;
    margin: 0.5em 0;
    div {
      border-radius: 50%;
      margin: 1em auto 0 auto;
      width: 6em;
      height: 6em;
      line-height: 6em;
      color: white;
      svg {
        margin-top: .2em;
      }
      i {
        font-size: 3em;
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
  margin: 1rem 0;
  background: #fff;
  position: relative;
  border-bottom: 1px solid @cc4;
  .img {
    height: 120px;
    width: 120px;
    display: inline-block;
    margin-top:1rem;
    img {
      width: 100%;
    }
  }
  .cardCon {
    width: calc(~"100% - 140px");
    display: inline-block;
    line-height: 2rem;
    vertical-align: top;
    margin-left: 15px;
    .cardtitle {
      font-size: 16px;
      line-height: 32px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 600;
      cursor: pointer;
    }
    .content {
      margin-top: 8px;
      line-height: 24px;
      color: #666;
      overflow: hidden;
      a {
        color: @cc7;
        margin-left: 5px;
      }
    }
    .cardfooter {
      color: @cc4;
      font-size: 12px;
      .iconfont {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
}
</style>
