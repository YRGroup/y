<template>
  <div class="hello">

    <div class="item" v-for="(i,index) in data" :key="index">
      <img :src="i.userImg">
      <div class="userName">{{i.TrueName}}</div>
      <div class="userIndex">{{index+1}}</div>
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
      this.$API.getStudentList(this.$route.params.classId).then(res=>{
        console.log('获取到的学生列表信息：')
        console.log(res)
        this.data=res
      }).catch(err=>{
        console.log(err)
      })
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
.item{
  padding:12px;
  margin:10px 0;
  background: #fff;
  position: relative;
  img{
    width:3rem;
    border-radius: 50%;
    vertical-align:middle;
  }
  .userName{
    display: inline-block;
    vertical-align:middle;
    font-size: 1rem;
    margin-left:1rem;
  }
  .userIndex{
    position: absolute;
    right:.5rem;
    top:.5rem;
    background: #ccc;
    color:#fff;
    width:1.5rem;
    height:1.5rem;
    text-align: center;
    line-height: 1.5rem;
    border-radius: 50%;
  }
}
</style>
