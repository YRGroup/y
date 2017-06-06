<template>
  <div class="hello">

    <div class="card" v-for="(item,index) in data" :key="index">
      <div class="header">
        <img :src="item.userImg">
        <div class="info">
          <span class="usename">{{ item.auther }}</span>
          <span class="job">【语文】</span>
          <span class="time">{{ item.date }}</span>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      data:[],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getData(){
      this.$API.getAllClassDynamic(this.$store.state.classId).then(res=>{
        console.log('获取到的班级通知：')
        console.log(res)
        this.data = res
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','班级通知')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.card{
  background: #fff;
  padding:1rem;
  .header{
    img{
      height:4rem;
      border-radius: 50%;
      vertical-align:top;
      margin-right:1rem;
    }
    .info{
      display: inline-block;
      margin-top:.7rem;
      .usename{
        font-size: 1.1rem;
      }
      .time{
        display: block;
        color:@cc3;
      }
    }
  }
  .content{
    margin-top:1rem;
  }
}
</style>
