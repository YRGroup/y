<template>
  <div>

    <div>
       <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item v-for="(item, index) in date" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false" height="350px">
        <swiper-item v-for="(item, index) in date" :key="index">
            <timeline class="line">
              <timeline-item>
                <h4>{{item}}</h4>
              </timeline-item>
              <timeline-item>
                <p>8:00 - 9:00 语文</p>
              </timeline-item>
              <timeline-item>
                <p>9:00 - 10:00 数学</p>
              </timeline-item>
              <timeline-item>
                <p>11:00 - 12:00 英语</p>
              </timeline-item>
              <timeline-item>
                <p>14:00 - 15:00 体育</p>
              </timeline-item>
              <timeline-item>
                <p>15:00 - 16:00 科学</p>
              </timeline-item>
            </timeline>
        </swiper-item>
      </swiper>
    </div>
    
    

  </div>
</template>

<script>
import { Timeline, TimelineItem,Tab, TabItem,Swiper, SwiperItem } from 'vux'

export default {
  components: {
    Timeline, TimelineItem,Tab, TabItem,Swiper, SwiperItem
  },
  data () {
    return {
      index: 0,
      date: ['周一', '周二', '周三', '周四', '周五'],
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
.line{
  width:60%;
  margin:0 auto;
  p{
    background:#3498db;
    color:#fff;
    padding:0.5em;
    margin-left:1em;
  }
  p:before{
  content:'';
  display:block;
  position:absolute;
  left:1.5em;
  top:0px;
  width:0;
  // transform: rotate(45deg);
  border-top: .8em solid transparent;
  border-bottom: 1.8em solid transparent;
  border-right: 1.2em solid #3498db;
    }
}
</style>
