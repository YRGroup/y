<template>
  <div class="hello">
  
    <group class="link">
      <cell class="itemlist" :title="'学生 （'+student.length+ ' )'" is-link :border-intent="false" :arrow-direction="showContent1 ? 'up' : 'down'" @click.native="showContent1 = !showContent1" :class="showContent1?'activenav':null">
        
        <span slot="icon" class="roleheader bgcolor1">
          <i class="iconfont">&#xe607;</i>
        </span>
      </cell>

      <!--<template v-if="showContent1"  class="slide" :class="showContent1?'animate':null">
        <cell class="item" is-link v-for="(i,index) in student" :link="'/student/'+i.Meid" :title="i.TrueName +'  '+ i.Meid" :key="index">
          <img class="cellicon" slot="icon" :src="i.userImg">
        </cell>
      </template>-->

      <div class="slide" :class="showContent1?'animate':null">
        <cell class="item" is-link v-for="(i,index) in student" 
        :title="i.TrueName" :link="'/student/'+i.Meid"  :key="index">
          <img class="cellicon" slot="icon" :src="i.userImg">
        </cell>
      </div>
  
      <cell class="itemlist" :title="'家长 （'+parent.length+ ' )'" is-link 
      :border-intent="false" :arrow-direction="showContent2 ? 'up' : 'down'" 
      @click.native="showContent2 = !showContent2" :class="showContent2?'activenav':null">
        <span slot="icon" class="roleheader bgcolor2">
          <i class="iconfont">&#xe609;</i>
        </span>
      </cell>
      <div class="slide" :class="showContent2?'animate':null">
        <cell class="item" is-link v-for="(i,index) in parent" 
        :link="'/student/'+i.StudentMeid+'/parent'" 
        :title="i.ParentTrueName  +'  - '+ i.StudentTrueName+'的家长'" :key="index">
          <img class="cellicon" slot="icon" :src="i.ParentHeadimgurl">
        </cell>
      </div>
  
      <cell  class="itemlist" :title="'老师 （'+teacher.length+ ' )'" is-link 
      :border-intent="false" :arrow-direction="showContent3 ? 'up' : 'down'" 
      @click.native="showContent3 = !showContent3" :class="showContent3?'activenav':null">
        <span slot="icon" class="roleheader bgcolor3">
          <i class="iconfont">&#xe605;</i>
        </span>
      </cell>
      <div class="slide" :class="showContent3?'animate':null">
        <cell class="item" is-link v-for="(i,index) in teacher" 
        :link="'/teacher/'+i.Meid" :title="i.TrueName" :inline-desc="i.SelfDiscription" :key="index">
          <img class="cellicon" slot="icon" :src="i.Headimgurl">
        </cell>
      </div>
  
    </group>
  
    </br>
    <ul class="msglist">
      <li @click="$router.push('/msg/'+item.ToMeid)" v-for="item in msgdata">
        <img :src="item.ToHeadImg">
        <span class="usename">{{ item.ToName }}</span>
        <span class="info">{{ item.Content }}</span>
        <span class="time">{{ item.LastTime }}</span>
        <span class="num">{{ item.UnReadCount }}</span>
      </li>
    </ul>

    <div class="noMsg" v-if="msgdata.length===0">当前没有消息</div>

  </div>
</template>

<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  name: 'hello',
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  data() {
    return {
      showContent1: false,
      showContent2: false,
      showContent3: false,
      msgdata: [],
      student: [],
      parent: [],
      teacher: [],
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
    },
    goAnchor(selector) {
      var anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
    },
    getStudentList() {
      this.$API.getStudentList(this.$store.state.currentClassId).then(res => {
        this.student = res
      }).catch(err => {
        console.log(err)
      })
    },
    getTeacherList() {
      this.$API.getTeacherList(this.$store.state.currentClassId).then(res => {
        this.teacher = res
      }).catch(err => {
        console.log(err)
      })
    },
    getParentList() {
      this.$API.getParentList(this.$store.state.currentClassId).then(res => {
        this.parent = res
      }).catch(err => {
        console.log(err)
      })
    },
    getMsgList() {
      this.$API.getMsgList().then(res => {
        this.msgdata = res
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.$store.commit('showNav', true)
    this.$store.commit('changeTitle', '消息中心')
    this.getStudentList()
    this.getTeacherList()
    this.getParentList()
    this.getMsgList()
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
      width: 3rem;
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
      background: @cc6;
      line-height: 1.2em;
      text-align: center;
      width: 1.3em;
      height: 1.3em;
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
    background: @cc4;
    margin-top: .2em;
  }
  li:last-child {
    padding-bottom: 0;
  }
}

// .activenav {
//   background: @cc6;
//   color: #fff;
// }
.itemlist{
  background:#f9f9f9;
}
.cellicon {
  width: 2.4rem;
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
  vertical-align: middle;
}



.slide {
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  border-top: 1px solid @cc4;
}

.roleheader {
  display: inline-block;
  width: 2.8rem;
  height: 2.8rem;
  line-height: 2.8rem;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin-right: 10px;
  .iconfont {
    font-size: 1.6rem;
  }
}
.bgcolor1{
  background: #f76a24;
}
.bgcolor2{
  background: #16c2c2;
}
.bgcolor3{
  background: #9266f9;
}

.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
  .weui-cell_access {
    // background: #f5f5f5;
  }
}
.noMsg{
  text-align: center;
  line-height: 150px;
}
</style>
