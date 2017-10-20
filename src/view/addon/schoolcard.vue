<template>
  <div class="hello">
    <has-no-student v-if="$store.state.hasNoStudent">
    </has-no-student>
    <div v-else>
      <div v-if="$store.getters.hasNoSchoolCard">
        <div class="noCard panel">
          <h4>
            请先绑定校园卡号
          </h4>
          <group>
            <x-input title="卡号：" placeholder="请输入卡号" v-model="addCardData.CardID">
            </x-input>
            <!-- <x-input title="卡号：" placeholder="请输入校园卡号" v-model="addCardData.CardID" placeholder-align="right"></x-input> -->
          </group>
          <x-button slot="right" type="primary" @click.native="addCardID" style="margin-top:20px;">
            提交
          </x-button>
          <!-- <form :model="addCardData" label-width="100px" class="cardNum"> -->
          <!-- <el-form-item label="学生：" v-if="$store.getters.role==='家长'">
                                          <el-select v-model="addCardData.student_meid" placeholder="请选择学生">
                                            <el-option v-for="i in studentList" :key="i.id" :label="i.name" :value="i.id">
                                            </el-option>
                                          </el-select>
                                        </el-form-item> -->

          <!-- <el-form-item label="卡号：">
                                  <el-input v-model.number="addCardData.CardID" placeholder="请输入校园卡号" size="large"></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="success" @click="addCardID" size="large">提交</el-button>
                                </el-form-item>
                          </form> -->
        </div>
      </div>
      <div v-else>
        <group>
          <cell title="卡号：">
            <div slot="value">
              <span class="balance">{{data.CampusCard}}</span>
            </div>
          </cell>
          <cell title="解除绑定" is-link @click.native="unbindCard"></cell>
          <cell title="余额：">
            <div slot="value">
              <span class="balance">{{data.Blance}} 元</span>
            </div>
          </cell>
        </group>

        <div class="noMsg" v-if="data.Log.length===0">当前没有消费记录</div>
        <group title="消费记录：" v-else>
          <cell :title="i.Title" :inline-desc="i.CreateTime" v-for="(i,index) in data.Log" :key="index">
            <div slot="value">
              <span style="color: red">{{i.OpeaType}} {{i.Money}}</span>
            </div>
          </cell>
        </group>

        <div class="btn" v-if="!dataEnd">
          <x-button type="primary" @click.native="loadMore">点击加载更多</x-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Group, Cell, LoadMore, XButton, XInput, Confirm} from 'vux'
import hasNoStudent from '@/components/hasNoStudent'
import noData from '@/components/noData'

export default {
  name: 'hello',
  components: {
    Group, Cell, LoadMore, XButton, hasNoStudent, XInput,Confirm,noData
  },
  data() {
    return {
      addCardData: {
        CardID: '',
        student_meid: this.$store.state.currentStudentId
      },
      data: {
        Blance: 0,
        Log: [],
      },
      dataEnd:false,
      currentPage: 1
    }
  },
  methods: {
    getData() {
      let para = {}
      para.currentPage = this.currentPage
      para.pagesize = 10
      para.student_meid = this.$store.state.currentStudentId
      this.$API.getCardList(para).then(res => {
        if(res){
            if (this.data.Blance == 0) {
              this.data.Blance = res.Blance
              this.data.CampusCard = res.CampusCard
            }
            res.Log.forEach((val) => {
              this.data.Log.push(val)
            })
            this.dataEnd=(res.Log.length==pagesize)?false:true
        }else{
          this.dataEnd=true;
        }
      })
    },
    loadMore() {
      this.currentPage++
      this.getData()
    },
    addCardID() {
      this.$API.addSchoolcard(this.addCardData).then(res => {
          this.$store.dispatch('getCurrentUser')
          this.$vux.toast.show({
            type: "text",
            text: '绑定卡号成功',
            width: "20em"
          })
          this.getData()
        }).catch((err) => {
          this.$vux.toast.show({
            type: "warn",
            text: err.msg,
            width: "20em"
          })
        })
    },
    unbindCard() {
      let _this=this;
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确定解除绑定',
        onConfirm () {
            _this.DounbindCard();
        }

      })
    },
    DounbindCard(){
      this.$API.deleteSchoolcard(this.addCardData).then(res => {
        this.$store.dispatch('getCurrentUser')
        this.$vux.toast.show({
          type: "text",
          text: '解绑一卡通成功',
          width: "20em"
        })
        this.getData()
      }).catch((err) => {
        this.$vux.toast.show({
          type: "warn",
          text: err.msg,
          width: "20em"
        })
      })
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

.noCard {
  padding: 0 20px; // min-height: 500px;
  h4 {
    text-align: center;
    padding: 50px 0;
    font-size: 20px;
    font-weight: 400;
  }
  .cardNum {
    width: 450px;
    margin: 0 auto;
  }
}

.balance {
  color: #ff8212;
  font-size: 1.2rem;
}
</style>
