<template>
  <div class="wraper">
    <no-data v-if="showNoData"></no-data>
    <div class="item" v-for="item in noticeList">
      <p>{{item.Title}}</p>
      <p>{{item.CreateTime.slice(0,item.CreateTime.indexOf('.')).replace('T',' ')}}</p>
      <p>{{item.Content}}</p>
    </div>
  </div>
</template>
<script>

import noData from '@/components/noData'
export default {
  data(){
    return {
      noticeList:[]
    }
  },
  computed:{
    showNoData(){
      return this.noticeList.length?false:true
    }
  },
  components:{noData},
  created(){
    this.getNoticeList()
    this.$store.commit('changeTitle','校园通知')
  },
  methods:{
    getNoticeList(){  
      this.$API.getNoticeList().then(res=>{
        this.noticeList=res
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .wraper{
    .item{
      background: #fff;
      margin: 8px 0;
      padding: 10px 10px;
      word-break: break-all;
      p{
        padding: 2px 0;
      }
      p:nth-of-type(1){
        font-size: 15px; 
        color: @main;
      }
      p:nth-of-type(2){
        color: @grey;
      }
      p:nth-of-type(3){
        font-size: 15px; 
      }
    }
  }
</style>


