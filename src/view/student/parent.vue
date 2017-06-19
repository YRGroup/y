<template>
  <div class="hello">

    <group :title="i.ParentType" v-for="i in parents">
      <cell title="姓名" :value="i.ParentTrueName"></cell>
      <cell title="身份" :value="i.ParentType"></cell>
      <cell title="电话" :value="i.ParentPhone"></cell>
      <cell title="发送站内信" is-link :link="'/msg/'+i.ParentMeid"></cell>      
      <cell title="头像">
        <img class="headImg" :src="i.ParentHeadimgurl" slot="default">
      </cell>
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
      data: {},
      parents:[]
    }
  },
  methods:{
    getData() {
      this.$API.getStudentInfo(this.$route.params.studentId).then(res => {
        this.data = res
        this.parents = res.Parents
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.$store.commit('showNav', true)
    this.$store.commit('changeTitle', '学生家长')
    this.getData()
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.headImg{
  height:5rem;
}
</style>
