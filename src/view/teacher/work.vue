<template>
  <div class="work" style="margin-top:10px">

    <div class="feed"  v-show="data.length>0">
      <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="noMoreData" ref="loadmore" style="padding-bottom: 1.5rem;">
        <card class="card" v-for="(i,index) in data" :key="index">
          <div class="header" slot="header">{{i.Title}}</div>
          <div class="content" slot="content">
            <div class="text" @click="$router.push('/class/homework/'+i.HID)">{{i.Content}}</div>
            <div class="img" v-if="i.Albums">
              <div class="imgCon preview-img"
                   :style="{backgroundImage: 'url\('+imgurl.src+'\)'}"
                   v-for="(imgurl,index) in i.imgList"
                   :key="index"
                   @click="openImg($event,index, i.imgList)"
              >
              </div>
            </div>
          </div>
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
          this.imgList=[]
        //*******图片预览处理*******//

        //获取最后一个 '.preview-img'的 index
        res.forEach((n,i)=>{
          // 处理图片预览的 数据格式
          n.imgList=[];
          n.Albums.forEach((m,j)=>{
            let obj={
              src:m,
              w:200,
              h:200,

            }
            n.imgList.push(obj)
            //把动态里面的图片都放进一个数组里面
            //index 代表位置
            this.imgList.push(obj)

          })
        })
        this.preloadimages(this.imgList).done((images)=>{
          images.forEach((n,i)=>{
            this.imgList[i].w=n.width
            this.imgList[i].h=n.height
          })
        })
        //*******图片预览处理结束*******//
          res.forEach((element)=>{
            this.data.push(element)
            console.log(this.data)
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
    },
    preloadimages(arr){
      var newimages=[], loadedimages=0
      var postaction=function(){}  //此处增加了一个postaction函数
      var arr=(typeof arr!="object")? [arr] : arr
      function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
          postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
      }
      for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i].src
        newimages[i].onload=function(){
          imageloadpost()
        }
        newimages[i].onerror=function(){
          imageloadpost()
        }
      }
      return { //此处返回一个空白对象的done方法
        done:function(f){
          postaction=f || postaction
        }
      }
    },
    openImg(el,i,list){
      this.$preview.open(el.target.parentNode,i,list)
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
    padding-top:1em;
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
.imgCon {
        width: calc(~"(100% - 30px) / 3");
        height: 100px;
        background-position: center;
        background-size: cover;
        margin: 5px;
      }
</style>
