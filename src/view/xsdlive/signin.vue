<template>
  <div class="wrapper">
    <div class="item">
      <transition-group tag="ul" class="userlist list-complete">
          <li v-for="(item,index) in SignInList" class="user list-complete-item" :key="index">
            <img :src="item.img" alt="">
            <p>{{item.name}}</p>
          </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      liveId: 0,
      curid: 0,
      count: 2,
      SignInList: [],
      userlist: [
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦1"
        },
        {
          img: require("@/assets/face/jobs.jpg"),
          name: "周杰伦2"
        },
        {
          img: require("@/assets/face/lh.jpg"),
          name: "周杰伦3"
        },
        {
          img: require("@/assets/face/tc.png"),
          name: "周杰伦4"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        },
        {
          img: require("@/assets/face/jay.jpg"),
          name: "周杰伦"
        }
      ]
    };
  },

  components: {},
  methods: {
    getSignInList() {
      let para = {
        lid: this.liveId,
        curid: this.curid,
        count: this.count,
        getlottery: 0
      };
      this.$API.getSignInList(para).then(res => {
        this.SignInList = res.signInList.slice(0, 24);
        console.log(res)
      });
    }
  },
  created() {
    this.getSignInList();
  },
  watch: {
    getNewUser() {
      setTimeout(() => {
        this.getSignInList()
      },2000)
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  padding: 240px 200px 0;
  box-sizing: border-box;
  background: url(../../assets/xsdLiveBg.jpg) no-repeat center center;
  background-size: cover;
  color: #fff;
}
.item {
}
.userlist {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  .user {
    text-align: center;
    font-size: 16px;
    width: 12.5%;
    margin-bottom: 50px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    }
  }
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
