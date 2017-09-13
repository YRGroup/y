<template>
  <div>
    <has-no-student v-if="$store.state.hasNoStudent">
    </has-no-student>
    <div v-else>
      <div class="header card">
        <p class="title">{{score.ExamName}}</p>
        <p class="time">{{score.Time}}</p>
      </div>

      <div class="main card">
        <div class="total">
          <div class="item">
            <span>名次</span>
            <span class="num">{{score.Remark || '暂无'}}</span>
          </div>
          <div class="item">
            <span>总分</span>
            <span class="num">{{score.FullScore}}</span>
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

      <popup v-model="showpopup" class="popup">
        <div class="content">
          <li class="card examItem" v-for="(i,index) in exam" :key="index" @click="$router.push('/student/'+$route.params.studentId+'/score/'+i.ExamID),showpopup=false">
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
    Popup, hasNoStudent
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
        if (res.length === 0) {
          this.$vux.toast.show({
            type: "text",
            text: '暂无考试信息',
            width: '20em'
          })
        }
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '成绩报告')
    this.getScoreData()
  },
  watch: {
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
    color: @grey;
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
      border-bottom: 1px solid @border;
      .num {
        font-weight: bold;
        font-size: 1.2rem;
        color: @main;
      }
    }
  }
  .subject {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .5rem;
    position: relative;
    border-bottom: 1px solid @border;
    &:before {
      content: "";
      display: block;
      background: @border;
      width: 1px;
      height: 100%;
      position: absolute;
      left: 50%;
    }
    li {
      width: 50%;
      line-height: 3rem;
      border-bottom: 1px solid @border;
      .score {
        font-size: 1.2rem;
        color: @main;
        font-weight: 600;
      }
      .fullScore {
        color: @grey;
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
  color: @grey;
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
        color: @grey;
        line-height: 1.5rem;
      }
      .score {
        float: right;
        font-size: 1.1rem;
        color: @main;
        width: 15%;
        text-align: right;
        margin-top: 10px;
      }
    }
  }
}
</style>
