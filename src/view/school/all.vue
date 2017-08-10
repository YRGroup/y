<template>
  <div>
  
    <card v-for="(item,index) in list" :key="index">
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
    </card>
  
  </div>
</template>

<script>
import { Scroller, Flexbox, FlexboxItem, Card, Tab, TabItem } from 'vux'

export default {
  components: {
    Scroller, Flexbox, FlexboxItem, Card, Tab, TabItem
  },
  data() {
    return {
      page:1,
      list: []
    }
  },
  computed: {
  },
  methods: {
    getData() {
      let para={
        category: 1,
        currentPage: this.page,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => {
        this.list = res
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
  color: @c4;
}
.content {
  line-height: 2em;
  text-indent: 2em;
  text-align: left;
}
.newsImg{
  margin-top:1rem;
  img{
    width: 100%;
  }
}
.footer {
  text-align: right;
  color:@c4;
}
</style>
