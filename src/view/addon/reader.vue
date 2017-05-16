<template>
  <div class="hello">
    <!--添加新校园动态测试用例-->
    </br>
    <p>作者:<input type="text" v-model="data.name"></p></br>
    <p>分类:<input type="text" v-model="data.category"></p></br>
    <p>内容:<textarea type="text" v-model="data.content"></textarea></p></br>
    <button @click="newpost">确认发布</button>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      data: {}
    }
  },
  methods:{
    newpost(){
      console.log(this.data)
      this.$http.post('http://192.168.3.195:3000/school/new',this.data).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
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
</style>
