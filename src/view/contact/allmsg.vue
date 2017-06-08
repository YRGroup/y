<template>
  <div class="msg">
  
    <div class="time">
      <span>item.CreateTime</span>
    </div>
  
    <ul>
      <li class="item" :class="(item.SendTo!=$route.params.userId)?'right':null" v-for="item in data">
        <img class="picinfo" :src="userImg">
        <span class="content">{{item.Content}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      data: []
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    },
    getMsgInfo() {
      this.$API.getMsgInfo(this.$route.params.userId).then(res => {
        this.data = res.CL
        this.userImg = res.sendto_Headimgurl
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.$store.commit('showNav', true)
    this.$store.commit('changeTitle', '消息中心')
    this.getMsgInfo()
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.msg{
  padding-top:1rem;
}
.item {
  text-align: left;
  padding: 10px;
  font-size: 1.2em;
  position: relative; 
  margin: 10px 0; 
  .picinfo {
    position: absolute;
    left: 20px;
    width: 3em;
    border-radius: 50%;
  }
  .content {
    display: inline-block;
    padding: 10px;
    background: #fff;
    margin: 0 10px 0 4rem;
    border-radius: 6px;
    z-index: -1;
    word-break:break-all;
    border-radius: 1px solid @cc4;
    box-shadow: 0 0 3px rgba(0, 0, 0, .1);
  }
}

.time {
  text-align: center;
  line-height: 1.5em;
  span{
    background: #e3e3e3;
    border-radius: 20px; 
    padding:5px 10px;
  }
}

.right {
  text-align: right;
  .picinfo {
    position: absolute;
    right: 20px;
    left: inherit;
  }
  .content {
    background: #9eea6a;
    margin: 0 4rem 0 20px;
    text-align: left;
  }
}
</style>
