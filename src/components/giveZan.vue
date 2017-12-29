<template>
    <i class="iconfont active" v-if="isZan">&#xe646; {{zanNum}}</i>
    <i v-else  :class="['iconfont',{'active': hasZan}]" @click.once="doLike">&#xe646; {{zanNum}}</i>
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
  SwiperItem,
  XDialog,
  XImg  
} from "vux";

  export default{
    name:'giveZan',
    data(){
      return {
        hasZan:false,
        zanNum:this.num
      }
    },
    props:['isZan','id','num'],
  
    computed:{
      
    },
    methods:{
      doLike() {
        this.$API
        .doLikeThisPost(this.id)
        .then(res => {
          this.$vux.toast.show({
            type: "success",
            width: "20em",
            text: '点赞成功'
          })
          this.zanNum++;      //赞数++
          this.hasZan=true;   //已赞

        })
        .catch(err => {
          this.$vux.toast.show({
            type: "text",
            text: err.msg,
            width: "20em"
          })
        });
      },
    }
  }
</script>

<style lang="less" scoped>

@import '../style/theme.less';

  .active{
    color: @main;
  }
  .iconfont {
    margin-right: 8px;
  }
</style>