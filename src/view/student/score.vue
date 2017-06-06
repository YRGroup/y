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
      <ul class="subject">
        <li v-for="list in score">
          <span class="title">{{list.title}}</span>
          <span class="score">{{list.score}}</span>
          <span class="fullScore">/{{list.fullscore}}</span>
        </li>
      </ul>
    </div>

    <div class="more card" @click="showpopup=true">
      查看历次成绩 >>>
    </div>

      <popup v-model="showpopup" height="100%" class="popup">
        <div class="close" @click="showpopup=false">返回</div>
        <div class="content">
          <li class="card examItem" v-for="i in exam" @click="showpopup=false">
            <div class="title">{{i.title}} > </div>
            <div class="time">{{i.time}}</div>
            <div class="score">{{i.score}}分</div>
          </li>
        </div>
      </popup>   

  </div>
</template>

<script>
import { Popup } from 'vux'

export default {
  name: 'hello',
  components: {
    Popup
  },
  data () {
    return {
      showpopup:false,
      exam:[
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        },
        {
          title:'2015-2016学年期中考试',
          time:'2017-3-30',
          score:'580.5'
        }
      ],
      score: [
        {
          title:'语文',
          score:'108',
          fullscore:'145'
        },
        {
          title:'数学',
          score:'108',
          fullscore:'145'
        },
        {
          title:'英文',
          score:'108',
          fullscore:'145'
        },
        {
          title:'音乐',
          score:'108',
          fullscore:'145'
        },
        {
          title:'美术',
          score:'108',
          fullscore:'145'
        }
      ]
    }
  },
  methods:{
    change(val){

    }
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','成绩报告')
  },
  mounted(){
    console.log(this.$refs.thistest)
  },
  watch:{
    showpopup(val){
      if(val){
        this.$store.commit('showNav',false)
      }else{
        this.$store.commit('showNav',true)
      }
    }
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
    flex-wrap: wrap;
    padding:0 .5rem;
    position: relative;
    border-bottom: 1px solid @cc4;
    &:before{
      content: "";
      display: block;
      background: @cc4;
      width:1px;
      height:100%;
      position: absolute;
      left:50%;
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
      &:last-child{
        border-bottom: none;
      }
    }
  }
}

.more{
  line-height: 2.5rem;
  text-align: center;
  color:@cc2;
}

.popup{
  overflow: scroll;
  .close{
    background: rgba(0,0,0,0.4);
    color:#fff;
    line-height: 2rem;
    position: fixed;
    width:100%;
    padding-left:2rem;
  }
  .content{
    margin:2.5rem 0;
    .examItem{
      padding:.5rem 1rem;
      text-align: left;
      .title{
        font-weight: bold;
        font-size: 1rem;
        line-height: 1.7rem;
      }
      .time{
        display: inline-block;
        color:@cc3;
        line-height: 1.5rem;
      }
      .score{
        float: right;
        font-size: 1.3rem;
        color:@cc6;
        margin-right:.5rem;
      }
    }
  }

}
</style>
