<template>
  <div class="hello">
    
    <swiper loop auto :list="swiperdate"></swiper>

    <flexbox>
      <flexbox-item>
        <router-link to="/">
          <div><i class="fa fa-home" style="background:#ff8aad"></i></div>
          <span>校园新闻</span>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/">
          <div><i class="fa fa-home" style="background:#52cfad"></i></div>
          <span>班级动态</span>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/">
          <div><i class="fa fa-home" style="background:#f6b63b"></i></div>
          <span>我的孩子</span>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/">
          <div><i class="fa fa-home" style="background:#6ecefa"></i></div>
          <span>一卡通</span>
        </router-link>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
import { Swiper,Flexbox,FlexboxItem  } from 'vux'

export default {
  name: 'hello',
  components: {
    Swiper,Flexbox,FlexboxItem
  },
  data () {
    return {
      swiperdate:[
        { url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        },
        { url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        },
        { url: 'javascript:',
          img: 'https://static.vux.li/demo/3.jpg',
          title: '送你一次旅行'
        }
      ]
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
.hello{
  text-align: center;
}
.vux-flexbox{
  text-align: center;
  padding-top:1em;
  padding-bottom:1em;
  background-color: white;
  .vux-flexbox-item{
    cursor:pointer;
    div{
      width:100%;
      i{
        width:2em;
        height:2em;
        line-height:2em;
        border-radius: 2em;
        color:white;
        font-size: 2.3em;
      }
    }
    span{
      width:100%;
    }
  }
}

</style>
