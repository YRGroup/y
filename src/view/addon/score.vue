<template>
  <div>
    score info
    <div class="header card">
      <p class="title">2015-2016学年吉林省中学高一下学期期末考试</p>
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
@borderColor:#ccc;
@subColor:#ccc;

.header{
  text-align: center;
  line-height: 2rem;
  .time{
    color:@subColor;
  }
}
.main{
  text-align: center;
  
  .total{
    line-height: 3rem;
    padding:0 .5rem;
    display:flex;
    justify-content:center;
    .item{
      font-size: 1.1rem;
      width:50%;
      border-bottom: 1px solid @borderColor;
      .num{
        font-weight: bold;
      }
    }
  }
  .subject{
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    padding:0 .5rem;
    &:before{
      content: "";
      display: block;
      background: @borderColor;
      width:1px;
      height:6rem;
      position: absolute;
    }
    li{
      width:50%;
      line-height: 3rem;
      border-bottom: 1px solid @borderColor;
    }
    .more{
      line-height: 3rem;
      color:@subColor;
    }
  }
}
.record{

}
</style>
