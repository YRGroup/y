<template>
  <div>
    <div class="header">
      <div class="stuImg">
        <img :src="headimgurl" @click="$router.push('/student/'+$route.params.studentId)">
      </div>
      <div class="nameInfo">
        <p class="stuname">{{ studentName }}</p>
        <p class="clname">{{ className }}</p>
      </div>
      <div class="msgbtn" @click="$router.push('/msg/'+$route.params.studentId)"><i class="iconfont">&#xe606;</i>发消息</div>
    </div>
  
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  components: {
    Tab, TabItem
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
  background: linear-gradient(right top, #00c0a1, #00c06f); // background-size:100% 100%;
  overflow: hidden;
  padding:10px;
  position: relative;
  .stuImg {
    float: left;
    margin-left:1rem;
    img {
      width: 3.4rem;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
    }
  }
  .nameInfo {
    float: left;
    margin:10px 0 0 10px;
    .stuname{
      font-size: 1.4em;
    }
    .clname{
      opacity: 0.8
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
    top: 1.4rem;
    padding: 0.2rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 20px 0 0 20px;
    .iconfont{
      font-size: 1.3em;
      margin:0 5px 0 5px;
      position: relative;
      top: 2px;
    }
  }
}
</style>
