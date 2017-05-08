<template>
  <div class="hello">
    <ul>
      <li @click="$router.push('/allmsg')" v-for="item in msg">
        <img :src="item.img">
        <span>{{ item.name }} （{{ item.class }}）</span>
        <span>{{ item.msg }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.num }}</span>
      </li> 
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg:[
        {
          'name':'李老师',
          'img':require('@/assets/face/dk.png'),
          'class':'数学',
          'msg':'今天的作业完成了没有？',
          'date':'4-26',
          'num':'4'
        },
        {
          'name':'周老师',
          'img':require('@/assets/face/jay.jpg'),
          'class':'数学',
          'msg':'春季运动会报名方法',
          'date':'4-26',
          'num':'2'
        },
        {
          'name':'鹿老师',
          'img':require('@/assets/face/lh.jpg'),
          'class':'数学',
          'msg':'家长请多关注一下孩子的情感状态',
          'date':'4-26',
          'num':'7'
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
    this.$store.state.isNav = true
    this.$store.state.title = '消息中心'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
li{
  padding:1em 0 1em 1em;
  font-size:1.2em;
  background:#fff;
  position:relative;
  img{
    width:4em;
    margin-right:1em;
    border-radius:50%;
  }
  span:nth-child(2){ 
    position:absolute;
    top:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:3em;
    color:@c3;
  }
  span:nth-child(4){
    position:absolute;
    top:1.5em;
    right:3em;
    color:@c4;
  }
  span:nth-child(5){
    position:absolute;
    top:3em;
    right:3em;
    background:@c6;
    line-height:1.5em;
    text-align:center;
    width:1.5em;
    height:1.5em;
    border-radius:50%;
    color:#fff;
  }
}
li:after{
  content:"";
  display:block;
  width:100%;
  height:1px;
  background:@c2;
  margin-top:.5em;
}
li:last-child{
  padding-bottom:0;
}
</style>
