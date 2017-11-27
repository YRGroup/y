<template>
  <div class="hello">
  
    <group :title="i.ParentType" v-for="i in parents" :key="i.ParentPhone">
      <cell title="头像">
        <img class="headImg" :src="i.ParentHeadimgurl" slot="default">
      </cell>
      <cell title="姓名" :value="i.ParentTrueName"></cell>
      <cell title="身份" :value="i.ParentType"></cell>
      <cell title="电话" :value="i.ParentPhone"></cell>
      <div class="btn">
        <a class="telBtn" :href="'tel:'+i.ParentPhone">打电话</a>
      </div>
      <!-- <cell title="发送站内信" is-link :link="'/msg/'+i.ParentMeid"></cell> -->
    </group>
  
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  name: 'hello',
  components: {
    Group, Cell
  },
  data() {
    return {
      data: {},
      parents: []
    }
  },
  methods: {
    getData() {
      this.$API.getStudentInfo(this.$route.params.studentId).then(res => {
        this.data = res
        this.parents = res.Parents
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '学生家长')
    this.getData()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.btn {
  text-align: right;
  padding-right:30px;
  line-height: 2.5rem;
  .telBtn{
    background: @bg;
    padding:5px 10px;
    border-radius: 5px;
  }
}
</style>
