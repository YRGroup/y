<template>
  <div class="hello">

    <div class="class-header">
      <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg" @click="fun('打开班级的主页')">
      <span>三年级二班</span>
      <span>班主任：张大丽</span>
      <span>班级人数：40人</span>
    </div>
    </br>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.class-header{
  height:10em;
  width:100%;
  background:#fff url('https://modao.cc/uploads3/images/900/9006918/raw_1493015913.png');
  background-size:100% 100%;
  color:#fff;
  position:relative;
  img{
    width:5rem;
    border-radius:15px;
    position:absolute;
    top:1rem;
    left:2rem;
  }
  span:nth-child(2){
    position:absolute;
    top:2rem;
    left:8rem;
    font-size:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:4rem;
    left:8rem;
  }
  span:nth-child(4){
    position:absolute;
    top:4rem;
    left:15rem;
  }
}

</style>
