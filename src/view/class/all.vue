<template>
  <div class="classMain aas1" >
    <mt-loadmore  :top-method="refresh" :bottom-method="loadMore" :bottom-all-loaded="noMoreData" ref="loadmore" style="padding-bottom: 1.5rem;">
    <!--班级通知
      教师端显示
      -->
    <div class="notice" v-if="notice.length!=0">
      <div class="icon" @click="$router.push('/class/notice')">
        <span>通知</span>
      </div>
      <div class="title">{{notice.content}}</div>
      <div class="info">
        <span class="auther">{{notice.auther}}</span>
        <span class="time">{{notice.date}}</span>
      </div>
    </div>

    <!-- <card style="padding:0" :header="{title:'班级管理菜单'}" v-show="$store.state.role=='老师'">
          <div slot="content">
            <cell title="考试列表" is-link @click.native="$router.push('/class/exam')"></cell>
          </div>
        </card> -->

    <div class="teacherListBox" v-show="this.teachers.length" ref="lineScroll" style="height:112px">
      <ul style="height: 71px" class="scrollerX">
        <li class="box-item" v-for="(item,index) in teachers" :key="index" @click="$router.push('/teacher/'+item.Meid)">
          <div   >
            <!-- <img :src="item.Headimgurl"> -->
            <div class="category" :style="{background:colors[item.Course]}">{{ item.Course.substr(0,1) }}</div>
            <div class="name">{{ item.TrueName ||'&nbsp;' }}</div>
            <!-- <div class="job">{{ item.Course ||'&nbsp;' }}</div> -->
          </div>
        </li>
      </ul>

    </div>

    <!--班级作业
      教师端不显示
      家长端显示
      -->
    <div class="classWork" v-if="homework!=[]">
      <div class="icon">
        <span>班级作业</span>
      </div>
      <div class="content" v-if="homework.length">
        <scrollNew :leg="homework.length" :showNum="2">
          <li v-for="(i,index) in homework" :key="index" @click="$router.push('/class/work')">
            <div class="msg">
              【{{ i.CourseName }}】{{ i.Title || '班级作业' }}
            </div>
            <div class="date">{{ i.CreateTime }}</div>
          </li>
        </scrollNew>
      </div>
      <div class="content" v-else>
        <li>
          <div class="msg">
            班级暂时没有作业
          </div>
        </li>
      </div>
      <div class="link" @click="$router.push('/class/work')">
        <span>更多</span>
      </div>
    </div>

    <!--动态卡片
      教师端显示
      家长端显示
      -->
    <card v-for="(item,index) in list" :key="index">
      <div slot="header" class="header">
        <!-- <img :src="item.userImg" @click="$router.push('/teacher/'+item.auther_meid)"> -->
        <img :src="item.userImg">
        <span class="usename">{{ item.auther }}</span>
        <span class="time">{{ item.date }}</span>
        <span class="tips">{{ item.category }}</span>
      </div>
      <div slot="content" class="content">

        <div @click="$router.push('/post/'+item.ID)">{{item.content}}</div>

        <div class="img" v-if="item.albums.length!=0">
          <!--<div class="imgCon" :style="{backgroundImage: 'url\('+imgurl+'\)'}" v-for="(imgurl,index) in item.albums" :key="index" @click="imgPopup(imgurl)">-->
          <!--</div>-->
          <div class="imgCon preview-img"
               :style="{backgroundImage: 'url\('+imgurl.src+'\)'}"
               v-for="(imgurl,index) in item.imgList"
               :key="imgurl.index"
               @click="openImg($event,index, item.imgList)"
          >
          </div>
        </div>
      </div>
      <div slot="footer" class="footer">
        <div class="footer-btn">
          <i class="iconfont lick" @click="doLike(item.ID),item.like++">&#xe646; {{ item.like }}</i>
          <i class="iconfont combtn" @click="$router.push(`/p/${item.EncryptID}`)">&#xe6c3; </i>
        </div>
        <div class="comment" v-if="item.comment.length !== 0">
          <li v-for="(comment,index) in item.comment" v-if="item.comment.length!=0&&index<3" :key="index">
            <span>{{ comment.TrueName }}：</span>
            <span>{{ comment.content }}</span>
          </li>
        </div>
      </div>
    </card>
    </mt-loadmore>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Card, Popup, Tab, TabItem, Divider, Cell , Marquee , MarqueeItem } from 'vux'
