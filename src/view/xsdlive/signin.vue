<template>
  <div class="wrapper">
    <div class="item">
      <transition-group tag="ul" class="userlist list-complete">
          <li v-for="(item,index) in SignInList" class="user list-complete-item" :key="index">
            <img :src="item.imageUrl" alt="">
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
      liveId: 3,
      curid: 1,
      count: 1,
      SignInList: [],
      showList:[]
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
        console.log(res)
        // this.SignInList = res.Content.slice(0, 24);
        // this.showList.push(this.SignInList)
        // this.curid = res.Content[0].ID;
        // setTimeout(() => {
        //   this.getSignInList()
        // },2000)
      });
    }
  },
  created() {
    this.getSignInList();
  },
  watch: {

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
