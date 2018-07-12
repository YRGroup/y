<template>
  
</template>
<script>
export default {
  data(){
    return {
      liveId:0,
      curid:0,
      count:2
    }
  },
  components:{

  },
  methods:{
    getSignInList(){
      let para = {
        name:this.liveId,
        curid:this.curid,
        count:this.count,
        getlottery:0
      }

    this.$API.getSignInList().then(res=>{
      
    })
  },
  created:{
    
  }
}
</script>
<style lang="less" scoped>
</style>
