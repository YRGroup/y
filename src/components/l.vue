<template>
  <div class="art" :style="{'height':this.height}">
    <ul class="artnav">
      <li>navigation</li>
      <li>navigation</li>
      <li>navigation</li>
      <li>navigation</li>
      <li>navigation</li>
      <li>navigation</li>
      <li>navigation</li>
      <li>navigation</li>
    </ul>
    <p class="title">Art Design</p>

  </div>
</template>

<script>
export default {
  name: 'art',
  data () {
    return {
      height:'',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    let a = $(window).height()
    this.height= a+'px'
  }
}
</script>

<style scoped>
html,body,#app,.art{
  width:100%;
}
.art{
  width:100%;
  background-image: url('http://img2.artron.net/artist/A0000083/2016032911011693304.jpg');
  background-size:100% 100%;
}
.artnav{
  height:100%;
}
.artnav li:before{
  content: '';
  display:block;
  width:100%;
  height:90%;
}
.artnav li{
  float:left;
  height:100%;
  padding:2em;
  cursor: pointer;
}
.artnav li:nth-child(1){
  background-color: rgba(0, 0, 0,0.9);
}
.artnav li:nth-child(2){
  background-color: rgba(0, 0, 0,0.85);
}
.artnav li:nth-child(3){
  background-color: rgba(0, 0, 0,0.8);
}
.artnav li:nth-child(4){
  background-color: rgba(0, 0, 0,0.75);
}
.artnav li:nth-child(5){
  background-color: rgba(0, 0, 0,0.7);
}
.artnav li:nth-child(6){
  background-color: rgba(0, 0, 0,0.65);
}
.artnav li:nth-child(7){
  background-color: rgba(0, 0, 0,0.6);
}
.artnav li:nth-child(8){
  background-color: rgba(0, 0, 0,0.55);
}
.artnav li:hover{
  background-color:rgba(0, 0, 0,0.5);
}
.title{
  position: absolute;
  top:50%;
  left:10%;
  font-size: 5em;
  opacity: 0.7;
  cursor: pointer;
}
.title:hover{
  opacity:1;
  text-shadow: -1px 0 5px red;
}

</style>
