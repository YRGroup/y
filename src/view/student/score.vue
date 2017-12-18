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
          <!-- <div class="item" v-show="score.Ranking">
            <span>名次</span>
            <span class="num">{{score.Ranking}}</span>
          </div> -->
          <div class="item">
            <span>总分</span>
            <span class="num">{{score.Score +'/'+score.FullScore}}</span>
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

      <div class="card">
        <div id="scoreChart" ref="scoreChart"></div>
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
var echarts = require('echarts/lib/echarts');

export default {
  name: 'hello',
  components: {
    Popup, hasNoStudent
  },
  data() {
    return {
      showpopup: false,
      exam: [],
      score: {},
      chartsIndicator: [],
      chart_line1: [],
      chart_line2: [],
      myChart: null
    }
  },
  methods: {
    getScoreData() {
      this.$API.getExamScore(this.$route.params.studentId, this.$route.params.examId).then(res => {
        this.score = res
        this.setCharts(res.ScoreInfo)
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
    },
    setCharts(val) {
      this.chart_line1 = []   //本次成绩
      this.chart_line2 = []   //各科满分
      this.chart_line3 = []   //班级平均分
      this.chartsIndicator = []
      while (val.length < 3) {
        val.push({ Score: 1, CourseName: '无', FullScore: 100 })
      }
      val.forEach(o => {
        if (o.Score == 0) {
          this.chart_line1.push(1)
          this.chart_line2.push(1)
        } else {
          this.chart_line1.push(o.Score)
          this.chart_line2.push(o.ClassAvgScore)
        }
        let a = {
          name: o.CourseName,
          max: o.FullScore
        }
        this.chartsIndicator.push(a)
      })
      let option = {
        title: {
          text: '各科成绩分布图',
          top: 0
        },
        tooltip: { show: true },
        legend: {
          show: true,
          data: ['本次成绩', '班级平均分'],
          right: 'right'
        },
        radar: {
          indicator: this.chartsIndicator,
          center: ['50%', 180],
          name: {
            formatter: '【{value}】',
            textStyle: {
              color: '#666'
            }
          },
        },
        series: [{
          name: '平均分数对比',
          type: 'radar',
          data: [
            {
              value: this.chart_line1,
              name: '本次成绩',
              areaStyle: {
                normal: {
                  opacity: 0.5,
                }
              },
              label: {
                normal: {
                  show: true,
                  formatter: function(params) {
                    return params.value;
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F9713C'
                }
              },
            },
            {
              value: this.chart_line2,
              name: '班级平均分',
              itemStyle: {
                normal: {
                  color: '#43b359'
                }
              },
            },
          ]
        }]
      }
      this.myChart.setOption(option)
    }
  },
  created() {
    this.$store.commit('changeTitle', '成绩报告')
    this.getScoreData()
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('scoreChart'))
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
      width: 100%;
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
#scoreChart {
  width: 100%;
  height: 320px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
