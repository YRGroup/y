<template>
  <div class="hello">
    </br>
    <div class="time">4月25日</div>
    </br>
    <ul> 
      <li :class="(item.class=='me')?right:null" v-for="item in msg">
        <img :src="item.img">
        <span>{{ item.msg }}</span>
      </li> 
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      right:'right',
      msg:[
        {
          'img':require('@/assets/face/tc.png'),
          'msg':'今天的作业是什么',
          'class':'me',
          'date':'4-26',
          'num':'4'
        },
        {
          'img':require('@/assets/face/jay.jpg'),
          'msg':'今天的语文作业是唐诗三百首读后感一篇',
          'date':'4-26',
          'num':'4'
        },
        {
          'img':require('@/assets/face/jay.jpg'),
          'msg':'记得要用黑色记号笔',
          'date':'4-26',
          'num':'4'
        }
      ]
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','消息中心')
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.hello{
  text-align:center;
  .time{
    margin:0 auto;
    background:#e3e3e3;
    padding:0.5em;
    display:inline;
    border-radius:20px;
  }
}

li{
  text-align:left;
  padding:1em 0 1em 1em;
  font-size:1.2em;
  position:relative;
  height:4.5rem;
  img{
    width:4em;
    margin-right:1em;
    border-radius:50%;
  }
  span:nth-child(2){ 
    position:absolute;
    top:3.5rem;
    left:2.5rem;
    background:#fff;
    padding:1rem;
    border-radius:15px;
    border:1px solid @c4;
    z-index:-1;
  }
}
.right{
  text-align:right;
  span:nth-child(2){ 
    float:right;
    margin:0;
    right:2.5rem;
    left:inherit;
  }
}
</style>
