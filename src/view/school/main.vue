<template>
  <div class="hello">
    
    <!-- <div class="school-header">
      <img :src="data.logo">
      <span class="name">{{ data.name }}</span>
      <span class="chairman">校长：{{ data.chairman }}</span>
      <span class="count">人数：{{ data.count }}人</span>
      <div class="addbtn" @click="$router.push('/school/new')">添加动态</div>
    </div> -->

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data:{
        logo:require('@/assets/face/c.jpeg'),
        name:'郑州航空港育人国际学校',
        chairman:'王校长',
        count:'5560'
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun(val){

    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.school-header{
  height:8.5em;
  width:100%;
  background:linear-gradient(right top,#00c0a1, #00c06f);
  background-size:100% 100%;
  color:#fff;
  position:relative;
  img{
    width:4rem;
    border-radius:10px;
    position:absolute;
    top:1rem;
    left:1rem;
    border: 4px solid rgba(255,255,255,0.3);
  }
  .name{
    position:absolute;
    top:1.4rem;
    left:7rem;
    font-size:1.5em;
  }
  .chairman{
    position:absolute;
    top:3.6rem;
    left:7rem;
  }
  .count{
    position:absolute;
    top:3.6rem;
    left:13rem;
  }
  .addbtn{
    position: absolute;
    top:5rem;
    right:1rem;
    background: red;
    padding:.5em;
    border-radius: 15px;
  }
}
</style>
