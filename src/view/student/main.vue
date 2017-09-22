<template>
  <div>
    <has-no-student v-if="$store.state.hasNoStudent"></has-no-student>

    <div v-else>
      <div class="header">
        <div class="stuImg">
          <img :src="headimgurl" @click="$router.push('/student/'+$route.params.studentId)">
        </div>
        <div class="nameInfo">
          <p class="stuname">学生：{{ studentName }}</p>
          <p class="clname">{{ className }}</p>
        </div>
        <div class="msgbtn" @click="$router.push('/msg/'+$route.params.studentId)">
          <i class="iconfont">&#xe606;</i>发消息</div>
      </div>

      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import hasNoStudent from '@/components/hasNoStudent'

export default {
  components: {
    Tab, TabItem, hasNoStudent
  },
  data() {
    return {
      data: {},
      headimgurl: null,
      className: null,
      studentName: null,
    }
  },
  methods: {
    getData() {
      this.$API.getStudentInfo(this.$route.params.studentId).then(res => {
        this.headimgurl = res.user.Headimgurl
        this.className = res.Class.Name
        this.studentName = res.user.TrueName
      })
    }
  },
  created() {
    this.$store.commit('changeTitle', '学生主页')
    this.getData()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.header {
  color: #fff; // text-align: center;
  // background: linear-gradient(right top, #00c0a1, #00c06f);
  background: url(../../assets/classBg.jpg) center center;
  height: 100px;
  padding: 15px 20px;
  box-sizing: border-box;
  position: relative;
  .stuImg {
    float: left;
    img {
      width: 4rem;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      vertical-align: middle;
    }
  }
  .nameInfo {
    float: left;
    margin: 10px 0 0 10px;
    .stuname {
      font-size: 1.4em;
    }
    .clname {
      margin-top: 5px;
    }
  }

  .tipInfo {
    margin: 1rem 0;
    span {
      border: 1px solid #fff;
      padding: .3rem 1em;
      border-radius: 25px;
    }
  }
  .msgbtn {
    position: absolute;
    right: 0;
    top: 2.4rem;
    padding:3px 10px;
    border-radius:6px 0 0 6px;
    background: rgba(255,255,255,0.4);
    .iconfont {
      margin: 0 5px 0 5px;
      top: 2px;
      font-size: 1.2em;
    }
  }
}
</style>
