<template>
  <div>

    <td>
      <tr v-for="i in list">
        <th :class="(index == n-1)?'active':null" @click="index = n-1" v-for="n in 6">{{i[n-1]}}</th>
      </tr>
    </td>
    
    
    

  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      index: 0,
      currentItem:'',
      date: ['周一', '周二', '周三', '周四', '周五','周六','周日'],
      list: [
        ['456','周一', '周二', '周三', '周四', '周五'],
        ['8点','语文', '数学', '英语', '语文', '体育'],
        ['9点','语文', '体育', '英语', '历史', '语文'],
        ['10点','历史', '数学', '英语', '语文', '数学'],
        ['11点','语文', '体育', '数学', '历史', '体育'],
        ['2点','英语', '语文', '英语', '语文', '体育'],
        ['3点','语文', '数学', '英语', '语文', '体育'],
        ['4点','英语', '语文', '英语', '语文', '数学'],
        ['5点','历史', '数学', '英语', '历史', '数学']
      ]
    }
  },
  methods:{
    fun(val){

    }
  },
  created(){
    let today = new Date()
    let a = this.date[today.getDay()-1]
    this.index = today.getDay()
    this.currentItem = this.date[today.getDay()-1]
    console.log(a)
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
@bordercolor:#ccc;
@activecolor:lightsalmon;

td{
  border-bottom:1px solid @bordercolor;
  background:#fff;
  tr{
    width:100%;
    th{
      border-top:1px solid @bordercolor;
      border-left:1px solid @bordercolor;
      width:16vw;
      height:3rem;
      line-height: 3rem;
    }
    th:after{
      content:'';
      display:block;
      height:1px;
      position: relative;
      bottom:.3rem;
      background:transparent;
    }
    th:last-child{
      border-right:1px solid @bordercolor;
    }
  }
  tr:hover th:after{
    background:@activecolor;
  }
}

.active{
  background:@activecolor;
  color:#fff;
}


</style>
