<template>
  <div id="app">

    <div v-transfer-dom v-show="">
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <img :src="popupimg" style="max-width:100%">
        </div>
        <div class="popupText">
          <h3>关联孩子</h3>
          <ul class="subcon">
            <li><span>·</span>查看孩子班级动态</li>
            <li><span>·</span>与老师实时沟通</li>
            <li><span>·</span>查看孩子考试成绩</li>
          </ul>
          <div class="popbtn" @click="$router.push('/user/linkchild'),show=false">关联孩子</div>
        </div>
        <div @click="show=false" class="popclose">
          <span class="vux-close"><i class="iconfont">&#xe61a;</i></span>
        </div>
      </x-dialog>
    </div>

    <x-header id="nav-top" :left-options="{backText: ''}" v-show="$store.state.showTopNav">
      {{web_title}}
      <i class="fa fa-bars" slot="right" @click="$router.push('/')"></i>
    </x-header>

    <loading v-model="isLoading"></loading>

    <transition name='slide-fade'>
      <router-view id="inview" :style="{marginTop:ptop,marginBottom:pdown}"></router-view>
    </transition>

    <tabbar id="nav-bottom" v-show="$store.state.showBottomNav">
      <tabbar-item selected link="/main">
        <i slot="icon" class="iconfont nav_icon">&#xe666;</i>
        <span slot="label" class="navtext">主页</span>
      </tabbar-item>
      <tabbar-item show-dot :link="'/class/'+$store.state.currentClassId">
        <i slot="icon" class="iconfont nav_icon">&#xe672;</i>
        <span slot="label" class="navtext">班级</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/contact">
        <i slot="icon" class="iconfont nav_icon">&#xe629;</i>
        <span slot="label" class="navtext">通讯录</span>
      </tabbar-item>
      <tabbar-item :link="hasLogin?'/user':'/login'">
        <i slot="icon" class="iconfont nav_icon">&#xe719;</i>
        <span slot="label" class="navtext">{{hasLogin?'用户':'未登陆'}}</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader,Loading,XSwitch ,XDialog,TransferDomDirective as TransferDom  } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Tabbar, TabbarItem, XHeader ,Loading ,XSwitch , XDialog 
  },
  directives: {
    TransferDom
  },
  data(){
    return{
      test0:'00',
      show: true,
      popupimg:require('@/assets/popupbg.png'),
    }
  },
  methods:{
    showRouterInfo(){
      console.log('当前路由信息：')
      console.log(this.$route.params)
      console.log('当前VueX信息：')
      console.log(this.$store.state)
      console.log('当前localStorage信息：')      
      console.log(localStorage)
      console.log('当前cookie信息：')      
      console.log(document.cookie)
      console.log('当前API信息：')      
      console.log(this.$API)

      window.scrollTo(0,0);
    }
  },
  created(){
    this.showRouterInfo()
  },
  watch:{
    web_title:(val)=>{
      document.title = val+' - 育人教育'
    },
    "$route": "showRouterInfo"
  },
  computed:{
    web_title () {
      return this.$store.state.title
    },
    shownav(){
      return this.$store.state.isNav
    },
    ptop (){
      return this.$store.state.showTopNav ? '46px' : '0'
    },
    pdown (){
      return this.$store.state.showBottomNav ? '53px' : '0'
    },
    hasLogin(){
      return this.$store.state.hasLogin
    },
    isLoading(){
      return this.$store.state.isLoading
    }
  },
  mounted(){
    if(localStorage.hasLogin=='true'){
      this.$store.commit('login',localStorage.id)
      console.log('has login')
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/card.less';

body {
  max-width: @appwidth;
  margin:0 auto;
  font-size:12px;
  background:@c1;
  overflow-x: hidden;
  color: @cc1;
}
pre{
  font-family: -apple-system-font, "Helvetica Neue", sans-serif;
}
#inview{
  position: relative;
  top:0;
}
#nav-top{
  width:100%;
  max-width: @appwidth;
  position:fixed;
  top:0;
  z-index:999;
}
#nav-bottom{
  max-width: @appwidth;
  position:fixed;
  bottom:0;
}

::-webkit-input-placeholder { 
color: @cc4; 
} 
li{
  list-style:none;
  padding:0;
  margin:0;
}
a{
  color:inherit;
}

// 切换动画
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(100vw);
  opacity: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 291668 */
  src: url('//at.alicdn.com/t/font_jm9s5g13udfv42t9.eot');
  src: url('//at.alicdn.com/t/font_jm9s5g13udfv42t9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_jm9s5g13udfv42t9.woff') format('woff'),
  url('//at.alicdn.com/t/font_jm9s5g13udfv42t9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_jm9s5g13udfv42t9.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont";
  font-style:normal;
  // -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  // -moz-osx-font-smoothing: grayscale;
}
.nav_icon{
  line-height: 27px;
}

#app .weui-bar__item_on .nav_icon,#app .weui-bar__item_on .navtext{
  color: @cc6;
}
.card{
  background: #fff;
  margin-top:10px;
}
#app .weui-btn:after{
  border:none;
}

//弹窗样式
.childPopup{
  width: 100%;
  height: 100%;
  background: black;
}

//弹窗样式
.dialog-demo {
  position: relative;
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
    overflow:visible;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    border-radius: 8px 8px 0 0;
    height: 84px;
    overflow: hidden;
    background: #00c06f;
    padding:10px 0;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .popupText{
    padding:10px 0;
    h3{
      font-size: 1.6em;
      line-height: 1.6em;
      font-weight: 400;
    }
    .subcon{
      font-size: 1.2em;
      color:@cc2;
      li{
        span{
          position: relative;
          margin-right:10px;
          &:before{
            content: "";
            width: 4px;
            height: 4px;
            background: @cc6;
            border-radius: 50%;
            position: absolute;
            top: 8px;
            left: 0;
          }
        }
      }
    }
    .popbtn{
      margin:10px 2rem;
      padding:10px 0;
      font-size:1rem;
      color:#fff;
      border-radius: 50px;
      background:linear-gradient(right top,#00c0a1, #00c06f);
    }

  }
  .popclose{
    position: absolute;
    top: -46px;
    right:0;
    font-size:1.6rem;
    color:#fff;
    z-index: 9999;
    opacity: .6;
    span{
      &:before{
        content: "";
        position: absolute;
        width: 1px;
        height: 18px;
        background: #fff;
        right: 12px;
        bottom: -4px;

      }
    }
  }
  // .vux-close {
  //   margin-top: 8px;
  //   margin-bottom: 8px;
  // }
}

</style>
