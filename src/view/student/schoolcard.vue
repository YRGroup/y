<template>
  <div class="hello">
  
    <group>
      <cell title="一卡通当前余额：" :value="data.Blance+'元'">
      </cell>
    </group>
  
    <group title="消费记录：">
      <cell :title="i.Title" :inline-desc="i.CreateTime" v-for="(i,index) in data.Log" :key="index">
        <div slot="value">
          <span style="color: red">- {{i.Money}}</span>
        </div>
      </cell>
    </group>
  
    <div class="noMsg" v-if="data.Log===0">当前没有消费记录</div>
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
      data: {}
    }
  },
  methods: {
    getExamList() {
      this.$API.getExamList(this.$route.params.studentId, this.$route.params.examId).then(res => {
        this.data = res

      })
    },
  },
  created() {
    this.$store.commit('changeTitle', '一卡通消费记录')
    this.getExamList()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.noMsg {
  text-align: center;
  line-height: 150px;
}
</style>
