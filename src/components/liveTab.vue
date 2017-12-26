<template>
  <div class="container">
    <div>
      <tab>
        <tab-item v-model="tabIndex" selected @on-item-click="onItemClick">互动</tab-item>
        <tab-item v-model="tabIndex" @on-item-click="onItemClick">育人简介</tab-item>
        <tab-item v-model="tabIndex" @on-item-click="onItemClick">关注我们</tab-item>
      </tab>
    </div>
    <div>  
      <swiper v-model="tabIndex" class="swiper" height="100%"  :show-dots="false">
        <swiper-item class="swiperComment">
          <div class="content">
            <div  class="tab-swiper vux-center  commentsBox" ref="comment">
              <div v-for="item in commentsList" class="commentItem clearfix">
                <div class="commentUser">
                  <img class="headImg" :src="item.headimgurl" alt="">
                </div>
                <div class="commentInfo">    
                   <span v-text="item.nickname"></span>          
                  <span class="time" v-text="formatTime(item.addtime)"></span>
                  <p class="commentContent" v-text="item.content"></p>
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center content">
            <p v-html="yrInfo" class="yrInfo"></p>
          </div>
          
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center content">
            <p>
              此处应有二维码
            </p>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="sendComment" v-show="showSendComment">
      <group class="weui-cells_form">
        <x-input title="" class="weui-vcode"  v-model="content" placeholder="说点什么">
          <x-button slot="right" type="primary" @click.native="sendComment" mini>发送</x-button>
        </x-input>
      </group>
  </div>
  </div>

</template>
<script>
import {
  XInput,
  Tab,
  Group,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem
} from "vux";

export default {
  data() {
    return {
      tabIndex: 0,
      content:'',
      yrInfo:' 郑州育人学校由刘付坤校长于2000年创办，至今已在郑州发展16年，于2014年成立教育集团，并在创始人家乡襄城县建设了一所学校。十多年来，学校遵循“以人为本，因材施教”的核心育人理念，争取帮助每一个孩子打开了解世界的一扇窗。</br>2016年5月和6月，郑州育人教育集团先后与美国名校普渡大学和美国德州大学圣安东尼奥分校签订了校长和师资培训合作协议；</br>2016年5月，引入台湾e-BABY国际教育集团理念的早教中心投入运营；</br>2016年7月，与德国欧洲职业教育和社会教育集团达成合作意向，筹建应用技术型大学，完善了集团的教育体系和架构；</br>2016年8月，郑州航空港区育人国际学校15年一贯制（K12）新校区开始启用。同时，美国阿尔伯特·爱因斯坦学院授权郑州育人教育集团在旗下郑州航空港育人国际学校（经开区分校）实施幼儿园和小学合作项目，成为美国阿尔伯特·爱因斯坦学院在中国的第一个校区和中国总部所在地。</br>教育的意义是在孩子成长过程中起到良好的引领作用。我们一直在努力，为教育添砖加瓦，把教育工作当成使命，把教育理念融入信仰，汲取中西方教育的精华，传承中华民族教育的根基，郑州育人教育集团矢志不渝的奔走在路上。</br>男生男校，培养中华好儿男。女生女校，为培养优秀母亲奠定基础。</br>每一个孩子都是一棵幼苗，家庭、社会和学校是他们成长的土壤，我们愿成为土壤里最有价值的养分。</br>迄今，郑州育人教育集团已有近万名学生和近千名教职工。',
    };
  },
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    XInput,
    Group
  },
  computed:{
    commentsList(){
      return this.$store.state.commentsList
    },
    showSendComment(){
      return this.tabIndex==0?true:false
    }
  },
  methods: {
    onItemClick(index) {
      this.tabIndex = index;
    },
    getCommentsList(){
      this.$API.getCommentsList().then(res=>{
        this.$store.commit('setCommentsList', res);
      })
    },
    sendComment(){
      if(this.content){
        let options={
          content:this.content
        }
        this.$API.sendComment(options).then(res=>{
          console.log(res)
          this.getCommentsList()
        }).catch((error)=>{
          console.log(error)
        })
      }else{
        this.$vux.toast.text('说点什么吧~','middle')
      }
    },
    formatTime(val){
      return val.slice(5,val.indexOf('.')).replace('T',' ');
    }
  },
  created() {
    this.getCommentsList();
  },
  mounted(){
    // this.$refs.comment.scrollTop='20px';
  }
};
</script>
<style lang="less" scoped>
@import "../style/theme.less";

.container {
  color: @black;
  position: relative;
  font-size: 1.1em;
  line-height: 1.8em;
  .sendComment {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  .swiper {
    position: relative;
    height: calc(~"60vh - 44px");  //100vh  屏幕的100% 
    overflow: hidden;
  }
  .swiperComment{
    padding-bottom: 49px;
    box-sizing: border-box;
  }
  .content{
    height: 100%;
    overflow: auto;
    .commentsBox{
    box-sizing: border-box;
    };
    .yrInfo{
      width: 95vw;
      margin: 1em auto;
      padding: 0 1em;
      box-sizing: border-box;
      background: #fff;
      color: @grey;
    }
  }
  .commentItem{
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 0.6em 1.2em; 
    .commentUser{
      width: 4em;
      text-align: center;
      margin-right: 1em;
      .headImg{
        border-radius: 50%;
        width: 3em;
        height: 3em;
      }
      p{
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        color: @grey;
      }
    }
    .commentContent{
      // min-height: 3.6em;
    }
    .commentInfo{
      width: calc(~"100vw - 4em");
    }
  }
  .time{
    color: @grey;
    font-size: 0.3em;
  }
}

  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .clearfix:after{
    content:'';
    display: block;
    clear: both;
  }
</style>


