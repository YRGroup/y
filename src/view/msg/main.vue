<template>
  <div class="hello">
    <ul class="msglist">
      <li @click="$router.push('/allmsg')" v-for="item in msg">
        <img :src="item.img">
        <span class="usename">{{ item.name }} （{{ item.class }}）</span>
        <span class="info">{{ item.msg }}</span>
        <span class="time">{{ item.date }}</span>
        <span class="num">{{ item.num }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: [
        {
          'name': '李老师',
          'img': require('@/assets/face/dk.png'),
          'class': '数学',
          'msg': '今天的作业完成了没有？',
          'date': '4-26',
          'num': '4'
        },
        {
          'name': '周老师',
          'img': require('@/assets/face/jay.jpg'),
          'class': '数学',
          'msg': '春季运动会报名方法',
          'date': '4-26',
          'num': '2'
        },
        {
          'name': '鹿老师',
          'img': require('@/assets/face/lh.jpg'),
          'class': '数学',
          'msg': '家长请多关注一下孩子的情感状态',
          'date': '4-26',
          'num': '7'
        }
      ]
    }
  },
  methods: {
    fun(msg) {
      this.$vux.toast.show({
        type: "text",
        width: "20em",
        text: msg
      })
    }
  },
  created() {
    this.$store.state.isNav = true
    this.$store.state.title = '消息中心'
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.msglist {
  li {
    padding: 0.8em 0 0 1em;
    font-size: 1.2em;
    background: #fff;
    position: relative;
    img {
      width: 4em;
      margin-right: 1em;
      border-radius: 50%;
    }
    .usename {
      position: absolute;
      top: 1em;
    }
    .info {
      position: absolute;
      top: 2.7em;
      color: @cc2;
      height: 1.5em;
      width: 16em;
      overflow: hidden;
    }
    .time {
      position: absolute;
      top: 1.5em;
      right: 1em;
      color: @cc3;
    }
    .num {
      position: absolute;
      top: 3.5em;
      right: 1em;
      background: @c6;
      line-height: 1.2em;
      text-align: center;
      width: 1.2em;
      height: 1.2em;
      border-radius: 50%;
      color: #fff;
      font-size: .9em;
    }
  }
  li:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background:@cc4;
    margin-top: .2em;
  }
  li:last-child {
    padding-bottom: 0;
  }
}
</style>
