<template>
  <div class="hello">
    <div id="navbtn">
      <span>回到主页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
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
#navbtn{
  background: rgba(0,0,0,0.6);
  color:#fff;
  position: fixed;
  top:5rem;
  right:3rem;
  padding:.7rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
}
</style>
