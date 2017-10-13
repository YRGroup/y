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
          <li v-for="(list,index) in exam.StudentSummary" :key="index" @click="studentScore(list.Meid,exam.ExamID)">
            <span class="title">{{list.TrueName}}</span> 
            <span class="score">{{list.TotalScore}}</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <div id="chart1" style="width:100%; height:400px;"></div>
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
import echarts from 'echarts';
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
      nodataImg: false,
      chart1: null,
      chart1_indicator: [],
      chart1_series: [],
      IsPublished:''
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
    setChart1() {
      this.chart1.setOption({
        title: {
          text: '班级平均分'
        },
        tooltip: {},
        legend: {
        },
        label: {
          normal: {
            show: true,
            formatter: function(params) {
              return params.value;
            }
          }
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: this.chart1_indicator
        },
        series: [{
          type: 'radar',
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [
            {
              value:this.chart1_series,
              name: '班级平均分'
            }
          ]
        }]
      })
    },
    studentScore(Meid,ExamID) {
      if(this.IsPublished){
        this.$router.push('/student/'+Meid+'/score/'+ExamID)
      }else{
        this.$vux.toast.show({
            type: "warn",
            text: '本次考试成绩还未发布！~',
            width: '20em',
          })
      }
      // $router.push('/student/'+list.Meid+'/score/'+exam.ExamID)
    },
    getExamInfo(id) {
      this.$API.getExamInfo(id).then(res => {
        this.exam = res
        this.IsPublished = this.exam.IsPublished
        let data = this.exam
        let time = new Date(data.CreateTime)
        data.CreateTime = time.Format('MM-dd hh:mm')

        this.chart1_indicator = []
        this.chart1_series = []

        this.exam.CoursesSummary.forEach(o => {
          this.chart1_indicator.push({ name: o.CourseName, max: o.FullScore })
          this.chart1_series.push(o.AverageScore)
        })
        this.setChart1()
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '考试列表报告')
    this.getData()
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
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
#chart1{
  padding:20px 0;
}
.noData {
  min-height: 600px;
  text-align: center;
  line-height: 600px;
}
</style>
