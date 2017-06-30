<template>
  <div class="hasNoStudent">
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
      <div class="popbtn" @click="$router.push('/user/linkchild'),showAddStudent=false">关联孩子</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hasNoStudent',
  data () {
    return {
      popupimg:require('@/assets/popupbg.png'),
    }
  },
}
</script>

<style lang="less" scoped>
.hasNoStudent {
  padding:15%;
  text-align: center;
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
    background: #fff;
    border-radius: 0 0 8px 8px;
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
