<template>
  <div class="hello">

    <ul> 
      <li :class="(item.SendTo!=$route.params.userId)?'right':null" v-for="item in data">
        <img :src="userImg">
        <div class="content">{{ item.Content }}</div>              
        <div class="time">{{ item.CreateTime }}</div>           
      </li> 
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      data:[]
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    getMsgInfo(){
      this.$API.getMsgInfo(this.$route.params.userId).then(res=>{
        this.data=res.CL
        this.userImg=res.sendto_Headimgurl
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','消息中心')
    this.getMsgInfo()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.hello{
  text-align:center;

}

li{
  text-align:left;
  padding:1em 0 1em 1em;
  font-size:1.2em;
  position:relative;
  height:4.5rem;
  margin-bottom:1em;
  // border-top:1px solid @cc3;
  img{
    width:4em;
    margin-right:1em;
    border-radius:50%;
  }
  .content{ 
    position:absolute;
    top:3.5rem;
    left:3.5rem;
    background:@cc6;
    color:#fff;
    padding:1rem;
    border-radius:15px;
    border:1px solid @cc4;
    z-index:-1;
  }
  .time{
    background:#e3e3e3;
    border-radius:20px;
    position: absolute;
    // width:7em;
    text-align: center;
    line-height: 1.5em;
    left:5.5em;
    top:2em;
  }
}
.right{
  text-align:right;
  .content{ 
    float:right;
    margin:0;
    color:#000;
    right:3.5rem;
    left:inherit;
    background:#fff;
  }
  .time{
    left:inherit;
    right:5.5em;
  }
}
</style>
