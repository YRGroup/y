<template>
  <div class="trends"  style="margin-top:10px">

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
          <div class="more" @click="$router.push('/class/'+$store.state.classId+'/msg/'+item.id)">
            查看更多
          </div>
        </div>
      </div> 
    </card>

    <div class="hasNoData" v-if="data.length===0">
      <icon type="safe_warn" is-msg></icon>
      <p>当前用户还没有发布过的动态</p>
      <x-button>给ta发条私信</x-button>
    </div>

  </div>
</template>

<script>
import { Card,Icon,XButton } from 'vux'

export default {
  components: {
    Card,Icon,XButton 
  },
  data () {
    return {
      data:[]
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
      this.$API.getAllTeacherDynamic(this.$route.params.teacherId).then(res=>{
        this.data=res
      })
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
