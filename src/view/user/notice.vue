<template>
  <div class="wraper">
    <div class="item" v-for="item in noticeList">
      <p>
        <span>{{item.Title}}</span>
        <span>{{item.CreateTime.replace('T',' ')}}</span>
      </p>
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
  },
  methods:{
    getNoticeList(){
      this.$API.getNoticeList().then(res=>{
        console.log(res)
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
      p{
        padding: 5px 0;
      }
      p:nth-of-type(1){
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        line-height: 15px;
        span:nth-of-type(1){
          font-size: 15px;
          max-width: 50%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-of-type(2){
          color: @grey;
        }
      }
      p:nth-of-type(2){
        color: @grey;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>


