<template>
  <div class="msg">
    <div class="msgTitle">与 {{user.sendto_TrueName}} 的消息列表</div>
  
    <load-more :show-loading="false" tip="点击查看以前的消息" background-color="#f5f5f5" @click.native="getMsgInfo()" v-if="data.length!=0"></load-more>
  
    <ul>
      <li class="item" :class="(item.SendTo===$route.params.userId)?'right':null" v-for="(item,index) in data" :key="index">
        <div class="time">
          <span>{{item.CreateTime}}</span>
        </div>
        <img class="picinfo" :src="userImg">
        <span class="content">{{item.Content}}</span>
        <div class="isread" v-show="item.showRead">{{item.IsRead == false ? '未读' : '已读'}}</div>
      </li>
  
      <div class="nomsg" v-if="data.length===0">还没有消息</div>
    </ul>
  
    <div class="replybtn">
      <x-input class="msgcontent" type="text" :show-clear="false" placeholder="请在此输入要发送的内容" v-model="msg" @keyup.enter.native="replyMsg"></x-input>
      <x-button class="msgbtn" type="primary" @click.native="replyMsg">发送</x-button>
    </div>
  
    </br>
    </br>
  
  </div>
</template>

<script>
import { XInput, XButton, LoadMore } from 'vux'
export default {
  name: 'msg',
  components: {
    XInput, XButton, LoadMore
  },
  data() {
    return {
      showpopup: false,
      msg: '',
      user:{},
      data: []
    }
  },
  methods: {
    getMsgInfo() {
      this.$API.getMsgInfo(this.$route.params.userId).then(res => {
        this.user=res
        this.data = res.CL
        this.userImg = res.sendto_Headimgurl
        this.data.forEach(element => {
          element.showRead = null
          if(this.$route.params.userId == element.SendTo){
            element.showRead = true
          }else{
            element.showRead = false
          }
        })
      })
    },
    replyMsg() {
      let msgdata = {}
      msgdata.sendto = this.$route.params.userId
      msgdata.content = this.msg
      if (this.msg != '') {
        this.$API.replyMsg(msgdata).then(res => {
          this.msg = ''
          this.getMsgInfo()
          window.scrollTo(0, 10000)
        }).catch((err) => {
          this.$vux.toast.show({
          type: "text",
          text: err.msg,
          width: '20em'
        })
        })
      } else {
        this.$vux.toast.show({
          type: "text",
          text: '消息不能为空',
          width: '20em'
        })
      }
    }
  },
  created() {
    this.$store.commit('changeTitle', '消息中心')
    this.getMsgInfo()
    window.scrollTo(0, 10000)
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>

.replybtn {
  position: fixed;
  bottom: 4em;
  left: 0;
  right: 0;
  padding: .5rem;
  .msgcontent {
    background: @grey;
    display: inline-block;
    width: calc(~"100% - 7.5rem");
    background: #fff;
  }
  .msgbtn {
    width: 5rem;
    float: right;
  }
}

.nomsg {
  text-align: center;
  padding: 5rem; // background: @border;
}

.item {
  text-align: left;
  padding: 10px;
  font-size: 1.2em;
  position: relative; // margin-bottom: 10px; 
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
    word-break: break-all;
    border-radius: 1px solid @border;
    box-shadow: 0 0 3px rgba(0, 0, 0, .1);
  }
}

.weui-loadmore {
  margin: 20px auto 0;
}

.time {
  text-align: center;
  color: @grey;
  font-size: 0.8rem;
  margin-bottom: 8px;
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

.msgTitle{
  text-align: center;
  background: @main;
  color:#fff;
  line-height: 40px;
}
.isread{
  margin-right: 4rem;
  color: @grey;
}
</style>