import IScroll from 'better-scroll';
import scrollNew from '@/components/scrollNew';
import mtLoadmore from '@/components/loadMore'
export default {
  components: {
    Flexbox, FlexboxItem, Card, Popup, Tab, TabItem, Divider, Cell,scrollNew, mtLoadmore, Marquee , MarqueeItem
  },
  data() {
    return {
      boxwid: null || '1500px',
      showImgPopup: false,
      popupImgUrl: '',
      teachers: [],
      notice: [],
      homework: [],
      list: [],
      imgList:[],
      pageSize: 10,
      currentPage: 0,
      noMoreData: false,
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
        '体育': '#2ecc71',
        '暂无':'#000'
      },
    }
  },
  computed:{
    mainHeight(){
        return window.innerHeight-259;
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
    getAllClassDynamic(flag) {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.type = 1
      para.pagesize = this.pageSize
      para.currentPage = this.currentPage
      this.$API.getAllClassDynamic(para).then((res) => {
        if(this.currentPage==1){
          this.list=[];
          this.imgList=[];
        }
        //*******图片预览处理*******//

        //获取最后一个 '.preview-img'的 index
        res.forEach((n,i)=>{

            // 处理图片预览的 数据格式
            n.imgList=[];
            n.albums.forEach((m,j)=>{
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
          this.list=this.list.concat(res);
        }
        if(res.length==this.pageSize){
          this.noMoreData = false
        }else{
          this.noMoreData = true
        }
        this.$nextTick(()=>{
            this.$refs.loadmore.onBottomLoaded('加载成功');
        })
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
        this.$refs.loadmore.onBottomLoaded('加载失败');
      })
    },
    loadMore() {
      this.currentPage++
      this.getAllClassDynamic(true)
    },

    getTeacherList() {
      return this.$API.getTeacherList(this.$store.state.currentClassId).then((res) => {
        this.teachers = res
        this.boxwid = res.length * 100 + 'px';
        this.$nextTick(()=>{
          this._lineScroll();
        })
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
      })
    },
    getHomeWork() {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.pagesize = 3
      para.currentPage = 1
      return this.$API.getHomeworkList(para).then((res) => {
        this.homework = res
      }).catch(err => {
        this.$vux.toast.show({
          type: "warn",
          width: "20em",
          text: err.msg
        })
      })
    },
    doLike(id) {
      this.$API.doLikeThisPost(id).then(() => {
        this.$vux.toast.show({
          type: "success",
          width: "20em",
          text: '点赞成功'
        })
      }).catch(err => {
        this.$vux.toast.show({
          type: "text",
          text: err.msg,
          width: "20em"
        })
      })
    },
    _lineScroll(){
        this.newScroll=new IScroll(this.$refs.lineScroll,{
          scrollX: true,
          click:true
        })
    },
    refresh(){
      this.currentPage=1;
      Promise.all([this.getAllClassDynamic(),this.getTeacherList(),this.getHomeWork()]).then((posts)=> {
        this.$refs.loadmore.onTopLoaded('刷新成功');
      }).catch((reason)=>{
        this.$refs.loadmore.onTopLoaded('刷新失败');
      });
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
    this.$store.commit('changeTitle', '班级动态')
    this.currentPage=1;

    this.$nextTick(()=>{
//      this.getAllClassDynamic()
//      this.getTeacherList()
//      this.getHomeWork()
        this.refresh();
    })
  }
}
</script>

<style lang="less" scoped>
.classMain {
  /*margin-top: -20px;*/
  /*margin-bottom: 53px;*/
}

.teacherListBox {
  /*position: relative;*/
  background: #fff;
  white-space: nowrap;
  min-width: 100%;
  padding: 30px 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  .box-item {
    width: 5rem;
    border-radius: 15px;
    display: inline-block;
    /*float: left;*/
    margin-left: 10px;
    text-align: center;
    img {
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
    }
    .category {
      display: inline-block;
      color: #fff;
      width: 2.6em;
      font-size: 1.4em;
      line-height: 2.6em;
      text-align: center;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, .2);
    }
    .name {
      line-height: 2em;
      font-size: 1.1em;
    }
  }
}

.header {
  .tips {
    font-size: 0.8em;
  }
}

.classWork {
  margin: @length 0;
  background: #fff;
  height: 4.4em;
  padding: .5em;
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  .icon {
    color: @main;
    width: 2.2em;
    position: absolute;
    font-weight: 600;
    left: 1em;
    top: 1em;
    font-size: 1.1em;
    line-height: 1.5em;
  }
  .content:before {
    content: "";
    display: block;
    width: 1px;
    height: 4em;
    background: @border;
    position: absolute;
    left: 4em;
    top: .8em;
  }
  .content {
    margin-left: 4em;
    margin-top: 3px;
    height: 48px;
    overflow: hidden;
    li {
      display: block;
      position: relative;
      height: 2em;
      .msg {
        display: inline-block;
        width: 17em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 2em;
      }
      .date {
        z-index: 100;
        background: #fff;
        color: @grey;
        padding-left: 0.5em;
        width: 6em;
        right: 4em;
        top: 0;
        position: absolute;
      }
    }
  }
  .content:after {
    content: "";
    display: block;
    width: 1px;
    height: 4em;
    background: @border;
    position: absolute;
    right: 4em;
    top: .8em;
  }
  .link {
    color: @grey;
    width: 1em;
    position: absolute;
    right: 1.6em;
    top: 1.3em;
  }
}

.notice {
  height: 3rem;
  background: #fff;
  margin-bottom: @length;
  padding: .5rem; // width: 100%;
  .icon {
    width: 3rem;
    height: 3rem;
    display: inline-block;
    background: #ff8e00;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    span {
      line-height: 3rem;
    }
  }
  .title {
    margin-top: -2.7rem;
    margin-left: 4rem;
    font-size: 1rem;
  }
  .info {
    margin-left: 4rem;
    color: #ccc;
  }
}

.popup {
  text-align: center;
  margin:0 auto;
  padding: 1rem;
  background: #fff;
  max-height: 100vh;
  max-width: 80vw;
  position: relative;
  img{
    max-height: 90vh;
  }
}
</style>
