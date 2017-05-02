<template>
  <div class="hello">
    <ul>
      <li @click="fun('展开对话')" v-for="item in msg">
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
          'name':'李晓丽',
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'class':'数学',
          'msg':'今天的作业',
          'date':'4-26',
          'num':'4'
        },
        {
          'name':'李晓丽',
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'class':'数学',
          'msg':'今天的作业',
          'date':'4-26',
          'num':'4'
        },
        {
          'name':'李晓丽',
          'img':'https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png',
          'class':'数学',
          'msg':'今天的作业',
          'date':'4-26',
          'num':'4'
        }
      ]
    }
  },
  methods:{
    fun(val){

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
  }
  span:nth-child(2){ 
    position:absolute;
    top:1.5em;
  }
  span:nth-child(3){
    position:absolute;
    top:3em;
    color:grey;
  }
  span:nth-child(4){
    position:absolute;
    top:1.5em;
    right:3em;
    color:grey;
  }
  span:nth-child(5){
    position:absolute;
    top:3em;
    right:3em;
    background:orange;
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
  background:#ccc;
  margin-top:.5em;
}
li:last-child{
  padding-bottom:0;
}
</style>
