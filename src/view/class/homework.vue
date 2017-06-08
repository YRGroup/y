<template>
  <div class="work">
    <br />

      <div class="workcard" v-for="i in homework">
        <div class="header">
          <span class="category" :style="{background:colors[i.CourseName]}">{{ i.CourseName }}</span>
          <span class="auther">{{ i.AutherName }}</span>
        </div>
        <div class="content">{{ i.Content }}</div>
        <div class="footer">{{ i.CreateTime }}</div>
      </div>
    </div>
    

  </di>
</template>

<script>
export default {
  data () {
    return {
      colors:{
        '语文':'#1abc9c',
        '数学':'#2ecc71',
        '英语':'#3498db',
        '物理':'#9b59b6',
        '历史':'#f1c40f',
        '政治':'#e67e22',
        '化学':'#e74c3c',
        '代数':'#34495e',
        '几何':'#95a5a6'
      },
      homework:[]
    }
  },
  methods:{
    fun(msg){
      this.$vux.toast.show({
        type:"text",
        width:"20em",
        text: msg
      })
    },
    getHomeWork(){
      this.$API.getHomeworkList(this.$store.state.classId).then(res=>{
        this.homework = res
        this.boxwid = res.length * 100 +'px'
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  created(){
    this.$store.commit('showNav',true)
    this.$store.commit('changeTitle','班级作业')
    this.getHomeWork()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.workcard{
  background: #fff;
  padding:1rem;
  margin: .6rem;
  .header{
    height:2rem;
    .category{
      float: left;
      padding:.3rem 1rem;
      color:#fff;
      border-radius: 5px;
    }
    .auther{
      float:right;
      padding-right:1rem;
      color:@cc2;
    }
  }
  .footer{
    color:@cc3;
    text-align: right;
  }
}
</style>
