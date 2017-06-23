<template>
  <div class="profile">
    <group label-align="left" class="itemlist" title=" ">
      <cell title="头像" value-align="right" class="headimg">
        <img class="headImg" :src="data.Headimgurl" slot="default">
      </cell>
      <cell title="姓名" :value="data.TrueName" value-align="right"></cell>
      <cell title="学科" :value="data.Course" value-align="right"></cell>
      <cell title="年级" :value="data.TrueName" value-align="right"></cell>
      <cell title="班级" :value="data.TrueName" value-align="right"></cell>
      <cell title="学历" :value="data.TrueName" value-align="right"></cell>
      <cell title="职称" :value="data.TrueName" value-align="right"></cell>
    </group>
  </div>
</template>

<script>
import { Cell, Group  } from 'vux'

export default {
  components: {
    Cell, Group 
  },
  data () {
    return {
      data:{},
      showdialog:false,
      showimgurl:'',
    }
  },
  methods:{
    getData(){
      this.$API.getTeacherInfo(this.$route.params.teacherId).then(res=>{
        this.data=res
      })
    }
  },
  created(){
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.profile{
  padding-top:10px;
  margin-top:10px;
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
.itemlist{
  margin-top:-10px;
  .title{
    border-bottom: 1px solid @cc3;
    margin-bottom: -1px;
    font-size:1.1em;
    line-height: 1.4em;
    .iconfont{
      margin-right:5px;
      font-size:1.2em;
    }
  }
  .more{
    border-top:1px solid @cc4;
    color:@cc3;
    text-align: center;
    line-height: 3em;
  }
}
.headimg img{
  width: 3rem;
  border-radius: 50%;
}
</style>
