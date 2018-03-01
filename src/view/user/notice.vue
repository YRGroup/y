<template>
  <div class="wraper">
    <div class="item" v-for="item in noticeList" @click="showInfo(item)">
      <p>{{item.Title}}</p>
      <p>{{item.CreateTime.replace('T',' ')}}</p>
      <p>{{item.Content}}</p>
    </div>
    <!-- <div class="item">
      <p>
        <span>titletitletitletitletitletitletitletitletitle</span><span>2017.222</span>
      </p>
      <p>contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent</p>
    </div> -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      noticeList:[]
    }
  },
  created(){
    this.getNoticeList()
    this.$store.commit('changeTitle','校园通知')
  },
  methods:{
    getNoticeList(){
      this.$API.getNoticeList().then(res=>{
        console.log(res)
        this.noticeList=res
      })
    },
    showInfo(item){
      
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


