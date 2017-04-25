<template>
  <div>
    </br>

    <div class="zoom-teaser">
      <div class="zoom-item" id="z1" v-bind:class="{ zoomActive: isActive1 }" @click="(isActive1==true)?isActive1=false:isActive1=true">
        <img src="https://www.mongodb.com/assets/images/index/icons/query.png">
        <h4>test</h4>
        <div class="zoom-hidden">
          </br><hr></br>
          <p>testing</p>
          <p>testing</p>
        </div>
        <button >打开</button>
      </div> 

      <div class="zoom-item" id="z2" v-bind:class="{ zoomActive: isActive2 }" @click="(isActive2==true)?isActive2=false:isActive2=true">
        <img src="https://www.mongodb.com/assets/images/index/icons/consistency.png">
        <h4>test</h4>
        <div class="zoom-hidden">
          </br><hr></br>
          <p>testing</p>
          <p>testing</p>
          <p>testing</p>
        </div>
        <button >打开</button>
      </div>

      <div class="zoom-item" id="z3" v-bind:class="{ zoomActive: isActive3 }" @click="(isActive3==true)?isActive3=false:isActive3=true">
        <img src="https://www.mongodb.com/assets/images/index/icons/manage.png">
        <h4>test</h4>
        <div class="zoom-hidden">
          </br><hr></br>
          <p>testing</p>
          <p>testing</p>
          <p>testing</p>
          <p>testing</p>
          <p>testing</p>
        </div>
        <button >打开</button>
      </div>

      <div class="zoom-item" id="z4" v-bind:class="{ zoomActive: isActive4 }" @click="(isActive4==true)?isActive4=false:isActive4=true">
        <img src="https://www.mongodb.com/assets/images/index/icons/flexibility.png">
        <h4>test</h4>
        <div class="zoom-hidden">
          </br><hr></br>
          <p>testing</p>
          <p>testing</p>
          <p>testing</p>
        </div>
        <button >打开</button>
      </div>

      <div class="zoom-item" id="z5" v-bind:class="{ zoomActive: isActive5 }" @click="(isActive5==true)?isActive5=false:isActive5=true">
        <img src="https://www.mongodb.com/assets/images/index/icons/scale.png">
        <h4>test</h4>
        <div class="zoom-hidden">
          </br><hr></br>
          <p>testing</p>
          <p>testing</p>
          <p>testing</p>
        </div>
        <button >打开</button>
      </div>

      <div class="zoom-item" id="z6" v-bind:class="{ zoomActive: isActive6 }" @click="(isActive6==true)?isActive6=false:isActive6=true">
        <img src="https://www.mongodb.com/assets/images/index/icons/travel-globe.png">
        <h4>test</h4>
        <div class="zoom-hidden">
          </br><hr></br>
          <p>testing</p>
          <p>testing</p>
        </div>
        <button >打开</button>
      </div>
    </div>

<div id="hue"></div>

<div @click="test">0123</div>

  </div>
</template>

<script>
import API from '../server/API'

export default {
  components: {

  },
  data () {
    return {
      isActive1:false,isActive2:false,isActive3:false,
      isActive4:false,isActive5:false,isActive6:false
    }
  },
  methods:{
    test(){
      API.signup('0123')
      this.$store.commit("logout")
    }
  }
}
</script>

<style>

button {
  cursor: pointer;
  margin: 0;
  background-color: #7fc857;
  color:#fff;
  border: 0;
  width:100%;
  position: absolute;
  left:0;
  height:5em;
  bottom:-3em;
}
.zoom-teaser{
  display: flex;
  flex-wrap: wrap;
  margin:1em;
  box-shadow: 0 0 19px #000;
  height:630px;
  overflow:hidden;
  position: relative;
}
.zoom-item{
  flex: 1;
  width:34%;
  text-align: center;
  background: #fff;
  height:250px;
  border-left:0.5px solid #eee;
  border-right:0.5px solid #eee;
  padding-top:2em;
  padding-bottom:2em;
  position: relative;
  cursor: pointer;
  z-index:0;
}
#z1{
  position: absolute;
  top:0;
  left:0;
}
#z2{
  position: absolute;
  top:0;
  left:33%;
}
#z3{
  position: absolute;
  top:0;
  left:66%;
}
#z4{
  position: absolute;
  top:50%;
  left:0;
}
#z5{
  position: absolute;
  top:50%;
  left:33%;
}
#z6{
  position: absolute;
  top:50%;
  left:66%;
}
.zoom-item img{
  margin-top:2em;
}
.zoom-item:hover button{
  bottom:0;
  transition: all 0.3s ease;
}
*{
  transition: all 0.3s ease;
}
.zoomActive{
  height:570px;
  width: 100%;
  z-index: 10;
  position: absolute;
  top:0!important;
  left:0!important;
}
.zoom-hidden{
  display: none;
}
.zoomActive .zoom-hidden{
  display: block;
  animation: fadeIn 1.2s linear;
}
@keyframes fadeIn{
  from { opacity: 0 }
  to { opacity: 1 }
}
hr{
  width:60%;
  margin:0 auto;
}


#hue { 
  height: 3em;
  width:3em;
  background-image: gradient(linear, 0% 50%, 100% 50%, 
  color-stop(0%, #ff0000), color-stop(2.778%, #ff2b00),color-stop(5.556%, #ff5500), color-stop(8.333%, #ff8000), color-stop(11.111%, #ffaa00), 
  color-stop(13.889%, #ffd500), color-stop(16.667%, #ffff00), color-stop(19.444%, #d4ff00), color-stop(22.222%, #aaff00), color-stop(25.0%, #80ff00), 
  color-stop(27.778%, #55ff00), color-stop(30.556%, #2bff00), color-stop(33.333%, #00ff00), color-stop(36.111%, #00ff2b), color-stop(38.889%, #00ff55), 
  color-stop(41.667%, #00ff80), color-stop(44.444%, #00ffaa), color-stop(47.222%, #00ffd5), color-stop(50.0%, #00ffff), color-stop(52.778%, #00d4ff), 
  color-stop(55.556%, #00aaff), color-stop(58.333%, #007fff), color-stop(61.111%, #0055ff), color-stop(63.889%, #002bff), color-stop(66.667%, #0000ff), 
  color-stop(69.444%, #2a00ff), color-stop(72.222%, #5500ff), color-stop(75%, #7f00ff), color-stop(77.778%, #aa00ff), color-stop(80.556%, #d400ff), 
  color-stop(83.333%, #ff00ff), color-stop(86.111%, #ff00d4), color-stop(88.889%, #ff00aa), color-stop(91.667%, #ff0080), color-stop(94.444%, #ff0055), 
  color-stop(97.222%, #ff002b), color-stop(100%, #ff0000)); 
  background-image: linear-gradient(left, #ff0000, #ff2b00, #ff5500, #ff8000, #ffaa00, #ffd500, #ffff00, #d4ff00, #aaff00, #80ff00, #55ff00, #2bff00, #00ff00, #00ff2b, #00ff55, #00ff80, #00ffaa, #00ffd5, #00ffff, #00d4ff, #00aaff, #007fff, #0055ff, #002bff, #0000ff, #2a00ff, #5500ff, #7f00ff, #aa00ff, #d400ff, #ff00ff, #ff00d4, #ff00aa, #ff0080, #ff0055, #ff002b, #ff0000); }
</style>
