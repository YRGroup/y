<template>
  <div class="show-notice" ref="showNotice">
    <div class="notice-list" :style="{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}" ref="roll">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
        leg:Number,
        showNum:Number
    },
    data () {
      return {
        noticePosition: 0, // 列表位置
        notices:[
            1,2,3,1
        ],
        time:null,
        step:0,
        height:'',
        time1:null
      }
    },
    created () {
      this.init();
    },
    watch:{
      leg(){
        this.init();
      }
    },
    methods: {
      init(){
        if(this.time1!=null){
          clearTimeout(this.time1);
          this.time1=null;
        }
        if(this.leg>=2){
          this.time1=setInterval(() => {
            this.height=this.$refs.showNotice.getBoundingClientRect().height/this.showNum;
            this.move();
          }, 5000)
        }
      },
      move(){
         let timer=setTimeout(()=>{
              this.domove();
         },4500)
      },
      domove(){
        if(this.time!=null){
            clearTimeout(this.time);
            this.time=null
        }
        this.step++;
        this.time=setTimeout(()=>{
          this.noticePosition+=(this.height/20);

          if(this.step>=20){
            clearTimeout(this.time);
            this.time=null;
            this.step=0;
            if(this.noticePosition>=this.height*(this.leg-this.showNum)){
              this.noticePosition=0;
            }
          }else{
            this.domove();
          }
        },25)
      }
    },
    destroyed(){
      clearTimeout(this.time1);
      this.time1=null;
    }
  }
</script>
<style>
  .show-notice{
      height: 100%;
  }
  .show-notice{
    overflow: hidden;
    vertical-align: middle;
    height: 100%;
  }
</style>
