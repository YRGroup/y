<template>
  <div>
    <group v-if="nodataImg">
      <no-data></no-data>
    </group>
    <!-- <card v-for="(item,index) in list" :key="index">
        <div slot="header" class="header">
          <span class="title">{{ item.Title }}</span>
        </div>
        <div slot="content" class="content">
          <div class="time">{{ item.AddTime }}</div>
          <pre @click="$router.push('/news/'+item.ID)">{{ item.Describtion }}</pre>
          <div class="newsImg">
            <img :src="item.ImgUrl">
          </div>
        </div>
        <div slot="footer" class="footer">
          <span class="time">{{ item.date }}</span>
        </div>
      </card> -->
      <div v-else class="newsCard">
        <div  class="card" v-for="(i,index) in list" :key="index" @click="$router.push('/mainnew?id='+i.ID)">
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
              <span class="time">
                <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
            </div>
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
        if(!res.length){
          this.nodataImg = true
        }else{
          this.list = res
        }
      })
    },
  },
  created() {
    this.$store.commit('changeTitle', '校园新闻')
    this.getData()
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.header {
  text-align: center;
  .title {
    font-size: 1.5rem;
    line-height: 50px;
  }
}

.time {
  text-align: right;
  color: @grey;
}

.content {
  line-height: 2em;
  text-indent: 2em;
  text-align: left;
}

.newsImg {
  margin-top: 1rem;
  img {
    width: 100%;
  }
}

.footer {
  text-align: right;
  color: @grey;
}

.newsCard {
  margin-top: 15px;
  background: #fff;
  .card {
    margin:0 10px;
    padding:15px 15px 15px 130px;;
    border-bottom: 1px dashed @border;
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
</style>
