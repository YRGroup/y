<template>
  <div class="trends"  style="margin-top:10px">

    <div class="hasNoData" v-if="!data.length">
      <icon type="safe_warn" is-msg></icon>
      <p>当前用户还没有发布过的动态</p>
    </div>

    <div v-show="data.length>0">
      <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="noMoreData" ref="loadmore" style="padding-bottom: 1.5rem;">
        <card v-for="(item,index) in data" :key="index">
          <div slot="header" class="header">
            <img :src="item.userImg" @click="$router.push('/teacher/'+item.auther_meid)">
            <span class="usename">{{ item.auther }}</span>
            <span class="time">{{ item.date }}</span>
            <span class="tips">{{ item.category }}</span>
          </div>
          <div slot="content" class="content">
            <p>{{ item.content }}</p>
          </div>
          <div slot="footer" class="footer">
            <div class="footer-btn">
              <i class="iconfont lick" @click="doLike(item.id),item.like++">&#xe646; {{ item.like }}</i>
              <i class="iconfont combtn">&#xe6c3; {{ item.read }}</i>
            </div>
            <div class="comment">
              <li v-for="(comment,index) in item.comment" v-if="index<3" :key="index">
                <span @click="fun('打开 '+comment.name+' 的个人页面')">{{ comment.userName }}：</span>
                <span>{{ comment.content }}</span>
              </li>
              <div class="hasNoComment" v-show="item.comment.length===0">还没有评论</div>
              <div class="more" @click="$router.push('/post/'+item.id)">
                查看更多
              </div>
            </div>
          </div>
        </card>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
import { Card,Icon,XButton,Divider } from 'vux'
import mtLoadmore from '@/components/loadMore'
export default {
  components: {
    Card,Icon,XButton,Divider,mtLoadmore
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
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    doLike(id){
      this.$API.doLikeThisPost(id).then(res=>{
        this.$vux.toast.show({
          type:"success",
          text: '点赞成功'
        })
      })
    },
    getData(){
      let para={}
      para.meid = this.$route.params.teacherId
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getAllTeacherDynamic(para).then(res=>{
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
    this.$store.commit('changeTitle','教师动态')
    this.getData()
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
.hasNoData{
  text-align: center;
  background: #fff;
  padding:1rem;
  p{
    line-height: 3rem;
  }
}
</style>
