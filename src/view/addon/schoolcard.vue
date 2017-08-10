<template>
  <div class="hello">
    <has-no-student v-if="$store.state.hasNoStudent">
    </has-no-student>
    <div v-else>
      <group>
        <cell title="一卡通当前余额：" :value="data.Blance+'元'">
        </cell>
      </group>
  
      <div class="noMsg" v-if="data.Log===0">当前没有消费记录</div>
  
      <group title="消费记录：">
        <cell :title="i.Title" :inline-desc="i.CreateTime" v-for="(i,index) in data.Log" :key="index">
          <div slot="value">
            <span style="color: red">{{i.OpeaType}} {{i.Money}}</span>
          </div>
        </cell>
      </group>
  
      <div class="btn">
        <x-button type="primary" @click.native="loadMore">点击加载更多</x-button>
      </div>
    </div>
  
  </div>
</template>

<script>
import { Group, Cell, LoadMore, XButton } from 'vux'
import hasNoStudent from '@/components/hasNoStudent'

export default {
  name: 'hello',
  components: {
    Group, Cell, LoadMore, XButton, hasNoStudent
  },
  data() {
    return {
      data: {
        Blance: 0,
        Log: [],
      },
      currentPage: 1
    }
  },
  methods: {
    getData() {
      let para = {}
      para.currentPage = this.currentPage
      para.pagesize = 10
      this.$API.getCardList(para).then(res => {
        if (this.data.Blance == 0) {
          this.data.Blance = res.Blance
        }
        res.Log.forEach((val) => {
          this.data.Log.push(val)
        });
      })
    },
    loadMore() {
      this.currentPage++
      this.getData()
    }
  },
  created() {
    this.$store.commit('changeTitle', '一卡通消费记录')
    this.getData()
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

.btn {
  padding: 20px;
}
</style>
