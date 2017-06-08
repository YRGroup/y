<template>
  <div class="hello">
    </br>
    <div class="time">4月25日</div>
    </br>
    <ul> 
      <li :class="(item.class=='me')?right:null" v-for="item in msg" class="item">
        <img class="picinfo" :src="item.img">
        <span class="msginfo">{{ item.msg }}</span>
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

.item{
  text-align:left;
  padding:10px;
  font-size:1.2em;
  position:relative;
  // padding-left:4rem;
  margin:10px 0;
  .picinfo{
    position: absolute;
    left: 20px;
    width:3em;
    border-radius:50%;
  }
  .msginfo{ 
    // position:absolute;
    // left:4rem;
    // margin:10px 0 0 3rem;
    display: inline-block;
    padding:10px;
    background:#fff;
    margin:0 10px 0 4rem;
    border-radius:6px;
    z-index:-1;
    border-radius: 1px solid @cc4;
    box-shadow: 0 0 3px rgba(0,0,0,.1);
  }
}
li.right{
  text-align: right;
  .picinfo{
    position: absolute;
    right:20px;
    left: inherit;
  }
  .msginfo{ 
    background: #9eea6a;
    margin:0 4rem 0 20px;
    text-align:left;
  }
}

</style>
