<template>

  <div class="step">
    <!--<div class="line">
      <span class="circle"></span>
    </div>-->
    <span>00000111111</span>
  </div>

</template>

<script>
export default {
  name: 'qStep',
  props:{

  }
}
</script>

<style scoped>
*{
  transition: all .3s;
}
.step{
  position: relative;
}
.line{
  padding:1em;
  height:1px;
  background: red;
}
</style>