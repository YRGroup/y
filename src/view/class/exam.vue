<template>
  <div>

    <div class="card">
      <cell title="查看考试列表" is-link @click.native="showpopup=true"></cell>
    </div>

    <div class="noData" v-if="nodataImg">
      <img :src="nodataPic">
    </div>

    <div v-else>
      <div class="header card">
        <p class="title">{{exam.Name}}</p>
        <p class="time">{{exam.CreateTime}}</p>
      </div>

      <div class="main card">
        <ul class="subject">
          <li v-for="(list,index) in exam.StudentSummary" :key="index" @click="$router.push('/student/'+list.Meid+'/score/'+exam.ExamID)">
            <span class="title">{{list.TrueName}}</span>
            <span class="score">{{list.TotalScore}}</span>
          </li>
        </ul>
      </div>
    </div>

    <popup v-model="showpopup" class="popup">
      <div class="content">
        <cell v-for="(i,index) in examList" :key="index" :title="i.ExamName" :value="i.CreateTime" @click.native="getExamInfo(i.ID),showpopup=false">
        </cell>
      </div>
    </popup>

  </div>
</template>

<script>
import { Cell, Popup } from 'vux'

export default {
  name: 'hello',
  components: {
    Cell, Popup
  },
  data() {
    return {
      examList: [],
      exam: {},
      showpopup: false,
      nodataPic: require('@/assets/nodata.png'),
      nodataImg: false
    }
  },
  methods: {
    getData() {
      this.$API.getClassExamList(this.$store.state.currentClassId).then(res => {
        this.examList = res
        if (this.examList.length == 0) {
          this.nodataImg = true
        }
        let data = this.examList
        for (var i = 0; i < data.length; i++) {
          let time = new Date(data[i].CreateTime)
          data[i].CreateTime = time.Format('MM-dd hh:mm')
        }
        this.getExamInfo(this.examList[0].ID)
      })
    },
    getExamInfo(id) {
      this.$API.getExamInfo(id).then(res => {
        this.exam = res
        let data = this.exam
        let time = new Date(data.CreateTime)
        data.CreateTime = time.Format('MM-dd hh:mm')
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '考试列表报告')
    this.getData()
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.header {
  text-align: center;
  line-height: 1.6rem;
  padding-bottom: 14px;
  .title {
    padding: 14px 14px 0 14px;
    font-size: 1rem;
  }
  .time {
    color: @cc3;
  }
}

.main {
  text-align: center;
  .total {
    line-height: 4rem;
    padding: 0 .5rem;
    display: flex;
    justify-content: center;
    .item {
      font-size: 1rem;
      width: 50%;
      border-bottom: 1px solid @cc4;
      .num {
        font-weight: bold;
        font-size: 1.2rem;
        color: @cc6;
      }
    }
  }
  .subject {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .5rem;
    position: relative;
    border-bottom: 1px solid @cc4;
    &:before {
      content: "";
      display: block;
      background: @cc4;
      width: 1px;
      height: 100%;
      position: absolute;
      left: 50%;
    }
    li {
      width: 50%;
      line-height: 3rem;
      border-bottom: 1px solid @cc4;
      .score {
        font-size: 1.2rem;
        color: @cc6;
        font-weight: 600;
      }
      .fullScore {
        color: @cc2;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.popup {
  overflow: scroll;
  .close {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    line-height: 2rem;
    position: fixed;
    width: 100%;
    padding-left: 2rem;
  }
  .content {
    margin: 2.5rem 0;
    .examItem {
      padding: .8rem 1rem;
      text-align: left;
      overflow: hidden;
      .left {
        width: 80%;
        float: left;
        overflow: hidden;
      }
      .title {
        font-size: 1rem;
        line-height: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
      }
      .time {
        display: inline-block;
        color: @cc3;
        line-height: 1.5rem;
      }
      .score {
        float: right;
        font-size: 1.1rem;
        color: @cc6;
        width: 15%;
        text-align: right;
        margin-top: 10px;
      }
    }
  }
}

.noData {
  min-height: 600px;
  text-align: center;
  line-height: 600px;
}
</style>
