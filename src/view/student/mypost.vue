<template>
  <div class="hello">
    <card v-for="(item,index) in data" :key="index">
      <div slot="header" class="header">
        <img :src="item.userImg">
        <span class="usename">{{ item.auther }}</span>
        <span class="time">{{ item.date }}</span>
        <span class="tips">{{ item.category }}</span>
      </div>
      <div slot="content" class="content">
        <div @click="$router.push('/post/'+item.ID)">{{item.content}} <span class="atuser" v-for="list in item.AtUser">@{{list.TrueName}}</span></div>
        <div class="img"  v-if="item.Albums">
          <!--<div class="imgCon" :style="{backgroundImage: 'url\('+imgurl+'\)'}" v-for="(imgurl,index) in item.albums" :key="index" @click="imgPopup(imgurl)">-->
          <!--</div>-->
          <div class="imgCon preview-img"
               :style="{backgroundImage: 'url\('+imgurl.src+'\)'}"
               v-for="(imgurl,index) in item.imgList"
               :key="imgurl.index"
               @click="openImg($event,index, item.imgList)">
          </div>
        </div>
      </div>

    </card>
  </div>
</template>

<script>
import { Group, Cell, XButton, Card } from "vux";

export default {
  name: "hello",
  components: {
    Group,
    Cell,
    XButton,
    Card,
  },
  data() {
    return {
      data: {},
      currentPage: 1,
      pageSize: 10,

    };
  },
  methods: {
    getData() {
      let params = {};
      params.meid = this.$route.params.studentId;
      params.pagesize = this.pageSize;
      params.currentPage = this.currentPage;
      this.$API
        .getAllUserDynamic(params)
        .then(res => {
          this.data = res;
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
        })
        .catch(err => {});
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
    this.$store.commit("changeTitle", "我的动态");
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>

</style>
