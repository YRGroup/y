<template>
  <div>
    <has-no-student v-if="$store.state.hasNoStudent">
    </has-no-student>
    <div v-else>
      <div class="header card">
        <p class="title">{{score.ExamName}}</p>
        <p class="time">2017-5-10</p>
      </div>
  
      <div class="main card">
        <div class="total">
          <div class="item">
            <span>名次</span>
            <span class="num">20</span>
          </div>
          <div class="item">
            <span>总分</span>
            <span class="num">{{score.Score}}</span>
          </div>
        </div>
        <ul class="subject">
          <li v-for="(list,index) in score.ScoreInfo" :key="index">
            <span class="title">{{list.CourseName}}</span>
            <span class="score">{{list.Score}}</span>
            <span class="fullScore">/{{list.FullScore}}</span>
          </li>
        </ul>
      </div>
  
      <div class="more card" @click="showpopup=true,getExamList()">
        查看历次成绩 >>>
      </div>
  
      <popup v-model="showpopup" height="100%" class="popup">
        <div class="close" @click="showpopup=false">返回</div>
        <div class="content">
          <li class="card examItem" v-for="(i,index) in exam" :key="index" @click="$router.push('/student/'+$store.state.studentId+'/score/'+i.ExamID),showpopup=false">
            <div class="left">
              <div class="title">{{i.ExamName}} > </div>
              <div class="time">{{i.Time}}</div>
            </div>
            <div class="score">{{i.Score}}分</div>
          </li>
        </div>
      </popup>
    </div>
  
  </div>
</template>

<script>
import { Popup } from 'vux'
import hasNoStudent from '@/components/hasNoStudent'

export default {
  name: 'hello',
  components: {
    Popup,hasNoStudent
  },
  data() {
    return {
      showpopup: false,
      exam: [],
      score: {}
    }
  },
  methods: {
    getScoreData() {
      this.$API.getExamScore(this.$route.params.studentId, this.$route.params.examId).then(res => {
        this.score = res
      })
    },
    getExamList() {
      this.$API.getExamList(this.$route.params.studentId).then(res => {
        this.exam = res
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '成绩报告')
    this.getScoreData()
    if (this.exam.length === 0) {
      this.$vux.toast.show({
        type: "text",
        text: '暂无考试信息',
        width: '20em'
      })
    }
  },
  watch: {
    showpopup(val) {
      if (val) {
        this.$store.commit('showNav', false)
      } else {
        this.$store.commit('showNav', true)
      }
    },
    "$route": "getScoreData"
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

.more {
  line-height: 2.5rem;
  text-align: center;
  color: @cc2;
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
</style>
