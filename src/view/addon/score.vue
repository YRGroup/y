<template>
  <div>
    <div class="header card">
      <p class="title">2015-2016学年吉林省中学学年吉林省中学</p>
      <p class="time">2017-5-10</p>
    </div>

    <div class="main card">
      <div class="total">
        <div class="item">
          <span>名次</span>
          <span class="num">20</span>
        </div>
        <div class="item">
          <span>总分</span>
          <span class="num">560</span>
        </div> 
      </div>
      <div class="subject">
        <li>
          <span class="title">语文</span>
          <span class="score">108</span>
          <span class="fullScore">/150</span>
        </li>
        <li>
          <span class="title">语文</span>
          <span class="score">108</span>
          <span class="fullScore">/150</span>
        </li>
        <li>
          <span class="title">语文</span>
          <span class="score">108</span>
          <span class="fullScore">/150</span>
        </li>
        <li>
          <span class="title">语文</span>
          <span class="score">108</span>
          <span class="fullScore">/150</span>
        </li>
      </div>
      <div class="more card">
        查看历次成绩 >>>
      </div>
    </div>

    

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun(val){

    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>

.header{
  text-align: center;
  line-height: 1.6rem;
  padding-bottom:14px;
  .title{
    padding:14px 14px 0 14px;
    font-size: 1rem;
  }
  .time{
    color:@cc3;
  }
}
.main{
  text-align: center;
  
  .total{
    line-height: 4rem;
    padding:0 .5rem;
    display:flex;
    justify-content:center;
    .item{
      font-size: 1rem;
      width:50%;
      border-bottom: 1px solid @cc4;
      .num{
        font-weight: bold;
        font-size: 1.2rem;
        color:@cc6;
      }
    }
  }
  .subject{
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    padding:0 .5rem;
    position: relative;
    &:before{
      content: "";
      display: block;
      background: @cc4;
      width:1px;
      height:100%;
      position: absolute;
    }
    li{
      width:50%;
      line-height: 3rem;
      border-bottom: 1px solid @cc4;
      .score{
        font-size:1.2rem;
        color: @cc6;
        font-weight: 600;
      }
      .fullScore{
        color: @cc2;
      }
    }
    
  }
  .more{
      line-height: 3rem;
      margin-top:0;
      color:@cc2;
    }
}
</style>
