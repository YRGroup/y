<template>
  <div class="work">
      <div class="addbtn" v-show="$store.state.role == '老师'">
        <x-button  @click.native="$router.push('/class/newhomework')" type="primary" plain>布置作业</x-button>
      </div>
      <group v-if="homework.length==0">
        <no-data></no-data>
      </group>
      <div v-else>
        <mt-loadmore  :top-method="refresh" :bottom-method="loadMore" :bottom-all-loaded="noMoreData" ref="loadmore" style="padding-bottom: 1.5rem;">

        <div class="workcard" v-for="(i,index) in homework" :key="index">
          <div class="header">
            <span class="auther">{{ i.AutherName }}</span>
            <span class="time">{{ i.CreateTime }}</span>
            <span class="category" :style="{background:colors[i.CourseName]}">{{ i.CourseName }}</span>
          </div>
          <div class="title center" @click="$router.push('/class/homework/'+i.HID)">{{i.Title}}</div>
          <div class="content">
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
          <!-- <div class="footer">{{ i.CreateTime }}</div> -->
        </div>
        </mt-loadmore>

      </div>
  </div>
</template>

<script>
import noData from '@/components/noData'
import mtLoadmore from '@/components/loadMore'
import { Popup, Group, XTextarea, XButton, Selector } from 'vux'

export default {
  components: {
    Popup,
    Group,
    XTextarea,
    mtLoadmore,
    Selector,
    XButton,
    noData
  },
  data() {
    return {
      showImgPopup: false,
      colors: {
        '语文': '#fe6867',
        '数学': '#ffce31',
        '英语': '#8b8efb',
        '物理': '#ff80c0',
        '化学': '#50c7ee',
        '历史': '#ff9f22',
        '政治': '#01c19e',
        '地理': '#34495e',
        '音乐': '#95a5a6',
        '美术': '#1abc9c',
        '体育': '#2ecc71'
      },
      imgList:[],
      homework: [],
      pageSize: 10,
      currentPage:0,
      noMoreData: false,
      popupImgUrl: ''
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    imgPopup(val) {
      this.popupImgUrl = val
      this.showImgPopup = true
    },
    getHomeWork(flag) {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.pagesize = this.pageSize
      para.currentPage = this.currentPage
      this.$API.getHomeworkList(para).then(res => {
        if(this.currentPage == 1){
          this.homework=[]
          this.imgList=[]
        }
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

        if (res.length) {
          res.forEach((element) => {
            this.homework.push(element)
          })
        }
        if(res.length==this.pagesize) {
          this.noMoreData = false
        } else {
          this.noMoreData = true
        }
        this.$nextTick(()=>{
          this.$refs.loadmore.onBottomLoaded('加载成功');
          if(flag=='refresh') {
            setTimeout(() => {
              this.$refs.loadmore.onTopLoaded('刷新成功');
            }, 300)
          }
        })

//        this.boxwid = res.length * 100 + 'px'
      })
    },
    loadMore() {
      this.currentPage++
      this.getHomeWork()
    },
    refresh(){
      this.currentPage=1;
      this.getHomeWork('refresh');
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
  created() {
    this.$store.commit('changeTitle', '班级作业')
//    this.getHomeWork()
    this.refresh();
  }
}
</script>

<style lang="less" scoped>
.addbtn {
  padding-top: 1em;
  margin: 0 40px;
  text-align: center;
  button{
    border-radius: 99px!important;
    line-height: 2;
  }
}

.workcard {
  background: #fff;
  margin: 1em 10px;
  .header {
    padding: 0 1rem;
    height: 2.4rem;
    line-height: 2.4rem;
    border-bottom: 1px solid @border;
    .category {
      float: right;
      color: #fff;
      width: 2.4em;
      line-height: 2em;
      text-align: center;
      border-radius: 0 0 6px 6px;
      padding: 0 10px;
    }

    .auther {
      font-size: 1.2em;
    }
    .time {
      // float: right;
      color: @grey;
    }
  }
  .title {
    // text-align: center;
    font-size: 1rem;
  }
  .content {
    padding: 0.5rem 1rem;
    line-height: 1.8em;
    .img {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .imgCon {
        width: calc(~"(100% - 30px) / 3");
        height: 100px;
        background-position: center;
        background-size: cover;
        margin: 5px;
      }
    }
    .text {
      height: 2.6rem;
      overflow: hidden;
    }
  }
  .footer {
    color: @grey;
    text-align: right;
  }
}

.popup {
  width: 95%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  padding-top: 10px;
  text-align: center;
}
</style>
