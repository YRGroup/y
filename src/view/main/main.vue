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
    <flexbox wrap="wrap" :gutter="0" style="margin-bottom: 7.5px">
      <flexbox-item :span="3">
        <router-link :to="'/class/work'" @click.native="skip()">
          <div style="background:#62ccfd">
            <i class="iconfont">&#xe668;</i>
          </div>
          <span>作业</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3" v-show="!$store.getters.isTeacher">
        <router-link :to="'/student/'+$store.state.currentStudentId+'/score/0'" @click.native="skip">
          <div style="background:#fdb963">
            <i class="iconfont">&#xe601;</i>
          </div>
          <span>成绩报告</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3" v-show="$store.getters.isTeacher">
        <router-link :to="'/class/exam'" @click.native="skip()">
          <div style="background:#fdb963">
            <i class="iconfont">&#xe601;</i>
          </div>
          <span>班级成绩</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link :to="'/schoolcard'" @click.native="skip()">
          <div style="background:#47e4a1">
            <i class="iconfont">&#xe602;</i>
          </div>
          <span>一卡通</span>
        </router-link>
      </flexbox-item>
      <flexbox-item :span="3">
        <router-link to="/contact" @click.native="skip()">
          <div style="background:#9dace4">
            <i class="iconfont">&#xe629;</i>
          </div>
          <span>通讯录</span>
        </router-link>
      </flexbox-item>
    </flexbox>
    <!-- 直播入口 -->
    <!-- <div class="toLive">
      <router-link to="/live">
        <img :src="liveImg" alt="2018元旦跨新年直播">
      </router-link>
    </div> -->
    <mt-loadmore :top-method="refresh" ref="loadmore" style="padding-bottom: 1.5rem;">
      <div class="newsCard">
        <tab :line-width="2" v-model="nowIndex">
          <!--<tab-item selected @on-item-click="handleSwitchTab">校园新闻</tab-item>-->
          <!--<tab-item @on-item-click="handleSwitchTab">资料库</tab-item>-->
          <tab-item  @on-item-click="setSlide(0)">校园新闻</tab-item>
          <tab-item  @on-item-click="setSlide(1)">资料库</tab-item>
        </tab>
        <div ref="newsCardTwo">
          <ul >
            <li>
              <div>
                <no-data v-if="!classNewList.length"></no-data>
                <div v-else class="card" v-for="(i,index) in classNewList" :key="index" @click="skip('/news?id='+i.ID)">
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
            </li>
            <li>
              <div v-if="nowIndex1">
                <no-data v-if="!ziliaoList.length"></no-data>
                <div v-else class="card" v-for="(i,index) in ziliaoList" :key="index">
                  <div class="img" v-if="i.ImgUrl">
                    <img :src="i.ImgUrl">
                  </div>
                  <div class="img" v-else>
                    <img :src="publicImg">
                  </div>
                  <div class="cardCon">
                    <div class="cardtitle">
                      <a @click="skip('/doc?id='+i.ID)">{{i.Title}}</a>
                    </div>
                    <div class="cardfooter">
                  <span class="time">
                    <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </mt-loadmore>
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
import mtLoadmore from '@/components/loadMore'
require('@/js/swipe1.min');
import { Swiper, Flexbox, FlexboxItem, XButton, Popup, Tab, TabItem, XDialog } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper, Flexbox, FlexboxItem, XButton, Popup, Tab, TabItem, XDialog, noData,mtLoadmore
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
      classNewList:[],
      ziliaoList:[],
      publicImg: require('@/assets/publicImg.png'),
      tabindex: '1',
      currentPage: 1,
      QRcodeIMG: '',
      showWX: false,
      nowIndex0:false,
      nowIndex1:false,
      nowIndex2:false,
      nowIndex:0,
      liveImg:require('@/assets/liveImg.png')
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
    },
  },
  methods: {
    skip(link) {
      if(link){
        this.$router.push(link)
      }
      this.$router.animate = 1
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
        let arr=[]
        res.forEach(el => {
          arr.push({img:el.ImgUrl,url:el.Link})
        });
        this.swiperdate=arr
      })
    },
    getData(tar) {
      let para = {
        category: tar,
        currentPage: this.page,
        pagesize: 10,
        showDelete: false,
      }
      return this.$API.getNewsList(para).then(res => {
        tar==1?this.classNewList=res:this.ziliaoList=res;

      })
    },
    getWXQRcode() {
      this.QRcodeIMG = this.$API.getWXQRcode()
    },
    _initSwipe(){
      this.tabs = new Swipe(this.$refs.newsCardTwo, {
        startSlide: 0,
        speed: 500,
        callback: (a, b) => {
          this.setTab(b);
        }
      })
    },
    setSlide(i){
      this.tabs.slide(i,300)
    },
    setTab(i){
      this.nowIndex=i;
      if(i==0&&!this.nowIndex0){
        this.nowIndex0=true
      }
      if(i==1&&!this.nowIndex1){
        this.getData(2);
        this.nowIndex1=true
      }
      if(i==2&&!this.nowIndex2){
        this.nowIndex2=true
      }

    },
    refresh(){
      Promise.all([this.getData(1),this.getData(2)]).then((posts)=> {
          this.$refs.loadmore.onTopLoaded('刷新成功');
      }).catch((reason)=>{
          this.$refs.loadmore.onTopLoaded('刷新失败');
      });
    }
  },
  created() {
    this.$store.commit('changeTitle', '智慧校园')
    this.getSwiper();
    this.getWXQRcode();
    this.getData(1);
    this.$nextTick(()=>{
      this._initSwipe();
    })
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.vux-flexbox {
  text-align: center;
  background-color: #fff;
  height: 100%;
  padding: 0.5em 0 1em 0;
  box-shadow: 0 1px 6px 0 rgba(7, 17, 27, .1);
  .vux-flexbox-item {
    cursor: pointer;
    div {
      border-radius: 1.6em;
      margin: 1em auto 0 auto;
      width: 3.8em;
      height: 3.8em;
      line-height: 3.8em;
      color: white;
      i {
        font-size: 2em;
        text-shadow: 0 0 2px rgba(0, 0, 0, .1);
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
    background: @main;
    .iconfont {
      margin-right: 5px;
    }
  }
}

.newsCard {
  // margin-top: 7.5px;
  background: #fff;
    .vux-tab{
      .active{
        color:red
      }
      .vux-tab-selected {
        color: #666;
        border-bottom: 3px solid #666;
      }
    }

  .card {
    margin: 0 10px;
    padding: 15px 15px 15px 130px;
    ;
    border-bottom: 1px dashed @border;
    overflow: hidden;
    position: relative;
    height: 72px;
    .img {
      position: absolute;
      top: 15px;
      left: 0;
      width: 120px;
      height: 72px;
      display: inline-block;
      img {
        width: 100%;
        height: 72px;
        border-radius: 6px;
      }
    }
    .cardCon {
      width: 100%;
      display: inline-block;
      margin-top: 5px;
      .cardtitle {
        font-size: 14px;
        max-height: 3em;
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
        margin-top: 5px;
        color: @grey;
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
    color: @main;
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
.toLive{
  margin: .5em 0;
  padding: 0 .5em;
  a{
    display: block;
  }
  img{
    width: 100%;
    border-radius: .5em;
    display: block;
  }
}
</style>
