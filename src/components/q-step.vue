<template>
  <div class="step">
    <div class="line">
      <div class="item">
        <span class="circle" :class="{ 'active': (step>=1) }">1</span>
        <slot name="step1"></slot>
      </div>
      <div class="item">
        <span class="circle" :class="{ 'active': (step>=2) }">2</span>
        <slot name="step2"></slot>
      </div>
      <div class="item">
        <span class="circle" :class="{ 'active': (step>=3) }">3</span>
        <slot name="step3"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qStep',
  props:{
    step:Number
  },
  watch: {
    step:function (val, oldVal) {

    }
  }
}
</script>

<style scoped>
*{
  transition: all .3s;
}
.step{
  position: relative;
  margin:0 3em 5em 3em;
}
.line{
  height:1px;
  background: #3498db;
}
.item{
  position:absolute;
}
.circle{
  position:absolute;
  top:-1em;
  width:2em;
  height:2em;
  line-height:2em;
  border-radius:50%;
  border:1px solid #3498db;
  background:#fff;
  color:#3498db;
}
.item:nth-child(1){
  left:0;
}
.item:nth-child(2){
  left:calc(50% - 12px);
}
.item:nth-child(3){
  left:calc(100% - 24px);
}
.item span:nth-child(2){
  position:absolute;
  top:1.5em;
  color:#3498db;
  width:6em;
  text-align:center;
  margin-left:-1.8em;
}
.active{
  background:#3498db;
  color:#fff;
}
</style>