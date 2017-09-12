<template>
  <div class="hello">
    <div class="card" v-for="(i,index) in 3" :key="index" @click="$router.push('/player?id='+i.ID)">
      <div class="img" v-if="i.ImgUrl">
        <img :src="i.ImgUrl">
      </div>
      <div class="img" v-else>
        <img :src="publicImg">
      </div>
      <div class="content">
        <div class="cardtitle">
          {{i.Title}}
        </div>
        <div class="auther">李老师</div>
        <div class="cardfooter">
          <span class="time">
            <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      publicImg: require('@/assets/publicImg.png'),
      data: []
    }
  },
  methods: {
    fun(val) {

    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
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
  .content {
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
</style>
