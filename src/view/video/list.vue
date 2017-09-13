<template>
  <div>
    <div class="card" v-for="(i,index) in 3" :key="index" @click="$router.push('/player?id='+i.ID)">
      <div class="img" v-if="i.ImgUrl">
        <img :src="i.ImgUrl">
      </div>
      <div class="img" v-else>
        <img :src="publicImg">
      </div>
      <div class="content">
        <div class="title">
          标题
        </div>
        <div class="footer">
          <div class="auther">李老师</div>
          <div class="category">语文</div>
          <span class="time">
            <i class="iconfont">&#xe621;</i>{{i.AddTime || '2017-9-9'}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from '@/components/noData'
import { Scroller, Flexbox, FlexboxItem, Card, Tab, TabItem, Group } from 'vux'

export default {
  components: {
    Scroller, Flexbox, FlexboxItem, Card, Tab, TabItem, noData, Group
  },
  data() {
    return {
      page: 1,
      list: [],
      publicImg: require('@/assets/publicImg.png'),
      nodataImg: false,
    }
  },
  computed: {
  },
  methods: {
    getData() {
      let para = {
        category: 1,
        currentPage: this.page,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => {
        if (!res.length) {
          this.nodataImg = true
        } else {
          this.list = res
        }
      })
    },
  },
  created() {
    this.$store.commit('changeTitle', '视频课程')
    this.getData()
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
  border-bottom: 1px dashed @border;
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
    .title {
      font-size: 14px;
      padding:.5em 0;
      overflow: hidden;
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
    .footer {
      margin-top: 10px;
      color: @grey;
      font-size: 12px;
      .auther{
        display: inline-block;
        padding-right:1rem;
      }
      .iconfont {
        font-size: 14px;
        margin-right: 5px;
      }
      .category{
        display: inline-block;
        padding-right:1rem;
      }
    }
  }
}
</style>
