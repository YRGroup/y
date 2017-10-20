<template>
  <div class="work" style="margin-top:10px">

    <div class="feed"  v-show="data.length>0">
      <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="noMoreData" ref="loadmore" style="padding-bottom: 1.5rem;">
        <card class="card" v-for="(i,index) in data" :key="index">
          <div class="header" slot="header">{{i.Title}}</div>
          <div class="content" slot="content" v-html="i.Content"></div>
          <div class="footer" slot="footer">{{ i.CreateTime }}</div>
        </card>
      <!--<divider @click.native="loadMore" v-show="!noMoreData">点击加载更多</divider>-->
      <!--<divider v-show="noMoreData"  class="noMoreData">没有更多数据</divider>-->
      </mt-loadmore>
    </div>

    <div class="hasNoData" v-if="data.length==0">
      <icon type="safe_warn" is-msg></icon>
      <p>当前教师还没有发布过的作业</p>
    </div>


  </div>
</template>

<script>
import { Card,Icon,Divider } from 'vux'
import mtLoadmore from '@/components/loadMore'
export default {
  components: {
    Card,Icon,Divider,mtLoadmore
  },
  data () {
    return {
      data:[],
      pageSize:10,
      currentPage:1,
      noMoreData:false,
    }
  },
  methods:{
    getData(){
      let para ={}
      para.meid = this.$route.params.teacherId
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getAllTeacherHomework(para).then(res=>{
        if(res.length){
          res.forEach((element)=>{
            this.data.push(element)
          })
        }
        if(res.length==this.pageSize){
          this.noMoreData = false
        }else{
          this.noMoreData = true
        }
        this.$nextTick(()=>{
          this.$refs.loadmore.onBottomLoaded('加载成功');
        })
      })
    },
    loadMore(){
      this.currentPage++
      this.getData()
    }
  },
  created(){
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.feed{
  text-align:center;
  .time{
    margin:0 auto;
    background:#e3e3e3;
    padding:0.5em;
    display:inline;
    border-radius:20px;
  }
}
.card{
  margin:1em;
  text-align:left;
  .header{
    text-align:center;
    border-bottom: 1px solid @border;
  }
  .content{
    padding:1em;
    // border-bottom: 1px solid @border;
  }
  .footer{
    text-align: right;
    color:@grey;
  }
}
.hasNoData{
  text-align: center;
  background: #fff;
  padding:1rem;
  p{
    line-height: 3rem;
  }
}
</style>
