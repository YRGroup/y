<template>
  <div class="hello">

    <group>
      <cell title="学生家长" is-link :link="'/student/'+$route.params.studentId+'/parent'"></cell>
      <cell title="详细资料" is-link :link="'/student/'+$route.params.studentId+'/profile'"></cell>
      <cell title="成绩报告" is-link :link="'/student/'+$route.params.studentId+'/score/1'"></cell>
      <cell title="一卡通" is-link :link="'/student/'+$route.params.studentId+'/schoolcard'"></cell>
    </group>

  </div>
</template>

<script>
import { Group,Cell } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,Cell
  },
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

</style>
