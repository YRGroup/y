<template>
  <div id="profile">

    <group label-width="4.5em" label-margin-right="2em" label-align="right" gutter="0">
      <cell title="职称：" value="高级教师" value-align="left"></cell>
      <cell title="教龄：" value="5年" value-align="left"></cell>
      <cell value="查看更多" is-link></cell>
    </group>

    <group label-width="13em" label-align="left">
      <cell title="教学经历">
        <i slot="icon" class="fa fa-user">&nbsp&nbsp</i>
      </cell>
      <hr>
      <cell title="郑州航空港区育人国际学校" value="2016-2017" value-align="right"></cell>
      <cell title="郑州航空港区育人高级中学" value="2013-2015" value-align="right"></cell>
    </group>

    <group label-width="13em" label-align="left">
      <cell title="个人荣誉">
        <i slot="icon" class="fa fa-user">&nbsp&nbsp</i>
      </cell>
      <hr>
      <scroller lock-y scrollbar-x>
      <div class="box" :style="{ width: boxwid}">
        <div class="box-item" v-for="(item,index) in cup">
          <img :src="item.img" @click="showimg(index)">
        </div>
      </div>
    </scroller>
    </group>

    <x-dialog v-model="showdialog" hide-on-blur>
      <div>
        <img :src="showimgurl" style="max-width:100%">
      </div>
    </x-dialog>
    

  </div>
</template>

<script>
import { Cell, Scroller, Group,XDialog  } from 'vux'

export default {
  components: {
    Cell, Scroller, Group,XDialog 
  },
  data () {
    return {
      showdialog:false,
      showimgurl:'',
      cup:[
        {
          'img':'https://modao.cc/uploads3/images/907/9073944/raw_1493192454.png'
        },
        {
          'img':'https://modao.cc/uploads3/images/907/9074147/raw_1493192685.png'
        },
        {
          'img':'https://modao.cc/uploads3/images/907/9074115/raw_1493192640.png'
        }
      ]
    }
  },
  methods:{
    fun(val){

    },
    showimg(n){
      this.showimgurl = this.cup[n].img
      this.showdialog = true
    }
  },
  created(){
    this.boxwid = this.cup.length * 100 +'px'
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.weui-cell{
  font-size:14px!important;
}
.box {
  height: 4em;
  position: relative;
  background:transparent;
  padding-top:1em;
  padding-bottom:1em;
}
.box-item {
  width: 80px;
  background-color:#fff;
  border-radius:15px;
  display:inline-block;
  margin-left: 1em;
  img{
    width:4em;
    margin:0 1em;
    // border-radius:50%;
  }
}

// .dialog-demo {
//   .weui-dialog{
//     border-radius: 10px;
//     padding-bottom: 8px;
//   }
//   .dialog-title {
//     line-height: 30px;
//     color: #666;
//   }
//   .img-box {
//     overflow: hidden;
//   }
//   .vux-close {
//     margin-top: 8px;
//     margin-bottom: 8px;
//   }
// }
</style>
