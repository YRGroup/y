<template>
  <div>
    
    </br>
    
    <div class="feed" v-for="i in data" v-if="data!=[]"
    @click="fun('打开 '+i.title+' '+i.class+' 的作业页面')">
      <card class="card">
        <!--<div class="header" slot="header">{{i.Title}}</div>-->
        <div class="content" slot="content">{{ i.Content }}</div>
        <div class="footer" slot="footer">{{ i.CreateTime }}</div>
      </card>
    </div>

    <div class="hasNoData" v-if="data.length===0">
      <icon type="safe_warn" is-msg></icon>
      <p>当前教师还没有发布过的作业</p>
    </div>
    

  </div>
</template>

<script>
import { Card,Icon } from 'vux'

export default {
  components: {
    Card,Icon
  },
  data () {
    return {
      data:[]
    }
  },
  methods:{
    getHomeworkList(){
      this.$API.getHomeworkList(this.$store.state.classId).then(res=>{
        console.log('获取到的教师发布的作业：')
        console.log(res)
        this.data=res
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.getHomeworkList()
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
    border-bottom: 1px solid @cc4;
  }
  .content{
    padding:1em;
    // border-bottom: 1px solid @cc4;
  }
  .footer{
    text-align: right;
    color:@cc2;
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
