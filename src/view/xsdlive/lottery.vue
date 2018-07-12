<template>
  <div class="wrapper">
    <div class="people">
      <img :src="logo" alt="西斯达大树幼儿园">
    </div>
    <div class="btn"></div>
  </div>
</template>

<script>


export default {
  name: 'lottery',
  data() {
    return {
      logo:require('@/assets/xsdlogo.jpg')
    }
  },

  created() {

  },
  mounted() {
  },

}
</script>

<style lang="less" scoped> 

</style>
